import * as React from 'react';

export type GlassShader = 'liquidGlass' | 'liquidGlassPanel';

/**
 * The refracting pane every other Liquidglass component is built on.
 * Static: it renders the SVG displacement filter, the backdrop blur/saturate
 * layer, and the two-pass specular edge. Use LiquidGlass instead when the
 * element should react elastically to the pointer.
 *
 * @startingPoint section="Glass" subtitle="Bare refracting pane — the base of everything" viewport="700x240"
 */
export interface GlassSurfaceProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  children?: React.ReactNode;
  /** Element tag to render. Default 'div'. */
  as?: keyof JSX.IntrinsicElements;
  /** Intensity of the edge refraction. Halved automatically when overLight. Default 70. */
  displacementScale?: number;
  /** Frosting. Multiplied by 32 and added to a 4px (or 12px over light) base. Default 0.0625. */
  blurAmount?: number;
  /** backdrop-filter saturation percentage. Default 140. */
  saturation?: number;
  /** Chromatic aberration strength at the edge. Default 2. */
  aberrationIntensity?: number;
  /** Border radius in px. Default 999 (pill). */
  cornerRadius?: number;
  /** CSS padding for the glass body. Default '24px 32px'. */
  padding?: string;
  /** Switches to the light-ground treatment: deeper blur, half displacement, no text shadow. */
  overLight?: boolean;
  /**
   * How the pane sits on a light ground, when overLight is set.
   * 'light' (default) keeps the pane light and switches the content to ink text —
   * the readable choice inside a light theme.
   * 'dark' is the source library's smoked-glass treatment: a full-strength black
   * overlay with white text. Right over photography, near-black on a pale UI.
   */
  tint?: 'auto' | 'light' | 'dark';
  /** Renders the three hover/press sheen layers. */
  interactive?: boolean;
  hovered?: boolean;
  active?: boolean;
  /** Displacement field. 'liquidGlassPanel' bends more gently — use it above ~400px. */
  shader?: GlassShader;
  /** Set false to ship blur only (no SVG filter). Default true. */
  refraction?: boolean;
  /** Drives the specular highlight angle. LiquidGlass supplies this. */
  mouseOffset?: { x: number; y: number };
  /** Flex gap inside the glass body. Default 24. */
  gap?: number | string;
  /** Outer display mode. Default 'inline-flex'. */
  display?: string;
  style?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
}

export declare function GlassSurface(props: GlassSurfaceProps): JSX.Element;
