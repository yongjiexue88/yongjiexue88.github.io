import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  getDisplacementMap,
  isFirefox,
  backdropFor,
  EDGE_INSET_SHADOW,
  EDGE_MASK,
  edgeGradient,
} from './glass-engine.js';

/* ---------- SVG filter: edge-only displacement + chromatic aberration ---------- */
function GlassFilter({ id, displacementScale, aberrationIntensity, width, height, mapUrl }) {
  return (
    <svg style={{ position: 'absolute', width, height, pointerEvents: 'none' }} aria-hidden="true">
      <defs>
        <filter id={id} x="-35%" y="-35%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feImage
            x="0"
            y="0"
            width="100%"
            height="100%"
            result="DISPLACEMENT_MAP"
            href={mapUrl}
            preserveAspectRatio="xMidYMid slice"
          />
          <feColorMatrix
            in="DISPLACEMENT_MAP"
            type="matrix"
            values="0.3 0.3 0.3 0 0
                    0.3 0.3 0.3 0 0
                    0.3 0.3 0.3 0 0
                    0 0 0 1 0"
            result="EDGE_INTENSITY"
          />
          <feComponentTransfer in="EDGE_INTENSITY" result="EDGE_MASK">
            <feFuncA type="discrete" tableValues={`0 ${aberrationIntensity * 0.05} 1`} />
          </feComponentTransfer>

          <feOffset in="SourceGraphic" dx="0" dy="0" result="CENTER_ORIGINAL" />

          <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale={displacementScale} xChannelSelector="R" yChannelSelector="B" result="RED_DISPLACED" />
          <feColorMatrix in="RED_DISPLACED" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="RED_CHANNEL" />

          <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale={displacementScale * (1 - aberrationIntensity * 0.05)} xChannelSelector="R" yChannelSelector="B" result="GREEN_DISPLACED" />
          <feColorMatrix in="GREEN_DISPLACED" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="GREEN_CHANNEL" />

          <feDisplacementMap in="SourceGraphic" in2="DISPLACEMENT_MAP" scale={displacementScale * (1 - aberrationIntensity * 0.1)} xChannelSelector="R" yChannelSelector="B" result="BLUE_DISPLACED" />
          <feColorMatrix in="BLUE_DISPLACED" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="BLUE_CHANNEL" />

          <feBlend in="GREEN_CHANNEL" in2="BLUE_CHANNEL" mode="screen" result="GB_COMBINED" />
          <feBlend in="RED_CHANNEL" in2="GB_COMBINED" mode="screen" result="RGB_COMBINED" />
          <feGaussianBlur in="RGB_COMBINED" stdDeviation={Math.max(0.1, 0.5 - aberrationIntensity * 0.1)} result="ABERRATED_BLURRED" />
          <feComposite in="ABERRATED_BLURRED" in2="EDGE_MASK" operator="in" result="EDGE_ABERRATION" />

          <feComponentTransfer in="EDGE_MASK" result="INVERTED_MASK">
            <feFuncA type="table" tableValues="1 0" />
          </feComponentTransfer>
          <feComposite in="CENTER_ORIGINAL" in2="INVERTED_MASK" operator="in" result="CENTER_CLEAN" />
          <feComposite in="EDGE_ABERRATION" in2="CENTER_CLEAN" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

/**
 * GlassSurface — the refracting pane. Everything glass in Liquidglass is this
 * element with different radius, padding and blur. It does not move; wrap it in
 * LiquidGlass when you want the elastic mouse behaviour.
 */
export function GlassSurface({
  children,
  as: Tag = 'div',
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  cornerRadius = 999,
  padding = '24px 32px',
  overLight = false,
  tint = 'auto',
  interactive = false,
  hovered = false,
  active = false,
  shader = 'liquidGlass',
  refraction = true,
  mouseOffset = { x: 0, y: 0 },
  gap = 24,
  display = 'inline-flex',
  className = '',
  style = {},
  contentStyle = {},
  ...rest
}) {
  const rawId = useId();
  const filterId = `lg-${rawId.replace(/:/g, '')}`;
  const bodyRef = useRef(null);
  const [size, setSize] = useState({ width: 270, height: 69 });
  const [mapUrl, setMapUrl] = useState('');

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    const measure = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setSize({ width: r.width, height: r.height });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!refraction) return;
    setMapUrl(getDisplacementMap(size.width, size.height, shader));
  }, [size.width, size.height, shader, refraction]);

  const scale = overLight ? displacementScale * 0.5 : displacementScale;
  const filterActive = refraction && mapUrl && !isFirefox();

  /* Two ways to sit on a light ground.
     'light' (default): the pane stays light and carries ink text — the readable
     choice for a light theme. 'dark': the source library's smoked-glass
     treatment, which is right over photography but goes near-black on a pale UI. */
  const smoked = overLight && tint === 'dark';
  const lightGlass = overLight && tint !== 'dark';

  const warpStyle = useMemo(
    () => ({
      position: 'absolute',
      inset: 0,
      filter: filterActive ? `url(#${filterId})` : undefined,
      backdropFilter: backdropFor(blurAmount, saturation, overLight),
      WebkitBackdropFilter: backdropFor(blurAmount, saturation, overLight),
    }),
    [filterActive, filterId, blurAmount, saturation, overLight]
  );

  const edgeBase = {
    position: 'absolute',
    inset: 0,
    borderRadius: cornerRadius,
    pointerEvents: 'none',
    padding: '1.5px',
    boxShadow: EDGE_INSET_SHADOW,
    transition: 'all ease-out 0.2s',
    ...EDGE_MASK,
  };

  const sheenBase = {
    position: 'absolute',
    inset: 0,
    borderRadius: cornerRadius,
    pointerEvents: 'none',
    transition: 'all 0.2s ease-out',
    mixBlendMode: 'overlay',
  };

  return (
    <Tag
      className={className}
      style={{ position: 'relative', display, verticalAlign: 'top', ...style }}
      {...rest}
    >
      {filterActive && (
        <GlassFilter
          id={filterId}
          displacementScale={scale}
          aberrationIntensity={aberrationIntensity}
          width={size.width}
          height={size.height}
          mapUrl={mapUrl}
        />
      )}

      {smoked && (
        <>
          <span style={{ position: 'absolute', inset: 0, borderRadius: cornerRadius, background: '#000', opacity: 0.2, pointerEvents: 'none' }} />
          <span style={{ position: 'absolute', inset: 0, borderRadius: cornerRadius, background: '#000', mixBlendMode: 'overlay', pointerEvents: 'none' }} />
        </>
      )}


      <div
        ref={bodyRef}
        style={{
          borderRadius: cornerRadius,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          gap,
          padding,
          width: '100%',
          overflow: 'hidden',
          transition: 'all 0.2s ease-in-out',
          boxShadow: smoked
            ? '0px 16px 70px rgba(0, 0, 0, 0.75)'
            : lightGlass
            ? '0px 10px 34px rgba(4, 6, 10, 0.16)'
            : '0px 12px 40px rgba(0, 0, 0, 0.25)',
        }}
      >
        <span style={warpStyle} />
        {/* Light-ground veil sits above the blurred sample, so the pane reads as
            white glass rather than a grey slab. */}
        {lightGlass && (
          <span style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.62)', pointerEvents: 'none' }} />
        )}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            transition: 'all 0.15s ease-in-out',
            color: lightGlass ? 'var(--lg-text-primary)' : 'var(--lg-text-on-glass, #fff)',
            textShadow: overLight ? '0px 2px 12px rgba(0,0,0,0)' : '0px 2px 12px rgba(0,0,0,0.4)',
            ...contentStyle,
          }}
        >
          {children}
        </div>
      </div>

      {lightGlass ? (
        <>
          <span style={{ ...edgeBase, boxShadow: 'inset 0 0 0 1px rgba(4,6,10,0.12)', background: 'transparent' }} />
          <span style={{ ...edgeBase, mixBlendMode: 'screen', opacity: 0.5, background: edgeGradient(mouseOffset, 0.5, 0.9) }} />
        </>
      ) : (
        <>
          <span style={{ ...edgeBase, mixBlendMode: 'screen', opacity: 0.2, background: edgeGradient(mouseOffset, 0.12, 0.4) }} />
          <span style={{ ...edgeBase, mixBlendMode: 'overlay', background: edgeGradient(mouseOffset, 0.32, 0.6) }} />
        </>
      )}

      {interactive && (
        <>
          <span style={{ ...sheenBase, opacity: hovered || active ? 0.5 : 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 50%)' }} />
          <span style={{ ...sheenBase, opacity: active ? 0.5 : 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 80%)' }} />
          <span style={{ ...sheenBase, opacity: hovered ? 0.4 : active ? 0.8 : 0, backgroundImage: 'radial-gradient(circle at 50% 0%, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)' }} />
        </>
      )}
    </Tag>
  );
}
