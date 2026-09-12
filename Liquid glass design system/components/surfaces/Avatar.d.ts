import * as React from 'react';

/**
 * Initials on a tinted disc, or an image. Ring optional.
 *
 * @startingPoint section="Surfaces" subtitle="Initials or image, 4 sizes" viewport="700x120"
 */
export interface AvatarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'style'> {
  /** Used for initials (first letters of the first two words) and the tint hash. */
  name?: string;
  /** Image URL. Replaces the initials. */
  src?: string;
  /** Default 'md'. */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Adds a specular ring — use for the signed-in user. */
  ring?: boolean;
  /** Override the hashed tint with a CSS color. */
  tone?: string;
  style?: React.CSSProperties;
}

export declare function Avatar(props: AvatarProps): JSX.Element;
