import React from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

const TONE_HUE = {
  neutral: null,
  success: 'var(--lg-hue-success)',
  warning: 'var(--lg-hue-warning)',
  danger: 'var(--lg-hue-danger)',
};

/** Toast — a floating glass confirmation. Bottom-centre, one at a time. */
export function Toast({
  children, title, tone = 'neutral', icon, action, onClose, position = 'static', style = {}, ...rest
}) {
  const hue = TONE_HUE[tone];
  const fixed = position === 'fixed';

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        ...(fixed ? { position: 'fixed', left: '50%', bottom: 32, transform: 'translateX(-50%)', zIndex: 60 } : {}),
        ...style,
      }}
      {...rest}
    >
      <GlassSurface
        cornerRadius={20}
        padding="14px 18px"
        blurAmount={0.3}
        saturation={150}
        displacementScale={50}
        shader="liquidGlassPanel"
        gap={14}
        style={{ maxWidth: 460 }}
        contentStyle={{ alignItems: 'center' }}
      >
        {icon ? <span style={{ display: 'flex', color: hue || 'var(--lg-text-secondary)' }}>{icon}</span> : null}
        <span style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
          {title ? (
            <span style={{ font: 'var(--lg-type-label)', color: 'var(--lg-text-primary)' }}>{title}</span>
          ) : null}
          {children ? (
            <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)' }}>{children}</span>
          ) : null}
        </span>
        {action}
        {onClose ? (
          <button
            type="button"
            aria-label="Dismiss"
            onClick={onClose}
            style={{
              all: 'unset', cursor: 'pointer', padding: 4, borderRadius: 999,
              color: 'var(--lg-text-tertiary)', font: 'var(--lg-weight-regular) 14px/1 var(--lg-font-sans)',
            }}
          >
            ×
          </button>
        ) : null}
      </GlassSurface>
    </div>
  );
}
