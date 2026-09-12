import * as React from 'react';

/**
 * A bounded unit of content: media slot, eyebrow, title, body, footer.
 * Passing onClick makes it lift and brighten on hover.
 *
 * @startingPoint section="Surfaces" subtitle="Content card with media and metadata" viewport="700x300"
 */
export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Free-form body, rendered after description. */
  children?: React.ReactNode;
  /** Media slot — usually an ImagePlaceholder or an <img>. Clipped to the radius. */
  media?: React.ReactNode;
  /** Uppercase micro-label above the title. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'glass' | 'solid';
  /** Default 24. */
  cornerRadius?: number;
  /** Default '24px'. */
  padding?: string;
  overLight?: boolean;
  /** Presence of onClick turns on the hover lift and pointer cursor. */
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function Card(props: CardProps): JSX.Element;
