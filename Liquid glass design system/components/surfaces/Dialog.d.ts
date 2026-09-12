import * as React from 'react';

/**
 * Scrim plus a centred glass plate. Everything behind it blurs, which is the
 * one place the effect is doing real work: it separates layers.
 *
 * @startingPoint section="Surfaces" subtitle="Modal plate over a blurring scrim" viewport="700x320"
 */
export interface DialogProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children?: React.ReactNode;
  /** Default true. Renders nothing when false. */
  open?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Action row, right-aligned. */
  footer?: React.ReactNode;
  /** Called by the scrim click and the close button. */
  onClose?: () => void;
  overLight?: boolean;
  /** Default 460. */
  width?: number | string;
  style?: React.CSSProperties;
}

export declare function Dialog(props: DialogProps): JSX.Element;
