import { useStagedReveal } from '../../hooks/useStagedReveal';

const VIcon = ({ name, s = 18 }: { name: string; s?: number }) => {
  const paths: Record<string, JSX.Element> = {
    prd:    <><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9Z"/><path d="M14 3v6h6M8 13h8M8 17h5"/></>,
    roadmap:<><path d="M9 4 4 6v14l5-2 6 2 5-2V4l-5 2-6-2Z"/><path d="M9 4v14M15 6v14"/></>,
    code:   <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
    agent:  <><rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 10h.01M15 10h.01M9 15h6"/></>,
    design: <><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></>,
    deploy: <><path d="M12 2v14M6 8l6-6 6 6"/><path d="M5 22h14"/></>,
    check:  <path d="M20 6 9 17l-5-5"/>,
  };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  );
};

export default function Variant2Board() {
  const { ref, n } = useStagedReveal(6, { start: 650, step: 900 });

  const cardCls = (i: number) =>
    `bcard${i < n ? ' done' : ''}${i === n - 1 ? ' active' : ''}`;

  const tasksChecked = n >= 4 ? 3 : 0;
  const live = n >= 6;

  return (
    <div ref={ref} className="v2-board">
      {/* PRD */}
      <div className={cardCls(0)}>
        <div className="bhead">
          <span className="bdot"><VIcon name="prd" s={15} /></span>
          <span className="btitle">PRD</span>
          <span className="bstatus">{n > 0 ? 'parsed' : 'draft'}</span>
        </div>
        <div className="b-lines">
          <span className="b-line w2" />
          <span className="b-line w1" />
          <span className="b-line w3 accent" />
        </div>
      </div>

      {/* Roadmap */}
      <div className={cardCls(1)}>
        <div className="bhead">
          <span className="bdot"><VIcon name="roadmap" s={15} /></span>
          <span className="btitle">Roadmap</span>
          <span className="bstatus">{n > 1 ? 'scoped' : 'queued'}</span>
        </div>
        <div className="b-lines">
          <span className="b-line w4" />
          <span className="b-line w2 accent" />
          <span className="b-line w3" />
        </div>
      </div>

      {/* Editor (span 2) */}
      <div className={`${cardCls(2)} span2`}>
        <div className="bhead">
          <span className="bdot"><VIcon name="code" s={15} /></span>
          <span className="btitle">Editor — app.tsx</span>
          {n >= 3 && (
            <span className="agent-chip" style={{ marginLeft: 'auto' }}>
              <VIcon name="agent" s={12} /> agent writing
            </span>
          )}
        </div>
        <div className="editor">
          <div><span className="ln">1</span><span className="c">{'// generated from scope'}</span></div>
          <div><span className="ln">2</span><span className="k">export function</span> <span className="f">App</span>{'() {'}</div>
          <div><span className="ln">3</span>&nbsp;&nbsp;<span className="k">return</span> {'<'}<span className="f">Booking</span> pay=<span className="s">"stripe"</span> {'/>'}
            <span className="caret" />
          </div>
          <div><span className="ln">4</span>{'}'}</div>
        </div>
      </div>

      {/* Agent tasks */}
      <div className={cardCls(3)}>
        <div className="bhead">
          <span className="bdot"><VIcon name="agent" s={15} /></span>
          <span className="btitle">Agent tasks</span>
          <span className="bstatus">{tasksChecked}/3</span>
        </div>
        <div className="tasks">
          {['Scaffold routes', 'Wire Stripe checkout', 'Add auth & DB'].map((t, i) => (
            <div key={t} className={`task${i < tasksChecked ? ' checked' : ''}`}>
              <span className="box"><VIcon name="check" s={11} /></span>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Design system */}
      <div className={cardCls(4)}>
        <div className="bhead">
          <span className="bdot"><VIcon name="design" s={15} /></span>
          <span className="btitle">Design system</span>
        </div>
        <div className="ds-swatches">
          <span className="ds-sw" style={{ background: 'var(--accent-400)' }} />
          <span className="ds-sw" style={{ background: 'var(--bg-4)' }} />
          <span className="ds-sw" style={{ background: 'var(--positive)' }} />
          <span className="ds-chip">Space Grotesk</span>
        </div>
        <div className="ds-chips">
          <span className="ds-chip">Button</span>
          <span className="ds-chip">Card</span>
          <span className="ds-chip">Input</span>
        </div>
      </div>

      {/* Deploy bar */}
      <div className={`deploy${live ? ' live' : ''}`}>
        <span className="dico"><VIcon name="deploy" s={15} /></span>
        <span className="dlabel">{live ? 'Deployed · buildable app' : 'Deploy'}</span>
        <span className="durl">{live ? 'app.yourstartup.com ✓' : 'pending build…'}</span>
      </div>
    </div>
  );
}
