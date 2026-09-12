import React from 'react';

/** Radio — one of a set. Same metrics as Checkbox, circular, with an inner dot. */
export function Radio({ checked = false, onChange, label, description, name, value, disabled = false, style = {}, ...rest }) {
  return (
    <label
      style={{
        display: 'inline-flex', alignItems: description ? 'flex-start' : 'center', gap: 12,
        cursor: disabled ? 'default' : 'pointer', opacity: disabled ? 0.45 : 1, ...style,
      }}
      {...rest}
    >
      <input type="radio" name={name} value={value} checked={checked} onChange={onChange} disabled={disabled}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span
        aria-hidden="true"
        style={{
          flex: '0 0 auto', width: 20, height: 20, borderRadius: 999, marginTop: description ? 2 : 0,
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          background: checked ? 'var(--lg-fill-accent)' : 'var(--lg-fill-ghost)',
          border: '1px solid ' + (checked ? 'transparent' : 'var(--lg-border-default)'),
          transition: 'var(--lg-transition-content)',
        }}
      >
        {checked ? <span style={{ width: 7, height: 7, borderRadius: 999, background: '#fff' }} /> : null}
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
