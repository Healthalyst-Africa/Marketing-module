"use client";

import {
  cloneElement,
  useEffect,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { ArrowRightIcon, MenuIcon } from "@healthalyst/icons";
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
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";

/** A destination in the header's dropdown, shown with a one-line description. */
export interface MarketingMenuItem {
  title: string;
  description: string;
  /** Optional icon, shown in a thin ring beside the title. */
  icon?: ReactNode;
  /** A link element without children; the menu supplies the visible content. */
  link: ReactElement<{ children?: ReactNode; className?: string }>;
}

/** A labelled column of destinations in the dropdown. */
export interface MarketingMenuGroup {
  label: string;
  items: readonly MarketingMenuItem[];
}

/**
 * The header's dropdown: a heading, labelled columns of destinations and an
 * optional feature beside them (a photograph, a sentence and a link).
 */
export interface MarketingMenu {
  label: string;
  heading?: string;
  groups: readonly MarketingMenuGroup[];
  feature?: {
    /** A photograph that fills its frame. */
    photograph: ReactNode;
    description: string;
    /** A link element whose text names where it goes. */
    link: ReactElement<{ className?: string; children?: ReactNode }>;
  };
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
      <MarketingContainer className="relative flex h-16 items-center justify-between gap-6 md:h-[72px]">
        {brand}
        <NavigationMenu
          aria-label="Main navigation"
          className="hidden flex-none lg:flex"
          delayDuration={150}
          viewportPlacement="container"
        >
          <NavigationMenuList className="gap-1 space-x-0">
            <NavigationMenuItem>
              <NavigationMenuTrigger tone={barTone}>
                {menu.label}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[min(1120px,calc(100vw-80px))] p-8">
                  {menu.heading && (
                    <p className="text-lg font-semibold tracking-[-0.01em] text-foreground">
                      {menu.heading}
                    </p>
                  )}
                  <div
                    className={cn(
                      "grid gap-x-10",
                      menu.heading && "mt-10",
                      menu.feature
                        ? "grid-cols-[repeat(3,minmax(0,1fr))_240px]"
                        : "grid-cols-3"
                    )}
                  >
                    {menu.groups.map((group) => (
                      <div key={group.label}>
                        <p className="px-3 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                          {group.label}
                        </p>
                        <ul className="mt-3 flex flex-col gap-1">
                          {group.items.map((item) => (
                            <li key={item.title}>
                              <NavigationMenuLink
                                asChild
                                className="flex items-start gap-4 rounded-[8px] px-3 py-3 text-foreground transition-colors duration-150 hover:bg-secondary focus:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:transition-none"
                              >
                                {cloneElement(item.link, {
                                  children: (
                                    <>
                                      {item.icon && (
                                        <MarketingIconBadge
                                          icon={item.icon}
                                          size="small"
                                        />
                                      )}
                                      <span className="flex flex-col">
                                        <span className="block text-[15px] font-semibold leading-snug text-foreground">
                                          {item.title}
                                        </span>
                                        <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                                          {item.description}
                                        </span>
                                      </span>
                                    </>
                                  ),
                                })}
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                    {menu.feature && (
                      <div>
                        <div
                          aria-hidden="true"
                          className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
                        >
                          {menu.feature.photograph}
                        </div>
                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                          {menu.feature.description}
                        </p>
                        <div className="mt-2">
                          <NavigationMenuLink
                            asChild
                            className="group/action inline-flex min-h-11 items-center gap-2 rounded-sm text-[15px] font-semibold text-foreground underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            {cloneElement(menu.feature.link, {
                              children: (
                                <>
                                  {menu.feature.link.props.children}
                                  <ArrowRightIcon
                                    aria-hidden="true"
                                    className="size-4 text-accent transition-transform duration-200 group-hover/action:translate-x-0.5 motion-reduce:transition-none"
                                  />
                                </>
                              ),
                            })}
                          </NavigationMenuLink>
                        </div>
                      </div>
                    )}
                  </div>
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
                <SheetTitle className="font-serif text-2xl font-normal tracking-[-0.01em]">
                  Menu
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Choose a page or a solution.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col">
                <h2 className="pb-2 text-sm font-semibold text-muted-foreground">
                  {menu.label}
                </h2>
                {menu.groups.map((group) => (
                  <div key={group.label} className="pb-4">
                    <h3 className="pt-2 text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                      {group.label}
                    </h3>
                    <ul className="flex flex-col">
                      {group.items.map((item) => (
                        <li key={item.title}>
                          {cloneElement(item.link, {
                            className:
                              "flex items-start gap-4 rounded-lg px-3 py-3 -mx-3 transition-colors duration-150 hover:bg-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            children: (
                              <>
                                {item.icon && (
                                  <MarketingIconBadge
                                    icon={item.icon}
                                    size="small"
                                  />
                                )}
                                <span className="flex flex-col">
                                  <span className="block text-[15px] font-semibold leading-snug text-foreground">
                                    {item.title}
                                  </span>
                                  <span className="mt-1 block text-[13px] leading-relaxed text-muted-foreground">
                                    {item.description}
                                  </span>
                                </span>
                              </>
                            ),
                            onClickCapture: () => setMenuOpen(false),
                          } as { className: string; children: ReactNode })}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
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
