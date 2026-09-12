import React from 'react';
import { GlassSurface } from '../glass/GlassSurface.jsx';

/** Sheet — an edge-anchored glass surface: mobile bottom sheet, desktop side rail. */
export function Sheet({
  children, open = true, side = 'bottom', overLight = false, onClose, width = 380, height = 'auto', style = {}, ...rest
}) {
  if (!open) return null;
  const vertical = side === 'bottom' || side === 'top';
  const radius = 32;

  return (
    <div
      style={{
        position: 'absolute', zIndex: 90,
        ...(side === 'bottom' ? { left: 0, right: 0, bottom: 0 } : null),
        ...(side === 'top' ? { left: 0, right: 0, top: 0 } : null),
        ...(side === 'left' ? { top: 0, bottom: 0, left: 0, width } : null),
        ...(side === 'right' ? { top: 0, bottom: 0, right: 0, width } : null),
        ...style,
      }}
      {...rest}
    >
      <GlassSurface
        cornerRadius={radius}
        padding="16px 24px 28px"
        blurAmount={0.45}
        saturation={160}
        displacementScale={50}
        shader="liquidGlassPanel"
        overLight={overLight}
        display="block"
        style={{ width: '100%', height: vertical ? height : '100%' }}
        contentStyle={{ display: 'block' }}
      >
        {vertical ? (
          <div
            onClick={onClose}
            style={{
              width: 40, height: 5, borderRadius: 999, background: 'rgba(255,255,255,0.35)',
              margin: '0 auto 18px', cursor: onClose ? 'pointer' : 'default',
            }}
          />
        ) : null}
        {children}
      </GlassSurface>
    </div>
  );
}
