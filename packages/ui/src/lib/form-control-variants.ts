import { cva as createClassVariants } from "class-variance-authority";

/**
 * Surface, hover, focus, rejected and disabled states shared by the text
 * input, text area and select trigger primitives, so every form control looks
 * and responds the same way. Colours come from the semantic theme tokens. The
 * 6 px corner radius is set here rather than from the theme radius, which
 * applications may keep small for other elements. Borders draw the control
 * outline at 35% so fields stay quiet, and at full strength on hover;
 * placeholders are 14 px in the secondary text colour at 60%.
 */
export const FORM_CONTROL_CLASS_NAME =
  "w-full min-w-0 rounded-[6px] border border-input/35 bg-card px-3 text-base text-foreground shadow-none transition-colors duration-150 placeholder:text-sm placeholder:text-muted-foreground/60 hover:border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-invalid:border-destructive disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none";

/** Single-line control heights. `large` suits spacious forms on public pages. */
export const formControlVariants = createClassVariants(
  FORM_CONTROL_CLASS_NAME,
  {
    variants: {
      controlSize: {
        small: "h-9",
        default: "h-11",
        large: "h-12",
      },
    },
    defaultVariants: {
      controlSize: "default",
    },
  }
);
