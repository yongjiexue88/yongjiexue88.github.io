import React from 'react';

/** Switch — the one control that always stays glassy: the knob is a lens. */
export function Switch({ checked = false, onChange, label, description, disabled = false, size = 'md', style = {}, ...rest }) {
  const w = size === 'sm' ? 40 : 52;
  const h = size === 'sm' ? 24 : 30;
  const knob = h - 6;

  return (
    <label
      style={{
        display: 'inline-flex', alignItems: description ? 'flex-start' : 'center', gap: 14,
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1, ...style,
      }}
      {...rest}
    >
      <input type="checkbox" role="switch" checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span
        aria-hidden="true"
        style={{
          position: 'relative', flex: '0 0 auto', width: w, height: h, borderRadius: 999,
          background: checked ? 'var(--lg-fill-accent)' : 'var(--lg-fill-ghost)',
          border: '1px solid ' + (checked ? 'transparent' : 'var(--lg-border-default)'),
          boxShadow: checked ? 'inset 0 1px 3px rgba(0,0,0,0.25)' : 'inset 0 1px 2px rgba(0,0,0,0.3)',
          transition: 'var(--lg-transition-glass)',
        }}
      >
        <span
          style={{
            position: 'absolute', top: 2, left: checked ? w - knob - 4 : 2, width: knob, height: knob,
            borderRadius: 999, background: '#fff',
            boxShadow: '0 1px 2px rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.22), inset 0 -1px 1px rgba(0,0,0,0.06)',
            transition: 'var(--lg-transition-glass)',
          }}
        />
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
