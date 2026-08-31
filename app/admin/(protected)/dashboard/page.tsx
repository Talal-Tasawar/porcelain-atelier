"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/db";

const emptyForm = {
  id: "",
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  featured: false,
  inStock: true,
};

export default function DashboardPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts() {
    setLoading(true);
    const res = await fetch("/api/admin/products");
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function startEdit(p: Product) {
    setEditingId(p.id);
    setForm({
      id: p.id,
      name: p.name,
      description: p.description,
      price: String(p.price),
      category: p.category,
      image: p.image,
      featured: p.featured,
      inStock: p.inStock,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleImageUpload(file: File) {
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Upload failed.");
        return;
      }
      setForm((f) => ({ ...f, image: data.url }));
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: form.price,
        category: form.category,
        image: form.image,
        featured: form.featured,
        inStock: form.inStock,
      };

      const res = await fetch(editingId ? `/api/admin/products/${editingId}` : "/api/admin/products", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(typeof data.error === "string" ? data.error : "Please check the form fields.");
        return;
      }

      resetForm();
      await loadProducts();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product permanently?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    await loadProducts();
  }

  return (
    <div className="space-y-14">
      <section>
        <h1 className="font-display text-3xl text-ink-900">
          {editingId ? "Edit Product" : "Add a New Product"}
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 rounded-2xl bg-white p-8 shadow-sm lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-500">Name</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-ink-900/15 px-4 py-2.5 text-sm outline-none focus:border-clay-500"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-500">Category</label>
              <input
                required
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder="e.g. Dinner Sets"
                className="mt-2 w-full rounded-lg border border-ink-900/15 px-4 py-2.5 text-sm outline-none focus:border-clay-500"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-500">Price (Rs)</label>
              <input
                required
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-ink-900/15 px-4 py-2.5 text-sm outline-none focus:border-clay-500"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wide text-ink-500">Description</label>
              <textarea
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-ink-900/15 px-4 py-2.5 text-sm outline-none focus:border-clay-500"
              />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                />
                Featured
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.inStock}
                  onChange={(e) => setForm((f) => ({ ...f, inStock: e.target.checked }))}
                />
                In Stock
              </label>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs uppercase tracking-wide text-ink-500">Product Image</label>
            <div className="mt-2 flex flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-ink-900/15 p-6">
              {form.image ? (
                <div className="relative mb-4 h-40 w-40 overflow-hidden rounded-lg">
                  <Image src={form.image} alt="Preview" fill className="object-cover" />
                </div>
              ) : (
                <p className="mb-4 text-sm text-ink-400">No image selected</p>
              )}
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                className="text-sm"
              />
              {uploading && <p className="mt-2 text-xs text-clay-600">Uploading…</p>}
            </div>

            {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

            <div className="mt-6 flex gap-3">
              <button
                type="submit"
                disabled={saving || uploading || !form.image}
                className="flex-1 rounded-full bg-ink-900 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-clay-600 disabled:opacity-50"
              >
                {saving ? "Saving…" : editingId ? "Update Product" : "Add Product"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-ink-900/15 px-6 py-3 text-sm uppercase tracking-widest text-ink-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>
      </section>

      <section>
        <h2 className="font-display text-2xl text-ink-900">All Products ({products.length})</h2>

        {loading ? (
          <p className="mt-6 text-ink-400">Loading…</p>
        ) : products.length === 0 ? (
          <p className="mt-6 text-ink-400">No products yet.</p>
        ) : (
          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-ink-900/10 text-xs uppercase tracking-wide text-ink-400">
                <tr>
                  <th className="px-6 py-4">Product</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {products.map((p) => (
                    <motion.tr
                      key={p.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-ink-900/5 last:border-0"
                    >
                      <td className="flex items-center gap-3 px-6 py-4">
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-clay-100">
                          {p.image && <Image src={p.image} alt={p.name} fill className="object-cover" sizes="48px" />}
                        </div>
                        <span className="font-medium text-ink-900">{p.name}</span>
                        {p.featured && (
                          <span className="rounded-full bg-clay-100 px-2 py-0.5 text-xs text-clay-700">Featured</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-ink-500">{p.category}</td>
                      <td className="px-6 py-4">Rs {p.price.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <span className={p.inStock ? "text-green-600" : "text-red-500"}>
                          {p.inStock ? "In Stock" : "Sold Out"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => startEdit(p)} className="mr-4 text-clay-600 hover:underline">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:underline">
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
