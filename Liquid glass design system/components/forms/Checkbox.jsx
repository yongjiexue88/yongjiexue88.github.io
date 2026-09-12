import React from 'react';

/** Checkbox — a 20px rounded square. Fills with the accent when checked. */
export function Checkbox({ checked = false, onChange, label, description, disabled = false, style = {}, ...rest }) {
  return (
    <label
      style={{
        display: 'inline-flex', alignItems: description ? 'flex-start' : 'center', gap: 12,
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1, ...style,
      }}
      {...rest}
    >
      <input type="checkbox" checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span
        aria-hidden="true"
        style={{
          flex: '0 0 auto', width: 20, height: 20, borderRadius: 6, marginTop: description ? 2 : 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: checked ? 'var(--lg-fill-accent)' : 'var(--lg-fill-ghost)',
          border: '1px solid ' + (checked ? 'transparent' : 'var(--lg-border-default)'),
          boxShadow: checked ? '0 1px 3px rgba(0,0,0,0.3)' : 'inset 0 1px 1px rgba(255,255,255,0.08)',
          transition: 'var(--lg-transition-content)',
        }}
      >
        {checked ? (
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        ) : null}
      </span>
      {label ? (
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ font: 'var(--lg-weight-regular) var(--lg-size-base)/1.3 var(--lg-font-sans)' }}>{label}</span>
          {description ? <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)' }}>{description}</span> : null}
        </span>
      ) : null}
    </label>
  );
}
