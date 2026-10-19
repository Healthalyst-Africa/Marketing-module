"use client";

import {
  cloneElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { MenuIcon } from "@healthalyst/icons";
import { ActionButton } from "@healthalyst/ui/components/action-button";
import { ActionLink } from "@healthalyst/ui/components/action-link";
import { MarketingContainer } from "@healthalyst/ui/components/marketing-section";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@healthalyst/ui/components/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@healthalyst/ui/components/sheet";
import { cn } from "@healthalyst/ui/lib/utilities";

/** A destination in the header's dropdown, shown with a one-line description. */
export interface MarketingMenuItem {
  title: string;
  description: string;
  /** A link element without children; the menu supplies the visible content. */
  link: ReactElement<{ children?: ReactNode; className?: string }>;
}

export interface MarketingMenu {
  label: string;
  items: readonly MarketingMenuItem[];
  /** Optional closing prompt and link shown beneath the items. */
  footer?: { prompt: string; link: ReactElement };
}

/**
 * `brand` starts in the primary colour so the header reads as part of a
 * brand-coloured page header beneath it, then turns into the light header
 * once the visitor scrolls. `default` is always light.
 */
export type MarketingNavigationTone = "default" | "brand";

/** Pixels scrolled before a brand-toned header switches to its light state. */
const SCROLL_THRESHOLD = 8;

function useHasScrolled(): boolean {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () =>
      setHasScrolled(window.scrollY > SCROLL_THRESHOLD);

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return hasScrolled;
}

export function MarketingNavigation({
  brand,
  menu,
  navigationLinks,
  contactAction,
  tone = "default",
}: {
  brand: ReactElement;
  menu: MarketingMenu;
  /** Plain links after the dropdown; mark the current page with `aria-current="page"`. */
  navigationLinks: readonly { label: string; link: ReactElement }[];
  contactAction: ReactElement;
  tone?: MarketingNavigationTone;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const hasScrolled = useHasScrolled();
  const isInverse = tone === "brand" && !hasScrolled;
  const barTone = isInverse ? "inverse" : "default";

  return (
    <header
      data-inverse={isInverse ? "" : undefined}
      className={cn(
        "group/header sticky top-0 z-40 transition-colors duration-200 motion-reduce:transition-none",
        isInverse
          ? "bg-primary text-primary-foreground"
          : "bg-card text-foreground"
      )}
    >
      <a
        href="#main-content"
        className="sr-only fixed left-5 top-5 z-50 rounded-md bg-primary px-5 py-3 text-primary-foreground focus:not-sr-only"
      >
        Skip to content
      </a>
      <MarketingContainer className="flex h-16 items-center justify-between gap-6 md:h-[72px]">
        {brand}
        <NavigationMenu
          aria-label="Main navigation"
          className="hidden flex-none lg:flex"
          delayDuration={150}
        >
          <NavigationMenuList className="gap-1 space-x-0">
            <NavigationMenuItem>
              <NavigationMenuTrigger tone={barTone}>
                {menu.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[min(720px,calc(100vw-80px))] p-3">
                  <ul className="grid grid-cols-2 gap-1">
                    {menu.items.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink
                          asChild
                          className="block rounded-lg px-4 py-3 text-foreground transition-colors duration-150 hover:bg-secondary focus:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                        >
                          {cloneElement(item.link, {
                            children: (
                              <>
                                <span className="block text-[15px] font-semibold leading-snug text-primary">
                                  {item.title}
                                </span>
                                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                                  {item.description}
                                </span>
                              </>
                            ),
                          })}
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                  {menu.footer && (
                    <p className="mt-2 px-4 pb-1 pt-3 text-sm text-muted-foreground">
                      {menu.footer.prompt}{" "}
                      <NavigationMenuLink
                        asChild
                        className="rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        {menu.footer.link}
                      </NavigationMenuLink>
                    </p>
                  )}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {navigationLinks.map((navigationLink) => (
              <NavigationMenuItem key={navigationLink.label}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle({ tone: barTone })}
                >
                  {navigationLink.link}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <ActionLink
            variant={isInverse ? "inverse" : "default"}
            size="large"
            shape="pill"
            className="hidden sm:inline-flex"
          >
            {contactAction}
          </ActionLink>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <ActionButton
                type="button"
                variant={isInverse ? "inverseOutline" : "outline"}
                size="largeIcon"
                shape="pill"
                className="lg:hidden"
                aria-label="Open navigation"
              >
                <MenuIcon aria-hidden="true" />
              </ActionButton>
            </SheetTrigger>
            <SheetContent className="flex w-[min(100%,420px)] flex-col gap-8 overflow-y-auto bg-card px-6 py-10 text-foreground">
              <SheetHeader className="text-left">
                <SheetTitle className="text-lg">Menu</SheetTitle>
                <SheetDescription className="sr-only">
                  Choose a page or a solution.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col">
                <h2 className="pb-2 text-sm font-semibold text-muted-foreground">
                  {menu.label}
                </h2>
                <ul className="flex flex-col pb-4">
                  {menu.items.map((item) => (
                    <li key={item.title}>
                      {cloneElement(item.link, {
                        className:
                          "block rounded-lg px-3 py-3 -mx-3 transition-colors duration-150 hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                        children: (
                          <>
                            <span className="block text-base font-semibold text-primary">
                              {item.title}
                            </span>
                            <span className="block text-sm text-muted-foreground">
                              {item.description}
                            </span>
                          </>
                        ),
                        onClickCapture: () => setMenuOpen(false),
                      } as { className: string; children: ReactNode })}
                    </li>
                  ))}
                </ul>
                <ul className="flex flex-col pt-2">
                  {navigationLinks.map((navigationLink) => (
                    <li key={navigationLink.label}>
                      {cloneElement(
                        navigationLink.link as ReactElement<{
                          className?: string;
                        }>,
                        {
                          className:
                            "flex min-h-12 items-center rounded-lg px-3 -mx-3 text-base font-medium transition-colors duration-150 hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          onClickCapture: () => setMenuOpen(false),
                        } as { className: string }
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
              <ActionLink
                size="extraLarge"
                shape="pill"
                className="mt-auto shrink-0"
                onClick={() => setMenuOpen(false)}
              >
                {contactAction}
              </ActionLink>
            </SheetContent>
          </Sheet>
        </div>
      </MarketingContainer>
    </header>
  );
}
