import * as React from 'react';

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Trail of links with a thin slash separator. The last item is the current
 * page and is not clickable.
 *
 * @startingPoint section="Navigation" subtitle="Slash-separated path trail" viewport="700x100"
 */
export interface BreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  items?: Crumb[];
  /** Receives `item.href` if set, otherwise `item.label`. Not called for the last item. */
  onNavigate?: (target: string) => void;
  style?: React.CSSProperties;
}

export declare function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
