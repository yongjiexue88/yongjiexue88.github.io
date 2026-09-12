import * as React from 'react';

/**
 * A small glass label revealed on hover or focus. Wraps its own trigger.
 *
 * @startingPoint section="Feedback" subtitle="Glass label on hover" viewport="700x140"
 */
export interface TooltipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  /** The trigger. */
  children?: React.ReactNode;
  /** Tooltip text. Keep it under ~6 words — it never wraps. */
  content?: React.ReactNode;
  /** Default 'top'. */
  side?: 'top' | 'bottom' | 'left' | 'right';
  style?: React.CSSProperties;
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
