import * as React from 'react';

/**
 * The one control that always stays glassy: the knob is a lens, so it refracts
 * the track underneath it.
 *
 * @startingPoint section="Forms" subtitle="Glass-knob toggle, two sizes" viewport="700x150"
 */
export interface SwitchProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  /** Default 'md' (52×30). 'sm' is 40×24. */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function Switch(props: SwitchProps): JSX.Element;
