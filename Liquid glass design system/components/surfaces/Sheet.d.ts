import * as React from 'react';

/**
 * An edge-anchored glass surface: mobile bottom sheet, desktop side rail.
 *
 * @startingPoint section="Surfaces" subtitle="Edge-anchored panel, 4 sides" viewport="700x320"
 */
export interface SheetProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children?: React.ReactNode;
  /** Default true. */
  open?: boolean;
  /** Default 'bottom'. */
  side?: 'bottom' | 'top' | 'left' | 'right';
  overLight?: boolean;
  onClose?: () => void;
  /** Left/right only. Default 380. */
  width?: number | string;
  /** Top/bottom only. Default 'auto'. */
  height?: number | string;
  style?: React.CSSProperties;
}

export declare function Sheet(props: SheetProps): JSX.Element;
