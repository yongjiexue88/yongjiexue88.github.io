import * as React from 'react';

export type ButtonVariant = 'glass' | 'solid' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

/**
 * The pill. Glass by default; solid, accent and ghost cover the cases where
 * refraction would be wrong — dense forms, tables, anything on a flat fill.
 *
 * @startingPoint section="Forms" subtitle="Glass pill, plus solid / accent / ghost" viewport="700x150"
 */
export interface ButtonProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children?: React.ReactNode;
  /** Default 'glass'. */
  variant?: ButtonVariant;
  /** Default 'md'. sm 7/14, md 11/20, lg 15/28 padding. */
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  disabled?: boolean;
  /** Glass variant only: light-ground treatment. */
  overLight?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function Button(props: ButtonProps): JSX.Element;
