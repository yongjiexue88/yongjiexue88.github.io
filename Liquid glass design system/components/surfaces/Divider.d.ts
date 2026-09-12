import * as React from 'react';

/**
 * A hairline. Label optional, centred.
 *
 * @startingPoint section="Surfaces" subtitle="Hairline rule, optional label" viewport="700x120"
 */
export interface DividerProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Centres a small label in the rule — e.g. "or". */
  label?: React.ReactNode;
  /** Stretches to the parent's cross axis instead. */
  vertical?: boolean;
  style?: React.CSSProperties;
}

export declare function Divider(props: DividerProps): JSX.Element;
