import * as React from 'react';
import { GlassSurfaceProps } from './GlassSurface';

/**
 * GlassSurface with the elastic pointer model: the pane leans toward the
 * cursor, stretches along its travel axis and compresses across it, fading in
 * over a 200px activation zone, and presses to 0.96 on click.
 *
 * @startingPoint section="Glass" subtitle="Elastic glass pane that leans toward the cursor" viewport="700x260"
 */
export interface LiquidGlassProps extends Omit<GlassSurfaceProps, 'interactive' | 'hovered' | 'active' | 'mouseOffset'> {
  /** 0 = rigid, 0.15 = default, 0.35 = the source's button feel. */
  elasticity?: number;
  /** Track the pointer across a larger region than the pane itself. */
  mouseContainer?: React.RefObject<HTMLElement | null> | null;
  /** Drive the effect from outside instead of tracking internally. */
  globalMousePos?: { x: number; y: number };
  mouseOffset?: { x: number; y: number };
  /** Pin to the viewport centre, as the source component does. Default false (in flow). */
  centered?: boolean;
  onClick?: () => void;
}

export declare function LiquidGlass(props: LiquidGlassProps): JSX.Element;
