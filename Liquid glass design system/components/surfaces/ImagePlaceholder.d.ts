import * as React from 'react';

/**
 * A labelled empty frame. The system ships no photography, so this marks where
 * an image goes rather than inventing one.
 *
 * @startingPoint section="Surfaces" subtitle="Labelled slot where imagery goes" viewport="700x220"
 */
export interface ImagePlaceholderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** What belongs here. Default 'image'. */
  label?: string;
  /** CSS aspect-ratio. Default '16 / 9'. Ignored when `height` is set. */
  ratio?: string;
  /** Default 20. */
  radius?: number;
  /** Fixed height instead of a ratio. */
  height?: number | string;
  style?: React.CSSProperties;
}

export declare function ImagePlaceholder(props: ImagePlaceholderProps): JSX.Element;
