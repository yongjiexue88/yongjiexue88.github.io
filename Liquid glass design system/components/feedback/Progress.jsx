import React from 'react';

/** Progress — a determinate bar. Reading position, upload, export. */
export function Progress({
  value = 0, max = 100, label, displayValue, size = 'md', tone = 'accent', style = {}, ...rest
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const h = size === 'sm' ? 4 : size === 'lg' ? 10 : 6;
  const fill = tone === 'inverse' ? 'var(--lg-fill-inverse)' : 'var(--lg-fill-accent)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%', ...style }} {...rest}>
      {(label || displayValue) ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          {label ? <span style={{ font: 'var(--lg-type-label)', color: 'var(--lg-text-secondary)' }}>{label}</span> : null}
          {displayValue ? <span style={{ font: 'var(--lg-type-mono)', color: 'var(--lg-text-tertiary)' }}>{displayValue}</span> : null}
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        style={{
          height: h, borderRadius: 999, overflow: 'hidden',
          background: 'var(--lg-fill-ghost)',
          boxShadow: 'inset 0 0 0 1px var(--lg-border-subtle)',
        }}
      >
        <span style={{
          display: 'block', height: '100%', width: pct + '%', borderRadius: 999,
          background: fill,
          transition: 'width var(--lg-duration-slow) var(--lg-ease-standard)',
        }} />
      </div>
    </div>
  );
}
