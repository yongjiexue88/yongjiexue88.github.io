import * as React from 'react';

/**
 * Indeterminate activity. Inherits currentColor; needs the `lg-spin`
 * keyframes from tokens/motion.css.
 *
 * @startingPoint section="Feedback" subtitle="Indeterminate activity ring" viewport="700x110"
 */
export interface SpinnerProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  /** Diameter in px. Default 20. */
  size?: number;
  /** Ring thickness in px. Default 2. */
  thickness?: number;
  /** Accessible name. Default 'Loading'. */
  label?: string;
  style?: React.CSSProperties;
}

export declare function Spinner(props: SpinnerProps): JSX.Element;
