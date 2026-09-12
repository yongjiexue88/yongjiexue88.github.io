import * as React from 'react';

/**
 * A determinate bar: reading position, upload, export.
 *
 * @startingPoint section="Feedback" subtitle="Determinate bar, three heights" viewport="700x140"
 */
export interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Default 0. */
  value?: number;
  /** Default 100. */
  max?: number;
  label?: string;
  /** Right-aligned readout, e.g. "62%" or "page 148". */
  displayValue?: React.ReactNode;
  /** Track height: sm 4, md 6, lg 10. Default 'md'. */
  size?: 'sm' | 'md' | 'lg';
  /** 'inverse' is the white fill — use over colourful grounds. Default 'accent'. */
  tone?: 'accent' | 'inverse';
  style?: React.CSSProperties;
}

export declare function Progress(props: ProgressProps): JSX.Element;
