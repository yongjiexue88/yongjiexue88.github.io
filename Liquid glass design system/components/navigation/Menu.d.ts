import * as React from 'react';

export interface MenuItem {
  label?: string;
  value?: string;
  icon?: React.ReactNode;
  /** Right-aligned shortcut, rendered in mono. */
  shortcut?: string;
  /** 'danger' paints the row red. */
  tone?: 'default' | 'danger';
  disabled?: boolean;
  /** Renders a hairline instead of a row. */
  divider?: boolean;
}

/**
 * A glass list of actions. Pair with IconButton for an overflow menu.
 *
 * @startingPoint section="Navigation" subtitle="Action list with shortcuts and dividers" viewport="700x260"
 */
export interface MenuProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  items?: MenuItem[];
  /** Receives `item.value` if set, otherwise `item.label`. */
  onSelect?: (value: string) => void;
  overLight?: boolean;
  /** Default 240. */
  width?: number | string;
  style?: React.CSSProperties;
}

export declare function Menu(props: MenuProps): JSX.Element;
