import React, { useState } from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

const Chevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/** Select — native <select> under glass, so keyboard and mobile pickers still work. */
export function Select({
  value, onChange, options = [], label, hint, placeholder,
  variant = 'glass', disabled = false, overLight = false, fullWidth = true, style = {}, ...rest
}) {
  const [focused, setFocused] = useState(false);

  const field = (
    <>
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          all: 'unset', flex: 1, minWidth: 0, cursor: 'pointer',
          font: 'var(--lg-weight-regular) var(--lg-size-base)/1.4 var(--lg-font-sans)', color: 'inherit',
        }}
        {...rest}
      >
        {placeholder ? <option value="" disabled style={{ color: '#000' }}>{placeholder}</option> : null}
        {options.map((o) => {
          const val = typeof o === 'string' ? o : o.value;
          const lbl = typeof o === 'string' ? o : o.label;
          return <option key={val} value={val} style={{ color: '#000' }}>{lbl}</option>;
        })}
      </select>
      <span style={{ display: 'flex', color: 'var(--lg-text-tertiary)' }}><Chevron /></span>
    </>
  );

  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 8, width: fullWidth ? '100%' : undefined, opacity: disabled ? 0.5 : 1, ...style }}>
      {label ? <span style={{ font: 'var(--lg-type-label)', color: 'var(--lg-text-secondary)' }}>{label}</span> : null}
      {variant === 'glass' ? (
        <GlassSurface cornerRadius={14} padding="12px 16px" gap={10} blurAmount={0.12} saturation={130} displacementScale={40}
          overLight={overLight} display="flex"
          style={{ width: '100%', borderRadius: 14, boxShadow: focused ? '0 0 0 1.5px var(--lg-fill-accent)' : 'none' }}
          contentStyle={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {field}
        </GlassSurface>
      ) : (
        <span style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', borderRadius: 14,
          background: 'var(--lg-fill-ghost)', border: '1px solid ' + (focused ? 'var(--lg-fill-accent)' : 'var(--lg-border-subtle)'),
        }}>{field}</span>
      )}
      {hint ? <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)' }}>{hint}</span> : null}
    </label>
  );
}
