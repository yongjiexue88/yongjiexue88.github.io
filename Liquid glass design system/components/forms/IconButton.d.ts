import * as React from 'react';

export type IconButtonVariant = 'glass' | 'solid' | 'accent' | 'ghost';
export type IconButtonSize = 'sm' | 'md' | 'lg' | 'xl';

/**
 * A circular Button: same variants, no label. 44px minimum for touch.
 *
 * @startingPoint section="Forms" subtitle="Circular glyph button, 4 sizes" viewport="700x150"
 */
export interface IconButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** The glyph. 18–24px SVG. */
  children?: React.ReactNode;
  variant?: IconButtonVariant;
  /** Default 'md' (44px). 'sm' is 36px — pointer-only UI. */
  size?: IconButtonSize;
  /** Accessible name. Required in practice — there is no visible label. */
  label?: string;
  disabled?: boolean;
  overLight?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function IconButton(props: IconButtonProps): JSX.Element;
