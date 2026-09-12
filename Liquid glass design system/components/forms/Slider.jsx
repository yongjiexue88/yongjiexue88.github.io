import React, { useCallback, useRef, useState } from 'react';

/** Slider — track, fill, and a glass knob. Drag or arrow-key it. */
export function Slider({
  value = 50, min = 0, max = 100, step = 1, onChange,
  label, displayValue, disabled = false, style = {}, ...rest
}) {
  const trackRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const setFromEvent = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el || !onChange) return;
    const r = el.getBoundingClientRect();
    const raw = min + ((clientX - r.left) / r.width) * (max - min);
    const snapped = Math.round(raw / step) * step;
    onChange(Math.min(max, Math.max(min, snapped)));
  }, [min, max, step, onChange]);

  const onPointerDown = (e) => {
    if (disabled) return;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromEvent(e.clientX);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', opacity: disabled ? 0.45 : 1, ...style }} {...rest}>
      {(label || displayValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
          {label ? <span style={{ font: 'var(--lg-type-label)', color: 'var(--lg-text-secondary)' }}>{label}</span> : <span />}
          {displayValue ? <span style={{ font: 'var(--lg-type-mono)', color: 'var(--lg-text-tertiary)' }}>{displayValue}</span> : null}
        </div>
      )}
      <div
        ref={trackRef}
        role="slider"
        tabIndex={disabled ? -1 : 0}
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={(e) => dragging && setFromEvent(e.clientX)}
        onPointerUp={() => setDragging(false)}
        onKeyDown={(e) => {
          if (disabled || !onChange) return;
          if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onChange(Math.min(max, value + step));
          if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onChange(Math.max(min, value - step));
        }}
        style={{
          position: 'relative', height: 28, display: 'flex', alignItems: 'center',
          cursor: disabled ? 'default' : 'pointer', touchAction: 'none', outline: 'none',
        }}
      >
        <span style={{
          position: 'absolute', left: 0, right: 0, height: 6, borderRadius: 999,
          background: 'var(--lg-fill-ghost)', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.35)',
        }} />
        <span style={{
          position: 'absolute', left: 0, width: pct + '%', height: 6, borderRadius: 999,
          background: 'var(--lg-fill-accent)',
        }} />
        <span style={{
          position: 'absolute', left: 'calc(' + pct + '% - 11px)', width: 22, height: 22, borderRadius: 999,
          background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(6px) saturate(140%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.35), 0 4px 14px rgba(0,0,0,0.3), inset 0 0 0 0.5px rgba(255,255,255,0.6)',
          transform: dragging ? 'scale(1.12)' : 'scale(1)', transition: 'transform 0.15s ease-out',
        }} />
      </div>
    </div>
  );
}
