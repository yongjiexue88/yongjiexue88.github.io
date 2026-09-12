import React, { useState } from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** Card — a bounded unit of content: media slot, eyebrow, title, body, footer. */
export function Card({
  children, media, eyebrow, title, description, footer,
  variant = 'glass', cornerRadius = 24, padding = '24px', overLight = false,
  onClick, style = {}, ...rest
}) {
  const [hover, setHover] = useState(false);
  const interactive = Boolean(onClick);

  const body = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
      {media ? <div style={{ marginBottom: 6, borderRadius: cornerRadius - 10, overflow: 'hidden' }}>{media}</div> : null}
      {eyebrow ? (
        <span style={{
          font: 'var(--lg-weight-medium) var(--lg-size-2xs)/1 var(--lg-font-sans)',
          letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)',
        }}>{eyebrow}</span>
      ) : null}
      {title ? <h3 style={{ margin: 0, font: 'var(--lg-weight-semibold) var(--lg-size-lg)/1.25 var(--lg-font-sans)', letterSpacing: 'var(--lg-tracking-tight)' }}>{title}</h3> : null}
      {description ? <p style={{ margin: 0, font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)' }}>{description}</p> : null}
      {children}
      {footer ? <div style={{ marginTop: 6, display: 'flex', alignItems: 'center', gap: 12 }}>{footer}</div> : null}
    </div>
  );

  if (variant === 'solid') {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          borderRadius: cornerRadius, padding, background: 'var(--lg-solid-fill)',
          border: '1px solid var(--lg-solid-border)',
          boxShadow: hover && interactive ? 'var(--lg-shadow-4)' : 'var(--lg-shadow-2)',
          transform: hover && interactive ? 'translateY(-2px)' : 'none',
          cursor: interactive ? 'pointer' : undefined,
          transition: 'var(--lg-transition-glass)', ...style,
        }}
        {...rest}
      >
        {body}
      </div>
    );
  }

  return (
    <GlassSurface
      cornerRadius={cornerRadius}
      padding={padding}
      blurAmount={0.28}
      saturation={145}
      displacementScale={55}
      shader="liquidGlassPanel"
      overLight={overLight}
      interactive={interactive}
      hovered={hover}
      display="block"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        cursor: interactive ? 'pointer' : undefined,
        transform: hover && interactive ? 'translateY(-2px)' : 'none',
        transition: 'var(--lg-transition-glass)',
        ...style,
      }}
      contentStyle={{ display: 'block' }}
      {...rest}
    >
      {body}
    </GlassSurface>
  );
}
