import * as React from 'react';

export interface TabItem {
  value: string;
  label?: string;
  icon?: React.ReactNode;
  /** Trailing count, rendered in mono. */
  count?: number;
}

/**
 * Underlined navigation for switching views inside a panel. Flat, not glass —
 * glass tabs inside a glass panel cancel each other out.
 *
 * @startingPoint section="Navigation" subtitle="Underlined view switcher with counts" viewport="700x130"
 */
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Strings or { value, label, icon, count } objects. */
  tabs?: Array<TabItem | string>;
  value?: string;
  onChange?: (value: string) => void;
  /** Default 'md'. */
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

export declare function Tabs(props: TabsProps): JSX.Element;
