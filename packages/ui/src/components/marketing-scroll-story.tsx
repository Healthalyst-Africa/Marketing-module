"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { MarketingIconBadge } from "@healthalyst/ui/components/marketing-icon-badge";

/** One chapter of the story: its text and the photograph shown with it. */
export interface MarketingStoryChapter {
  title: string;
  description: string;
  icon: ReactNode;
  /** A decorative photograph that fills its frame. */
  photograph: ReactNode;
}

/** Scroll distance, in viewport heights, that moves the story one chapter. */
const SCROLL_PER_CHAPTER_IN_VIEWPORT_HEIGHTS = 55;

/** Share of the pinned scroll held still at the start and at the end. */
const HOLD_AT_EACH_END = 0.08;

/**
 * Height of each chapter's slot in the text window. It fits the icon, title
 * and description, so a chapter only travels its own height to make way for
 * the next, not the photograph's.
 */
const CHAPTER_SLOT_HEIGHT_IN_PIXELS = 300;

/** Where, between two chapters, the next photograph starts to fade in. */
const PHOTOGRAPH_FADE_START = 0.4;

/** How much of the scroll between two chapters the photograph fade takes. */
const PHOTOGRAPH_FADE_LENGTH = 0.2;

/** How far the cross field behind the photograph drifts per chapter. */
const PATTERN_DRIFT_PER_CHAPTER_IN_PIXELS = 10;

/** Clamps a number between zero and one. */
function clampToUnit(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

/**
 * Share of the remaining distance the shown position closes each frame, so it
 * glides after the scroll instead of following each wheel step.
 */
const SMOOTHING_PER_FRAME = 0.14;

/**
 * A story section. On wide screens the section heading, a photograph and a
 * text window stay pinned while the section scrolls by. Inside the window
 * the chapters move up with the scroll, smoothed so wheel steps glide, in
 * short slots with the current one centred against the photograph; the window is clipped and
 * fades out well before its edges, so only the chapter passing the middle
 * is seen and the next arrives right behind it. The next chapter's
 * photograph fades in over the current one midway, in step with the scroll.
 * On phones and tablets the heading leads, each chapter shows its
 * photograph above it, and nothing is pinned.
 *
 * A faint field of the brand's medical crosses sits offset behind the
 * photograph's lower right corner, drifting slightly with the story, with a
 * few accent crosses at its upper left.
 *
 * Only the chapter at the centre is in full colour, its title in the accent;
 * chapters coming in and going out are grey, mixing smoothly with the
 * scroll.
 *
 * Every chapter's text stays in the page, in order, for assistive
 * technology; the photographs are decorative. All movement follows the
 * reader's own scrolling, so nothing moves on its own; under reduced motion
 * it follows without smoothing.
 */
export function MarketingScrollStory({
  headingIdentifier,
  heading,
  introduction,
  chapters,
}: {
  /** Identifier of the section heading, for the section's `aria-labelledby`. */
  headingIdentifier: string;
  heading: ReactNode;
  introduction?: ReactNode;
  chapters: readonly MarketingStoryChapter[];
}) {
  const trackReference = useRef<HTMLDivElement>(null);
  const stageReference = useRef<HTMLDivElement>(null);
  const textColumnReference = useRef<HTMLDivElement>(null);
  const photographReferences = useRef<(HTMLDivElement | null)[]>([]);
  const chapterSlotReferences = useRef<(HTMLDivElement | null)[]>([]);
  const patternReference = useRef<SVGSVGElement>(null);
  const patternIdentifier = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [activeIndex, setActiveIndex] = useState(0);
  const lastChapterIndex = chapters.length - 1;

  useEffect(() => {
    let animationFrame = 0;
    let shownPosition: number | undefined;
    let shownIndex = 0;
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    /** The chapter position, from 0 to the last index, that the scroll asks for. */
    const targetPosition = () => {
      const track = trackReference.current;
      const stage = stageReference.current;

      if (!track || !stage || stage.offsetHeight === 0) {
        return undefined;
      }

      /* The stage pins below the header, so progress starts there. */
      const pinnedTop = parseFloat(getComputedStyle(stage).top) || 0;
      const scrollable = track.offsetHeight - stage.offsetHeight;
      const rawProgress =
        scrollable > 0
          ? clampToUnit(
              (pinnedTop - track.getBoundingClientRect().top) / scrollable
            )
          : 0;

      return (
        clampToUnit(
          (rawProgress - HOLD_AT_EACH_END) / (1 - 2 * HOLD_AT_EACH_END)
        ) * lastChapterIndex
      );
    };

    const render = (position: number) => {
      const textColumn = textColumnReference.current;

      if (!textColumn) {
        return;
      }

      const windowHeight = textColumn.parentElement?.offsetHeight ?? 0;
      const offset =
        windowHeight / 2 -
        CHAPTER_SLOT_HEIGHT_IN_PIXELS / 2 -
        position * CHAPTER_SLOT_HEIGHT_IN_PIXELS;

      textColumn.style.transform = `translate3d(0, ${offset}px, 0)`;
      /*
       * Later photographs sit above earlier ones; each fades in over the one
       * below it in the middle of the scroll between two chapters, so two are
       * never blended for long.
       */
      photographReferences.current.forEach((photograph, photographIndex) => {
        if (photograph) {
          photograph.style.opacity =
            photographIndex === 0
              ? "1"
              : String(
                  clampToUnit(
                    (position - (photographIndex - 1) - PHOTOGRAPH_FADE_START) /
                      PHOTOGRAPH_FADE_LENGTH
                  )
                );
        }
      });

      /*
       * Focus runs from 1 for the chapter at the centre to 0 half a chapter
       * away; the slot's colours mix from grey towards full colour with it.
       */
      chapterSlotReferences.current.forEach((slot, slotIndex) => {
        slot?.style.setProperty(
          "--story-focus",
          String(clampToUnit(1 - Math.abs(position - slotIndex) * 2))
        );
      });

      /* The cross field drifts a little with the story, for depth. */
      if (patternReference.current && !reducedMotionQuery.matches) {
        patternReference.current.style.transform = `translate3d(0, ${
          -position * PATTERN_DRIFT_PER_CHAPTER_IN_PIXELS
        }px, 0)`;
      }

      const nearestIndex = Math.round(position);

      if (nearestIndex !== shownIndex) {
        shownIndex = nearestIndex;
        setActiveIndex(nearestIndex);
      }
    };

    const step = () => {
      const target = targetPosition();

      if (target === undefined) {
        return;
      }

      const distance = target - (shownPosition ?? target);
      shownPosition =
        shownPosition === undefined ||
        reducedMotionQuery.matches ||
        Math.abs(distance) < 0.001
          ? target
          : shownPosition + distance * SMOOTHING_PER_FRAME;
      render(shownPosition);

      if (shownPosition !== target) {
        animationFrame = requestAnimationFrame(step);
      }
    };

    const scheduleStep = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(step);
    };

    step();
    window.addEventListener("scroll", scheduleStep, { passive: true });
    window.addEventListener("resize", scheduleStep);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", scheduleStep);
      window.removeEventListener("resize", scheduleStep);
    };
  }, [lastChapterIndex]);

  const sectionOpening = (
    <div className="mx-auto max-w-[68ch] text-center">
      <h2
        id={headingIdentifier}
        className="text-balance text-[28px] font-serif font-normal leading-[1.15] tracking-[-0.01em] text-foreground md:text-[40px]"
      >
        {heading}
      </h2>
      {introduction && (
        <div className="text-base leading-relaxed [&_p]:font-normal text-muted-foreground md:text-[17px]">
          {introduction}
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={trackReference}
      className="lg:h-[var(--story-height)]"
      style={
        {
          "--story-height": `calc(100vh + ${lastChapterIndex * SCROLL_PER_CHAPTER_IN_VIEWPORT_HEIGHTS + 30}vh)`,
        } as CSSProperties
      }
    >
      <div
        ref={stageReference}
        className="lg:sticky lg:top-[72px] lg:flex lg:h-[calc(100vh-72px)] lg:flex-col lg:pb-10 lg:pt-10"
      >
        {sectionOpening}

        <ol className="mt-10 flex flex-col gap-14 lg:hidden">
          {chapters.map((chapter) => (
            <li key={chapter.title}>
              <div
                aria-hidden="true"
                className="relative mb-6 aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
              >
                {chapter.photograph}
              </div>
              <MarketingIconBadge icon={chapter.icon} />
              <h3 className="mt-5 text-balance text-2xl font-serif font-normal leading-[1.15] tracking-[-0.01em] text-foreground">
                {chapter.title}
              </h3>
              <p className="mt-3 text-base font-normal leading-relaxed text-muted-foreground">
                {chapter.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-10 hidden grid-cols-12 gap-x-12 lg:grid lg:min-h-0 lg:flex-1 xl:gap-x-16">
          <div aria-hidden="true" className="col-span-5 flex items-center">
            <div className="relative h-full max-h-[520px] w-full">
              <svg
                ref={patternReference}
                focusable="false"
                className="pointer-events-none absolute -bottom-10 -right-10 h-3/4 w-3/4 text-primary will-change-transform [mask-image:radial-gradient(circle_at_100%_100%,black,transparent_75%)]"
              >
                <defs>
                  <pattern
                    id={`${patternIdentifier}-crosses`}
                    width="22"
                    height="22"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M11 7v8M7 11h8"
                      stroke="currentColor"
                      strokeOpacity="0.32"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </pattern>
                </defs>
                <rect
                  width="100%"
                  height="100%"
                  fill={`url(#${patternIdentifier}-crosses)`}
                />
              </svg>
              <svg
                focusable="false"
                viewBox="0 0 66 44"
                className="pointer-events-none absolute -left-5 -top-5 w-16 text-accent"
              >
                <path
                  d="M11 5v12M5 11h12M33 5v12M27 11h12M55 5v12M49 11h12M33 27v12M27 33h12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <div className="relative h-full overflow-hidden rounded-2xl bg-muted shadow-[0_2px_4px_rgba(15,23,20,0.06),0_16px_40px_rgba(15,23,20,0.12)]">
                {chapters.map((chapter, chapterIndex) => (
                  <div
                    key={chapter.title}
                    ref={(element) => {
                      photographReferences.current[chapterIndex] = element;
                    }}
                    className="absolute inset-0"
                    style={{ opacity: chapterIndex === 0 ? 1 : 0 }}
                  >
                    {chapter.photograph}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative col-span-6 col-start-7 h-full max-h-[520px] self-center overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_5%,black_22%,black_78%,transparent_95%)]">
            <div ref={textColumnReference} className="will-change-transform">
              {chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapter.title}
                  ref={(element) => {
                    chapterSlotReferences.current[chapterIndex] = element;
                  }}
                  className="flex flex-col justify-center"
                  style={
                    {
                      height: CHAPTER_SLOT_HEIGHT_IN_PIXELS,
                      "--story-focus": chapterIndex === 0 ? 1 : 0,
                    } as CSSProperties
                  }
                >
                  <div className="[filter:grayscale(calc(1-var(--story-focus)))] [opacity:calc(0.45+0.55*var(--story-focus))]">
                    <MarketingIconBadge
                      icon={chapter.icon}
                      tone={chapterIndex === activeIndex ? "accent" : "primary"}
                    />
                  </div>
                  <h3 className="mt-5 max-w-[20ch] text-balance text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] [color:color-mix(in_oklab,hsl(var(--accent))_calc(var(--story-focus)*100%),hsl(var(--muted-foreground)/0.45))]">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 max-w-[46ch] text-[17px] font-normal leading-relaxed [color:color-mix(in_oklab,hsl(var(--muted-foreground))_calc(var(--story-focus)*100%),hsl(var(--muted-foreground)/0.4))]">
                    {chapter.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
