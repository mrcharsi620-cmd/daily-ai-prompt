import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid place-items-center px-6 py-24 text-center">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">404</p>
        <h1 className="mt-3 text-4xl font-bold text-slate-950">Page not found</h1>
        <p className="mt-3 text-slate-600">The page you are looking for does not exist or was moved.</p>
        <Link href="/" className="mt-6 inline-block rounded-lg bg-slate-900 px-5 py-2.5 text-white hover:bg-slate-700">
          Back to home
        </Link>
      </div>
    </main>
  );
}
