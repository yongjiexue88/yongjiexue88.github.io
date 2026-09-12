import * as React from 'react';

export type ToastTone = 'neutral' | 'success' | 'warning' | 'danger';

/**
 * A floating glass confirmation. Bottom-centre, one at a time.
 *
 * @startingPoint section="Feedback" subtitle="Floating glass confirmation" viewport="700x150"
 */
export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  /** Supporting line under the title. */
  children?: React.ReactNode;
  title?: React.ReactNode;
  /** Tints the icon only. Default 'neutral'. */
  tone?: ToastTone;
  icon?: React.ReactNode;
  /** Trailing control — usually a ghost Button ("Undo"). */
  action?: React.ReactNode;
  onClose?: () => void;
  /** 'fixed' pins it bottom-centre of the viewport. Default 'static'. */
  position?: 'static' | 'fixed';
  style?: React.CSSProperties;
}

export declare function Toast(props: ToastProps): JSX.Element;
