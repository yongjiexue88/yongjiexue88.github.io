import React, { useState } from 'react';
import { Backdrop } from '../../components/media/Backdrop.jsx';
import { Icon } from '../../components/media/Icon.jsx';
import { GlassSurface } from '../../components/glass/GlassSurface.jsx';
import { Button } from '../../components/forms/Button.jsx';
import { IconButton } from '../../components/forms/IconButton.jsx';
import { Input } from '../../components/forms/Input.jsx';
import { Select } from '../../components/forms/Select.jsx';
import { Switch } from '../../components/forms/Switch.jsx';
import { Slider } from '../../components/forms/Slider.jsx';
import { Radio } from '../../components/forms/Radio.jsx';
import { Card } from '../../components/surfaces/Card.jsx';
import { Panel } from '../../components/surfaces/Panel.jsx';
import { Divider } from '../../components/surfaces/Divider.jsx';
import { Avatar } from '../../components/surfaces/Avatar.jsx';
import { Dialog } from '../../components/surfaces/Dialog.jsx';
import { ImagePlaceholder } from '../../components/surfaces/ImagePlaceholder.jsx';
import { Badge } from '../../components/feedback/Badge.jsx';
import { Progress } from '../../components/feedback/Progress.jsx';
import { Toast } from '../../components/feedback/Toast.jsx';
import { Tooltip } from '../../components/feedback/Tooltip.jsx';
import { Tabs } from '../../components/navigation/Tabs.jsx';
import { Menu } from '../../components/navigation/Menu.jsx';
import { SegmentedControl } from '../../components/navigation/SegmentedControl.jsx';

const SIDEBAR = [
  { value: 'dashboard', label: 'Library', icon: 'layout-grid' },
  { value: 'player', label: 'Now playing', icon: 'headphones' },
  { value: 'settings', label: 'Settings', icon: 'settings' },
];

const TITLES = [
  { title: 'Surface Tension', meta: 'Read · 62%', pct: 62 },
  { title: 'Quiet Systems', meta: 'Audiobook · 4h 12m left', pct: 28 },
  { title: 'Field Notes 2024', meta: 'Unread', pct: 0 },
  { title: 'The Long Compile', meta: 'Read · 100%', pct: 100 },
];

function Rail({ screen, setScreen }) {
  return (
    <Panel
      variant="glass"
      cornerRadius={0}
      padding="24px 18px"
      blurAmount={0.35}
      style={{ width: 232, flex: '0 0 232px', alignSelf: 'stretch' }}
      contentStyle={{ gap: 28, height: '100%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ font: 'var(--lg-type-heading)', letterSpacing: 'var(--lg-tracking-tight)' }}>Liquidglass</span>
        <Badge tone="neutral">Studio</Badge>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {SIDEBAR.map((s) => {
          const on = screen === s.value;
          return (
            <button
              key={s.value}
              onClick={() => setScreen(s.value)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '10px 12px',
                border: 0,
                borderRadius: 'var(--lg-radius-md)',
                cursor: 'pointer',
                font: 'var(--lg-type-label)',
                textAlign: 'left',
                color: on ? 'var(--lg-text-primary)' : 'var(--lg-text-secondary)',
                background: on ? 'var(--lg-white-08)' : 'transparent',
                boxShadow: on ? 'inset 0 0 0 1px var(--lg-white-12)' : 'none',
                transition: 'background var(--lg-duration-base) var(--lg-ease)',
              }}
            >
              <Icon name={s.icon} size={18} />
              {s.label}
            </button>
          );
        })}
      </nav>
      <Divider />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)' }}>
          Storage
        </span>
        <Progress value={38} label="4.2 of 11 gb" size="sm" />
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Avatar name="Author Name" size="sm" />
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ font: 'var(--lg-type-label)' }}>Author Name</span>
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-tertiary)' }}>Signed in</span>
        </div>
      </div>
    </Panel>
  );
}

function Dashboard({ setScreen }) {
  const [tab, setTab] = useState('all');
  const [menu, setMenu] = useState(false);
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28, padding: '32px 36px 40px', overflow: 'hidden' }}>
      <header style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <h1 style={{ font: 'var(--lg-type-title)', margin: 0, letterSpacing: 'var(--lg-tracking-tight)' }}>Library</h1>
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)' }}>4 titles · 1 in progress</span>
        </div>
        <Input variant="solid" placeholder="Search titles" iconLeft={<Icon name="search" size={16} />} fullWidth={false} style={{ width: 240 }} />
        <Tooltip content="Import an epub">
          <IconButton label="Import" variant="glass"><Icon name="plus" size={20} /></IconButton>
        </Tooltip>
        <div style={{ position: 'relative' }}>
          <IconButton label="More" variant="ghost" onClick={() => setMenu(!menu)}><Icon name="more-horizontal" size={20} /></IconButton>
          {menu ? (
            <div style={{ position: 'absolute', right: 0, top: 48, zIndex: 30 }}>
              <Menu
                width={200}
                onSelect={() => setMenu(false)}
                items={[
                  { label: 'Import file…', icon: <Icon name="upload" size={16} />, shortcut: '⌘O' },
                  { label: 'Sync now', icon: <Icon name="refresh-cw" size={16} /> },
                  { divider: true },
                  { label: 'Remove all', tone: 'danger', icon: <Icon name="trash-2" size={16} /> },
                ]}
              />
            </div>
          ) : null}
        </div>
      </header>

      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[{ value: 'all', label: 'All', count: 4 }, { value: 'reading', label: 'Reading', count: 2 }, { value: 'audio', label: 'Audio', count: 1 }]}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
        {TITLES.map((t) => (
          <Card
            key={t.title}
            variant="glass"
            cornerRadius={20}
            padding="16px"
            media={<ImagePlaceholder label="cover 2:3" ratio="2 / 3" radius={10} />}
            title={t.title}
            description={t.meta}
            onClick={() => setScreen('player')}
            footer={t.pct > 0 ? <Progress value={t.pct} size="sm" /> : <Button variant="glass" size="sm" fullWidth>Start</Button>}
          />
        ))}
      </div>

      <Toast
        title="Field Notes 2024 imported"
        tone="success"
        icon={<Icon name="check" size={18} />}
        action={<Button variant="ghost" size="sm">Open</Button>}
        onClose={() => {}}
      >
        Added to your library · 2.4 mb
      </Toast>
    </div>
  );
}

function Player() {
  const [playing, setPlaying] = useState(true);
  const [pos, setPos] = useState(38);
  const [vol, setVol] = useState(72);
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 28, padding: '32px 36px 40px' }}>
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <div style={{ flex: '0 0 260px' }}>
          <ImagePlaceholder label="audiobook art — square" ratio="1 / 1" radius={24} />
        </div>
        <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: 16, minWidth: 0 }}>
          <span style={{ font: 'var(--lg-type-mono)', letterSpacing: 'var(--lg-tracking-caps)', textTransform: 'uppercase', color: 'var(--lg-text-tertiary)' }}>
            Chapter 4 of 11
          </span>
          <h1 style={{ font: 'var(--lg-type-title)', margin: 0, letterSpacing: 'var(--lg-tracking-tighter)' }}>Edges do the work</h1>
          <p style={{ font: 'var(--lg-type-body)', color: 'var(--lg-text-secondary)', margin: 0, maxWidth: 'var(--lg-measure)' }}>
            Quiet Systems · read by the author. Thickness in a flat medium comes from a ring of light, not from a shadow.
          </p>
          <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
            <Button variant="accent" iconLeft={<Icon name="list" size={16} />}>Chapters</Button>
            <Button variant="glass" iconLeft={<Icon name="download" size={16} />}>Download</Button>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'center' }}>
        <GlassSurface
          cornerRadius={32}
          padding="20px 28px"
          display="flex"
          style={{ width: '100%', maxWidth: 720 }}
          contentStyle={{ flexDirection: 'column', gap: 16, width: '100%' }}
        >
          <Slider value={pos} onChange={setPos} displayValue={<span style={{ font: 'var(--lg-type-mono)' }}>18:42 / 48:05</span>} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <IconButton label="Previous chapter" variant="ghost" size="md"><Icon name="skip-back" size={20} /></IconButton>
            <IconButton label="Back 30 seconds" variant="ghost" size="md"><Icon name="rotate-ccw" size={20} /></IconButton>
            <IconButton label={playing ? 'Pause' : 'Play'} variant="accent" size="xl" onClick={() => setPlaying(!playing)}>
              <Icon name={playing ? 'pause' : 'play'} size={24} />
            </IconButton>
            <IconButton label="Forward 30 seconds" variant="ghost" size="md"><Icon name="rotate-cw" size={20} /></IconButton>
            <IconButton label="Next chapter" variant="ghost" size="md"><Icon name="skip-forward" size={20} /></IconButton>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, width: 180 }}>
              <Icon name="volume-2" size={18} />
              <Slider value={vol} onChange={setVol} style={{ flex: 1 }} />
            </div>
          </div>
        </GlassSurface>
      </div>
    </div>
  );
}

function Settings() {
  const [section, setSection] = useState('appearance');
  const [refraction, setRefraction] = useState(true);
  const [motion, setMotion] = useState(true);
  const [blur, setBlur] = useState(6);
  const [confirm, setConfirm] = useState(false);
  const [density, setDensity] = useState('comfortable');
  return (
    <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 24, padding: '32px 36px 40px' }}>
      <h1 style={{ font: 'var(--lg-type-title)', margin: 0, letterSpacing: 'var(--lg-tracking-tight)' }}>Settings</h1>
      <SegmentedControl
        value={section}
        onChange={setSection}
        options={[{ value: 'appearance', label: 'Appearance' }, { value: 'reading', label: 'Reading' }, { value: 'account', label: 'Account' }]}
      />

      <Panel variant="glass" cornerRadius={24} padding="24px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ font: 'var(--lg-type-heading)' }}>Material</span>
          <Switch checked={refraction} onChange={(e) => setRefraction(e.target.checked)} label="Refraction" description="Chromium only. Elsewhere the panes fall back to blur." />
          <Divider />
          <Switch checked={motion} onChange={(e) => setMotion(e.target.checked)} label="Elastic motion" description="Glass leans toward the pointer inside a 200px zone." />
          <Divider />
          <Slider value={blur} min={0} max={40} onChange={setBlur} label="Frosting" displayValue={<span style={{ font: 'var(--lg-type-mono)' }}>{blur}px</span>} />
          <Divider />
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Select variant="solid" label="Theme" value="dark" options={[{ value: 'dark', label: 'Dark' }, { value: 'light', label: 'Light' }, { value: 'system', label: 'Match system' }]} style={{ flex: '1 1 200px' }} />
            <Select variant="solid" label="Accent" value="azure" options={[{ value: 'azure', label: 'Azure' }, { value: 'orchid', label: 'Orchid' }, { value: 'mint', label: 'Mint' }]} style={{ flex: '1 1 200px' }} />
          </div>
        </div>
      </Panel>

      <Panel variant="solid" cornerRadius={24} padding="24px">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ font: 'var(--lg-type-heading)' }}>Density</span>
          <span style={{ font: 'var(--lg-type-caption)', color: 'var(--lg-text-secondary)' }}>
            A solid panel, because a form this dense should not refract.
          </span>
          {[['comfortable', 'Comfortable', 'Default line height and 24px gutters.'], ['compact', 'Compact', 'Tighter leading, 16px gutters.']].map(([v, l, d]) => (
            <Radio key={v} name="density" value={v} checked={density === v} onChange={() => setDensity(v)} label={l} description={d} />
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <Button variant="accent">Save changes</Button>
            <Button variant="ghost" onClick={() => setConfirm(true)}>Reset to defaults</Button>
          </div>
        </div>
      </Panel>

      <Dialog
        open={confirm}
        title="Reset all settings?"
        description="Appearance, reading and sync preferences return to their defaults. Your library is untouched."
        onClose={() => setConfirm(false)}
        footer={
          <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setConfirm(false)}>Cancel</Button>
            <Button variant="accent" onClick={() => setConfirm(false)}>Reset</Button>
          </div>
        }
      />
    </div>
  );
}

export function App() {
  const [screen, setScreen] = useState('dashboard');
  return (
    <Backdrop hue="orchid" style={{ minHeight: '100vh' }} contentStyle={{ display: 'flex', minHeight: '100vh' }}>
      <Rail screen={screen} setScreen={setScreen} />
      {screen === 'dashboard' && <Dashboard setScreen={setScreen} />}
      {screen === 'player' && <Player />}
      {screen === 'settings' && <Settings />}
    </Backdrop>
  );
}
