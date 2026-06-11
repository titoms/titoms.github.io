/* ============================================================
   HERO VARIANTS — three animated hero concepts
   Rendered inside design-canvas artboards (1280×800).
   Exports to window: HeroV1, HeroV2, HeroV3
   ============================================================ */

/* ---------- shared sequence hook ---------- */
function useSequence(count, { step = 850, hold = 1900, start = 650 } = {}) {
  const [n, setN] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setN(count); return; }
    let t;
    const advance = () => {
      setN((p) => {
        if (p >= count) { t = setTimeout(() => { setN(0); t = setTimeout(advance, step); }, hold); return p; }
        t = setTimeout(advance, step);
        return p + 1;
      });
    };
    t = setTimeout(advance, start);
    return () => clearTimeout(t);
  }, [count]);
  return n;
}

/* ---------- tiny line-icon set ---------- */
const VIcon = ({ name, s = 18 }) => {
  const p = {
    idea: <><circle cx="12" cy="10" r="5"/><path d="M9 18h6M10 21h4"/></>,
    scope: <><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/></>,
    design: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
    stack: <><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 17l9 5 9-5"/></>,
    workflow: <><circle cx="6" cy="6" r="2.4"/><circle cx="18" cy="18" r="2.4"/><path d="M8 6h7a3 3 0 0 1 3 3v6"/></>,
    roadmap: <><path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/></>,
    build: <><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></>,
    autonomy: <><path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6Z"/><path d="m9 12 2 2 4-4"/></>,
    prd: <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></>,
    code: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    agent: <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 10h.01M15 10h.01M9 15h6"/></>,
    deploy: <><path d="M12 2v14M6 8l6-6 6 6"/><path d="M5 22h14"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></>,
    check: <path d="M20 6 9 17l-5-5"/>,
  }[name];
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
};

/* ---------- tool pills ---------- */
const TOOLS = {
  React:          { dot: '#61dafb' },
  'Node.js':      { dot: '#6cc24a' },
  TypeScript:     { mk: 'TS', bg: '#3178c6' },
  'Claude Code':  { dot: '#d97757' },
  Codex:          { dot: '#10a37f' },
  'Design System':{ dot: 'var(--accent-400)' },
  Stripe:         { dot: '#635bff' },
};
const ToolPill = ({ name, className = '', style }) => {
  const t = TOOLS[name] || {};
  return (
    <span className={`tool-pill ${className}`} style={style}>
      {t.mk ? <span className="mk" style={{ background: t.bg }}>{t.mk}</span> : <span className="dot" style={{ background: t.dot }} />}
      {name}
    </span>
  );
};

/* ---------- shared chrome ---------- */
const VNav = () => (
  <nav className="vnav">
    <span className="brand"><span className="glyph">▍</span>fullstackchris<span style={{ color: 'var(--text-low)' }}>.dev</span></span>
    <ul className="links"><li><a href="#">Services</a></li><li><a href="#">Projects</a></li><li><a href="#">Framework</a></li><li><a href="#">About</a></li></ul>
    <a className="vbook" href="#">Book a call</a>
  </nav>
);
const Eyebrow = () => (
  <span className="v-eyebrow"><span className="pulse" />Full-stack development · AI workflows · Technical coaching</span>
);
const CTAs = () => (
  <div className="v-cta">
    <a className="v-btn primary" href="#">Start your project <span className="ar">→</span></a>
    <a className="v-btn secondary" href="#">Explore the AI Clarity Framework</a>
  </div>
);
const Bg = ({ grid = true }) => (
  <><div className="vbg" aria-hidden="true"><span className="vblob b1" /><span className="vblob b2" /><span className="vblob b3" /></div>{grid && <div className="vgrid" aria-hidden="true" style={{ position: 'absolute', inset: 0 }} />}</>
);

/* ============================================================
   VARIANT 1 — Raycast command center
   ============================================================ */
function HeroV1() {
  const ROWS = [
    ['idea', 'Idea', 'Capture the raw, unclear concept'],
    ['scope', 'Scope', 'Features, user flows & priorities'],
    ['design', 'Design', 'Interface & reusable system'],
    ['stack', 'Stack', 'React · Node · TypeScript'],
    ['roadmap', 'Roadmap', 'Milestones & delivery sequence'],
    ['build', 'Build', 'Shipped, deployed & handed over'],
  ];
  const n = useSequence(ROWS.length);
  return (
    <div className="vhero v1 vgrid">
      <Bg grid={false} />
      <VNav />
      <ToolPill name="React" className="float f-anim" style={{ top: 96, left: 52, '--dur': '6.5s' }} />
      <ToolPill name="TypeScript" className="float f-anim" style={{ top: 250, left: 28, '--dur': '8.4s', '--del': '.8s' }} />
      <ToolPill name="Stripe" className="float f-anim" style={{ top: 120, right: 70, '--dur': '7.1s', '--del': '.3s' }} />
      <ToolPill name="Codex" className="float f-anim" style={{ top: 280, right: 36, '--dur': '8s', '--del': '1.1s' }} />
      <ToolPill name="Node.js" className="float f-anim" style={{ bottom: 92, left: 80, '--dur': '7.6s', '--del': '.5s' }} />
      <ToolPill name="Claude Code" className="float f-anim" style={{ bottom: 70, right: 96, '--dur': '6.9s', '--del': '.9s' }} />

      <div className="v1-stage">
        <Eyebrow />
        <h1 className="v-h1">From idea to <span className="grad">buildable web app.</span></h1>
        <p className="v-sub">I help founders, freelancers and small teams clarify, scope and build web projects using React, Node.js, TypeScript and practical AI-assisted development workflows.</p>

        <div className="palette">
          <div className="palette-input">
            <span className="si"><VIcon name="search" s={19} /></span>
            <span className="typed">an app that helps my clients book &amp; pay online<span className="cursor">▍</span></span>
            <span className="kbd">⌘K</span>
          </div>
          <div className="palette-sec">Build plan · AI Clarity Framework</div>
          <div className="palette-list">
            {ROWS.map(([ic, name, desc], i) => (
              <div key={name} className={`prow ${i < n ? 'done' : ''} ${i === n - 1 ? 'active' : ''}`}>
                <span className="picon"><VIcon name={ic} s={17} /></span>
                <span className="pmeta"><span className="pn">{name}</span><span className="pd">{desc}</span></span>
                <span className="pright">⏎ run</span>
              </div>
            ))}
          </div>
          <div className="palette-foot">
            <span className="ftag"><span className="d" />AI Clarity Framework</span>
            <span className="fhints"><span><b>↑↓</b> navigate</span><span><b>⏎</b> select</span></span>
          </div>
        </div>

        <CTAs />
      </div>
    </div>
  );
}

/* ============================================================
   VARIANT 2 — Cursor AI build workflow
   ============================================================ */
function HeroV2() {
  const n = useSequence(6, { step: 900, hold: 2000 });
  const st = (i) => `${i < n ? 'done' : ''} ${i === n - 1 ? 'active' : ''}`;
  const tasksChecked = n >= 4 ? 3 : 0;
  const live = n >= 6;
  return (
    <div className="vhero v2">
      <Bg />
      <VNav />
      <div className="v2-wrap">
        <div className="v2-copy">
          <Eyebrow />
          <h1 className="v-h1">From idea to <span className="grad">buildable web app.</span></h1>
          <p className="v-sub">I help founders, freelancers and small teams clarify, scope and build web projects using React, Node.js, TypeScript and practical AI-assisted development workflows.</p>
          <CTAs />
          <div className="v2-tools">
            <ToolPill name="React" /><ToolPill name="Node.js" /><ToolPill name="TypeScript" /><ToolPill name="Claude Code" />
          </div>
        </div>

        <div className="v2-board">
          {/* PRD */}
          <div className={`bcard ${st(0)}`}>
            <div className="bhead"><span className="bdot"><VIcon name="prd" s={15} /></span><span className="btitle">PRD</span><span className="bstatus">{n > 0 ? 'parsed' : 'draft'}</span></div>
            <div className="b-lines"><span className="b-line w2" /><span className="b-line w1" /><span className="b-line w3 accent" /></div>
          </div>
          {/* Roadmap */}
          <div className={`bcard ${st(1)}`}>
            <div className="bhead"><span className="bdot"><VIcon name="roadmap" s={15} /></span><span className="btitle">Roadmap</span><span className="bstatus">{n > 1 ? 'scoped' : 'queued'}</span></div>
            <div className="b-lines"><span className="b-line w4" /><span className="b-line w2 accent" /><span className="b-line w3" /></div>
          </div>
          {/* Editor (span) */}
          <div className={`bcard span2 ${st(2)}`}>
            <div className="bhead"><span className="bdot"><VIcon name="code" s={15} /></span><span className="btitle">Editor — app.tsx</span>{n >= 3 && <span className="agent-chip" style={{ marginLeft: 'auto' }}><VIcon name="agent" s={12} /> agent writing</span>}</div>
            <div className="editor">
              <div><span className="ln">1</span><span className="c">// generated from scope</span></div>
              <div><span className="ln">2</span><span className="k">export function</span> <span className="f">App</span>() {'{'}</div>
              <div><span className="ln">3</span>&nbsp;&nbsp;<span className="k">return</span> &lt;<span className="f">Booking</span> pay=<span className="s">"stripe"</span> /&gt;<span className="caret" /></div>
              <div><span className="ln">4</span>{'}'}</div>
            </div>
          </div>
          {/* Agent tasks */}
          <div className={`bcard ${st(3)}`}>
            <div className="bhead"><span className="bdot"><VIcon name="agent" s={15} /></span><span className="btitle">Agent tasks</span><span className="bstatus">{tasksChecked}/3</span></div>
            <div className="tasks">
              {['Scaffold routes', 'Wire Stripe checkout', 'Add auth & DB'].map((t, i) => (
                <div key={t} className={`task ${i < tasksChecked ? 'checked' : ''}`}><span className="box"><VIcon name="check" s={11} /></span>{t}</div>
              ))}
            </div>
          </div>
          {/* Design system */}
          <div className={`bcard ${st(4)}`}>
            <div className="bhead"><span className="bdot"><VIcon name="design" s={15} /></span><span className="btitle">Design system</span></div>
            <div className="ds-swatches">
              <span className="ds-sw" style={{ background: 'var(--accent-400)' }} />
              <span className="ds-sw" style={{ background: 'var(--bg-4)' }} />
              <span className="ds-sw" style={{ background: 'var(--positive)' }} />
              <span className="ds-chip">Space Grotesk</span>
            </div>
            <div className="ds-chips"><span className="ds-chip">Button</span><span className="ds-chip">Card</span><span className="ds-chip">Input</span></div>
          </div>
          {/* Deploy */}
          <div className={`deploy ${live ? 'live' : ''}`}>
            <span className="dico"><VIcon name="deploy" s={15} /></span>
            <span className="dlabel">{live ? 'Deployed · buildable app' : 'Deploy'}</span>
            <span className="durl">{live ? 'app.yourstartup.com ✓' : 'pending build…'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   VARIANT 3 — AI Clarity Framework pipeline
   ============================================================ */
function HeroV3() {
  const STAGES = [
    ['idea', 'Idea', 'capture'], ['scope', 'Scope', 'define'], ['design', 'Design', 'system'],
    ['stack', 'Stack', 'choose'], ['workflow', 'Workflow', 'automate'], ['roadmap', 'Roadmap', 'sequence'],
    ['build', 'Build', 'ship'], ['autonomy', 'Autonomy', 'own it'],
  ];
  const n = useSequence(STAGES.length, { step: 720, hold: 2000 });
  const fillPct = Math.max(0, Math.min(1, (n - 1) / (STAGES.length - 1))) * 100;
  return (
    <div className="vhero v3 vgrid">
      <Bg grid={false} />
      <VNav />
      <ToolPill name="React" className="float f-anim" style={{ top: 92, left: 70, '--dur': '6.6s' }} />
      <ToolPill name="Node.js" className="float f-anim" style={{ top: 116, right: 80, '--dur': '7.7s', '--del': '.6s' }} />
      <ToolPill name="TypeScript" className="float f-anim" style={{ top: 210, left: 34, '--dur': '8.3s', '--del': '1s' }} />
      <ToolPill name="Stripe" className="float f-anim" style={{ top: 232, right: 40, '--dur': '7.2s', '--del': '.4s' }} />
      <ToolPill name="Codex" className="float f-anim" style={{ bottom: 78, left: 96, '--dur': '8.1s', '--del': '.9s' }} />
      <ToolPill name="Design System" className="float f-anim" style={{ bottom: 64, right: 110, '--dur': '7.4s', '--del': '1.3s' }} />

      <div className="v3-stage">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18 }}>
          <Eyebrow />
          <span className="v3-framelabel">The AI Clarity Framework</span>
          <h1 className="v-h1">From idea to <span className="grad">buildable web app.</span></h1>
          <p className="v-sub">A clear, repeatable path that turns an unclear idea into a product you can actually build — and eventually run yourself.</p>
        </div>

        <div className="pipeline">
          <div className="track"><div className="fill" style={{ width: fillPct + '%' }} /></div>
          {STAGES.map(([ic, name, sub], i) => (
            <div key={name} className={`pstage ${i < n ? 'done' : ''} ${i === n - 1 ? 'active' : ''}`}>
              <span className="pnode"><VIcon name={ic} s={22} /><span className="pnum">{i + 1}</span></span>
              <span className="plabel">{name}</span>
              <span className="psub">{sub}</span>
            </div>
          ))}
        </div>

        <CTAs />
      </div>
    </div>
  );
}

Object.assign(window, { HeroV1, HeroV2, HeroV3, ToolPill });
