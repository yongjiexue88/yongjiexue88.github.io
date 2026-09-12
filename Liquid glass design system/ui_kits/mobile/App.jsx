import React, { useState } from 'react';
import { Backdrop } from '../../components/media/Backdrop.jsx';
import { Icon } from '../../components/media/Icon.jsx';
import { GlassSurface } from '../../components/glass/GlassSurface.jsx';
import { Button } from '../../components/forms/Button.jsx';
import { IconButton } from '../../components/forms/IconButton.jsx';
import { Input } from '../../components/forms/Input.jsx';
import { Slider } from '../../components/forms/Slider.jsx';
import { Card } from '../../components/surfaces/Card.jsx';
import { Sheet } from '../../components/surfaces/Sheet.jsx';
import { Divider } from '../../components/surfaces/Divider.jsx';
import { ImagePlaceholder } from '../../components/surfaces/ImagePlaceholder.jsx';
import { Badge } from '../../components/feedback/Badge.jsx';
import { Progress } from '../../components/feedback/Progress.jsx';
import { Tag } from '../../components/feedback/Tag.jsx';
import { Dock } from '../../components/navigation/Dock.jsx';
import { SegmentedControl } from '../../components/navigation/SegmentedControl.jsx';

const W = 390;
const H = 844;

const DOCK = [
  { value: 'library', label: 'Library', icon: <Icon name="library" size={22} /> },
  { value: 'reader', label: 'Read', icon: <Icon name="book-open" size={22} /> },
  { value: 'player', label: 'Listen', icon: <Icon name="headphones" size={22} /> },
];

const SHELF = [
  { title: 'Surface Tension', meta: 'Essays · 62%', pct: 62 },
  { title: 'Quiet Systems', meta: 'Audiobook · 28%', pct: 28 },
  { title: 'Field Notes 2024', meta: 'New', pct: 0 },
];

function StatusBar({ overLight }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 26px 0',
        font: 'var(--lg-type-mono)',
        fontSize: 13,
        color: overLight ? 'var(--lg-text-primary)' : '#fff',
        textShadow: overLight ? 'none' : 'var(--lg-text-shadow-glass)',
      }}
    >
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <Icon name="signal" size={14} />
        <Icon name="wifi" size={14} />
        <Icon name="battery-full" size={16} />
      </span>
    </div>
  );
}

function Frame({ label, hue, children, screen, setScreen }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div
        style={{
          width: W,
          height: H,
          borderRadius: 44,
          overflow: 'hidden',
          position: 'relative',
          boxShadow: 'var(--lg-shadow-4)',
        }}
      >
        <Backdrop hue={hue} style={{ width: '100%', height: '100%' }} contentStyle={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <StatusBar />
          {children}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 18, display: 'flex', justifyContent: 'center' }}>
            <Dock items={DOCK} value={screen} onChange={setScreen} elasticity={0.25} />
          </div>
        </Backdrop>
      </div>
      <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)', fontSize: 11 }}>
        {label}
      </span>
    </div>
  );
}

function Library() {
  const [filter, setFilter] = useState('all');
  return (
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 18, padding: '24px 20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h1 style={{ font: 'var(--lg-type-title)', fontSize: 28, margin: 0, letterSpacing: 'var(--lg-tracking-tight)', textShadow: 'var(--lg-text-shadow-glass)' }}>
          Library
        </h1>
        <IconButton label="Search" variant="glass" size="md" style={{ marginLeft: 'auto' }}><Icon name="search" size={20} /></IconButton>
      </div>
      <SegmentedControl
        value={filter}
        onChange={setFilter}
        fullWidth
        size="sm"
        options={[{ value: 'all', label: 'All' }, { value: 'reading', label: 'Reading' }, { value: 'audio', label: 'Audio' }]}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, overflow: 'hidden' }}>
        {SHELF.map((b) => (
          <GlassSurface key={b.title} cornerRadius={20} padding="14px" display="flex" style={{ width: '100%' }} contentStyle={{ flexDirection: 'row', gap: 14, width: '100%', alignItems: 'center' }}>
            <div style={{ width: 56, flex: '0 0 56px' }}>
              <ImagePlaceholder label="2:3" ratio="2 / 3" radius={8} />
            </div>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span style={{ font: 'var(--lg-type-label)', textShadow: 'var(--lg-text-shadow-glass)' }}>{b.title}</span>
              <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)' }}>{b.meta}</span>
              {b.pct > 0 ? <Progress value={b.pct} size="sm" /> : <Tag>Start reading</Tag>}
            </div>
          </GlassSurface>
        ))}
      </div>
    </div>
  );
}

function Reader() {
  const [sheet, setSheet] = useState(false);
  return (
    <div style={{ flex: 1, minHeight: 0, position: 'relative', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'var(--lg-bg-base)', opacity: 0.9 }} />
      <div style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 16, padding: '20px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <IconButton label="Back" variant="ghost" size="sm"><Icon name="chevron-left" size={20} /></IconButton>
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)', marginLeft: 'auto' }}>Chapter 2 · 12 min left</span>
        </div>
        <h2 style={{ font: 'var(--lg-type-heading)', fontSize: 22, margin: 0, letterSpacing: 'var(--lg-tracking-tight)' }}>Edges do the work</h2>
        <p style={{ font: 'var(--lg-type-body)', fontSize: 16, margin: 0, color: 'var(--lg-text-secondary)' }}>
          A pane of glass has no border. It has an edge: a ring of light a pixel and a half wide, brighter where the light would catch and
          dimmer where it would fall away.
        </p>
        <p style={{ font: 'var(--lg-type-body)', fontSize: 16, margin: 0, color: 'var(--lg-text-secondary)' }}>
          Reproduce that ring and the pane reads as thick. Replace it with a flat one-pixel line and the same pane reads as a rectangle with
          a stroke. Nothing else in the stack changes.
        </p>
        <p style={{ font: 'var(--lg-type-body)', fontSize: 16, margin: 0, color: 'var(--lg-text-secondary)' }}>
          Which is why this page is not glass. Body text needs a ground that holds still.
        </p>
      </div>
      <div style={{ position: 'relative', padding: '0 20px 96px', display: 'flex', gap: 10, justifyContent: 'center' }}>
        <GlassSurface cornerRadius={999} padding="8px" display="flex" contentStyle={{ flexDirection: 'row', gap: 4 }}>
          <IconButton label="Text size" variant="ghost" size="md" onClick={() => setSheet(true)}><Icon name="type" size={20} /></IconButton>
          <IconButton label="Bookmark" variant="ghost" size="md"><Icon name="bookmark" size={20} /></IconButton>
          <IconButton label="Contents" variant="ghost" size="md"><Icon name="list" size={20} /></IconButton>
          <IconButton label="Listen instead" variant="ghost" size="md"><Icon name="headphones" size={20} /></IconButton>
        </GlassSurface>
      </div>
      {sheet ? (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', zIndex: 20 }}>
          <div onClick={() => setSheet(false)} style={{ position: 'absolute', inset: 0, background: 'var(--lg-scrim)' }} />
          <Sheet side="bottom" onClose={() => setSheet(false)} style={{ position: 'relative', width: '100%' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ font: 'var(--lg-type-heading)', textShadow: 'var(--lg-text-shadow-glass)' }}>Text</span>
                <IconButton label="Close" variant="ghost" size="sm" onClick={() => setSheet(false)} style={{ marginLeft: 'auto' }}>
                  <Icon name="x" size={18} />
                </IconButton>
              </div>
              <Slider value={62} label="Size" displayValue={<span style={{ font: 'var(--lg-type-mono)' }}>17pt</span>} />
              <Divider />
              <div style={{ display: 'flex', gap: 10 }}>
                <Button variant="glass" size="sm" fullWidth>Sepia</Button>
                <Button variant="accent" size="sm" fullWidth>Dark</Button>
                <Button variant="glass" size="sm" fullWidth>Paper</Button>
              </div>
            </div>
          </Sheet>
        </div>
      ) : null}
    </div>
  );
}

function PlayerScreen() {
  const [playing, setPlaying] = useState(true);
  const [pos, setPos] = useState(44);
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 20, padding: '24px 24px 0', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', fontSize: 11, color: 'var(--lg-text-secondary)' }}>
          Now playing
        </span>
        <Badge tone="accent" dot style={{ marginLeft: 'auto' }}>Offline</Badge>
      </div>
      <ImagePlaceholder label="audiobook art — square" ratio="1 / 1" radius={28} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <span style={{ font: 'var(--lg-type-heading)', fontSize: 22, textShadow: 'var(--lg-text-shadow-glass)' }}>Quiet Systems</span>
        <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)' }}>Chapter 4 · Edges do the work</span>
      </div>
      <GlassSurface cornerRadius={28} padding="18px 20px" display="flex" style={{ width: '100%' }} contentStyle={{ flexDirection: 'column', gap: 14, width: '100%' }}>
        <Slider value={pos} onChange={setPos} displayValue={<span style={{ font: 'var(--lg-type-mono)' }}>21:08 / 48:05</span>} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton label="Back 30 seconds" variant="ghost" size="md"><Icon name="rotate-ccw" size={20} /></IconButton>
          <IconButton label="Previous" variant="ghost" size="md"><Icon name="skip-back" size={20} /></IconButton>
          <IconButton label={playing ? 'Pause' : 'Play'} variant="accent" size="xl" onClick={() => setPlaying(!playing)}>
            <Icon name={playing ? 'pause' : 'play'} size={24} />
          </IconButton>
          <IconButton label="Next" variant="ghost" size="md"><Icon name="skip-forward" size={20} /></IconButton>
          <IconButton label="Speed" variant="ghost" size="md"><Icon name="gauge" size={20} /></IconButton>
        </div>
      </GlassSurface>
    </div>
  );
}

const SCREENS = { library: Library, reader: Reader, player: PlayerScreen };

function Phone({ initial, label, hue }) {
  const [screen, setScreen] = useState(initial);
  const Screen = SCREENS[screen];
  return (
    <Frame label={label} hue={hue} screen={screen} setScreen={setScreen}>
      <Screen />
    </Frame>
  );
}

export function App() {
  return (
    <div style={{ display: 'flex', gap: 40, justifyContent: 'center', padding: '48px 32px' }}>
      <Phone initial="library" label="Library" hue="azure" />
      <Phone initial="reader" label="Reader — solid ground, glass controls" hue="mint" />
      <Phone initial="player" label="Listen" hue="orchid" />
    </div>
  );
}
