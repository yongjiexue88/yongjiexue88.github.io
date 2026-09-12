import React from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/**
 * Panel — the large glass plate: sidebars, sheets, content wells. Uses the
 * panel displacement field, which bends gently enough not to smear text.
 */
export function Panel({
  children, variant = 'glass', cornerRadius = 28, padding = '28px', overLight = false,
  blurAmount = 0.35, saturation = 150, style = {}, contentStyle = {}, ...rest
}) {
  if (variant === 'solid') {
    return (
      <div
        style={{
          borderRadius: cornerRadius, padding, background: 'var(--lg-solid-fill)',
          border: '1px solid var(--lg-solid-border)', boxShadow: 'var(--lg-shadow-3)', ...style,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }
  return (
    <GlassSurface
      cornerRadius={cornerRadius}
      padding={padding}
      blurAmount={blurAmount}
      saturation={saturation}
      displacementScale={55}
      shader="liquidGlassPanel"
      overLight={overLight}
      display="block"
      style={style}
      contentStyle={{ display: 'block', ...contentStyle }}
      {...rest}
    >
      {children}
    </GlassSurface>
  );
}
