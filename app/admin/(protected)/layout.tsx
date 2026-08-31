import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-clay-50">
      <header className="border-b border-ink-900/10 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin/dashboard" className="font-display text-lg text-ink-900">
            Cook &amp; CO <span className="text-clay-500">Admin</span>
          </Link>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-ink-500 hover:text-clay-600">View Store</Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
