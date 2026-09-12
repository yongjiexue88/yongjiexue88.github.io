import * as React from 'react';

/**
 * A 20px rounded square. Fills with the accent when checked.
 *
 * @startingPoint section="Forms" subtitle="Checkbox with label and description" viewport="700x150"
 */
export interface CheckboxProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  /** Secondary line under the label. */
  description?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
