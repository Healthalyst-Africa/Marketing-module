"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { LogoLink } from "~/components/layout/logo";
import { NAV_LINKS } from "~/data/site";
import { cn } from "~/lib/utils";
import { scrollTo } from "~/utils/scroll";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id: string) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-16 transition-all duration-300",
        scrolled
          ? "border-b border-sand bg-cream/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-5 md:px-10">
        <LogoLink />

        {/* Center nav */}
        <nav className="hidden items-center gap-9 tablet:flex">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className={cn(
                "border-none bg-transparent p-1 font-sans text-[13px] font-medium transition-colors",
                scrolled
                  ? "text-muted hover:text-forest"
                  : "text-white/55 hover:text-gold"
              )}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right CTAs */}
        <div className="hidden items-center gap-3 tablet:flex">
          <Button
            variant={scrolled ? "secondary" : "ghost"}
            size="compact"
            onClick={() => goTo("contact")}
          >
            Contact
          </Button>
          <Button
            variant={scrolled ? "primary" : "gold"}
            size="compact"
            onClick={() => goTo("contact")}
          >
            Partner With Us
          </Button>
        </div>

        {/* Hamburger */}
        <button
          className="flex flex-col gap-[5px] border-none bg-transparent p-1 tablet:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <X
              className="h-[22px] w-[22px] text-forest"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ) : (
            [0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block h-[1.5px] w-[22px] rounded-sm transition-colors",
                  scrolled ? "bg-ink" : "bg-white/80"
                )}
              />
            ))
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="border-b-2 border-forest bg-cream px-5 py-7 md:px-10">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className="block w-full border-t border-sand bg-transparent py-[13px] text-left font-sans text-[14px] font-medium text-forest"
            >
              {label}
            </button>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Button
              variant="secondary"
              className="w-full"
              onClick={() => goTo("contact")}
            >
              Contact
            </Button>
            <Button
              variant="primary"
              className="w-full"
              onClick={() => goTo("contact")}
            >
              Partner With Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
