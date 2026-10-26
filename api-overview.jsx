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
function PubHero() {
  return (
    <section id="pub-hero" className="ph-sec">
      <div className="ph-hexdeco" aria-hidden="true">
        <img className="phd phd1" src="media/figma/pub-hero-deco1.svg?v=2" alt="" />
        <img className="phd phd2" src="media/figma/pub-hero-deco2.svg?v=2" alt="" />
        <img className="phd phd3" src="media/figma/pub-hero-deco3.svg?v=2" alt="" />
        <img className="phd phd4" src="media/figma/pub-hero-deco4.svg?v=2" alt="" />
      </div>
      <span className="ph-basefade" aria-hidden="true" />
      <div className="wrap ph-wrap">
        <div className="ph-copy">
          <span className="ph-eyebrow" data-reveal>Developer API</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Build and automate with the Involve Asia Developer API.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="1">Pull promotions, generate tracking links, and get your reports, all without logging into the dashboard. Bring affiliate earning into your own app or workflow.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="2">
            <a href="/partners/" className="btn btn-primary btn-lg">Apply for an API Key <Arrow /></a>
            <a href="https://api.involve.asia/docs/" className="btn btn-secondary btn-lg">Read the API docs <Arrow /></a>
          </div>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/api-overview-hero-image.png" alt="Involve Asia API code example: authenticate, list offers, and generate a deeplink" loading="eager" /></div>
        </div>
      </div>

      <style>{`
        .ph-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(40px,6vh,84px) 0 clamp(56px,9vh,116px); }
        /* decorative hexagons (Figma Polygon 64–67) — same size as the slider hexagon (492px), faint */
        .ph-hexdeco{ position:absolute; inset:0; z-index:0; pointer-events:none; overflow:hidden; }
        .phd{ position:absolute; width:492px; height:auto; }
        .phd1{ top:-68%; right:-7%; }
        .phd2{ top:6%; right:-26%; }
        .phd3{ left:31%; bottom:-59%; }
        .phd4{ left:-14%; bottom:-54%; }
        @media (max-width:900px){ .ph-hexdeco{ display:none; } }
        /* gradient blend from the hero into the logo strip below */
        .ph-basefade{ position:absolute; left:0; right:0; bottom:0; height:clamp(120px,24%,240px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, rgba(250,250,248,0) 0%, rgba(250,250,248,.65) 55%, var(--warm-50) 100%); }
        .ph-wrap{ position:relative; z-index:1; display:grid; grid-template-columns:1.02fr .98fr; gap:clamp(24px,4vw,60px); align-items:center; }
        /* copy */
        .ph-copy{ min-width:0; }
        .ph-eyebrow{ display:inline-block; font:700 14px/1 var(--font-body); letter-spacing:-.01em; color:var(--warm-900); }
        .ph-title{ margin-top:16px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
        .ph-sub{ margin-top:20px; max-width:520px; font-size:clamp(16px,1.4vw,19px); line-height:1.55; color:var(--warm-600); }
        .ph-actions{ margin-top:30px; display:flex; gap:12px; flex-wrap:wrap; }
        .ph-free{ display:block; margin-top:16px; font:500 14px/1 var(--font-body); color:var(--warm-400); }
        /* visual */
        /* match the advertiser hero: 1/1 container, 520px; the hexagon mask uses contain so the
           pointy-top hex keeps its 437:492 shape (centred) inside the square, same footprint as the advertiser */
        .ph-visual{ position:relative; aspect-ratio:1/1; max-width:520px; width:100%; margin-left:auto; }
        .ph-hexglow{ position:absolute; inset:2% 2% 2% 2%; z-index:0; pointer-events:none;
          background:radial-gradient(circle at 50% 46%, rgba(240,88,38,.20), rgba(240,88,38,0) 62%); filter:blur(6px); }
        /* soft hex plate behind the photo — rounded pointy-top (r≈38.67), ember → midnight gradient */
        .ph-hexplate{ position:absolute; inset:0; z-index:0; background:var(--warm-100);
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        /* hero visual: code-editor card pre-masked to the hexagon (transparent PNG), sits over the hex plate */
        .ph-heroimg{ position:absolute; inset:0; z-index:2; }
        .ph-heroimg img{ width:100%; height:100%; object-fit:contain; display:block; }
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* hero mockup floats with transparent margins; scale it up (clipped to the hexagon by
           the .ph-photo mask) so it fills the hexagon like the express-withdrawal photo */
        .ph-photo-fill img{ object-fit:contain; transform:scale(1.04); transform-origin:60% 66%; }
        /* slides 1 & 3 are mirrored horizontally (no zoom) */
        .ph-photo img.ph-flip{ transform:scaleX(-1); }
        /* per-slide UI: subtle rise + fade in, synced with the slide */
        .ph-slide-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        .ph-slide-ui > *{ opacity:0; transform:translateY(12px); transition:opacity .7s cubic-bezier(.4,0,.2,1), transform .7s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active .ph-slide-ui > *{ opacity:1; transform:translateY(0); transition-delay:.18s; }
        /* frosted glass box behind every UI element (matches Figma) */
        .ph-glass{ position:absolute; padding:7px; border-radius:var(--r-xl); background:rgba(255,255,255,.30);
          -webkit-backdrop-filter:blur(10px); backdrop-filter:blur(10px); box-shadow:0 14px 34px rgba(15,28,46,.12); }
        .ph-g-link{ border-radius:var(--r-full); padding:6px; top:22%; right:-6%; }
        .ph-g-prod{ left:-3%; bottom:12%; width:26%; max-width:120px; }
        .ph-g-sales{ right:-3%; bottom:8%; }
        .ph-g-conv{ right:-7%; top:15%; }
        .ph-g-pay-a{ left:-7%; top:55%; }
        .ph-g-pay-b{ left:-8%; top:26%; }
        .ph-slide.is-active .ph-slide-ui > .ph-g-pay-b{ opacity:.62; }   /* second payout sits behind, fainter */
        /* single-image hero: static floating pill (above the photo, no slider fade) */
        .ph-static-ui{ position:absolute; inset:0; z-index:3; pointer-events:none; }
        /* inner white cards / pills */
        .ph-link{ display:inline-flex; align-items:center; gap:9px; background:#fff; border-radius:var(--r-full); padding:9px 16px 9px 9px;
          box-shadow:0 2px 6px rgba(15,28,46,.08); font:600 14px/1 var(--font-body); color:var(--warm-900); white-space:nowrap; }
        .ph-link-ic{ display:inline-flex; align-items:center; justify-content:center; width:30px; height:30px; border-radius:var(--r-full);
          background:var(--warm-100); color:var(--warm-700); flex:0 0 auto; }
        .ph-prod-lbl{ display:block; font:500 11px/1.3 var(--font-body); color:#fff; text-shadow:0 3px 8px rgba(0,0,0,.35); margin:1px 2px 7px; }
        .ph-prod-img{ width:100%; aspect-ratio:1/1; object-fit:cover; border-radius:var(--r-lg); display:block; }
        .ph-stat{ background:#fff; border-radius:var(--r-xl); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:12px 15px; display:flex; flex-direction:column; gap:4px; }
        .ph-stat-lbl{ display:inline-flex; align-items:center; gap:6px; font:600 12px/1.2 var(--font-body); color:var(--warm-900); }
        .ph-stat-cur{ display:inline-flex; align-items:center; justify-content:center; width:16px; height:16px; border-radius:var(--r-sm); background:var(--warm-100); font:700 10px/1 var(--font-body); color:var(--warm-800); }
        .ph-stat-row{ display:flex; align-items:baseline; gap:8px; }
        .ph-stat-row b{ font-family:var(--font-display); font-weight:800; font-size:22px; letter-spacing:-.02em; color:var(--warm-900); }
        .ph-stat-row b small{ font-size:.6em; font-weight:800; }
        .ph-stat-row em{ font-style:normal; font-weight:700; font-size:11px; color:#047857; background:#dcfce7; border-radius:var(--r-md); padding:2px 6px; }
        .ph-pay{ display:flex; align-items:center; justify-content:space-between; gap:16px; background:#fff; border-radius:var(--r-lg); box-shadow:0 2px 6px rgba(15,28,46,.08); padding:9px 14px; white-space:nowrap; }
        .ph-pay span{ font:500 13px/1 var(--font-body); color:var(--warm-800); }
        .ph-pay b{ font-family:var(--font-display); font-weight:800; font-size:15px; color:var(--warm-900); }
        .ph-g-pay-b .ph-pay{ padding:9px 14px; }
        @media (max-width:900px){
          .ph-wrap{ grid-template-columns:1fr; gap:36px; }
          .ph-copy{ text-align:center; display:flex; flex-direction:column; align-items:center; }
          .ph-sub{ margin-left:auto; margin-right:auto; }
          /* two CTAs side by side — 2-column, like the homepage hero */
          .ph-actions{ display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px 12px; width:100%; max-width:420px; margin-inline:auto; }
          .ph-actions .btn{ width:100%; justify-content:center; padding:13px 10px; font-size:13px; }
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv{ right:0; }
          .ph-g-prod, .ph-g-pay-a, .ph-g-pay-b{ left:0; }
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['What does the API do?',
    'Build an affiliate app, or add affiliate capabilities to your own platform, populate reports, generate links, access ready-made campaign banners and landing pages, and pull promotional content.'],
  ['Who can use it?',
    'Media buyers, KOL agencies, programmatic and affiliate networks, cashback, and content sites.'],
  ['How many links can I generate?',
    'Up to 1,000 unique links per rolling 30-day window.'],
  ['Which tools can I use?',
    'Postman, cURL, Insomnia, SoapUI, Paw, or any tool that fits your stack.'],
  ['How do I track performance?',
    'Pull the performance report through the API, including individual transactions and custom parameters.'],
  ['What do I need?',
    'A team member with programming experience to set it up.'],
];
function PubFAQ() {
  const [open, setOpen] = React.useState(() => new Set([0]));
  const toggle = (i) => setOpen((prev) => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; });
  return (
    <section id="pub-faq" className="fq-sec">
      <div className="wrap">
        <h2 className="fq-title" data-reveal>Questions, answered.</h2>
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
        .fq-a a{ color:var(--ember); font-weight:600; text-decoration:underline; text-underline-offset:2px; }
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
        <h2 className="pc-title" data-reveal>Start building with the API.</h2>
        <a href="https://app.involve.asia/v2/create-account" className="btn btn-primary btn-lg pc-btn" data-reveal data-reveal-delay="1">Apply for an API Key <Arrow /></a>
      </div>
      <style>{`
        .pc-sec{ position:relative; overflow:hidden; background:var(--warm-50); padding:clamp(96px,16vh,200px) 0 clamp(104px,17vh,210px); }
        .pc-hexfield{ position:absolute; left:0; top:50%; transform:translateY(-44%) scaleY(-1); width:100%; height:auto; z-index:0; pointer-events:none; opacity:.6;
          -webkit-mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); mask-image:linear-gradient(180deg, transparent, #000 16%, #000 84%, transparent); }
        .pc-hexfield .hx{ will-change:transform; }
        /* gradient blend into the section above */
        .pc-topfade{ position:absolute; left:0; right:0; top:0; height:clamp(200px,26%,340px); z-index:0; pointer-events:none;
          background:linear-gradient(180deg, var(--warm-50) 0%, rgba(250,250,248,.6) 45%, rgba(250,250,248,0) 100%); }
        .pc-wash{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:760px; height:420px; z-index:0; pointer-events:none;
          background:radial-gradient(ellipse at center, var(--warm-50) 32%, rgba(250,250,248,0) 72%); }
        .pc-inner{ position:relative; z-index:1; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .pc-title{ font-size:clamp(24px,3vw,34px); line-height:1.15; letter-spacing:-.03em; color:var(--warm-900); max-width:900px; }
        .pc-btn{ margin-top:26px; }
        @media (max-width:700px){ .pc-sec{ padding:clamp(60px,9vh,84px) 0 clamp(68px,10vh,96px); } }
      `}</style>
    </section>
  );
}

/* ---------- Sticky app-download QR (collapsible; sits above Back-to-Top) ---- */
function AppDownload() {
  const [open, setOpen] = React.useState(() => {
    // stay dismissed across publisher pages within the same browser session
    try { return sessionStorage.getItem('ia-appdl-dismissed') !== '1'; } catch (e) { return true; }
  });
  return (
    <div className={'adl' + (open ? ' adl-open' : '')}>
      <div className="adl-card" role="dialog" aria-label="Download the Involve Asia app" aria-hidden={!open}>
        <h3 className="adl-title">Scan to start earning</h3>
        <p className="adl-sub">Sign up and track your earnings on the app.</p>
        <span className="adl-qr"><img src="media/figma/pub-app-qr.png" alt="QR code to download the Involve Asia app" /></span>
        <button type="button" className="adl-dismiss" onClick={() => { try { sessionStorage.setItem('ia-appdl-dismissed', '1'); } catch (e) {} setOpen(false); }}>Maybe later</button>
      </div>
      <button type="button" className="adl-bubble" onClick={() => setOpen(true)} aria-label="Get the Involve Asia app" aria-hidden={open} tabIndex={open ? -1 : 0}>
        <img src="media/figma/pub-app-icon.png" alt="" aria-hidden="true" />
      </button>
      <style>{`
        /* app CTA now sits in the very bottom-right corner … */
        .adl{ position:fixed; right:clamp(16px,2.5vw,28px); bottom:clamp(16px,2.5vw,28px); z-index:95; }
        @media (max-width:600px){ .adl{ display:none !important; } }
        /* … and the Back-to-Top button is pushed up above it (scoped to this page via body specificity) */
        body .b2t{ bottom:calc(clamp(16px,2.5vw,28px) + 76px); }
        .adl-card, .adl-bubble{ position:absolute; right:0; bottom:0; transition:opacity .3s ease, transform .34s cubic-bezier(.22,1,.36,1); }
        /* expanded card (sized down ~20%) */
        .adl-card{ transform-origin:bottom right; width:min(183px, calc(100vw - 32px));
          background:linear-gradient(100.6deg, #F05826 0%, #C43E18 100%); border-radius:13px 13px 0 13px;
          box-shadow:0 15px 36px rgba(15,28,46,.24); padding:18px 18px 16px; display:flex; flex-direction:column; align-items:center; text-align:center; }
        .adl-title{ font-family:var(--font-display); font-weight:800; font-size:14.5px; line-height:1.15; color:#fff; }
        .adl-sub{ margin-top:6px; font:400 11.5px/1.28 var(--font-body); color:rgba(255,255,255,.92); }
        .adl-qr{ margin-top:13px; width:100%; aspect-ratio:1/1; background:#fff; border-radius:var(--r-lg); display:flex; align-items:center; justify-content:center; }
        .adl-qr img{ width:88%; height:88%; object-fit:contain; }
        .adl-dismiss{ margin-top:13px; background:none; border:none; cursor:pointer; font:400 12px/1 var(--font-body); color:#fff; text-decoration:underline; text-underline-offset:2px; }
        .adl-dismiss:hover{ opacity:.85; }
        /* collapsed teardrop bubble (points to the bottom-right corner) */
        .adl-bubble{ width:64px; height:64px; padding:0; border:none; cursor:pointer;
          background:linear-gradient(104.8deg, #F05826 0%, #C43E18 100%); border-radius:50% 50% 0 50%;
          box-shadow:0 10px 22px rgba(240,88,38,.34); display:flex; align-items:center; justify-content:center; }
        .adl-bubble img{ width:34px; height:34px; object-fit:contain; }
        .adl-bubble:hover{ transform:translateY(-2px); box-shadow:0 14px 28px rgba(240,88,38,.42); }
        /* toggle: show card when open, bubble when closed */
        .adl .adl-card{ opacity:0; transform:scale(.9) translateY(8px); pointer-events:none; }
        .adl .adl-bubble{ opacity:1; transform:scale(1); pointer-events:auto; }
        .adl.adl-open .adl-card{ opacity:1; transform:scale(1) translateY(0); pointer-events:auto; }
        .adl.adl-open .adl-bubble{ opacity:0; transform:scale(.6); pointer-events:none; }
        @media (prefers-reduced-motion: reduce){ .adl-card, .adl-bubble{ transition:opacity .2s ease; } }
      `}</style>
    </div>
  );
}
/* ---------- API §2 — "Automate the work, scale your earnings." (4 cards) ---------- */
const AUTO_CARDS = [
  ['api-auto-1.png', 'Get the latest promotion data', 'Commission rates and payout terms for every offer you have access to.'],
  ['api-auto-2.png', 'Generate tracking links', 'Turn product URLs into trackable deeplinks through the API, up to 1,000 unique links every 30 days.'],
  ['api-auto-3.png', 'Pull performance reports', 'Conversions and earnings, in your own format.'],
  ['api-auto-4.png', 'Get campaign banners and vouchers', 'Ready-made creatives and seasonal deals.'],
];
function AutoWork() {
  return (
    <section id="api-auto" className="aw-sec">
      <div className="wrap">
        <h2 className="aw-title" data-reveal>Automate the work, scale your earnings.</h2>
        <div className="aw-grid">
          {AUTO_CARDS.map(([img, t, d], i) => (
            <div className="aw-card" key={t} data-reveal data-reveal-delay={(i % 3) + 1}>
              <div className="aw-visual"><img src={`media/figma/${img}`} alt="" loading="lazy" /></div>
              <h3 className="aw-ct">{t}</h3>
              <p className="aw-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .aw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .aw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .aw-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(18px,2vw,26px); }
        .aw-card{ min-width:0; }
        .aw-visual{ border-radius:var(--r-xl); overflow:hidden; aspect-ratio:290/177; background:var(--warm-100); }
        .aw-visual img{ width:100%; height:100%; object-fit:cover; display:block; }
        .aw-ct{ margin-top:18px; font-family:var(--font-display); font-weight:800; font-size:18px; letter-spacing:-.01em; color:var(--warm-900); }
        .aw-cd{ margin-top:8px; font:400 15px/1.4 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .aw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:26px 22px; } }
        @media (max-width:540px){ .aw-grid{ grid-template-columns:1fr; max-width:360px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- API §3 — "Boosted commissions on Shopee, built in." (promo band) ---------- */
function ShopeeBand() {
  return (
    <section id="api-shopee" className="sb-sec">
      <div className="wrap">
        <div className="sb-card" data-reveal>
          <div className="sb-body">
            <h2 className="sb-title">Boosted commissions on Shopee, built in.</h2>
            <p className="sb-desc">Some Shopee brands pay boosted rates through Commissions XTRA. Pull the full list through the API and refresh it automatically, so you always know which Shopee shops are paying more, and promote them first.</p>
            <a href="shopee-commissions-xtra.html" className="sb-link">Learn More <Arrow /></a>
          </div>
          <div className="sb-visual"><img src="media/figma/api-shopee-xtra.png" alt="Shopee Commissions XTRA" loading="lazy" /></div>
        </div>
      </div>
      <style>{`
        .sb-sec{ background:var(--warm-50); padding:clamp(8px,2vh,24px) 0 clamp(40px,7vh,88px); }
        .sb-card{ background:#fff; border-radius:var(--r-xl); box-shadow:0 1px 3px rgba(15,28,46,.05); padding:clamp(28px,4vw,56px); display:grid; grid-template-columns:1fr minmax(0,392px); gap:clamp(28px,4vw,56px); align-items:center; overflow:hidden; }
        .sb-body{ max-width:560px; }
        .sb-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(22px,2.6vw,32px); line-height:1.14; letter-spacing:-.02em; color:var(--warm-900); }
        .sb-desc{ margin-top:16px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .sb-link{ margin-top:20px; display:inline-flex; align-items:center; gap:7px; font:700 15px/1 var(--font-body); color:var(--ember); }
        .sb-link svg{ width:16px; height:16px; transition:transform .2s ease; }
        .sb-link:hover svg{ transform:translateX(3px); }
        .sb-visual img{ width:100%; height:auto; border-radius:var(--r-xl); display:block; }
        @media (max-width:820px){ .sb-card{ grid-template-columns:1fr; gap:28px; } .sb-visual{ max-width:420px; } }
      `}</style>
    </section>
  );
}
/* ---------- API §4 — "Built for teams that build" (category grid) ---------- */
const TEAM_CATS = [
  ['Product & app teams', 'Surface offers and cashback inside your own app or platform, and earn on what your users buy.'],
  ['High-volume publishers', 'Generate tracking links and sync conversions programmatically, without touching the dashboard.'],
  ['Data-driven teams', 'Pull offers, conversions, and product feeds into your own systems and reporting.'],
];
function BuiltTeams() {
  return (
    <section id="api-teams" className="bt-sec">
      <div className="wrap">
        <div className="bt-grid">
          <div className="bt-head" data-reveal>
            <h2 className="bt-title">Who builds with the API</h2>
            <p className="bt-sub">For teams that run affiliate data and links inside their own systems, through automation.</p>
          </div>
          <div className="bt-cats" data-reveal data-reveal-delay="1">
            {TEAM_CATS.map(([t, d]) => (
              <div className="bt-cat" key={t}>
                <span className="bt-cat-t">{t}</span>
                <span className="bt-cat-d">{d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .bt-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .bt-grid{ display:grid; grid-template-columns:minmax(0,360px) 1fr; gap:clamp(32px,5vw,72px); align-items:start; }
        .bt-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .bt-sub{ margin-top:16px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:340px; }
        .bt-cats{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(22px,3vw,38px) clamp(20px,2.5vw,32px); }
        .bt-cat{ display:flex; flex-direction:column; gap:6px; }
        .bt-cat-t{ font-family:var(--font-display); font-weight:800; font-size:16px; letter-spacing:-.01em; color:var(--warm-900); }
        .bt-cat-d{ font:400 14px/1.35 var(--font-body); color:var(--warm-400); }
        @media (max-width:900px){ .bt-grid{ grid-template-columns:1fr; gap:32px; } .bt-cats{ grid-template-columns:repeat(2,1fr); gap:26px 20px; } }
      `}</style>
    </section>
  );
}
/* ---------- API §5 — "Get started in three steps" ---------- */
const START_STEPS = [
  { t: 'Request your API key', d: 'Request your API key from your dashboard.', cta: true,
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12V6.5a1.8 1.8 0 0 1 3.6 0V11m0-.5a1.8 1.8 0 0 1 3.6 0V12m0-.8a1.8 1.8 0 0 1 3.6 0v3.8a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-5.2-3l-1.9-3.3a1.8 1.8 0 0 1 3.1-1.8L8 12" /></svg> },
  { t: 'Add the key to your tool', d: 'Add the key to your API tool (Postman, cURL, Insomnia, and more).', cta: false,
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><path d="M12 11.5v4M10 13.5h4" /></svg> },
  { t: 'Follow documentation', d: 'Follow the documentation to pull data, generate links, and build.', cta: false,
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5" /><path d="M9 14.5l2 2 4-4" /></svg> },
];
function GetStarted() {
  return (
    <section id="api-start" className="gs-sec">
      <div className="wrap">
        <h2 className="gs-title" data-reveal>Get started in three steps</h2>
        <div className="gs-grid">
          {START_STEPS.map((s, i) => (
            <div className="gs-step" key={s.t} data-reveal data-reveal-delay={i + 1}>
              <span className="gs-ic" aria-hidden="true">{s.ic}</span>
              <h3 className="gs-st">{s.t}</h3>
              <p className="gs-sd">{s.d}</p>
              {s.cta && <a href="/partners/" className="btn btn-primary gs-cta">Apply here <Arrow /></a>}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .gs-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .gs-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .gs-grid{ margin-top:clamp(36px,5vh,56px); display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:clamp(28px,4vw,56px); }
        .gs-step{ display:flex; flex-direction:column; align-items:flex-start; }
        .gs-ic{ width:46px; height:46px; border-radius:var(--r-xl); background:var(--ember-tint); color:var(--ember); display:flex; align-items:center; justify-content:center; }
        .gs-ic svg{ width:23px; height:23px; }
        .gs-st{ margin-top:20px; font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .gs-sd{ margin-top:10px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:320px; }
        .gs-cta{ margin-top:20px; }
        @media (max-width:820px){ .gs-grid{ grid-template-columns:1fr; gap:34px; max-width:420px; margin-inline:auto; } .gs-title{ text-align:left; } }
      `}</style>
    </section>
  );
}
function PublisherApp() {
  useSmoothScroll();
  useScrollReveal();
  return (
    <React.Fragment>
      <Nav getStartedTone="pub" />
      <main>
        <PubHero />
        <AutoWork />
        <ShopeeBand />
        <BuiltTeams />
        <GetStarted />
        <PubFAQ />
        <PubCTA />
      </main>
      <Footer />
      <AppDownload />
      <BackToTop />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<PublisherApp />);
