import * as React from 'react';

/**
 * A removable or selectable keyword — topics, filters, formats.
 *
 * @startingPoint section="Feedback" subtitle="Selectable / removable chip" viewport="700x110"
 */
export interface TagProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'style'> {
  children?: React.ReactNode;
  /** Inverts the chip. Use for active filters. */
  selected?: boolean;
  /** Adds a × button. Its click does not bubble to onClick. */
  onRemove?: (e: React.MouseEvent) => void;
  onClick?: (e: React.MouseEvent) => void;
  style?: React.CSSProperties;
}

export declare function Tag(props: TagProps): JSX.Element;
