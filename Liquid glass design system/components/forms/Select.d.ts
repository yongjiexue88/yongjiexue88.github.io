import * as React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

/**
 * A native <select> under glass, so keyboard handling and mobile pickers still work.
 *
 * @startingPoint section="Forms" subtitle="Native picker in a glass shell" viewport="700x170"
 */
export interface SelectProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  /** Strings or { value, label } objects. */
  options?: Array<SelectOption | string>;
  label?: string;
  hint?: string;
  /** Disabled first option shown when `value` is empty. */
  placeholder?: string;
  variant?: 'glass' | 'solid';
  disabled?: boolean;
  overLight?: boolean;
  /** Default true. */
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export declare function Select(props: SelectProps): JSX.Element;
