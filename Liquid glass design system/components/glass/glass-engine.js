/**
 * Liquidglass refraction engine.
 *
 * Ported from rdev/liquid-glass-react (MIT) — src/shader-utils.ts, which is
 * itself adapted from shuding/liquid-glass. The original package also shipped
 * three pre-baked displacement bitmaps ("standard", "polar", "prominent").
 * Those binaries are not redistributed here; Liquidglass generates its maps at
 * runtime from the signed-distance field instead, which is the source's
 * "shader" mode — the most accurate of the four.
 */

const smoothStep = (a, b, t) => {
  t = Math.max(0, Math.min(1, (t - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const len = (x, y) => Math.sqrt(x * x + y * y);

const roundedRectSDF = (x, y, width, height, radius) => {
  const qx = Math.abs(x) - width + radius;
  const qy = Math.abs(y) - height + radius;
  return Math.min(Math.max(qx, qy), 0) + len(Math.max(qx, 0), Math.max(qy, 0)) - radius;
};

/** Fragment programs. `liquidGlass` is the source shader, verbatim. */
export const fragmentShaders = {
  liquidGlass: (uv) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const distanceToEdge = roundedRectSDF(ix, iy, 0.3, 0.2, 0.6);
    const displacement = smoothStep(0.8, 0, distanceToEdge - 0.15);
    const scaled = smoothStep(0, 1, displacement);
    return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
  },
  /** Wider, flatter bend — reads better on large panels than on pills. */
  liquidGlassPanel: (uv) => {
    const ix = uv.x - 0.5;
    const iy = uv.y - 0.5;
    const distanceToEdge = roundedRectSDF(ix, iy, 0.4, 0.36, 0.4);
    const displacement = smoothStep(0.55, 0, distanceToEdge - 0.08);
    const scaled = smoothStep(0, 1, displacement);
    return { x: ix * scaled + 0.5, y: iy * scaled + 0.5 };
  },
};

export class ShaderDisplacementGenerator {
  constructor(options) {
    this.options = options;
    this.canvasDPI = 1;
    this.canvas = document.createElement('canvas');
    this.canvas.width = options.width * this.canvasDPI;
    this.canvas.height = options.height * this.canvasDPI;
    this.canvas.style.display = 'none';
    const context = this.canvas.getContext('2d');
    if (!context) throw new Error('Could not get 2D context');
    this.context = context;
  }

  updateShader(mousePosition) {
    const w = this.options.width * this.canvasDPI;
    const h = this.options.height * this.canvasDPI;
    let maxScale = 0;
    const rawValues = [];

    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const pos = this.options.fragment({ x: x / w, y: y / h }, mousePosition);
        const dx = pos.x * w - x;
        const dy = pos.y * h - y;
        maxScale = Math.max(maxScale, Math.abs(dx), Math.abs(dy));
        rawValues.push(dx, dy);
      }
    }
    maxScale = maxScale > 0 ? Math.max(maxScale, 1) : 1;

    const imageData = this.context.createImageData(w, h);
    const data = imageData.data;
    let i = 0;
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        const dx = rawValues[i++];
        const dy = rawValues[i++];
        // Feather the outermost 2px so the filter has no hard seam.
        const edgeFactor = Math.min(1, Math.min(x, y, w - x - 1, h - y - 1) / 2);
        const r = (dx * edgeFactor) / maxScale + 0.5;
        const g = (dy * edgeFactor) / maxScale + 0.5;
        const p = (y * w + x) * 4;
        data[p] = Math.max(0, Math.min(255, r * 255));
        data[p + 1] = Math.max(0, Math.min(255, g * 255));
        data[p + 2] = Math.max(0, Math.min(255, g * 255));
        data[p + 3] = 255;
      }
    }
    this.context.putImageData(imageData, 0, 0);
    return this.canvas.toDataURL();
  }

  destroy() {
    this.canvas.remove();
  }
}

/** Maps are pure functions of (w, h, shader) — cache them across instances. */
const mapCache = new Map();
const MAX_EDGE = 380;
const QUANT = 20;

export function getDisplacementMap(width, height, shader = 'liquidGlass') {
  if (typeof document === 'undefined') return '';
  let w = Math.max(QUANT, Math.round(width / QUANT) * QUANT);
  let h = Math.max(QUANT, Math.round(height / QUANT) * QUANT);
  const scale = Math.min(1, MAX_EDGE / Math.max(w, h));
  w = Math.max(8, Math.round(w * scale));
  h = Math.max(8, Math.round(h * scale));

  const key = `${shader}:${w}x${h}`;
  if (mapCache.has(key)) return mapCache.get(key);

  const gen = new ShaderDisplacementGenerator({ width: w, height: h, fragment: fragmentShaders[shader] });
  const url = gen.updateShader();
  gen.destroy();
  mapCache.set(key, url);
  return url;
}

export const isFirefox = () =>
  typeof navigator !== 'undefined' && navigator.userAgent.toLowerCase().includes('firefox');

/** Chromium is the only engine that renders feDisplacementMap over a backdrop. */
export const supportsRefraction = () => {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent.toLowerCase();
  if (ua.includes('firefox')) return false;
  if (ua.includes('safari') && !ua.includes('chrome') && !ua.includes('chromium')) return false;
  return true;
};

/** backdrop-filter string, matching the source formula exactly. */
export const backdropFor = (blurAmount, saturation, overLight) =>
  `blur(${(overLight ? 12 : 4) + blurAmount * 32}px) saturate(${saturation}%)`;

export const EDGE_INSET_SHADOW =
  '0 0 0 0.5px rgba(255, 255, 255, 0.5) inset, 0 1px 3px rgba(255, 255, 255, 0.25) inset, 0 1px 4px rgba(0, 0, 0, 0.35)';

export const EDGE_MASK = {
  WebkitMask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  WebkitMaskComposite: 'xor',
  mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
  maskComposite: 'exclude',
};

export const edgeGradient = (mouseOffset, baseA, baseB) => `linear-gradient(
  ${135 + mouseOffset.x * 1.2}deg,
  rgba(255, 255, 255, 0.0) 0%,
  rgba(255, 255, 255, ${baseA + Math.abs(mouseOffset.x) * 0.008}) ${Math.max(10, 33 + mouseOffset.y * 0.3)}%,
  rgba(255, 255, 255, ${baseB + Math.abs(mouseOffset.x) * 0.012}) ${Math.min(90, 66 + mouseOffset.y * 0.4)}%,
  rgba(255, 255, 255, 0.0) 100%
)`;
