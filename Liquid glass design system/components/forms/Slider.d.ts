import * as React from 'react';

/**
 * Track, fill, and a glass knob. Drag or arrow-key it.
 *
 * @startingPoint section="Forms" subtitle="Range control with glass knob" viewport="700x150"
 */
export interface SliderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Default 50. */
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number) => void;
  label?: string;
  /** Right-aligned readout, e.g. "72%" or "3:14". */
  displayValue?: React.ReactNode;
  disabled?: boolean;
  style?: React.CSSProperties;
}

export declare function Slider(props: SliderProps): JSX.Element;
