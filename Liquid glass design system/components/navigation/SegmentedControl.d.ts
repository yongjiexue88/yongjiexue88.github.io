import * as React from 'react';

export interface SegmentOption {
  value: string;
  label?: React.ReactNode;
}

/**
 * A glass trough with a sliding lens over the active option. The lens is
 * measured from the real button rect, so it tracks any label width.
 *
 * @startingPoint section="Navigation" subtitle="Sliding-lens option group" viewport="700x140"
 */
export interface SegmentedControlProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Strings or { value, label } objects. */
  options?: Array<SegmentOption | string>;
  value?: string;
  onChange?: (value: string) => void;
  variant?: 'glass' | 'solid';
  size?: 'sm' | 'md';
  overLight?: boolean;
  /** Stretch segments to fill the container. */
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export declare function SegmentedControl(props: SegmentedControlProps): JSX.Element;
