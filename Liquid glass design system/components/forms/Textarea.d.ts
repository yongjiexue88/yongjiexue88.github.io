import * as React from 'react';

/**
 * Input's multi-line sibling. Same variants, same focus ring.
 *
 * @startingPoint section="Forms" subtitle="Multi-line field" viewport="700x200"
 */
export interface TextareaProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  hint?: string;
  error?: string;
  /** Default 4. */
  rows?: number;
  /** Default 'glass'. Use 'solid' inside a Panel or Dialog. */
  variant?: 'glass' | 'solid';
  disabled?: boolean;
  overLight?: boolean;
  style?: React.CSSProperties;
}

export declare function Textarea(props: TextareaProps): JSX.Element;
