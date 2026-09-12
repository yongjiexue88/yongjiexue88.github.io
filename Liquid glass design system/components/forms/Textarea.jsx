import React, { useState } from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** Textarea — Input's multi-line sibling. Same variants, same ring. */
export function Textarea({
  value, onChange, placeholder, label, hint, error,
  rows = 4, variant = 'glass', disabled = false, overLight = false, style = {}, ...rest
}) {
  const [focused, setFocused] = useState(false);

  const field = (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        all: 'unset',
        width: '100%',
        resize: 'vertical',
        font: 'var(--lg-weight-regular) var(--lg-size-base)/1.6 var(--lg-font-sans)',
        color: 'inherit',
        caretColor: 'var(--lg-text-accent)',
        boxSizing: 'border-box',
      }}
      {...rest}
    />
  );

  const ring = error ? '0 0 0 1.5px var(--lg-hue-danger)' : focused ? '0 0 0 1.5px var(--lg-fill-accent)' : 'none';

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', opacity: disabled ? 0.5 : 1, ...style }}>
      {label ? <span style={{ font: 'var(--lg-type-label)', color: 'var(--lg-text-secondary)' }}>{label}</span> : null}
      {variant === 'glass' ? (
        <GlassSurface cornerRadius={16} padding="14px 16px" blurAmount={0.12} saturation={130} displacementScale={40}
          overLight={overLight} display="flex" style={{ width: '100%', boxShadow: ring, borderRadius: 16 }}>
          {field}
        </GlassSurface>
      ) : (
        <span style={{
          display: 'block', padding: '14px 16px', borderRadius: 16, background: 'var(--lg-fill-ghost)',
          border: '1px solid ' + (error ? 'var(--lg-hue-danger)' : focused ? 'var(--lg-fill-accent)' : 'var(--lg-border-subtle)'),
        }}>{field}</span>
      )}
      {error || hint ? (
        <span style={{ font: 'var(--lg-type-caption)', color: error ? 'var(--lg-hue-danger)' : 'var(--lg-text-tertiary)' }}>{error || hint}</span>
      ) : null}
    </label>
  );
}
