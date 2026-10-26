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
/* Get Started hero — advertiser lead form (copy + fields from app.involve.asia/v2/affiliate-advertiser).
   Static: onSubmit is preventDefault (no backend wired yet). */
const GS_COUNTRIES = ['Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Philippines', 'Vietnam', 'Taiwan', 'Hong Kong', 'Other'];
const GS_INDUSTRIES = ['E-commerce & Retail', 'Fashion & Apparel', 'Beauty & Personal Care', 'Electronics', 'Travel & Hospitality', 'Financial Services', 'Food & Beverage', 'Health & Wellness', 'Gaming', 'Other'];
const GS_BUDGETS = ['Under $1,000', '$1,000 – $5,000', '$5,000 – $20,000', '$20,000 – $50,000', '$50,000+'];
function PubHero() {
  // Plan carried from the Pricing page via ?plan= (validated against known plans; nothing else from the URL is used).
  const VALID_PLANS = ['Startup', 'Growth', 'Enterprise'];
  const rawPlan = (typeof window !== 'undefined') ? new URLSearchParams(window.location.search).get('plan') : null;
  const plan = VALID_PLANS.includes(rawPlan) ? rawPlan : null;
  const heading = plan ? `Get started with the ${plan} plan.` : 'Get started with Involve Asia.';
  const interestedPlan = plan || 'Not specified';
  return (
    <section id="get-started-hero" className="prh-sec gs-sec">
      <div className="prh-honey" aria-hidden="true"><PricingHexField /></div>
      <div className="wrap gs-wrap">
        <div className="gs-copy">
          <span className="prh-eyebrow" data-reveal>For Advertisers</span>
          <h1 className="gs-title" data-reveal data-reveal-delay="1">{heading}</h1>
          <p className="gs-sub" data-reveal data-reveal-delay="2">Tell us about your business and our team will help you set up your affiliate program.</p>
          <div className="gs-stats" data-reveal data-reveal-delay="2">
            <div className="gs-stat"><b>1,000,000+</b><span>Global publishers</span></div>
            <div className="gs-stat"><b>$270M+</b><span>Paid to publishers</span></div>
            <div className="gs-stat"><b>$3.2B+</b><span>Sales generated</span></div>
          </div>
        </div>
        <form className="gs-form" data-reveal data-reveal-delay="1" onSubmit={(e) => e.preventDefault()}>
          {plan && <div className="gs-chip">You selected: <b>{plan} plan</b> <a href="pricing.html" className="gs-chip-change">Change</a></div>}
          <input type="hidden" name="interestedPlan" value={interestedPlan} />
          <h2 className="gs-form-title">How can we help you?</h2>
          <fieldset className="gs-fieldset">
            <legend className="gs-legend">Tell us about your business</legend>
            <label className="gs-field"><span className="gs-lbl">Website URL</span>
              <input className="gs-input" type="url" name="websiteUrl" placeholder="https://yourbrand.com" /></label>
            <div className="gs-2col">
              <label className="gs-field"><span className="gs-lbl">Country</span>
                <select className="gs-input gs-select" name="country" defaultValue=""><option value="" disabled>Select country</option>{GS_COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
              <label className="gs-field"><span className="gs-lbl">Industry</span>
                <select className="gs-input gs-select" name="industry" defaultValue=""><option value="" disabled>Select industry</option>{GS_INDUSTRIES.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
            </div>
            <div className="gs-2col">
              <label className="gs-field"><span className="gs-lbl">Average Order Value</span>
                <span className="gs-usd-wrap"><span className="gs-usd">USD</span><input className="gs-input gs-input-usd" type="number" name="aov" placeholder="50" min="0" /></span></label>
              <label className="gs-field"><span className="gs-lbl">Monthly Marketing Spending Budget</span>
                <select className="gs-input gs-select" name="budget" defaultValue=""><option value="" disabled>Select budget</option>{GS_BUDGETS.map((c) => <option key={c} value={c}>{c}</option>)}</select></label>
            </div>
          </fieldset>
          <fieldset className="gs-fieldset">
            <legend className="gs-legend">How can we get in touch?</legend>
            <label className="gs-field"><span className="gs-lbl">Your Name</span>
              <input className="gs-input" type="text" name="name" placeholder="Your name" /></label>
            <div className="gs-2col">
              <label className="gs-field"><span className="gs-lbl">Phone No.</span>
                <input className="gs-input" type="tel" name="phone" placeholder="+60 12 345 6789" /></label>
              <label className="gs-field"><span className="gs-lbl">Company Email</span>
                <input className="gs-input" type="email" name="businessEmail" placeholder="you@company.com" /></label>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-advertiser btn-lg gs-submit">I'm Interested <Arrow /></button>
          <p className="gs-formnote">We'll be in touch within 1–2 business days.</p>
        </form>
      </div>
      <style>{`
        .prh-sec{ position:relative; overflow:visible; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(44px,7vh,80px); }
        .prh-honey{ position:absolute; left:0; top:0; width:100%; height:100%; z-index:0; pointer-events:none; background:var(--warm-50); }
        .prh-hexfield{ position:absolute; inset:0; width:100%; height:100%; opacity:.105;
          -webkit-mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); mask-image:linear-gradient(180deg, transparent 0%, #000 12%, #000 80%, transparent 100%); }
        .prh-hexfield .hx{ will-change:transform; }
        .prh-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--midnight-light);
          background:var(--midnight-light-tint); border-radius:var(--r-full); padding:8px 15px; }
        .gs-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1fr minmax(0,520px); gap:clamp(32px,5vw,72px); align-items:start; }
        .gs-copy{ position:sticky; top:100px; }
        .gs-title{ margin-top:24px; font-size:clamp(28px,3.6vw,44px); line-height:1.08; letter-spacing:-.03em; color:var(--warm-900); max-width:520px; }
        .gs-sub{ margin-top:20px; max-width:460px; font-size:clamp(16px,1.3vw,18px); line-height:1.55; color:var(--warm-600); }
        .gs-stats{ margin-top:clamp(28px,4vh,40px); display:flex; gap:clamp(20px,3vw,40px); flex-wrap:wrap; }
        .gs-stat b{ display:block; font-family:var(--font-display); font-weight:800; font-size:clamp(22px,2.4vw,30px); letter-spacing:-.02em; color:var(--midnight-light); }
        .gs-stat span{ display:block; margin-top:4px; font:400 13px/1.4 var(--font-body); color:var(--warm-600); }
        .gs-form{ background:#fff; border:1px solid var(--warm-200); border-radius:var(--r-lg); box-shadow:0 24px 60px rgba(15,28,46,.10); padding:clamp(24px,3vw,34px); }
        .gs-chip{ display:flex; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:18px; padding:9px 14px; border-radius:var(--r-md); background:var(--midnight-light-tint); font:400 13px/1.4 var(--font-body); color:var(--warm-700); }
        .gs-chip b{ font-weight:700; color:var(--midnight-light); }
        .gs-chip-change{ margin-left:auto; color:var(--midnight-light); font-weight:700; text-decoration:underline; text-underline-offset:2px; }
        .gs-chip-change:hover{ opacity:.82; }
        .gs-form-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(20px,2vw,24px); letter-spacing:-.02em; color:var(--warm-900); }
        .gs-fieldset{ border:none; margin:0; padding:0; margin-top:22px; display:flex; flex-direction:column; gap:14px; }
        .gs-legend{ font:700 12px/1 var(--font-body); letter-spacing:.04em; text-transform:uppercase; color:var(--midnight-light); padding:0; margin-bottom:2px; }
        .gs-2col{ display:grid; grid-template-columns:1fr 1fr; gap:14px; }
        .gs-field{ display:flex; flex-direction:column; gap:6px; min-width:0; }
        .gs-lbl{ font:600 13px/1.3 var(--font-body); color:var(--warm-800); }
        .gs-input{ width:100%; border:1px solid var(--warm-200); border-radius:var(--r-sm); background:#fff; font:400 15px/1.3 var(--font-body); color:var(--warm-900); padding:11px 13px; outline:none; transition:border-color .15s, box-shadow .15s; }
        .gs-input::placeholder{ color:var(--warm-400); }
        .gs-input:focus{ border-color:var(--midnight-light); box-shadow:0 0 0 3px var(--midnight-light-tint); }
        .gs-select{ appearance:none; -webkit-appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%233D5A80' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 13px center; padding-right:34px; cursor:pointer; }
        .gs-usd-wrap{ position:relative; display:flex; align-items:center; }
        .gs-usd{ position:absolute; left:13px; font:600 13px/1 var(--font-body); color:var(--warm-400); pointer-events:none; }
        .gs-input-usd{ padding-left:46px; }
        .gs-submit{ width:100%; margin-top:22px; }
        .gs-formnote{ margin-top:12px; text-align:center; font:400 13px/1.5 var(--font-body); color:var(--warm-400); }
        @media (max-width:900px){
          .gs-wrap{ grid-template-columns:1fr; gap:32px; }
          .gs-copy{ position:static; }
          .gs-title, .gs-sub{ max-width:none; }
        }
        @media (max-width:480px){ .gs-2col{ grid-template-columns:1fr; } }
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

function PricingApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="midnight" />
      <main>
        <PubHero />
        <PubLogos />
      </main>
      <Footer />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PricingApp />);
