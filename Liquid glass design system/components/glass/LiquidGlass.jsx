import React, { useCallback, useEffect, useRef, useState } from 'react';
import { GlassSurface } from './GlassSurface.jsx';

const ACTIVATION_ZONE = 200;

/**
 * LiquidGlass — GlassSurface plus the elastic mouse model from the source:
 * the pane leans toward the pointer, stretches along its travel axis, and
 * compresses on the cross axis, all fading in over a 200px activation zone.
 */
export function LiquidGlass({
  children,
  displacementScale = 70,
  blurAmount = 0.0625,
  saturation = 140,
  aberrationIntensity = 2,
  elasticity = 0.15,
  cornerRadius = 999,
  padding = '24px 32px',
  overLight = false,
  mouseContainer = null,
  globalMousePos: externalGlobalMousePos,
  mouseOffset: externalMouseOffset,
  centered = false,
  shader = 'liquidGlass',
  refraction = true,
  className = '',
  style = {},
  contentStyle,
  gap,
  display = 'inline-flex',
  onClick,
  ...rest
}) {
  const glassRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [glassSize, setGlassSize] = useState({ width: 270, height: 69 });
  const [internalGlobalMousePos, setInternalGlobalMousePos] = useState({ x: 0, y: 0 });
  const [internalMouseOffset, setInternalMouseOffset] = useState({ x: 0, y: 0 });

  const globalMousePos = externalGlobalMousePos || internalGlobalMousePos;
  const mouseOffset = externalMouseOffset || internalMouseOffset;

  const handleMouseMove = useCallback(
    (e) => {
      const container = mouseContainer?.current || glassRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setInternalMouseOffset({
        x: ((e.clientX - centerX) / rect.width) * 100,
        y: ((e.clientY - centerY) / rect.height) * 100,
      });
      setInternalGlobalMousePos({ x: e.clientX, y: e.clientY });
    },
    [mouseContainer]
  );

  useEffect(() => {
    if (externalGlobalMousePos && externalMouseOffset) return;
    const container = mouseContainer?.current || glassRef.current;
    if (!container) return;
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove, mouseContainer, externalGlobalMousePos, externalMouseOffset]);

  useEffect(() => {
    const el = glassRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      if (r.width && r.height) setGlassSize({ width: r.width, height: r.height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  const metrics = useCallback(() => {
    const el = glassRef.current;
    if (!el || !globalMousePos.x || !globalMousePos.y) return null;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = globalMousePos.x - cx;
    const dy = globalMousePos.y - cy;
    const ex = Math.max(0, Math.abs(dx) - glassSize.width / 2);
    const ey = Math.max(0, Math.abs(dy) - glassSize.height / 2);
    const edgeDistance = Math.sqrt(ex * ex + ey * ey);
    const fade = edgeDistance > ACTIVATION_ZONE ? 0 : 1 - edgeDistance / ACTIVATION_ZONE;
    return { dx, dy, edgeDistance, fade };
  }, [globalMousePos, glassSize]);

  const m = metrics();

  let directionalScale = 'scale(1)';
  if (m && m.edgeDistance <= ACTIVATION_ZONE) {
    const centerDistance = Math.sqrt(m.dx * m.dx + m.dy * m.dy);
    if (centerDistance > 0) {
      const nx = m.dx / centerDistance;
      const ny = m.dy / centerDistance;
      const intensity = Math.min(centerDistance / 300, 1) * elasticity * m.fade;
      const sx = 1 + Math.abs(nx) * intensity * 0.3 - Math.abs(ny) * intensity * 0.15;
      const sy = 1 + Math.abs(ny) * intensity * 0.3 - Math.abs(nx) * intensity * 0.15;
      directionalScale = `scaleX(${Math.max(0.8, sx)}) scaleY(${Math.max(0.8, sy)})`;
    }
  }

  const tx = m ? m.dx * elasticity * 0.1 * m.fade : 0;
  const ty = m ? m.dy * elasticity * 0.1 * m.fade : 0;
  const base = centered
    ? `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px))`
    : `translate(${tx}px, ${ty}px)`;
  const transform = `${base} ${isActive && onClick ? 'scale(0.96)' : directionalScale}`;

  return (
    <div
      ref={glassRef}
      className={className}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      style={{
        position: centered ? 'fixed' : 'relative',
        ...(centered ? { top: '50%', left: '50%' } : null),
        display,
        verticalAlign: 'top',
        cursor: onClick ? 'pointer' : undefined,
        ...style,
        transform,
        transition: 'all ease-out 0.2s',
      }}
      {...rest}
    >
      <GlassSurface
        style={{ width: '100%' }}
        display="flex"
        displacementScale={displacementScale}
        blurAmount={blurAmount}
        saturation={saturation}
        aberrationIntensity={aberrationIntensity}
        cornerRadius={cornerRadius}
        padding={padding}
        overLight={overLight}
        interactive={Boolean(onClick)}
        hovered={isHovered}
        active={isActive}
        mouseOffset={mouseOffset}
        shader={shader}
        refraction={refraction}
        contentStyle={contentStyle}
        gap={gap}
      >
        {children}
      </GlassSurface>
    </div>
  );
}
