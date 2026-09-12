import React from 'react';
import { LiquidGlass } from '../glass/LiquidGlass.jsx';

/**
 * Dock — the floating glass bar. One per screen, pinned bottom-centre on mobile
 * or top on the web. This is the component the whole effect exists for.
 */
export function Dock({
  items = [], value, onChange, overLight = false, position = 'static', elasticity = 0.2, style = {}, ...rest
}) {
  const pinned = position === 'bottom' || position === 'top';
  return (
    <LiquidGlass
      elasticity={elasticity}
      cornerRadius={999}
      padding="8px"
      blurAmount={0.22}
      saturation={150}
      displacementScale={60}
      overLight={overLight}
      gap={4}
      style={{
        ...(pinned
          ? { position: 'fixed', left: '50%', transform: 'translateX(-50%)', [position === 'bottom' ? 'bottom' : 'top']: 24, zIndex: 100 }
          : null),
        ...style,
      }}
      contentStyle={{ display: 'flex', alignItems: 'center', gap: 4 }}
      {...rest}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            title={item.label}
            aria-label={item.label}
            aria-current={active || undefined}
            onClick={() => onChange && onChange(item.value)}
            style={{
              all: 'unset', display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 4, minWidth: 56, height: 48, padding: '0 12px', borderRadius: 999, cursor: 'pointer',
              background: active ? 'rgba(255,255,255,0.18)' : 'transparent',
              boxShadow: active ? '0 0 0 0.5px rgba(255,255,255,0.35) inset' : 'none',
              color: active ? 'var(--lg-text-primary)' : 'var(--lg-text-tertiary)',
              transition: 'var(--lg-transition-glass)',
            }}
          >
            {item.icon}
            {item.showLabel !== false && item.label ? (
              <span style={{ font: 'var(--lg-weight-medium) var(--lg-size-2xs)/1 var(--lg-font-sans)' }}>{item.label}</span>
            ) : null}
          </button>
        );
      })}
    </LiquidGlass>
  );
}
