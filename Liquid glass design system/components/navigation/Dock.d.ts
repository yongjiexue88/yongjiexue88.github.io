import * as React from 'react';

export interface DockItem {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  /** Set false to show the icon alone. Default true. */
  showLabel?: boolean;
}

/**
 * A floating glass bar of destinations — bottom on mobile, top on the web.
 * This is the component the whole effect exists for.
 *
 * @startingPoint section="Navigation" subtitle="Floating elastic nav bar" viewport="700x160"
 */
export interface DockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  items?: DockItem[];
  /** `value` of the active item. */
  value?: string;
  onChange?: (value: string) => void;
  overLight?: boolean;
  /** 'fixed' pins it to the bottom of the viewport. Default 'static'. */
  position?: 'static' | 'fixed';
  /** Pointer elasticity. Default 0.2. Above ~0.5 reads as a bug. */
  elasticity?: number;
  style?: React.CSSProperties;
}

export declare function Dock(props: DockProps): JSX.Element;
