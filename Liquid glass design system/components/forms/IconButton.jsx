import React, { useState } from 'react';
import { LiquidGlass } from '../glass/LiquidGlass.jsx';

const SIZES = { sm: 32, md: 40, lg: 52 };

/** IconButton — a circular Button. Same variants, no label, 44px minimum for touch. */
export function IconButton({
  children,
  variant = 'glass',
  size = 'md',
  label,
  disabled = false,
  overLight = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const d = SIZES[size] || SIZES.md;

  if (variant === 'glass') {
    return (
      <LiquidGlass
        elasticity={0.35}
        displacementScale={64}
        blurAmount={0.1}
        saturation={130}
        cornerRadius={999}
        padding="0px"
        overLight={overLight}
        onClick={disabled ? undefined : onClick}
        role="button"
        aria-label={label}
        tabIndex={disabled ? -1 : 0}
        style={{ width: d, height: d, opacity: disabled ? 0.45 : 1, pointerEvents: disabled ? 'none' : undefined, ...style }}
        contentStyle={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}
        {...rest}
      >
        {children}
      </LiquidGlass>
    );
  }

  const fills = {
    solid: { background: hover ? 'var(--lg-neutral-150)' : 'var(--lg-fill-inverse)', color: 'var(--lg-text-inverse)' },
    accent: { background: hover ? 'var(--lg-fill-accent-hover)' : 'var(--lg-fill-accent)', color: '#fff' },
    ghost: { background: press ? 'var(--lg-fill-ghost-press)' : hover ? 'var(--lg-fill-ghost-hover)' : 'transparent', color: 'var(--lg-text-primary)' },
  };

  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        width: d, height: d, display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: 999, border: '1px solid var(--lg-border-subtle)',
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1,
        transform: press ? 'scale(0.96)' : 'scale(1)', transition: 'var(--lg-transition-glass)',
        ...(fills[variant] || fills.ghost), ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
