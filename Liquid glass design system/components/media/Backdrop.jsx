import React from 'react';

const MESHES = {
  azure: [
    ['62% 12%', 'oklch(0.62 0.19 250 / 0.85)'],
    ['12% 78%', 'oklch(0.52 0.17 285 / 0.75)'],
    ['88% 82%', 'oklch(0.58 0.15 200 / 0.60)'],
  ],
  orchid: [
    ['22% 18%', 'oklch(0.60 0.20 330 / 0.85)'],
    ['82% 30%', 'oklch(0.55 0.18 275 / 0.70)'],
    ['50% 92%', 'oklch(0.50 0.16 300 / 0.65)'],
  ],
  mint: [
    ['78% 18%', 'oklch(0.66 0.16 170 / 0.80)'],
    ['18% 62%', 'oklch(0.52 0.14 210 / 0.70)'],
    ['58% 96%', 'oklch(0.60 0.13 140 / 0.55)'],
  ],
  ember: [
    ['28% 20%', 'oklch(0.68 0.18 50 / 0.82)'],
    ['84% 62%', 'oklch(0.58 0.19 20 / 0.72)'],
    ['12% 92%', 'oklch(0.50 0.15 320 / 0.55)'],
  ],
  pale: [
    ['70% 14%', 'oklch(0.92 0.07 250 / 0.95)'],
    ['14% 74%', 'oklch(0.90 0.06 320 / 0.90)'],
    ['90% 90%', 'oklch(0.94 0.05 170 / 0.85)'],
  ],
};

/**
 * Backdrop — the ground glass refracts. Glass on a flat fill is just a grey box,
 * so every surface in this system sits on one of these.
 *
 * 'mesh' is a static multi-stop radial blend. 'photo' is a labelled slot: the
 * system ships no photography, so it states what image belongs there and
 * renders a mesh underneath in the meantime.
 */
export function Backdrop({
  children,
  variant = 'mesh',
  hue = 'azure',
  label,
  fixed = false,
  style = {},
  contentStyle = {},
  ...rest
}) {
  const stops = MESHES[hue] || MESHES.azure;
  const pale = hue === 'pale';

  return (
    <div
      style={{
        position: 'relative',
        isolation: 'isolate',
        minHeight: fixed ? '100vh' : undefined,
        width: '100%',
        overflow: 'hidden',
        background: pale ? 'var(--lg-neutral-100)' : 'var(--lg-neutral-1000)',
        color: pale ? 'var(--lg-neutral-1000)' : '#fff',
        ...style,
      }}
      {...rest}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: stops.map(([at, color]) => 'radial-gradient(60% 55% at ' + at + ', ' + color + ' 0%, transparent 72%)').join(', '),
          backgroundColor: pale ? 'var(--lg-neutral-100)' : 'var(--lg-neutral-950)',
        }}
      />
      {variant === 'photo' ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
            padding: 16,
            background:
              'repeating-linear-gradient(45deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 12px)',
            boxShadow: 'inset 0 0 0 1px var(--lg-border-default)',
          }}
        >
          <span
            style={{
              font: 'var(--lg-type-mono)',
              letterSpacing: 'var(--lg-tracking-wide)',
              textTransform: 'uppercase',
              color: pale ? 'rgba(4,6,10,0.5)' : 'rgba(255,255,255,0.55)',
            }}
          >
            {label || 'photograph goes here'}
          </span>
        </div>
      ) : null}
      <div style={{ position: 'relative', zIndex: 1, ...contentStyle }}>{children}</div>
    </div>
  );
}
