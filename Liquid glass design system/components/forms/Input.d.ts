import * as React from 'react';

export type FieldVariant = 'glass' | 'solid';

/**
 * Single-line text field. Glass by default; the solid variant is the right call
 * inside a panel that is already glass — glass on glass reads as mud.
 *
 * @startingPoint section="Forms" subtitle="Text field with label, hint and error" viewport="700x180"
 */
export interface InputProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
  /** Helper text under the field. Hidden while `error` is set. */
  hint?: string;
  /** Error message. Turns the ring and the message red. */
  error?: string;
  type?: string;
  /** Default 'glass'. Use 'solid' inside a Panel or Dialog. */
  variant?: FieldVariant;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  overLight?: boolean;
  /** Default true. */
  fullWidth?: boolean;
  style?: React.CSSProperties;
  /** Styles for the inner <input> element. */
  inputStyle?: React.CSSProperties;
}

export declare function Input(props: InputProps): JSX.Element;
