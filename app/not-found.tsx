import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-6 text-center">
      <p className="font-display text-6xl text-clay-400">404</p>
      <h1 className="mt-4 font-display text-2xl text-ink-900">This piece isn't on our shelf</h1>
      <p className="mt-3 text-ink-500">The page you're looking for doesn't exist.</p>
      <Link href="/" className="mt-8 rounded-full bg-ink-900 px-8 py-3 text-sm uppercase tracking-widest text-white transition hover:bg-clay-600">
        Back to Home
      </Link>
    </div>
  );
}
