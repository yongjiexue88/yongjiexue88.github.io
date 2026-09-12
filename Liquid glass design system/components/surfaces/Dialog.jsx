import React from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** Dialog — scrim plus a centred glass plate. Everything behind it blurs. */
export function Dialog({
  children, open = true, title, description, footer, onClose, overLight = false, width = 460, style = {}, ...rest
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position: 'absolute', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: 'var(--lg-scrim)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
        ...style,
      }}
      onClick={onClose}
      {...rest}
    >
      <GlassSurface
        cornerRadius={32}
        padding="32px"
        blurAmount={0.45}
        saturation={160}
        displacementScale={50}
        shader="liquidGlassPanel"
        overLight={overLight}
        display="block"
        onClick={(e) => e.stopPropagation()}
        style={{ width, maxWidth: '100%' }}
        contentStyle={{ display: 'block' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {title ? <h2 style={{ margin: 0, font: 'var(--lg-weight-semibold) var(--lg-size-xl)/1.2 var(--lg-font-sans)', letterSpacing: 'var(--lg-tracking-tight)' }}>{title}</h2> : null}
          {description ? <p style={{ margin: 0, font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)' }}>{description}</p> : null}
          {children}
          {footer ? <div style={{ marginTop: 12, display: 'flex', gap: 10, justifyContent: 'flex-end' }}>{footer}</div> : null}
        </div>
      </GlassSurface>
    </div>
  );
}
