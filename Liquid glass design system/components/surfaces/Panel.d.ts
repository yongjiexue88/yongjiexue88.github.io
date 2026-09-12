import * as React from 'react';

/**
 * A large glass region: sidebars, sheets of settings, content wells. Uses the
 * panel displacement field, which bends gently enough not to smear text.
 *
 * @startingPoint section="Surfaces" subtitle="Large glass region for content" viewport="700x240"
 */
export interface PanelProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children?: React.ReactNode;
  /** Default 'glass'. 'solid' for dense or nested content. */
  variant?: 'glass' | 'solid';
  /** Default 28. */
  cornerRadius?: number;
  /** Default '28px'. */
  padding?: string;
  overLight?: boolean;
  /** Default 0.35 — frostier than a Button, so text over it stays legible. */
  blurAmount?: number;
  /** Default 150. */
  saturation?: number;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export declare function Panel(props: PanelProps): JSX.Element;
