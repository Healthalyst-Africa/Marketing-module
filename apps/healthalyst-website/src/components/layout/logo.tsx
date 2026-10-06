import Image from "next/image";
import Link from "next/link";
import { cn } from "~/lib/utilities";
import { scrollToTop } from "~/utilities/scroll";

type MarkSize = "small" | "medium";

const BOX_SIZES: Record<MarkSize, string> = {
  small: "h-8 w-8 rounded-[5px]",
  medium: "h-[38px] w-[38px] rounded-md",
};

/**
 * Healthalyst Africa wordmark: logo mark plus the stacked
 * HEALTHALYST / AFRICA lockup.
 */
export function LogoMark({
  className,
  size = "medium",
  nameClassName,
  subtitleClassName,
}: {
  className?: string;
  size?: MarkSize;
  nameClassName?: string;
  subtitleClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative block shrink-0 overflow-hidden border border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.15)]",
          BOX_SIZES[size]
        )}
      >
        <Image
          src="/logo.svg"
          alt="Healthalyst Africa"
          fill
          sizes="38px"
          className="object-cover"
          priority
        />
      </span>
      <span className="flex flex-col gap-0.5">
        <span
          className={cn(
            "font-serif text-[16px] font-bold leading-none tracking-[0.08em] text-gold",
            nameClassName
          )}
        >
          HEALTHALYST
        </span>
        <span
          className={cn(
            "font-mono text-[8.5px] leading-none tracking-[0.32em] text-gold",
            subtitleClassName
          )}
        >
          AFRICA
        </span>
      </span>
    </span>
  );
}

/** Clickable logo that returns to the top of the home page. */
export function LogoLink({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      onClick={scrollToTop}
      aria-label="Healthalyst Africa — scroll to top"
      className={cn(
        "rounded-[2px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
        className
      )}
    >
      <LogoMark />
    </Link>
  );
}
