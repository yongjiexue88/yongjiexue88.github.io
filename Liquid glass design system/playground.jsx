import React, { useState } from 'react';
import { Backdrop } from './components/media/Backdrop.jsx';
import { Icon } from './components/media/Icon.jsx';
import { GlassSurface } from './components/glass/GlassSurface.jsx';
import { LiquidGlass } from './components/glass/LiquidGlass.jsx';
import { Button } from './components/forms/Button.jsx';
import { IconButton } from './components/forms/IconButton.jsx';
import { Slider } from './components/forms/Slider.jsx';
import { Switch } from './components/forms/Switch.jsx';
import { Select } from './components/forms/Select.jsx';
import { Panel } from './components/surfaces/Panel.jsx';
import { Divider } from './components/surfaces/Divider.jsx';
import { Badge } from './components/feedback/Badge.jsx';
import { Progress } from './components/feedback/Progress.jsx';
import { SegmentedControl } from './components/navigation/SegmentedControl.jsx';
import { ImagePlaceholder } from './components/surfaces/ImagePlaceholder.jsx';

const eyebrow = {
  font: 'var(--lg-type-mono)',
  letterSpacing: 'var(--lg-tracking-caps)',
  textTransform: 'uppercase',
  fontSize: 11,
  color: 'var(--lg-text-tertiary)',
};

const DEFAULTS = {
  displacementScale: 70,
  blurAmount: 0.0625,
  saturation: 140,
  aberrationIntensity: 2,
  cornerRadius: 999,
  elasticity: 0.35,
  padding: 24,
  shader: 'liquidGlass',
  overLight: false,
  refraction: true,
  hue: 'azure',
  content: 'button',
};

const NOTES = {
  displacementScale:
    'How hard the pane bends what is behind it. 70 is the system default; 25 for large panels; halved automatically when overLight. Push past 150 and the edge starts to read as a lens artefact.',
  blurAmount:
    'Frosting. Multiplied by 32 and added to a 4px base (12px when overLight). The default 0.0625 is nearly clear, because frosting hides the refraction you paid for. 0.35 is the frosty setting for text-heavy panels.',
  saturation:
    'Colour boost on the sampled backdrop. 140 is the default and reads as glass; above 200 the pane starts tinting the ground.',
  aberrationIntensity:
    'Per-channel offset at the edge — the faint red/blue fringe that makes the pane read as a real lens. 2 is the default. Above 8 it looks like a rendering bug.',
  cornerRadius:
    'Glass needs curvature to show displacement. Controls default to 999 (pill); panels take 24–32. Below 12 the effect disappears and you have a rectangle with a stroke.',
  elasticity:
    'How far the pane leans toward the pointer inside a 200px zone. 0.15 for panels, 0.35 for buttons. Only LiquidGlass reads this — GlassSurface ignores it.',
  padding: 'The glass body inset. 8px 16px on buttons, 24px 32px on panels.',
  shader:
    'liquidGlass is the source field — crisp, correct on controls. liquidGlassPanel bends gently so paragraph text does not smear; use it above roughly 400px.',
  overLight:
    'The light-ground treatment: displacement halves, blur base rises to 12px, a dark scrim goes underneath, and the text shadow drops to zero.',
  refraction:
    'Off ships blur, saturation and the edge stack with no SVG filter — which is what Safari and Firefox see regardless. Toggle it to check your fallback.',
};

function Control({ label, note, children, onPick, active }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button
          onClick={onPick}
          title={onPick ? 'Compare this parameter side by side' : undefined}
          style={{
            font: 'var(--lg-type-mono)', fontSize: 12, textAlign: 'left', padding: '3px 7px', marginLeft: -7,
            border: 0, borderRadius: 7, cursor: onPick ? 'pointer' : 'default',
            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: '1 1 auto', minWidth: 0,
            background: active ? 'var(--lg-fill-accent)' : 'transparent',
            color: active ? '#fff' : 'var(--lg-text-secondary)',
          }}
        >
          {label}
        </button>
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Hide note' : 'Show note'}
          style={{
            marginLeft: 'auto', width: 20, height: 20, display: 'grid', placeItems: 'center',
            borderRadius: 999, border: 0, cursor: 'pointer',
            background: open ? 'var(--lg-fill-accent)' : 'var(--lg-fill-ghost)',
            color: open ? 'var(--lg-neutral-1000)' : 'var(--lg-text-tertiary)',
          }}
        >
          <Icon name="info" size={13} />
        </button>
      </div>
      {children}
      {open ? (
        <p style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)', margin: 0, textWrap: 'pretty' }}>{note}</p>
      ) : null}
    </div>
  );
}

const SWEEPS = {
  displacementScale: { values: [0, 35, 70, 120, 200], fmt: (v) => String(v) },
  blurAmount: { values: [0, 0.0625, 0.2, 0.35, 0.6], fmt: (v) => `${(4 + v * 32).toFixed(0)}px` },
  saturation: { values: [100, 140, 180, 220, 260], fmt: (v) => `${v}%` },
  aberrationIntensity: { values: [0, 2, 5, 8, 12], fmt: (v) => String(v) },
  cornerRadius: { values: [0, 8, 16, 32, 999], fmt: (v) => (v === 999 ? 'pill' : `${v}px`) },
  padding: { values: [8, 16, 24, 36, 48], fmt: (v) => `${v}px` },
  elasticity: { values: [0, 0.15, 0.35, 0.6, 1], fmt: (v) => String(v) },
};

/** The same pane five times, with one parameter swept. Click one to adopt it. */
function SweepStrip({ p, param, onApply }) {
  const sweep = SWEEPS[param];
  if (!sweep) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <span style={{ ...eyebrow, color: p.overLight ? 'var(--lg-neutral-700)' : 'var(--lg-text-tertiary)' }}>
        {param} swept · click to adopt
      </span>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        {sweep.values.map((v) => {
          const q = { ...p, [param]: v };
          const on = p[param] === v;
          return (
            <button
              key={String(v)}
              onClick={() => onApply(v)}
              style={{ border: 0, background: 'transparent', padding: 0, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}
            >
              <GlassSurface
                displacementScale={q.displacementScale}
                blurAmount={q.blurAmount}
                saturation={q.saturation}
                aberrationIntensity={q.aberrationIntensity}
                cornerRadius={q.cornerRadius}
                padding={`${Math.min(q.padding, 18)}px ${Math.round(Math.min(q.padding, 18) * 1.35)}px`}
                shader={q.shader}
                overLight={q.overLight}
                refraction={q.refraction}
                style={{ minWidth: 108 }}
                contentStyle={{ justifyContent: 'center', display: 'flex' }}
              >
                <span style={{ font: 'var(--lg-type-mono)', fontSize: 12 }}>{sweep.fmt(v)}</span>
              </GlassSurface>
              <span style={{ font: 'var(--lg-type-caption)', fontSize: 10, color: on ? 'var(--lg-text-accent)' : 'var(--lg-text-tertiary)' }}>
                {on ? 'current' : `${param} ${v}`}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Sample({ p, kind }) {
  const glassProps = {
    displacementScale: p.displacementScale,
    blurAmount: p.blurAmount,
    saturation: p.saturation,
    aberrationIntensity: p.aberrationIntensity,
    cornerRadius: p.cornerRadius,
    padding: `${p.padding}px ${Math.round(p.padding * 1.35)}px`,
    shader: p.shader,
    overLight: p.overLight,
    refraction: p.refraction,
  };

  if (kind === 'button') {
    return (
      <LiquidGlass {...glassProps} elasticity={p.elasticity} onClick={() => {}}>
        <span style={{ font: 'var(--lg-type-glass-label)', textShadow: p.overLight ? 'none' : 'var(--lg-text-shadow-glass)' }}>
          Read the essay
        </span>
      </LiquidGlass>
    );
  }

  if (kind === 'panel') {
    return (
      <LiquidGlass {...glassProps} elasticity={p.elasticity} display="flex" style={{ width: 'min(480px, 100%)' }} contentStyle={{ flexDirection: 'column', gap: 12 }}>
        <span style={eyebrow}>Essay · 12 min</span>
        <span style={{ font: 'var(--lg-type-heading)', textShadow: p.overLight ? 'none' : 'var(--lg-text-shadow-glass)' }}>
          The cost of a transparent surface
        </span>
        <span style={{ font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)' }}>
          Refraction is the most expensive thing you can put on a screen. A note on when it earns the spend, and when it is just fog.
        </span>
        <Progress value={62} size="sm" />
      </LiquidGlass>
    );
  }

  return (
    <LiquidGlass {...glassProps} elasticity={p.elasticity} display="flex" contentStyle={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
      {['skip-back', 'play', 'skip-forward', 'volume-2'].map((n) => (
        <IconButton key={n} label={n} variant="ghost" size="md" overLight={p.overLight}><Icon name={n} size={20} /></IconButton>
      ))}
    </LiquidGlass>
  );
}

export function Playground() {
  const [p, setP] = useState(DEFAULTS);
  const [sweep, setSweep] = useState('cornerRadius');
  const set = (k) => (v) => setP((s) => ({ ...s, [k]: v }));
  const pick = (k) => () => setSweep(k);

  const code = [
    '<LiquidGlass',
    `  displacementScale={${p.displacementScale}}`,
    `  blurAmount={${Number(p.blurAmount.toFixed(4))}}`,
    `  saturation={${p.saturation}}`,
    `  aberrationIntensity={${p.aberrationIntensity}}`,
    `  cornerRadius={${p.cornerRadius}}`,
    `  elasticity={${p.elasticity}}`,
    `  padding="${p.padding}px ${Math.round(p.padding * 1.35)}px"`,
    p.shader === 'liquidGlassPanel' ? '  shader="liquidGlassPanel"' : null,
    p.overLight ? '  overLight' : null,
    p.refraction ? null : '  refraction={false}',
    '>',
    '  …',
    '</LiquidGlass>',
  ]
    .filter(Boolean)
    .join('\n');

  const blurPx = ((p.overLight ? 12 : 4) + p.blurAmount * 32).toFixed(1);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'stretch' }}>
      <div style={{ flex: 1, minWidth: 0, position: 'sticky', top: 0, alignSelf: 'flex-start', height: '100vh' }}>
        <Backdrop hue={p.overLight ? 'pale' : p.hue} style={{ position: 'absolute', inset: 0 }} contentStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '28px 32px 0', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ ...eyebrow, color: p.overLight ? 'var(--lg-neutral-700)' : 'var(--lg-text-tertiary)' }}>Live sample</span>
            <Badge tone={p.refraction ? 'accent' : 'warning'} dot>{p.refraction ? 'Refraction on' : 'Blur fallback'}</Badge>
            <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
              <SegmentedControl
                size="sm"
                value={p.content}
                onChange={set('content')}
                overLight={p.overLight}
                options={[{ value: 'button', label: 'Control' }, { value: 'panel', label: 'Panel' }, { value: 'dock', label: 'Dock' }]}
              />
            </div>
          </div>

          <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: 32 }}>
            <Sample p={p} kind={p.content} />
          </div>

          <div style={{ padding: '0 32px 28px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <SweepStrip p={p} param={sweep} onApply={set(sweep)} />
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 120, flex: '0 0 120px' }}>
                <ImagePlaceholder label="drop a photo here" ratio="3 / 2" radius={12} />
              </div>
              <span style={{ font: 'var(--lg-type-caption)', color: p.overLight ? 'var(--lg-neutral-700)' : 'var(--lg-text-tertiary)', maxWidth: 420 }}>
                Glass needs light and dark structure behind it to have anything to bend. Click a parameter name on the right to sweep it across five values.
              </span>
            </div>
          </div>
        </Backdrop>
      </div>

      <Panel
        variant="solid"
        cornerRadius={0}
        padding="28px 26px"
        style={{ width: 368, flex: '0 0 368px', alignSelf: 'stretch', borderLeft: '1px solid var(--lg-border-subtle)' }}
        contentStyle={{ gap: 22 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <span style={eyebrow}>Parameters</span>
          <span style={{ font: 'var(--lg-type-heading)' }}>Every prop, live</span>
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)' }}>
            Tap the <Icon name="info" size={12} style={{ verticalAlign: 'middle' }} /> for what a prop does and where it breaks. Click a
            parameter <em>name</em> to sweep it across five values under the sample.
          </span>
        </div>

        <Control label={`displacementScale · ${p.displacementScale}`} note={NOTES.displacementScale} onPick={pick('displacementScale')} active={sweep === 'displacementScale'}>
          <Slider value={p.displacementScale} min={0} max={200} onChange={set('displacementScale')} />
        </Control>
        <Control label={`blurAmount · ${Number(p.blurAmount.toFixed(3))} → ${blurPx}px`} note={NOTES.blurAmount} onPick={pick('blurAmount')} active={sweep === 'blurAmount'}>
          <Slider value={p.blurAmount} min={0} max={0.6} step={0.0125} onChange={set('blurAmount')} />
        </Control>
        <Control label={`saturation · ${p.saturation}%`} note={NOTES.saturation} onPick={pick('saturation')} active={sweep === 'saturation'}>
          <Slider value={p.saturation} min={100} max={260} onChange={set('saturation')} />
        </Control>
        <Control label={`aberrationIntensity · ${p.aberrationIntensity}`} note={NOTES.aberrationIntensity} onPick={pick('aberrationIntensity')} active={sweep === 'aberrationIntensity'}>
          <Slider value={p.aberrationIntensity} min={0} max={12} onChange={set('aberrationIntensity')} />
        </Control>

        <Divider />

        <Control label={`cornerRadius · ${p.cornerRadius}`} note={NOTES.cornerRadius} onPick={pick('cornerRadius')} active={sweep === 'cornerRadius'}>
          <Slider value={p.cornerRadius} min={0} max={999} onChange={set('cornerRadius')} />
        </Control>
        <Control label={`padding · ${p.padding}px`} note={NOTES.padding} onPick={pick('padding')} active={sweep === 'padding'}>
          <Slider value={p.padding} min={4} max={48} onChange={set('padding')} />
        </Control>
        <Control label={`elasticity · ${p.elasticity}`} note={NOTES.elasticity} onPick={pick('elasticity')} active={sweep === 'elasticity'}>
          <Slider value={p.elasticity} min={0} max={1} step={0.05} onChange={set('elasticity')} />
        </Control>

        <Divider />

        <Control label="shader" note={NOTES.shader}>
          <Select
            variant="solid"
            value={p.shader}
            onChange={(e) => set('shader')(e.target.value)}
            options={[{ value: 'liquidGlass', label: 'liquidGlass — controls' }, { value: 'liquidGlassPanel', label: 'liquidGlassPanel — large areas' }]}
          />
        </Control>
        <Control label="overLight" note={NOTES.overLight}>
          <Switch checked={p.overLight} onChange={(e) => set('overLight')(e.target.checked)} label="Light ground" />
        </Control>
        <Control label="refraction" note={NOTES.refraction}>
          <Switch checked={p.refraction} onChange={(e) => set('refraction')(e.target.checked)} label="SVG displacement" />
        </Control>
        <Control label="backdrop hue" note="The ground, not a glass prop — but the single biggest factor in how the pane reads.">
          <Select
            variant="solid"
            value={p.hue}
            onChange={(e) => set('hue')(e.target.value)}
            options={[{ value: 'azure', label: 'Azure' }, { value: 'orchid', label: 'Orchid' }, { value: 'mint', label: 'Mint' }, { value: 'ember', label: 'Ember' }]}
          />
        </Control>

        <Divider />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <span style={eyebrow}>Result</span>
          <pre
            style={{
              margin: 0, padding: '14px 16px', borderRadius: 'var(--lg-radius-md)',
              background: 'var(--lg-neutral-1000)', border: '1px solid var(--lg-border-subtle)',
              font: 'var(--lg-type-mono)', fontSize: 11, lineHeight: 1.6,
              color: 'var(--lg-text-secondary)', overflowX: 'auto',
            }}
          >
            {code}
          </pre>
          <Button variant="ghost" size="sm" iconLeft={<Icon name="rotate-ccw" size={15} />} onClick={() => setP(DEFAULTS)}>
            Reset to system defaults
          </Button>
        </div>
      </Panel>
    </div>
  );
}
