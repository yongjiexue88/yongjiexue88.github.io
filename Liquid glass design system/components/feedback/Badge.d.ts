import * as React from 'react';

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

/**
 * A status word: Draft, Published, 3 new. Non-interactive.
 *
 * @startingPoint section="Feedback" subtitle="Status pill, five tones" viewport="700x110"
 */
export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  children?: React.ReactNode;
  /** Default 'neutral'. */
  tone?: BadgeTone;
  /** Leading 6px dot in the tone colour — for live/offline style states. */
  dot?: boolean;
  style?: React.CSSProperties;
}

export declare function Badge(props: BadgeProps): JSX.Element;
