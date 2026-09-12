import React from 'react';

/** Tabs — underlined navigation for switching views inside a panel. */
export function Tabs({ tabs = [], value, onChange, size = 'md', style = {}, ...rest }) {
  const items = tabs.map((t) => (typeof t === 'string' ? { value: t, label: t } : t));
  const font = size === 'sm' ? 'var(--lg-size-sm)' : 'var(--lg-size-base)';

  return (
    <div role="tablist" style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--lg-border-subtle)', ...style }} {...rest}>
      {items.map((t) => {
        const active = t.value === value;
        return (
          <button
            key={t.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange && onChange(t.value)}
            style={{
              all: 'unset', position: 'relative', cursor: 'pointer',
              padding: size === 'sm' ? '8px 12px 12px' : '10px 14px 14px',
              font: 'var(--lg-weight-medium) ' + font + '/1 var(--lg-font-sans)',
              color: active ? 'var(--lg-text-primary)' : 'var(--lg-text-tertiary)',
              transition: 'color 0.2s ease-in-out',
              display: 'inline-flex', alignItems: 'center', gap: 8,
            }}
          >
            {t.icon}
            {t.label}
            {t.count != null ? (
              <span style={{ font: 'var(--lg-type-mono)', color: 'var(--lg-text-tertiary)' }}>{t.count}</span>
            ) : null}
            <span style={{
              position: 'absolute', left: 0, right: 0, bottom: -1, height: 2, borderRadius: 2,
              background: active ? 'var(--lg-fill-accent)' : 'transparent', transition: 'background 0.2s ease-in-out',
            }} />
          </button>
        );
      })}
    </div>
  );
}
