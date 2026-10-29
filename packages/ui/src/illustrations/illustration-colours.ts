/**
 * Theme colours for the GitLab-style illustrations, so artwork follows each
 * application's palette instead of carrying fixed brand colours.
 */
export const ILLUSTRATION_COLOURS = {
  stroke: "hsl(var(--foreground))",
  /** The background disc; containers can override `--illustration-base`. */
  base: "var(--illustration-base, hsl(var(--secondary)))",
  surface: "hsl(var(--card))",
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  accentSubtle: "color-mix(in srgb, hsl(var(--accent)) 35%, hsl(var(--card)))",
  /** Pale strokes for secondary detail, such as rows and small marks. */
  detail: "color-mix(in srgb, hsl(var(--primary)) 35%, hsl(var(--card)))",
} as const;

/*
 * GitLab's line style: fills are whole shapes without strokes, and outlines
 * are drawn over them as open paths that stop a few units short of closing,
 * usually on a straight edge near a corner. Circles become arcs with a small
 * gap, and a loose arc often floats beside the object.
 */

export const ILLUSTRATION_STROKE = {
  stroke: ILLUSTRATION_COLOURS.stroke,
  strokeWidth: 2,
  strokeLinecap: "square",
} as const;

/** Pale strokes for secondary detail. */
export const ILLUSTRATION_DETAIL_STROKE = {
  stroke: ILLUSTRATION_COLOURS.detail,
  strokeWidth: 2,
  strokeLinecap: "square",
} as const;

/** Strokes drawn over a brand-colour fill. */
export const ILLUSTRATION_SURFACE_STROKE = {
  stroke: ILLUSTRATION_COLOURS.surface,
  strokeWidth: 2,
  strokeLinecap: "round",
} as const;

/*
 * Drawn in the style of GitLab SVGs (https://gitlab.com/gitlab-org/gitlab-svgs);
 * the equipment supply illustration is adapted from its artwork.
 *
 * Copyright (c) 2011-present GitLab Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
