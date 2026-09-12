import React, { useState } from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/**
 * Input — a single-line field. Glass fields read well on photography; solid
 * fields are the right call inside a panel that is already glass.
 */
export function Input({
  value,
  onChange,
  placeholder,
  label,
  hint,
  error,
  type = 'text',
  variant = 'glass',
  iconLeft,
  disabled = false,
  overLight = false,
  fullWidth = true,
  style = {},
  inputStyle = {},
  ...rest
}) {
  const [focused, setFocused] = useState(false);

  const field = (
    <>
      {iconLeft ? <span style={{ display: 'flex', color: 'var(--lg-text-tertiary)', flex: '0 0 auto' }}>{iconLeft}</span> : null}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          all: 'unset',
          flex: 1,
          minWidth: 0,
          font: 'var(--lg-weight-regular) var(--lg-size-base)/1.4 var(--lg-font-sans)',
          color: 'inherit',
          caretColor: 'var(--lg-text-accent)',
          ...inputStyle,
        }}
        {...rest}
      />
    </>
  );

  const ring = error
    ? '0 0 0 1.5px var(--lg-hue-danger)'
    : focused
    ? '0 0 0 1.5px var(--lg-fill-accent)'
    : 'none';

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, width: fullWidth ? '100%' : undefined, opacity: disabled ? 0.5 : 1, ...style }}>
      {label ? <span style={{ font: 'var(--lg-type-label)', color: 'var(--lg-text-secondary)' }}>{label}</span> : null}

      {variant === 'glass' ? (
        <GlassSurface
          cornerRadius={14}
          padding="12px 16px"
          gap={10}
          blurAmount={0.12}
          saturation={130}
          displacementScale={40}
          overLight={overLight}
          display="flex"
          style={{ width: '100%', boxShadow: ring, borderRadius: 14 }}
          contentStyle={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          {field}
        </GlassSurface>
      ) : (
        <span
          style={{
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '12px 16px', borderRadius: 14,
            background: 'var(--lg-fill-ghost)',
            border: '1px solid ' + (error ? 'var(--lg-hue-danger)' : focused ? 'var(--lg-fill-accent)' : 'var(--lg-border-subtle)'),
            color: 'var(--lg-text-primary)',
            transition: 'var(--lg-transition-content)',
          }}
        >
          {field}
        </span>
      )}

      {error || hint ? (
        <span style={{ font: 'var(--lg-type-caption)', color: error ? 'var(--lg-hue-danger)' : 'var(--lg-text-tertiary)' }}>
          {error || hint}
        </span>
      ) : null}
    </label>
  );
}
