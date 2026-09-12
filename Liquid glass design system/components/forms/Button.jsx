import React, { useState } from 'react';
import { LiquidGlass } from '../glass/LiquidGlass.jsx';

const SIZES = {
  sm: { padding: '7px 14px', size: 'var(--lg-size-sm)', gap: 6, radius: 999 },
  md: { padding: '11px 20px', size: 'var(--lg-size-base)', gap: 8, radius: 999 },
  lg: { padding: '15px 28px', size: 'var(--lg-size-md)', gap: 10, radius: 999 },
};

/**
 * Button — the pill. Glass by default; solid, accent and ghost cover the cases
 * where refraction would be wrong (dense forms, tables, anything on a flat fill).
 */
export function Button({
  children,
  variant = 'glass',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  overLight = false,
  fullWidth = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = useState(false);
  const [press, setPress] = useState(false);
  const s = SIZES[size] || SIZES.md;

  const label = (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        font: `var(--lg-weight-medium) ${s.size}/1 var(--lg-font-sans)`,
        letterSpacing: 'var(--lg-tracking-normal)',
        whiteSpace: 'nowrap',
      }}
    >
      {iconLeft}
      {children}
      {iconRight}
    </span>
  );

  if (variant === 'glass') {
    return (
      <LiquidGlass
        elasticity={0.35}
        displacementScale={64}
        blurAmount={0.1}
        saturation={130}
        aberrationIntensity={2}
        cornerRadius={s.radius}
        padding={s.padding}
        overLight={overLight}
        onClick={disabled ? undefined : onClick}
        display={fullWidth ? 'flex' : 'inline-flex'}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-disabled={disabled || undefined}
        style={{
          width: fullWidth ? '100%' : undefined,
          opacity: disabled ? 0.45 : 1,
          pointerEvents: disabled ? 'none' : undefined,
          ...style,
        }}
        contentStyle={{ display: 'flex', justifyContent: 'center' }}
        {...rest}
      >
        {label}
      </LiquidGlass>
    );
  }

  const fills = {
    solid: {
      background: hover ? 'var(--lg-neutral-150)' : 'var(--lg-fill-inverse)',
      color: 'var(--lg-text-inverse)',
      border: '1px solid transparent',
      boxShadow: 'var(--lg-shadow-2)',
    },
    accent: {
      background: hover ? 'var(--lg-fill-accent-hover)' : 'var(--lg-fill-accent)',
      color: '#fff',
      border: '1px solid transparent',
      boxShadow: 'var(--lg-shadow-2)',
    },
    ghost: {
      background: press ? 'var(--lg-fill-ghost-press)' : hover ? 'var(--lg-fill-ghost-hover)' : 'transparent',
      color: 'var(--lg-text-primary)',
      border: '1px solid var(--lg-border-subtle)',
      boxShadow: 'none',
    },
  };

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      style={{
        display: fullWidth ? 'flex' : 'inline-flex',
        width: fullWidth ? '100%' : undefined,
        alignItems: 'center',
        justifyContent: 'center',
        padding: s.padding,
        borderRadius: s.radius,
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transform: press ? 'scale(0.96)' : 'scale(1)',
        transition: 'var(--lg-transition-glass)',
        ...(fills[variant] || fills.ghost),
        ...style,
      }}
      {...rest}
    >
      {label}
    </button>
  );
}
