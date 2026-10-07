"use client";

import { useState, type ReactElement } from "react";
import { Menu } from "lucide-react";
import { Button } from "@healthalyst/ui/components/button";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@healthalyst/ui/components/sheet";

export function MarketingNavigation({
  brand,
  navigationLinks,
  contactAction,
  partnershipAction,
}: {
  brand: ReactElement;
  navigationLinks: readonly { label: string; destination: string }[];
  contactAction: ReactElement;
  partnershipAction: ReactElement;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b bg-card text-primary">
      <a
        href="#main-content"
        className="sr-only fixed left-5 top-5 z-50 rounded-md bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <MarketingContainer className="flex min-h-20 items-center justify-between gap-4">
        {brand}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-6 xl:flex"
        >
          {navigationLinks.map((link) => (
            <Button
              asChild
              key={link.destination}
              variant="link"
              className="min-h-11 px-0 text-sm font-medium"
            >
              <a href={link.destination}>{link.label}</a>
            </Button>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <Button asChild variant="link">
            {contactAction}
          </Button>
          <Button asChild size="large" className="rounded-full">
            {partnershipAction}
          </Button>
        </div>
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="size-11 xl:hidden"
              aria-label="Open navigation"
            >
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex w-[min(100%,400px)] flex-col gap-8 overflow-y-auto bg-background px-6 py-10">
            <SheetHeader>
              <SheetTitle>Navigation</SheetTitle>
              <SheetDescription className="sr-only">
                Choose a section of the website.
              </SheetDescription>
            </SheetHeader>
            <nav aria-label="Mobile navigation" className="flex flex-col gap-2">
              {navigationLinks.map((link) => (
                <Button
                  asChild
                  key={link.destination}
                  variant="ghost"
                  className="min-h-12 justify-start px-0 text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  <a href={link.destination}>{link.label}</a>
                </Button>
              ))}
            </nav>
            <div className="flex flex-col gap-3">
              <Button
                asChild
                variant="outline"
                className="min-h-12"
                onClick={() => setMenuOpen(false)}
              >
                {contactAction}
              </Button>
              <Button
                asChild
                className="min-h-12"
                onClick={() => setMenuOpen(false)}
              >
                {partnershipAction}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </MarketingContainer>
    </header>
  );
}
