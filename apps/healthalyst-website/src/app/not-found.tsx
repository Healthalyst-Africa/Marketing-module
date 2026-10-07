import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-forest px-6 text-center">
      <p className="font-sans text-[11px] tracking-[0.2em] text-gold">404</p>
      <h1 className="mt-4 font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-tight text-white">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-[15px] font-light leading-[1.8] text-white/65">
        The page you are looking for doesn&rsquo;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-[2px] bg-gold px-8 py-[14px] text-[13px] font-semibold tracking-[0.08em] text-ink transition-all hover:bg-gold-light"
      >
        Back to Home →
      </Link>
    </main>
  );
}
