import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-display text-4xl">Page not found.</h1>
      <p className="text-text-soft">This page was never typed.</p>
      <Link href="/" className="underline underline-offset-4">
        Back to the first page
      </Link>
    </main>
  );
}
