import React from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** Menu — a glass list of actions. Pair with IconButton for an overflow menu. */
export function Menu({ items = [], onSelect, overLight = false, width = 240, style = {}, ...rest }) {
  return (
    <GlassSurface
      cornerRadius={18}
      padding="6px"
      blurAmount={0.3}
      saturation={160}
      displacementScale={50}
      shader="liquidGlassPanel"
      overLight={overLight}
      display="block"
      style={{ width, ...style }}
      contentStyle={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      {...rest}
    >
      {items.map((item, i) =>
        item.divider ? (
          <span key={'d' + i} style={{ height: 1, background: 'var(--lg-border-subtle)', margin: '5px 10px' }} />
        ) : (
          <button
            key={item.value || item.label}
            type="button"
            disabled={item.disabled}
            onClick={() => onSelect && onSelect(item.value || item.label)}
            style={{
              all: 'unset', display: 'flex', alignItems: 'center', gap: 12, padding: '9px 12px', borderRadius: 12,
              cursor: item.disabled ? 'default' : 'pointer', opacity: item.disabled ? 0.4 : 1,
              font: 'var(--lg-weight-regular) var(--lg-size-base)/1.2 var(--lg-font-sans)',
              color: item.tone === 'danger' ? 'var(--lg-hue-danger)' : 'var(--lg-text-primary)',
            }}
            onMouseEnter={(e) => { if (!item.disabled) e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            {item.icon ? <span style={{ display: 'flex', opacity: 0.8 }}>{item.icon}</span> : null}
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.shortcut ? <span style={{ font: 'var(--lg-type-mono)', color: 'var(--lg-text-tertiary)' }}>{item.shortcut}</span> : null}
          </button>
        )
      )}
    </GlassSurface>
  );
}
