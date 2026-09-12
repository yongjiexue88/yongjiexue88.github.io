import React from 'react';

const TONES = {
  neutral: { bg: 'var(--lg-fill-ghost)', fg: 'var(--lg-text-secondary)', bd: 'var(--lg-border-subtle)' },
  accent: { bg: 'color-mix(in oklab, var(--lg-azure) 22%, transparent)', fg: 'var(--lg-azure-bright)', bd: 'color-mix(in oklab, var(--lg-azure) 40%, transparent)' },
  success: { bg: 'color-mix(in oklab, var(--lg-hue-success) 20%, transparent)', fg: 'var(--lg-hue-success)', bd: 'color-mix(in oklab, var(--lg-hue-success) 38%, transparent)' },
  warning: { bg: 'color-mix(in oklab, var(--lg-hue-warning) 20%, transparent)', fg: 'var(--lg-hue-warning)', bd: 'color-mix(in oklab, var(--lg-hue-warning) 38%, transparent)' },
  danger: { bg: 'color-mix(in oklab, var(--lg-hue-danger) 22%, transparent)', fg: 'var(--lg-hue-danger)', bd: 'color-mix(in oklab, var(--lg-hue-danger) 40%, transparent)' },
};

/** Badge — a status word. Not interactive; if it can be dismissed it is a Tag. */
export function Badge({ children, tone = 'neutral', dot = false, style = {}, ...rest }) {
  const t = TONES[tone] || TONES.neutral;
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: dot ? '4px 10px 4px 8px' : '4px 10px',
        borderRadius: 999,
        background: t.bg,
        border: '1px solid ' + t.bd,
        color: t.fg,
        font: 'var(--lg-weight-medium) var(--lg-size-2xs)/1.2 var(--lg-font-sans)',
        letterSpacing: 'var(--lg-tracking-wide)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot ? <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: 999, background: 'currentColor' }} /> : null}
      {children}
    </span>
  );
}
