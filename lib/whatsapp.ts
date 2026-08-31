export type CartLine = { name: string; qty: number; price: number };

export function buildWhatsAppOrderLink(lines: CartLine[]): string {
  const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/[^\d]/g, "");
  const total = lines.reduce((sum, l) => sum + l.qty * l.price, 0);

  const itemsText = lines
    .map((l, i) => `${i + 1}. ${l.name} x${l.qty} — Rs ${(l.qty * l.price).toLocaleString()}`)
    .join("\n");

  const message = [
    "Hello! I'd like to place an order from Porcelain Atelier:",
    "",
    itemsText,
    "",
    `Total: Rs ${total.toLocaleString()}`,
    "",
    "Please confirm availability and delivery details.",
  ].join("\n");

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
