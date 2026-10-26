/* ============================================================================
   publishers.jsx — "For Publishers" overview page.
   Loaded AFTER ia-shared.jsx (which defines Nav/Footer/etc. and exposes them on
   window). Sections are built one at a time from the Figma frame (node 1260:46678),
   same flow as the homepage. Motion/animation is a final pass.
   ============================================================================ */

// Shared UI comes from ia-shared.jsx (pulled off window so this works regardless
// of how Babel-standalone scopes each script tag).
const { Nav, Footer, Arrow, BackToTop, useSmoothScroll, useScrollReveal } = window;

/* ---------- Section 1 — Hero ---------------------------------------------- */
/* Decorative honeycomb reused from the final CTA (pub-cta-hexfield.svg), rendered faint blue. */
function PricingHexField() {
  const [paths, setPaths] = React.useState([]);
  const W = 1204.11, H = 1189.86;
  // pad the viewBox to shrink the whole honeycomb (renders ~1/(1+2*pad) of before), closer to Figma's inset deco
  const pad = 0.14;
  const vb = `${-W * pad} ${-H * pad} ${W * (1 + 2 * pad)} ${H * (1 + 2 * pad)}`;
  React.useEffect(() => {
    let alive = true;
    fetch('media/figma/pub-cta-hexfield.svg').then((r) => r.text()).then((txt) => {
      if (!alive) return;
      const out = []; const re = /<path\b([^>]*)>/g; let m;
      while ((m = re.exec(txt))) {
        const attrs = m[1], dm = /\bd="([^"]+)"/.exec(attrs), fm = /\bfill="([^"]+)"/.exec(attrs);
        if (dm && fm && fm[1].toUpperCase() === '#FAC9B9') out.push(dm[1]);
      }
      setPaths(out);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  return (
    <svg className="prh-hexfield" viewBox={vb} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--warm-200)">{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function PubHero() {
  return (
    <section id="pricing-hero" className="prh-sec">
      {/* honeycomb backdrop (same field as the final CTA) — spans the hero + plan cards */}
      <div className="prh-honey" aria-hidden="true"><PricingHexField /></div>
      <div className="wrap prh-wrap">
        <span className="prh-eyebrow" data-reveal>Affiliate Marketing Pricing for Advertisers</span>
        <h1 className="prh-title" data-reveal data-reveal-delay="1">The plan that fits your growth.</h1>
        <p className="prh-sub" data-reveal data-reveal-delay="2">Whether you are launching your first program or scaling an established one,<br />pick the plan that matches your stage.</p>
      </div>
      <style>{`
        .prh-sec{ position:relative; overflow:visible; background:var(--warm-50); padding:clamp(48px,7vh,100px) 0 clamp(36px,5.5vh,64px); }
        /* honeycomb backdrop spans down behind the plan-cards section (which is transparent) */
        .prh-honey{ position:absolute; left:0; top:0; width:100%; height:clamp(960px,118vh,1280px); z-index:0; pointer-events:none; background:var(--warm-50); }
        .prh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:.105;
          -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); }
        .prh-hexfield .hx{ will-change:transform; }
        .prh-wrap{ position:relative; z-index:1; text-align:center; }
        .prh-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--midnight-light);
          background:var(--midnight-light-tint); border-radius:var(--r-full); padding:8px 15px; }
        .prh-title{ margin-top:30px; font-size:clamp(28px,4.2vw,50px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); }
        .prh-sub{ margin:26px auto 0; max-width:730px; font-size:16px; line-height:1.35; color:var(--warm-600); }
      `}</style>
    </section>
  );
}

/* ---------- Section 1b — Plan cards (Startup / Growth / Enterprise) -------- */
const PRICING_PLANS = [
  { key: 'startup', name: 'Startup', desc: 'For brands launching their first affiliate program.',
    price: '$99', unit: '/mo', cta: 'Get started', href: '/advertisers/',
    feats: ['Track up to 100,000 clicks a month', '1 offer setup', 'Single-tier commission', 'Access to the publisher marketplace', 'Dashboard access', 'Helpdesk support'] },
  { key: 'growth', name: 'Growth', desc: 'For brands ready to make affiliates a core growth channel.',
    price: '$499', unit: '/mo', cta: 'Get started', href: '/advertisers/', recommended: true,
    plus: 'Everything in Startup, plus:',
    feats: ['Track up to 1,000,000 clicks a month', 'Up to 3 offer setups', 'Multi-tier commission', 'Up to 3 recruitment campaigns a month', 'Publisher introductions', 'A dedicated account manager', 'Quarterly performance review'] },
  { key: 'enterprise', name: 'Enterprise', desc: 'For large brands with high volumes or custom requirements.',
    price: 'Custom', priceNote: 'Volume-based pricing.', cta: 'Talk to us', href: '/advertisers/',
    plus: 'Everything in Growth, plus:',
    feats: ['A dedicated account manager and priority support', 'Custom volumes, offers, and reporting built around your goals.'] },
];
function PlanCheck() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>);
}
function PricingPlans() {
  return (
    <section id="pricing-plans" className="pp-sec">
      <div className="wrap">
        <div className="pp-grid" data-reveal>
          {PRICING_PLANS.map((p) => (
            <div className={'pp-card' + (p.recommended ? ' pp-rec' : '')} key={p.key}>
              {p.recommended && <span className="pp-badge">Recommended</span>}
              <h3 className="pp-name">{p.name}</h3>
              <p className="pp-desc">{p.desc}</p>
              <div className="pp-price"><span className="pp-amt">{p.price}</span>{p.unit && <span className="pp-unit">{p.unit}</span>}</div>
              {p.priceNote && <p className="pp-pricenote">{p.priceNote}</p>}
              <span className="pp-divider" aria-hidden="true" />
              {p.plus && <p className="pp-plus">{p.plus}</p>}
              <ul className="pp-feats">
                {p.feats.map((f, i) => (<li key={i}><span className="pp-chk" aria-hidden="true"><PlanCheck /></span>{f}</li>))}
              </ul>
              <a href={`get-started.html?plan=${encodeURIComponent(p.name)}`} className="btn btn-advertiser btn-lg pp-cta">{p.cta} <Arrow /></a>
            </div>
          ))}
        </div>
        <p className="pp-terms" data-reveal>All plans include a one-time $1,000 setup and launch fee and a 3-month minimum term.</p>
      </div>
      <style>{`
        .pp-sec{ position:relative; background:transparent; padding:clamp(44px,7vh,80px) 0 clamp(56px,9vh,112px); }
        .pp-terms{ text-align:center; margin-top:clamp(24px,3.4vh,36px); font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        .pp-grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:stretch; max-width:1120px; margin:0 auto; }
        .pp-card{ position:relative; display:flex; flex-direction:column; background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl);
          padding:34px 30px; box-shadow:0 14px 34px rgba(15,28,46,.05); }
        .pp-rec{ margin-top:-24px; padding-top:52px; border-color:transparent; box-shadow:0 30px 68px rgba(15,28,46,.16); z-index:2; }
        .pp-badge{ position:absolute; top:18px; left:50%; transform:translateX(-50%); background:var(--midnight); color:#fff;
          font:700 12px/1 var(--font-body); letter-spacing:.03em; text-transform:uppercase; padding:8px 16px; border-radius:var(--r-full); white-space:nowrap; }
        .pp-name{ font-family:var(--font-display); font-weight:800; font-size:24px; letter-spacing:-.01em; color:var(--warm-900); }
        .pp-desc{ margin-top:8px; font:400 14px/1.45 var(--font-body); color:var(--warm-600); min-height:41px; }
        .pp-price{ margin-top:20px; display:flex; align-items:baseline; gap:6px; }
        .pp-amt{ font-family:var(--font-display); font-weight:800; font-size:48px; line-height:1; letter-spacing:-.02em; color:var(--midnight-light); }
        .pp-unit{ font:500 16px/1 var(--font-body); color:#9a938c; }
        .pp-pricenote{ margin-top:8px; font:400 14px/1.4 var(--font-body); color:var(--warm-600); }
        .pp-divider{ display:block; height:1px; background:var(--warm-200); margin:22px 0; }
        .pp-plus{ font:700 12px/1.3 var(--font-body); letter-spacing:.03em; text-transform:uppercase; color:var(--midnight-light); margin-bottom:14px; }
        .pp-feats{ display:flex; flex-direction:column; gap:12px; margin-bottom:26px; }
        .pp-feats li{ display:flex; align-items:flex-start; gap:11px; font:400 15px/1.4 var(--font-body); color:var(--warm-800); }
        .pp-chk{ flex:0 0 auto; width:20px; height:20px; margin-top:1px; color:var(--midnight-light); }
        .pp-chk svg{ width:100%; height:100%; display:block; }
        .pp-cta{ margin-top:26px; width:100%; }
        .pp-rec .pp-cta{ margin-top:26px; }
        .pp-card > .pp-cta{ margin-top:auto; }
        @media (max-width:900px){
          .pp-grid{ grid-template-columns:1fr; gap:20px; max-width:460px; }
          .pp-rec{ margin-top:0; padding-top:52px; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 1c — "Compare our partnership levels" table ----------- */
// cell value: true = check, false = dash, string = text
const CMP_ROWS = [
  ['Monthly price', '$99', '$499', 'Custom'],
  ['Clicks tracked a month', 'Up to 100,000', 'Up to 1,000,000', 'Custom'],
  ['Offer setups', '1', 'Up to 3', 'Custom'],
  ['Commission structure', 'Single-tier', 'Multi-tier', 'Multi-tier'],
  ['Recruitment campaigns a month', false, 'Up to 3', 'Custom'],
  ['Publisher introductions', false, true, true],
  ['Dedicated account manager', false, true, true],
  ['Priority support', false, false, true],
  ['Quarterly performance review', false, true, true],
  ['Custom offers and reporting', false, false, true],
  ['Publisher marketplace access', true, true, true],
  ['Verified conversions and fraud protection', true, true, true],
  ['Setup and launch fee', '$1,000 one-time', '$1,000 one-time', '$1,000 one-time'],
  ['Minimum term', '3 months', '3 months', '3 months'],
  ['Support', 'Helpdesk', 'Dedicated manager', 'Dedicated manager and priority'],
];
function PricingCompare() {
  const cell = (v) => v === true
    ? <span className="cmp-chk" aria-label="Included"><PlanCheck /></span>
    : v === false ? <span className="cmp-dash" aria-label="Not included">×</span> : v;
  return (
    <section id="pricing-compare" className="cmp-sec">
      <div className="wrap">
        <div className="cmp-head" data-reveal>
          <span className="cmp-eyebrow">Pricing Plans</span>
          <h2 className="cmp-title">Compare our partnership levels</h2>
          <p className="cmp-sub">Simple, transparent pricing engineered to scale your affiliate channel.</p>
        </div>
        <div className="cmp-scroll" data-reveal data-reveal-delay="1">
          <div className="cmp-table">
            <div className="cmp-row cmp-hrow">
              <div className="cmp-c cmp-label-h">Platform features</div>
              <div className="cmp-c cmp-plan">
                <span className="cmp-plan-name">Startup</span>
                <span className="cmp-plan-price">$99<small>/mo</small></span>
                <a href="/advertisers/" className="btn btn-secondary cmp-cta">Get started</a>
              </div>
              <div className="cmp-c cmp-plan cmp-rec">
                <span className="cmp-recbadge">Recommended</span>
                <span className="cmp-plan-name">Growth</span>
                <span className="cmp-plan-price">$499<small>/mo</small></span>
                <a href="/advertisers/" className="btn btn-advertiser cmp-cta">Get started</a>
              </div>
              <div className="cmp-c cmp-plan">
                <span className="cmp-plan-name">Enterprise</span>
                <span className="cmp-plan-price cmp-custom">Custom</span>
                <a href="/advertisers/" className="btn btn-secondary cmp-cta">Talk to sales</a>
              </div>
            </div>
            {CMP_ROWS.map((r, i) => (
              <div className="cmp-row" key={i}>
                <div className="cmp-c cmp-label">{r[0]}</div>
                <div className="cmp-c">{cell(r[1])}</div>
                <div className={'cmp-c cmp-rec' + (i === CMP_ROWS.length - 1 ? ' cmp-rec-last' : '')}>{i === CMP_ROWS.length - 1 ? <b>{cell(r[2])}</b> : cell(r[2])}</div>
                <div className="cmp-c">{cell(r[3])}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .cmp-sec{ background:var(--warm-50); padding:clamp(56px,9vh,110px) 0; }
        .cmp-head{ text-align:center; max-width:720px; margin:0 auto clamp(30px,4.6vh,52px); }
        .cmp-eyebrow{ display:inline-block; font:700 12px/1 var(--font-body); letter-spacing:.08em; text-transform:uppercase; color:var(--midnight-light); background:var(--midnight-light-tint); border-radius:var(--r-full); padding:7px 14px; }
        .cmp-title{ margin-top:16px; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .cmp-sub{ margin-top:12px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .cmp-scroll{ overflow-x:auto; scrollbar-width:thin; }
        .cmp-table{ display:flex; flex-direction:column; min-width:0; max-width:1080px; margin:0 auto;
          background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-xl); overflow:hidden; }
        .cmp-row{ display:grid; grid-template-columns:minmax(220px,1.6fr) repeat(3,minmax(140px,1fr)); }
        .cmp-c{ padding:15px 18px; display:flex; align-items:center; justify-content:center; text-align:center;
          font:400 15px/1.45 var(--font-body); color:var(--warm-800); border-top:1px solid var(--warm-100); }
        .cmp-label{ justify-content:flex-start; text-align:left; color:var(--warm-900); }
        /* recommended (Growth) column tint + top accent */
        .cmp-rec{ background:rgba(61,90,128,.05); }
        .cmp-hrow .cmp-rec{ box-shadow:inset 0 4px 0 var(--midnight); }
        .cmp-rec-last{ border-bottom-left-radius:0; }
        /* header row */
        .cmp-hrow .cmp-c{ border-top:none; align-items:flex-end; padding-top:30px; padding-bottom:22px; }
        .cmp-label-h{ justify-content:flex-start !important; text-align:left; font:700 12px/1 var(--font-body); letter-spacing:.06em; text-transform:uppercase; color:#9a938c; }
        .cmp-plan{ flex-direction:column; align-items:center !important; justify-content:flex-start !important; gap:6px; position:relative; padding-top:30px !important; }
        .cmp-recbadge{ display:inline-block; background:var(--midnight); color:#fff; font:700 11px/1 var(--font-body); letter-spacing:.03em; text-transform:uppercase; padding:6px 12px; border-radius:var(--r-full); margin-bottom:2px; }
        .cmp-plan-name{ font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .cmp-plan-price{ font-family:var(--font-display); font-weight:800; font-size:26px; line-height:1; letter-spacing:-.02em; color:var(--midnight-light); }
        .cmp-plan-price.cmp-custom{ font-size:24px; }
        .cmp-plan-price small{ font:500 13px/1 var(--font-body); color:#9a938c; margin-left:3px; }
        .cmp-cta{ margin-top:10px; width:100%; max-width:190px; }
        .cmp-chk{ display:inline-flex; width:20px; height:20px; color:var(--midnight-light); }
        .cmp-chk svg{ width:100%; height:100%; display:block; }
        .cmp-dash{ color:#c4beb6; }
        /* Awin-style mobile: no side-scroll — feature label sits full-width above the three
           plan values; Growth column stays tinted; plan CTAs (on the cards above) are hidden. */
        @media (max-width:820px){
          .cmp-scroll{ overflow:visible; }
          .cmp-table{ min-width:0; }
          .cmp-row{ grid-template-columns:repeat(3,1fr); }
          .cmp-label{ grid-column:1 / -1; justify-content:flex-start; text-align:left; padding:14px 16px 4px; font:700 14px/1.35 var(--font-body); color:var(--warm-900); }
          .cmp-label-h{ display:none; }
          .cmp-cta{ display:none; }
          .cmp-hrow .cmp-c{ padding-top:18px; padding-bottom:16px; align-items:center; }
          .cmp-plan{ padding-top:18px !important; gap:3px; }
          .cmp-plan-name{ font-size:14px; }
          .cmp-plan-price{ font-size:18px; }
          .cmp-plan-price.cmp-custom{ font-size:15px; }
          .cmp-plan-price small{ font-size:11px; }
          .cmp-recbadge{ font-size:10.5px; padding:4px 8px; margin-bottom:1px; }
          .cmp-c{ padding:9px 8px; font-size:12px; line-height:1.35; }
          .cmp-row:not(.cmp-hrow) .cmp-c{ border-top:none; }
          .cmp-row:not(.cmp-hrow){ border-top:1px solid var(--warm-100); }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 1e — "Every plan comes with the essentials" ----------- */
const PR_ESSENTIALS = [
  { icon: 'users', title: '1,000,000+ publishers', desc: 'Access to over 1,000,000 publishers across retail, travel, beauty, finance, and more.' },
  { icon: 'activity', title: 'Precision tracking', desc: 'Real tracking, down to every click and conversion, in one dashboard.' },
  { icon: 'shield', title: 'Conversion verification', desc: 'Every conversion verified before you pay.' },
  { icon: 'chat', title: 'Dedicated human support', desc: 'Real human support, from day one.' },
];
function EssIcon({ name }) {
  const p = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
    activity: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
    chat: <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
  }[name];
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{p}</svg>;
}
function PricingEssentials() {
  return (
    <section id="pricing-essentials" className="ess-sec">
      <div className="wrap">
        <h2 className="ess-title" data-reveal>Every plan comes with the essentials.</h2>
        <div className="ess-grid" data-reveal data-reveal-delay="1">
          {PR_ESSENTIALS.map((e) => (
            <div className="ess-card" key={e.title}>
              <span className="ess-ic" aria-hidden="true"><EssIcon name={e.icon} /></span>
              <h3 className="ess-ct">{e.title}</h3>
              <p className="ess-cd">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .ess-sec{ background:var(--warm-50); padding:clamp(48px,8vh,100px) 0; }
        .ess-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .ess-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:20px; max-width:1120px; margin:clamp(36px,5vh,56px) auto 0; }
        .ess-card{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); padding:26px 24px; box-shadow:0 10px 26px rgba(15,28,46,.04); }
        .ess-ic{ display:inline-flex; align-items:center; justify-content:center; width:40px; height:40px; border-radius:var(--r-xl); background:var(--midnight-light-tint); color:var(--midnight-light); }
        .ess-ic svg{ width:20px; height:20px; display:block; }
        .ess-ct{ margin-top:18px; font-family:var(--font-display); font-weight:800; font-size:17px; line-height:1.25; letter-spacing:-.01em; color:var(--warm-900); }
        .ess-cd{ margin-top:10px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .ess-grid{ grid-template-columns:repeat(2,1fr); } }
        @media (max-width:520px){ .ess-grid{ grid-template-columns:1fr; max-width:400px; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 1f — "How pricing works, in two clear parts" ---------- */
function HowArrow() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></svg>);
}
function PricingHow() {
  return (
    <section id="pricing-how" className="how-sec">
      <div className="wrap">
        <h2 className="how-title" data-reveal>How pricing works, in two clear parts.</h2>
        <div className="how-grid" data-reveal data-reveal-delay="1">
          <div className="how-col">
            <span className="how-num">1</span>
            <h3 className="how-ct">Your platform plan.</h3>
            <p className="how-cd">A monthly fee (Startup $99, Growth $499, or custom for Enterprise), a one-time $1,000 setup and launch fee, and a 3 month minimum term. This is what you pay Involve to run your program.</p>
            <span className="how-divider" aria-hidden="true" />
            <ul className="how-notes">
              <li><span className="how-arr" aria-hidden="true"><HowArrow /></span>The setup fee covers our team building and launching your program with you, so it goes live set up the right way, not on your own.</li>
              <li><span className="how-arr" aria-hidden="true"><HowArrow /></span>The 3 month minimum gives a new program enough runway to recruit publishers and gather data before you decide what is next.</li>
            </ul>
          </div>
          <div className="how-col">
            <span className="how-num">2</span>
            <h3 className="how-ct">What you pay publishers.</h3>
            <p className="how-cd">A commission you set on each offer, paid only when a publisher drives a real, verified sale. This is the pay-for-results part, so this spend always maps to revenue.</p>
            <span className="how-divider" aria-hidden="true" />
            <div className="how-callout">Affiliate marketing is pure performance. You are completely in control of the commission rates and only pay after validation.</div>
          </div>
        </div>
      </div>
      <style>{`
        .how-sec{ background:var(--warm-50); padding:clamp(48px,8vh,100px) 0; }
        .how-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.02em; color:var(--warm-900); }
        .how-grid{ display:grid; grid-template-columns:1fr 1fr; gap:clamp(40px,6vw,88px); max-width:1080px; margin:clamp(40px,6vh,64px) auto 0; }
        .how-num{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:50%; background:var(--midnight); color:#fff; font:700 14px/1 var(--font-body); }
        .how-ct{ margin-top:16px; font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.01em; color:var(--warm-900); }
        .how-cd{ margin-top:12px; font:400 15px/1.55 var(--font-body); color:var(--warm-600); }
        .how-divider{ display:block; height:1px; background:var(--warm-200); margin:22px 0; }
        .how-notes{ display:flex; flex-direction:column; gap:16px; }
        .how-notes li{ display:flex; align-items:flex-start; gap:12px; font:400 14px/1.5 var(--font-body); color:var(--warm-600); }
        .how-arr{ flex:0 0 auto; width:15px; height:15px; margin-top:3px; color:var(--midnight-light); }
        .how-arr svg{ width:100%; height:100%; display:block; }
        .how-callout{ background:var(--midnight-light-tint); border-radius:var(--r-xl); padding:18px 20px; font:600 14px/1.55 var(--font-body); color:var(--midnight-light); }
        @media (max-width:820px){ .how-grid{ grid-template-columns:1fr; gap:40px; } }
      `}</style>
    </section>
  );
}
/* ---------- Section 2 — Logo strip ---------------------------------------- */
const PUB_LOGOS = [
  ['Apple', 'pub-logo-apple.png', 42],
  ['Nike', 'pub-logo-nike.png', 34],
  ['SHEIN', 'pub-logo-shein.png', 22],
  ['UOB', 'pub-logo-uob.png', 26],
  ['TikTok Shop', 'pub-logo-tiktokshop.png', 60],
  ['airasia', 'pub-logo-airasia.png', 30],
  ['Klook', 'pub-logo-klook.png', 54],
];
function PubLogos() {
  const trackRef = React.useRef(null);
  const marqRef = React.useRef(null);
  const [reps, setReps] = React.useState(2);
  // Repeat the logo set until one loop spans at least the visible strip width, so the
  // marquee never shows a blank gap before the next copy scrolls in.
  React.useEffect(() => {
    const track = trackRef.current, marq = marqRef.current;
    if (!track || !marq) return;
    const imgs = Array.prototype.slice.call(track.querySelectorAll('img'));
    const fit = () => {
      if (imgs.some((im) => !im.complete)) return;         // wait until the logos are measurable
      const baseW = track.scrollWidth / (2 * reps);
      if (baseW < 40) return;
      const need = Math.min(8, Math.max(1, Math.ceil((marq.clientWidth + 8) / baseW)));
      if (need !== reps) setReps(need);
    };
    fit();
    imgs.forEach((im) => im.addEventListener('load', fit));
    window.addEventListener('resize', fit);
    const ro = window.ResizeObserver ? new ResizeObserver(fit) : null;
    if (ro) { ro.observe(track); ro.observe(marq); }
    return () => { imgs.forEach((im) => im.removeEventListener('load', fit)); window.removeEventListener('resize', fit); if (ro) ro.disconnect(); };
  }, [reps]);
  // Auto-sliding + draggable marquee, ported from the homepage TrustStrip. Content is
  // duplicated so wrapping the offset into (-half, 0] loops seamlessly. Reduced-motion =
  // static, drag-only.
  React.useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const norm = (o, half) => { if (!half) return 0; o %= half; if (o > 0) o -= half; return o; };
    const SPEED = 30;                                    // px/sec — subtle
    const s = { offset: 0, half: el.scrollWidth / 2 || 1, dragging: false, startX: 0, startOffset: 0 };
    const draw = () => { el.style.transform = `translate3d(${s.offset.toFixed(1)}px,0,0)`; };
    const row = el.parentElement;
    const onDown = (e) => { s.dragging = true; s.startX = e.clientX; s.startOffset = s.offset; row.classList.add('grabbing'); try { row.setPointerCapture(e.pointerId); } catch (_) {} };
    const onMove = (e) => { if (!s.dragging) return; s.offset = norm(s.startOffset + (e.clientX - s.startX), s.half); draw(); };
    const onUp = (e) => { if (!s.dragging) return; s.dragging = false; row.classList.remove('grabbing'); try { row.releasePointerCapture(e.pointerId); } catch (_) {} };
    row.addEventListener('pointerdown', onDown);
    row.addEventListener('pointermove', onMove);
    row.addEventListener('pointerup', onUp);
    row.addEventListener('pointercancel', onUp);
    row.addEventListener('lostpointercapture', onUp);
    const onResize = () => { s.half = el.scrollWidth / 2 || 1; };
    let raf = 0, last = null;
    if (reduce) { draw(); }
    else {
      const tick = (now) => {
        if (last == null) last = now;
        const dt = Math.min(0.05, (now - last) / 1000); last = now;
        if (!s.dragging) s.offset = norm(s.offset - SPEED * dt, s.half);
        draw();
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
      window.addEventListener('resize', onResize);
    }
    return () => { if (raf) cancelAnimationFrame(raf); window.removeEventListener('resize', onResize); row.removeEventListener('pointerdown', onDown); row.removeEventListener('pointermove', onMove); row.removeEventListener('pointerup', onUp); row.removeEventListener('pointercancel', onUp); row.removeEventListener('lostpointercapture', onUp); };
  }, [reps]);
  const oneLoop = [];
  for (let k = 0; k < reps; k++) oneLoop.push(...PUB_LOGOS);
  const dup = [...oneLoop, ...oneLoop];
  return (
    <section id="pub-logos" className="pl-sec">
      <div className="wrap">
        <p className="pl-cap" data-reveal>Trusted by brands your customers already know, across retail, travel, beauty, and finance.</p>
      </div>
      <div className="pl-marquee" ref={marqRef} data-reveal data-reveal-delay="1">
        <div ref={trackRef} className="pl-track">
          {dup.map(([name, file, h], i) => (
            <img key={i} className="pl-logo" src={`media/figma/${file}`} alt={`${name} logo`} style={{ height: h }} draggable="false" />
          ))}
        </div>
      </div>
      <style>{`
        .pl-sec{ background:var(--warm-50); padding:clamp(28px,4vh,48px) 0 clamp(20px,3vh,36px); }
        .pl-cap{ text-align:center; color:var(--warm-600); font-size:16px; line-height:1.5; max-width:718px; margin:0 auto; }
        .pl-marquee{ margin-top:clamp(22px,3.4vh,38px); overflow:hidden; width:100%; cursor:grab; touch-action:pan-y; user-select:none;
          -webkit-mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
          mask-image:linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
        .pl-marquee.grabbing{ cursor:grabbing; }
        .pl-track{ display:flex; align-items:center; gap:clamp(40px,5.5vw,84px); width:max-content; will-change:transform; }
        .pl-logo{ display:block; width:auto; object-fit:contain; opacity:.9; flex:0 0 auto; -webkit-user-drag:none; user-drag:none; pointer-events:none; }
      `}</style>
    </section>
  );
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Pricing FAQ. Bracketed answers are client placeholders to confirm before launch. */
const PUB_FAQ = [
  ['What do I actually pay publishers?',
    'You set the commission for each offer. Publishers earn it only when they drive a real sale, so your spend maps to revenue.'],
  ['What is the $1,000 setup fee for?',
    'It covers building and launching your program with our team, so it is set up correctly and live quickly.'],
  ['Why a 3 month minimum?',
    'Affiliate programs need runway to recruit publishers and gather data. Three months is enough to see real results.'],
  ['What happens after the three-month minimum?',
    'Your plan continues on a rolling basis, and you can upgrade, downgrade, or cancel it as your program evolves.'],
  ["What happens if I exceed my plan's tracking limit?",
    'If your traffic grows beyond your plan, you can move up to one that fits, and our team will help you make the switch.'],
  ['Can I change plans later?',
    'Yes. Move from Startup to Growth, or up to Enterprise, as your program scales.'],
  ['Which plan should I pick?',
    'Most brands making affiliates a core channel choose Growth. Start with Startup to launch and test, and talk to us for Enterprise volumes. Or get a free growth audit.'],
  ['How are results tracked?',
    'Every click and conversion is tracked to the publisher who drove it, and verified before payout.'],
];
function PubFAQ() {
  const [open, setOpen] = React.useState(() => new Set([0]));
  const toggle = (i) => setOpen((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <section id="pub-faq" className="fq-sec">
      <div className="wrap">
        <h2 className="fq-title" data-reveal>Pricing questions, answered.</h2>
        <div className="fq-list" data-reveal data-reveal-delay="1">
          {PUB_FAQ.map(([q, a], i) => {
            const isOpen = open.has(i);
            return (
              <div className={'fq-item' + (isOpen ? ' open' : '')} key={i}>
                <button type="button" className="fq-q" onClick={() => toggle(i)} aria-expanded={isOpen}>
                  <span>{q}</span>
                  <span className="fq-ic" aria-hidden="true"><i /><i /></span>
                </button>
                <div className="fq-a-wrap"><div className="fq-a"><p>{a}</p></div></div>
              </div>
            );
          })}
        </div>
      </div>
      <style>{`
        .fq-sec{ background:var(--warm-50); padding:clamp(67px,9.66vh,132px) 0 clamp(77px,12.42vh,160px); }
        .fq-title{ text-align:center; font-size:clamp(22px,2.6vw,30px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .fq-list{ margin-top:clamp(32px,5vh,60px); display:flex; flex-direction:column; gap:12px; max-width:1160px; margin-inline:auto; }
        .fq-item{ background:#fff; border:1px solid #e5e7eb; border-radius:var(--r-lg); }
        .fq-q{ width:100%; display:flex; align-items:center; justify-content:space-between; gap:20px; padding:24px; background:none; border:none; cursor:pointer; text-align:left; font:700 18px/1.35 var(--font-body); color:#111122; }
        .fq-ic{ position:relative; width:18px; height:18px; flex:0 0 auto; }
        .fq-ic i{ position:absolute; background:#111110; border-radius:var(--r-sm); }
        .fq-ic i:nth-child(1){ left:0; right:0; top:8px; height:2px; }
        .fq-ic i:nth-child(2){ top:0; bottom:0; left:8px; width:2px; transition:transform .25s ease; }
        .fq-item.open .fq-ic i:nth-child(2){ transform:scaleY(0); }
        .fq-a-wrap{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .3s ease; }
        .fq-item.open .fq-a-wrap{ grid-template-rows:1fr; }
        .fq-a{ overflow:hidden; }
        .fq-a p{ margin:0 24px; padding-bottom:24px; font:400 16px/1.5 var(--font-body); color:#3a3a4a; }
        .fq-a a{ color:var(--midnight-light); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
        .fq-a a:hover{ opacity:.82; }
      `}</style>
    </section>
  );
}

/* ---------- Section 9 — Final CTA + interactive honeycomb ------------------
   Decorative honeycomb (pub-cta-hexfield.svg = 229 pre-split ember hexes). Reuses the
   homepage hero interaction: hexes are pushed radially away from the cursor and ease back. */
function PubCtaHexField() {
  const svgRef = React.useRef(null);
  const [paths, setPaths] = React.useState([]);
  const W = 1204.11, H = 1189.86;
  React.useEffect(() => {
    let alive = true;
    fetch('media/figma/pub-cta-hexfield.svg').then((r) => r.text()).then((txt) => {
      if (!alive) return;
      const out = []; const re = /<path\b([^>]*)>/g; let m;
      while ((m = re.exec(txt))) {
        const attrs = m[1], dm = /\bd="([^"]+)"/.exec(attrs), fm = /\bfill="([^"]+)"/.exec(attrs);
        if (dm && fm && fm[1].toUpperCase() === '#FAC9B9') out.push(dm[1]);
      }
      setPaths(out);
    }).catch(() => {});
    return () => { alive = false; };
  }, []);
  React.useLayoutEffect(() => {
    const svg = svgRef.current;
    if (!svg || !paths.length || prefersReduced()) return;
    const sec = svg.closest('.pc-sec') || svg.parentElement;
    const hexes = Array.from(svg.querySelectorAll('.hx')).map((el) => { const b = el.getBBox(); return { el, cx: b.x + b.width / 2, cy: b.y + b.height / 2, dx: 0, dy: 0 }; });
    const R = 175, MAXPUSH = 34;
    let mx = -9999, my = -9999, active = false, raf = 0;
    const frame = () => {
      let moving = false;
      for (const h of hexes) {
        let tx = 0, ty = 0;
        if (active) {
          const ddx = h.cx - mx, ddy = h.cy - my, dist = Math.hypot(ddx, ddy);
          if (dist < R && dist > 0.01) { const f = 1 - dist / R, push = MAXPUSH * f * f, inv = push / dist; tx = ddx * inv; ty = ddy * inv; }
        }
        h.dx += (tx - h.dx) * 0.2; h.dy += (ty - h.dy) * 0.2;
        if (Math.abs(h.dx) > 0.06 || Math.abs(h.dy) > 0.06) { h.el.setAttribute('transform', `translate(${h.dx.toFixed(2)} ${h.dy.toFixed(2)})`); moving = true; }
        else if (h.dx !== 0 || h.dy !== 0) { h.dx = 0; h.dy = 0; h.el.removeAttribute('transform'); }
      }
      if (active || moving) raf = requestAnimationFrame(frame); else raf = 0;
    };
    // SVG is CSS-flipped vertically (scaleY(-1)), so invert the screen→viewBox Y mapping.
    const onMove = (e) => { const r = svg.getBoundingClientRect(); mx = (e.clientX - r.left) * (W / r.width); my = H - (e.clientY - r.top) * (H / r.height); active = true; if (!raf) raf = requestAnimationFrame(frame); };
    const onLeave = () => { active = false; if (!raf) raf = requestAnimationFrame(frame); };
    sec.addEventListener('mousemove', onMove); sec.addEventListener('mouseleave', onLeave);
    return () => { sec.removeEventListener('mousemove', onMove); sec.removeEventListener('mouseleave', onLeave); if (raf) cancelAnimationFrame(raf); };
  }, [paths]);
  return (
    <svg ref={svgRef} className="pc-hexfield" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <g fill="var(--warm-200)">{paths.map((d, i) => <path key={i} className="hx" d={d} />)}</g>
    </svg>
  );
}
function PubCTA() {
  return (
    <section id="pub-cta" className="pc-sec">
      <PubCtaHexField />
      <span className="pc-topfade" aria-hidden="true" />
      <span className="pc-wash" aria-hidden="true" />
      <div className="wrap pc-inner">
        <h2 className="pc-title" data-reveal>Not sure where to start? We'll help.</h2>
        <p className="pc-sub" data-reveal data-reveal-delay="1">Book a quick call and our team will map out the fastest way to grow your brand with Involve.</p>
        <a href="/advertisers/" className="btn btn-advertiser btn-lg pc-btn" data-reveal data-reveal-delay="2">Talk to us <Arrow /></a>
      </div>
      <style>{`
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(96px,16vh,200px) 0 clamp(104px,17vh,210px); }
        .pc-hexfield{ position:absolute; left:0; top:50%; transform:translateY(-44%) scaleY(-1); width:100%; height:auto; z-index:0; pointer-events:none; opacity:.6;
          -webkit-mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); }
        .pc-hexfield .hx{ will-change:transform; }
        .pc-topfade{ position:absolute; left:0; right:0; top:0; height:clamp(200px,26%,340px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, var(--warm-50) 0%, rgba(250,250,248,.6) 45%, rgba(250,250,248,0) 100%); }
        .pc-wash{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:760px; height:420px; z-index:0; pointer-events:none;
          background:radial-gradient(ellipse at center, var(--warm-50) 32%, rgba(250,250,248,0) 72%); }
        .pc-inner{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .pc-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-sub{ margin-top:14px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:620px; }
        .pc-btn{ margin-top:26px; }
        @media (max-width:700px){ .pc-sec{ padding:clamp(60px,9vh,84px) 0 clamp(68px,10vh,96px); } }
      `}</style>
    </section>
  );
}

function PricingApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="midnight" />
      <main>
        <PubHero />
        <PricingPlans />
        <PricingCompare />
        {/* <PricingAudit /> hidden per request */}
        <PricingEssentials />
        <PricingHow />
        <PubFAQ />
        {/* pricing sections added section-by-section; advertiser-only sections retired */}
        <PubLogos />
        <PubCTA />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PricingApp />);
