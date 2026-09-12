import * as React from 'react';

/**
 * One of a set. Same metrics as Checkbox, circular, with an inner dot.
 *
 * @startingPoint section="Forms" subtitle="Radio group member" viewport="700x150"
 */
export interface RadioProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: React.ReactNode;
  description?: string;
  /** Shared group name — required for keyboard arrow navigation. */
  name?: string;
  value?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Radio(props: RadioProps): JSX.Element;
