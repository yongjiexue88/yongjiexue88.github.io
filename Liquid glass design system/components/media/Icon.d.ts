import * as React from 'react';

/**
 * A Lucide glyph, sized and coloured from the current text context.
 * The consuming page must load Lucide from CDN; nothing renders without it.
 */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide kebab-case name, e.g. 'book-open', 'play', 'settings'. */
  name: string;
  /** Box size in px. Default 20. */
  size?: number;
  /** Default 1.75 — slightly lighter than Lucide's default 2. */
  strokeWidth?: number;
  /** Accessible name. Omit for decorative glyphs (the default: aria-hidden). */
  label?: string;
  style?: React.CSSProperties;
}

export declare function Icon(props: IconProps): JSX.Element;
