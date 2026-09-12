import * as React from 'react';

export type BackdropHue = 'azure' | 'orchid' | 'mint' | 'ember' | 'pale';

/**
 * The ground glass refracts. Every Liquidglass screen sits on one of these —
 * a static colour mesh, or a labelled slot for real photography.
 *
 * @startingPoint section="Media" subtitle="Colour-mesh or photo-slot ground for glass" viewport="700x300"
 */
export interface BackdropProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  children?: React.ReactNode;
  /** 'photo' overlays a labelled placeholder for a real image. Default 'mesh'. */
  variant?: 'mesh' | 'photo';
  /** Default 'azure'. 'pale' is the light-ground mesh — pair with overLight. */
  hue?: BackdropHue;
  /** Photo variant: what image belongs here, e.g. "author portrait, 3:2". */
  label?: string;
  /** Stretch to 100vh. */
  fixed?: boolean;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export declare function Backdrop(props: BackdropProps): JSX.Element;
