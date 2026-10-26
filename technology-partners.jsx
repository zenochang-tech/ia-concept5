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
          <span className="ph-eyebrow" data-reveal>For Technology Partners</span>
          <h1 className="ph-title" data-reveal data-reveal-delay="1">Turn the product you've built into revenue.</h1>
          <p className="ph-sub" data-reveal data-reveal-delay="2">Whether you run an app, a web platform, or your own software, integrate once and earn when your users act on the offers and cashback you surface, all through our API.</p>
          <div className="ph-actions" data-reveal data-reveal-delay="3">
            <a href="/partners/" className="btn btn-primary btn-lg">Start Earning <Arrow /></a>
          </div>
          <span className="ph-free" data-reveal data-reveal-delay="3">Free to join. Start earning today.</span>
        </div>

        <div className="ph-visual" data-reveal data-reveal-delay="1">
          <span className="ph-hexglow" aria-hidden="true" />
          <span className="ph-hexplate" aria-hidden="true" />
          <div className="ph-photo ph-photo-fill"><img src="media/figma/tech-partner-hero-img.png?v=2" alt="A technology partner integrating Involve offers into their own product" loading="eager" /></div>
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
        .ph-eyebrow{ display:inline-block; font:600 13px/1 var(--font-body); letter-spacing:.02em; color:var(--ember);
          background:rgba(240,88,38,.10); border-radius:var(--r-full); padding:8px 15px; }
        .ph-title{ margin-top:20px; font-size:clamp(28px,4.4vw,50px); line-height:1.0; letter-spacing:-.03em; color:var(--warm-900); }
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
        /* ---- fade slider: each slide (photo + its UI) cross-fades in/out ---- */
        .ph-slide{ position:absolute; inset:0; z-index:1; opacity:0; transition:opacity .85s cubic-bezier(.4,0,.2,1); }
        .ph-slide.is-active{ opacity:1; z-index:2; }
        @media (prefers-reduced-motion: reduce){ .ph-slide{ transition:none; } }
        .ph-photo{ position:absolute; inset:0; z-index:1;
          -webkit-mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; mask:url('media/figma/pub-hero-hexclip.svg') center/contain no-repeat; }
        .ph-photo img{ width:100%; height:100%; object-fit:cover; display:block; }
        /* creator photo floats with transparent margins; scale it up (clipped to the hexagon by
           the .ph-photo mask) so it fills the hexagon like the express-withdrawal photo */
        .ph-photo-fill img{ object-fit:contain; transform:scale(1.04); transform-origin:50% 54%; }
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
        .ph-g-pay-a{ right:-6%; top:10%; }
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
          .ph-visual{ order:-1; max-width:420px; margin:0 auto; justify-self:center; }
          /* keep the floating UI within the hexagon so the composition stays centred */
          .ph-g-link, .ph-g-sales, .ph-g-conv, .ph-g-pay-a{ right:0; }
          .ph-g-prod, .ph-g-pay-b{ left:0; }
          .ph-g-pay-a{ top:2%; }          /* hero pill moved 8% up on mobile */
          .ph-g-pay-a .ph-pay b{ font-size:13.5px; }   /* number font -10% on mobile */
        }
      `}</style>
    </section>
  );
}

/* ---------- Section 7 — "Hear from publishers like you." (testimonials) --- */
// Testimonials sourced from involve.asia/partners/overview — `quote` is the most impactful
// line pulled from each; `body` is the full testimonial.
const PUB_VOICES = [
  {
    quote: 'I used Involve to start a side income, but now my website generates me a full-time income.',
    body: 'I used Involve to start a side income, but now my website is able to generate me a full-time income. It’s also much better from any site that I have worked with. I like that Involve has strong offers from brands from Southeast Asia, which my audience is.',
    name: 'Tyha Abdullah', avatar: 'publisher-tyhaAbdullah.png', initials: 'TA',
  },
  {
    quote: 'Who would have thought that we would make 5-figure income in just 2 months.',
    body: 'Who would have thought that we would be able to make 5 figure income in just 2 months, definitely Affiliate Marketing with Involve Asia can help us make money online more easily.',
    name: 'Media Terkini', avatar: 'publisher-MediaTerkini.png', initials: 'MT',
  },
  {
    quote: 'There are branded products to promote, and it’s risk-free.',
    body: 'It’s a good chance for people who want to start Affiliate Marketing by using Involve Asia. There are branded products to promote, and it’s risk-free. I don’t see why people wouldn’t want to try.',
    name: 'Weng Hoon', avatar: 'pub-voice-wenghonn.png',
  },
  {
    quote: 'For the first time, I hit 5-digits in commissions and peaked during the 11.11 Sales.',
    body: 'I started to push in promoting Offers at the beginning of 2020 on my website and Facebook page. Later, in July 2020, for the first time, I hit 5-digits in commissions and peaked in November during the 11.11 Sales.',
    name: 'Promocodes.My', avatar: 'publisher-promoCodesMy.png', initials: 'PM',
  },
  {
    quote: 'Involve Asia is always the perfect choice for us to gain commission from our promoted products.',
    body: 'Involve Asia is always the perfect choice for Vocket in order for us to gain commission from our promoted products. Most importantly, with Involve Asia we gain conversions directly from the promoted products with their affiliate links.',
    name: 'The Vocket', avatar: 'publisher-vocket.png', initials: 'TV',
  },
  {
    quote: 'We couldn’t have done it without this valuable partnership.',
    body: 'Thanks to Involve Asia support, then only we can continue to provide high-quality content to our audience while earning a decent affiliate commission. We couldn’t have done it without this valuable partnership.',
    name: 'My Weekend Plan', avatar: 'publisher-weekendPlan.png', initials: 'MW',
  },
  {
    quote: 'I find it user-friendly and convenient to browse and search for Offers in the dashboard.',
    body: 'With Involve Asia, I find it user-friendly and convenient to browse and search for Offers in the dashboard. The filters provide me options to choose from so I can promote suitable Offers for my followers.',
    name: 'MY Great Sales', avatar: 'publisher-myGreatSales.png', initials: 'MG',
  },
  {
    quote: 'Such a good overall experience with IA, very friendly & professional.',
    body: 'Had such a good overall experience with IA esp Jia who assisted us – very friendly & professional consultations. She was thorough & informative. IA helps increase and gain pretty good income from the generated link.',
    name: 'Siakap Keli', avatar: 'publisher-siakapkeli.png', initials: 'SK',
  },
  {
    quote: 'It’s a win-win situation.',
    body: 'Keep making videos that are informational, not just for yourself, but for your audience too. Your audience believes in you and this is one way for them to support their favorite YouTubers while also helping themselves purchase products. It’s a win-win situation.',
    name: 'Fazli Halim', avatar: 'publisher-fazlihalim.png', initials: 'FH',
  },
];
function PubVoices() {
  const [i, setI] = React.useState(0);
  const N = PUB_VOICES.length;
  const mod = (n) => ((n % N) + N) % N;
  const go = (d) => setI((v) => mod(v + d));
  // auto-advance every 4.5s; timer resets whenever the slide changes (manual or auto)
  React.useEffect(() => {
    if (prefersReduced()) return;
    const t = setTimeout(() => setI((v) => mod(v + 1)), 4500);
    return () => clearTimeout(t);
  }, [i]);
  const DX = 300;   // horizontal gap between neighbouring card positions (px)
  return (
    <section id="pub-voices" className="tv-sec">
      <div className="tv-panel">
        <h2 className="tv-title" data-reveal>Hear from publishers like you.</h2>
        <p className="tv-sub" data-reveal data-reveal-delay="1">Real people earning on the platform, in their own words.</p>
        <div className="tv-stage" data-reveal data-reveal-delay="1">
          {/* every card is positioned by its offset from the active index; changing `i` slides them all */}
          {PUB_VOICES.map((v, j) => {
            let d = (j - i + N) % N; if (d > N / 2) d -= N;          // signed shortest distance
            const near = Math.abs(d);
            const scale = d === 0 ? 1 : near === 1 ? 0.92 : 0.88;
            const ty = d === 0 ? '0%' : '20%';                       // neighbours sit 20% lower
            const op = d === 0 ? 1 : near === 1 ? 0.3 : 0;           // neighbours faint; further hidden
            const z = d === 0 ? 3 : near === 1 ? 2 : 1;
            const style = {
              transform: `translateX(-50%) translateX(${d * DX}px) translateY(${ty}) scale(${scale})`,
              opacity: op, zIndex: z, pointerEvents: d === 0 ? 'auto' : 'none',
            };
            return (
              <article key={j} className={'tv-card' + (d === 0 ? ' is-active' : '')} style={style} aria-hidden={d !== 0}>
                <p className="tv-quote">&ldquo;{v.quote}&rdquo;</p>
                <p className="tv-body">{v.body}</p>
                <div className="tv-author">
                  {v.avatar
                    ? <img className="tv-avatar" src={`media/figma/${v.avatar}`} alt="" />
                    : <span className="tv-avatar tv-avatar-mono" aria-hidden="true">{v.initials}</span>}
                  <span className="tv-name">{v.name}</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="tv-nav" data-reveal data-reveal-delay="1">
          <button type="button" className="tv-arrow" onClick={() => go(-1)} aria-label="Previous testimonial">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" className="tv-arrow" onClick={() => go(1)} aria-label="Next testimonial">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </div>
      </div>
      <style>{`
        .tv-sec{ background:var(--warm-50); padding:clamp(28px,4.14vh,55px) 0 clamp(67px,9.66vh,132px); }
        .tv-panel{ position:relative; max-width:1273px; margin:0 auto; padding:clamp(48px,7vh,90px) clamp(20px,4vw,56px) clamp(40px,6vh,72px); border-radius:clamp(28px,4vw,64px); overflow:hidden;
          background:var(--warm-100); }
        .tv-title{ text-align:center; font-size:clamp(24px,3vw,34px); line-height:1.1; letter-spacing:-.03em; color:var(--warm-900); }
        .tv-sub{ text-align:center; margin-top:14px; font-size:16px; color:var(--warm-700); }
        .tv-stage{ position:relative; margin-top:clamp(28px,4vh,44px); min-height:392px; }
        .tv-card{ position:absolute; left:50%; top:0; width:min(535px,86vw); height:322px; box-sizing:border-box; transform-origin:center top;
          background:#fff; border:1.4px solid #f4f4f0; border-radius:var(--r-xl); box-shadow:0 6px 14px rgba(0,0,0,.08); padding:30px 32px; display:flex; flex-direction:column; gap:18px;
          transition:transform .62s cubic-bezier(.32,.72,0,1), opacity .62s cubic-bezier(.32,.72,0,1); will-change:transform,opacity; }
        .tv-card.is-active{ box-shadow:0 16px 40px rgba(15,28,46,.14); }
        .tv-quote{ font:700 16px/1.32 var(--font-body); color:var(--warm-700); }
        .tv-body{ font:400 16px/1.32 var(--font-body); color:var(--warm-700); }
        .tv-author{ display:flex; align-items:center; gap:16px; margin-top:auto; }   /* pin to bottom of the fixed-height card */
        .tv-avatar{ width:56px; height:56px; border-radius:50%; object-fit:cover; flex:0 0 auto; }
        .tv-avatar-mono{ display:flex; align-items:center; justify-content:center; background:linear-gradient(150deg,#fbe4d8,#e7edf7); color:var(--warm-900);
          font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; }
        .tv-name{ font-family:var(--font-body); font-weight:700; font-size:16px; color:var(--warm-900); }
        .tv-nav{ display:flex; justify-content:center; gap:16px; margin-top:clamp(20px,3vh,34px); }
        .tv-arrow{ width:44px; height:44px; border-radius:50%; border:none; background:var(--warm-900); color:#fff; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:opacity .15s, transform .15s; }
        .tv-arrow:hover{ opacity:.85; }
        .tv-arrow:active{ transform:scale(.94); }
        @media (max-width:900px){ .tv-card{ width:min(440px,88vw); } .tv-card:not(.is-active){ opacity:0 !important; } }
        @media (prefers-reduced-motion: reduce){ .tv-card{ transition:none; } }
      `}</style>
    </section>
  );
}

/* ---------- Section 8 — "Questions, answered." (FAQ accordion) ------------
   Copy supplied by the client. Two answers carry links (beginner guide, Express
   Withdrawal) — hrefs are placeholders pending the real URLs. Example figures
   (4.2% commission, 10 working days) are illustrative — confirm before launch. */
const PUB_FAQ = [
  ['What can the API do?',
    'Generate deeplinks, pull offers and product data, and track sales at item level. Deeplink generation is capped at 1,000 per rolling 30 days.'],
  ['How does postback work?',
    'When a conversion is created or updated, we send the data to a URL you configure, so your system is notified in real time. You handle the received data on your own server.'],
  ['Can I pull a product datafeed?',
    'Yes. Pull live product data per advertiser to surface in your product. Feeds vary by advertiser.'],
  ['How technical is the integration?',
    "You'll need a developer to set up the API and postback, but the docs are clear and the endpoints are simple."],
  ['What kind of products qualify?',
    'Apps, web apps, software, and platforms with their own users.'],
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
        <h2 className="pc-title" data-reveal>Turn your product into revenue.</h2>
        <a href="https://app.involve.asia/v2/create-account" className="btn btn-primary btn-lg pc-btn" data-reveal data-reveal-delay="1">Start Earning <Arrow /></a>
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
/* ---------- CC §2 — "Made for TikTok, YouTube, Instagram, and more." ---------- */
const MADE_POINTS = [
  ['Runs inside your own product.', 'One API integration puts offers, links, and tracking inside your app, web platform, or software, all in your own UI and on your own terms.'],
  ['Real-time, hands-off.', 'Postback pushes every conversion to your server the moment it happens, so your systems stay in sync without anyone logging in to check.'],
];
/* Animated "Built for teams that build" visual (from the Figma storyboard): the
   partner app phone sits centred in a tinted square (same box as the creator page),
   and coded cards reveal in a looping sequence.
   Phase A: API card types in BEHIND the phone, then the datafeed card slides in.
   Phase B: Postback URL card, then the conversion card (check + title first, then
   the details expand). Reduced motion shows a static resting state. */
const BV_CODE = 'GET /v2/offers\n200 OK {\n  "commission": 8.0,\n  "status": "active"\n}';
const BV_FEED = [
  { img: 'df-prod-1.png', n: 'N°04 Silk Satin Shirt', p: '$780' },
  { img: 'df-prod-2.png', n: 'N°22 Calfskin Frame Bag', p: '$2,400' },
  { img: 'df-prod-3.png', n: 'N°11 Wool Crepe Blazer', p: '$1,600' },
];
function BuiltViz() {
  const reduced = prefersReduced();
  const [s, setS] = React.useState({ api: false, type: 0, feed: false, post: false, convT: false, convD: false });
  React.useEffect(() => {
    if (reduced) { setS({ api: true, type: BV_CODE.length, feed: true, post: false, convT: false, convD: false }); return; }
    let alive = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setS({ api: false, type: 0, feed: false, post: false, convT: false, convD: false });
        await sleep(450); if (!alive) return;
        setS((v) => ({ ...v, api: true })); await sleep(560); if (!alive) return;   // API card in (behind phone)
        for (let i = 1; i <= BV_CODE.length; i++) { if (!alive) return; setS((v) => ({ ...v, type: i })); await sleep(26); }  // typing
        await sleep(480); if (!alive) return;
        setS((v) => ({ ...v, feed: true })); await sleep(2900); if (!alive) return; // datafeed in + hold
        setS((v) => ({ ...v, api: false, feed: false })); await sleep(700); if (!alive) return;
        setS((v) => ({ ...v, post: true })); await sleep(1500); if (!alive) return; // postback in
        setS((v) => ({ ...v, convT: true })); await sleep(780); if (!alive) return; // conversion check + title
        setS((v) => ({ ...v, convD: true })); await sleep(2900); if (!alive) return; // details expand + hold
        setS((v) => ({ ...v, post: false, convT: false, convD: false })); await sleep(700);
      }
    })();
    return () => { alive = false; };
  }, [reduced]);
  const done = s.type >= BV_CODE.length;
  return (
    <div className="bv" aria-hidden="true">
      {/* API card — sits BEHIND the phone, text types in */}
      <div className={'bv-card bv-api' + (s.api ? ' in' : '')}>
        <div className="bv-dots"><i /><i /><i /></div>
        {done ? (
          <div className="bv-code">
            <div><span className="c-mut">GET</span> <span className="c-str">/v2/offers</span></div>
            <div><span className="c-ok">200 OK</span> {'{'}</div>
            <div className="bv-ind"><span className="c-key">"commission"</span>: <span className="c-num">8.0</span>,</div>
            <div className="bv-ind"><span className="c-key">"status"</span>: <span className="c-str">"active"</span></div>
            <div>{'}'}</div>
          </div>
        ) : (
          <pre className="bv-code bv-typing">{BV_CODE.slice(0, s.type)}<span className="bv-caret" /></pre>
        )}
      </div>

      {/* Phone — always on, in front of the API card */}
      <div className="bv-phone"><img src="media/figma/ready-to-wear-mockup.png" alt="A fashion store app with Involve offers and tracking built in" loading="lazy" /></div>

      {/* Datafeed card (bottom-right) */}
      <div className={'bv-card bv-feed' + (s.feed ? ' in' : '')}>
        <div className="bv-feed-h">Live datafeed</div>
        {BV_FEED.map((it) => (
          <div className="bv-row" key={it.n}><span className="bv-thumb"><img src={`media/figma/${it.img}`} alt="" loading="lazy" /></span><span className="bv-row-n">{it.n}</span><span className="bv-row-p">{it.p}</span></div>
        ))}
      </div>

      {/* Postback card (top-right) */}
      <div className={'bv-card bv-post' + (s.post ? ' in' : '')}>
        <div className="bv-post-h">Postback URL</div>
        <code className="bv-url">https://maison.com/pb?order={'{id}'}&amp;amt={'{total}'}</code>
        <div className="bv-post-s"><span className="bv-dot-ok" /> 200 &middot; delivered</div>
      </div>

      {/* Conversion card (bottom-left) — check + title first, details expand after */}
      <div className={'bv-card bv-conv' + (s.convT ? ' in' : '')}>
        <div className="bv-conv-top">
          <span className="bv-check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg></span>
          <span className="bv-conv-t">Conversion tracked</span>
          <span className="bv-conv-ago">0.4s ago</span>
        </div>
        <div className={'bv-conv-dw' + (s.convD ? ' in' : '')}>
          <div className="bv-conv-d">
            <div className="bv-conv-prod"><b>Wool Crepe Blazer</b> <span className="bv-conv-id">#525546348</span></div>
            <div className="bv-conv-com">Commission (8%) &middot; $128.00</div>
          </div>
        </div>
      </div>
    </div>
  );
}
function MadeFor() {
  return (
    <section id="cc-made" className="mf-sec">
      <div className="wrap">
        <div className="mf-grid">
          <div className="mf-left">
            <h2 className="mf-title" data-reveal>Built for teams that build.</h2>
            <p className="mf-sub" data-reveal data-reveal-delay="1">If you run your own product and have the engineers to integrate, you can plug Involve straight in.</p>
            <div className="mf-points" data-reveal data-reveal-delay="1">
              {MADE_POINTS.map(([t, d]) => (
                <div className="mf-point" key={t}>
                  <h3 className="mf-pt">{t}</h3>
                  <p className="mf-pd">{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mf-visual" data-reveal>
            <BuiltViz />
          </div>
        </div>
      </div>
      <style>{`
        .mf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .mf-grid{ display:grid; grid-template-columns:minmax(0,1fr) minmax(0,440px); gap:clamp(32px,5vw,72px); align-items:center; }
        .mf-title{ font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); max-width:520px; }
        .mf-sub{ margin-top:14px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-points{ margin-top:clamp(24px,4vh,40px); display:flex; flex-direction:column; gap:clamp(20px,3vh,30px); }
        .mf-pt{ font-family:var(--font-display); font-weight:800; font-size:19px; letter-spacing:-.01em; color:var(--warm-900); }
        .mf-pd{ margin-top:8px; font:400 16px/1.5 var(--font-body); color:var(--warm-600); max-width:520px; }
        .mf-visual{ position:relative; }
        /* ---- animated phone + tool cards in a tinted square (same box as the creator page) ---- */
        .bv{ position:relative; width:100%; max-width:476px; margin-inline:auto; aspect-ratio:476/445;
          border-radius:var(--r-xl); overflow:hidden; background:var(--warm-100); }
        .bv-phone{ position:absolute; left:50%; top:50%; transform:translate(-50%,-50%); width:42%; aspect-ratio:338/712; z-index:2; }
        .bv-phone img{ width:100%; height:100%; object-fit:cover; display:block; filter:drop-shadow(0 18px 34px rgba(15,28,46,.20)); }
        .bv-card{ position:absolute; border-radius:var(--r-lg); box-shadow:0 18px 40px rgba(15,28,46,.16);
          opacity:0; transform:translateY(14px) scale(.96); transition:opacity .5s ease, transform .6s cubic-bezier(.22,1,.36,1); }
        .bv-card.in{ opacity:1; transform:none; }
        .bv-api{ z-index:1; top:13%; left:2%; width:45%; background:#1c1c20; padding:11px 13px 13px; }   /* behind the phone */
        .bv-feed{ z-index:3; bottom:7%; right:2%; width:47%; background:#fff; padding:12px 13px; }
        .bv-post{ z-index:3; top:9%; right:2%; width:49%; background:#fff; padding:12px 13px; }
        .bv-conv{ z-index:3; bottom:9%; left:2%; width:53%; background:#fff; padding:11px 13px; }
        /* API code card (types in) */
        .bv-dots{ display:flex; gap:5px; margin-bottom:8px; }
        .bv-dots i{ width:8px; height:8px; border-radius:50%; }
        .bv-dots i:nth-child(1){ background:#ff5f57; } .bv-dots i:nth-child(2){ background:#febc2e; } .bv-dots i:nth-child(3){ background:#28c840; }
        .bv-code{ font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:11px; line-height:1.6; color:#cfd1d4; }
        .bv-typing{ margin:0; white-space:pre; min-height:4.8em; }
        .bv-caret{ display:inline-block; width:6px; height:1em; background:#cfd1d4; margin-left:1px; vertical-align:-2px; animation:bvBlink 1s steps(1) infinite; }
        @keyframes bvBlink{ 50%{ opacity:0; } }
        .bv-ind{ padding-left:12px; }
        .c-mut{ color:#8a8d93; } .c-ok{ color:#28c840; } .c-key{ color:#7fb0ff; } .c-str{ color:#f0a35e; } .c-num{ color:#c08cff; }
        /* datafeed list card */
        .bv-feed-h, .bv-post-h{ font:700 10px/1 var(--font-body); letter-spacing:.09em; text-transform:uppercase; color:var(--warm-400); margin-bottom:9px; }
        .bv-row{ display:flex; align-items:center; gap:9px; padding:5px 0; }
        .bv-row + .bv-row{ border-top:1px solid var(--warm-100); }
        .bv-thumb{ width:26px; height:26px; border-radius:var(--r-md); overflow:hidden; background:linear-gradient(135deg,#eceae6,#d6d1c8); flex:0 0 auto; }
        .bv-thumb img{ width:100%; height:100%; object-fit:cover; display:block; }
        .bv-row-n{ flex:1; min-width:0; font:500 12px/1.2 var(--font-body); color:var(--warm-900); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .bv-row-p{ font:700 12px/1 var(--font-body); color:var(--warm-900); }
        /* postback card */
        .bv-url{ display:block; font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:10.5px; line-height:1.45; color:var(--midnight-light); word-break:break-all; }
        .bv-post-s{ display:flex; align-items:center; gap:6px; margin-top:9px; font:600 11px/1 var(--font-body); color:var(--warm-500); }
        .bv-dot-ok{ width:7px; height:7px; border-radius:50%; background:#2fb563; }
        /* conversion card — check + title, then details expand */
        .bv-conv-top{ display:flex; align-items:center; gap:9px; }
        .bv-check{ flex:0 0 auto; width:24px; height:24px; border-radius:50%; background:#1f9254; color:#fff; display:flex; align-items:center; justify-content:center; }
        .bv-check svg{ width:13px; height:13px; }
        .bv-conv-t{ flex:1; font:800 13px/1.1 var(--font-display); color:var(--warm-900); }
        .bv-conv-ago{ font:400 10px/1 var(--font-body); color:var(--warm-400); }
        .bv-conv-dw{ display:grid; grid-template-rows:0fr; opacity:0; transition:grid-template-rows .45s ease, opacity .3s ease; }
        .bv-conv-dw.in{ grid-template-rows:1fr; opacity:1; }
        .bv-conv-d{ overflow:hidden; }
        .bv-conv-prod{ margin-top:9px; font:400 11.5px/1.35 var(--font-body); color:var(--warm-900); }
        .bv-conv-prod b{ font-weight:700; } .bv-conv-id{ color:var(--warm-400); }
        .bv-conv-com{ margin-top:2px; font:500 11px/1.35 var(--font-body); color:var(--warm-500); }
        @media (prefers-reduced-motion: reduce){ .bv-card{ transition:none; } .bv-conv-dw{ transition:none; } .bv-caret{ animation:none; } }
        @media (max-width:860px){ .mf-grid{ grid-template-columns:1fr; gap:32px; } .mf-visual{ order:-1; width:100%; max-width:476px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §3 — "Built for the way you create." (tab view, reused from the
   publisher overview's platform stepper — pf-* pattern). One tab per tool. ---------- */
const CREATE_TABS = [
  { key: 'api', t: 'API', d: 'Authenticate with your key and secret, pull offers and conversions, and generate tracking links programmatically, with no manual dashboard work.', img: 'tech-api-tool-card.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 6l-2 12" /></svg> },
  { key: 'postback', t: 'Postback', d: 'Get conversions pushed to your server in real time (server-to-server), so you never have to log in and check reports. You handle the data on your own system.', img: 'postback-tool-slide.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 9h11a4 4 0 0 1 0 8h-2" /><path d="M7 20l-3-3 3-3" /><path d="M20 5v4h-4" /></svg> },
  { key: 'datafeed', t: 'Datafeed Manager', d: 'Pull live product data like prices, offers, and stock to surface catalogues inside your product.', img: 'aff-partner-slide1.png?v=2',
    ic: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v6c0 1.66 3.58 3 8 3s8-1.34 8-3V5" /><path d="M4 11v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" /></svg> },
];
const CREATE_TABS_MS = 12000;
function BuiltCreate() {
  const [active, setActive] = React.useState(0);
  // Which step the mouse is over (index or null). Hovering the active step's
  // content pauses the rail; the image beside it doesn't. Touch taps are ignored
  // so the pause can't get stuck on mobile.
  const [hover, setHover] = React.useState(null);
  const paused = hover === active;
  const hoverProps = (k) => ({
    onPointerEnter: (e) => { if (e.pointerType === 'mouse') setHover(k); },
    onPointerLeave: (e) => { if (e.pointerType === 'mouse') setHover(null); },
  });
  // The rail-fill animation is the timer: advancing on its animationend keeps the
  // bar and the slide change in sync, and pausing the animation pauses both.
  // Under reduced motion the animation is off, so there's no auto-advance.
  const next = () => setActive((a) => (a + 1) % CREATE_TABS.length);
  return (
    <section id="cc-create" className="pf-sec cct-sec">
      <div className="wrap">
        <h2 className="pf-title" data-reveal>Built to integrate.</h2>
        <p className="pf-sub" data-reveal data-reveal-delay="1">The three tools your engineers will use.</p>
        <div className="pf-grid" data-reveal data-reveal-delay="1">
          <div className="pf-steps">
            {CREATE_TABS.map((s, i) => {
              const on = i === active;
              return (
                <button type="button" className={'pf-step' + (on ? ' on' : '')} key={s.key} onClick={() => setActive(i)} aria-expanded={on} {...hoverProps(i)}>
                  <span className="pf-rail" aria-hidden="true"><span className="pf-rail-track" />{on && <span className="pf-rail-fill" key={active} onAnimationEnd={next} style={{ animationPlayState: paused ? 'paused' : 'running' }} />}</span>
                  <span className="pf-step-body">
                    <span className="pf-step-t">{s.t}</span>
                    <span className="pf-step-dw"><span className="pf-step-d">{s.d}</span></span>
                    <span className="pf-step-fig"><span className="pf-step-fig-in"><img className="cct-img-m" src={`media/figma/${s.img}`} alt={s.t} loading="lazy" /></span></span>
                  </span>
                </button>
              );
            })}
          </div>
          <div className="pf-visual">
            {CREATE_TABS.map((s, i) => (
              <img key={s.key} className={'pf-img' + (i === active ? ' on' : '')} src={`media/figma/${s.img}`} alt={s.t} loading="lazy" aria-hidden={i !== active} />
            ))}
          </div>
        </div>
      </div>
      <style>{`
        .pf-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; overflow:hidden; }
        .pf-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .pf-sub{ text-align:center; margin-top:14px; font-size:16px; line-height:1.4; color:var(--warm-600); }
        .pf-grid{ margin-top:clamp(40px,6vh,72px); display:grid; grid-template-columns:minmax(0,412px) 1fr; gap:clamp(32px,4vw,64px); align-items:stretch; }
        .pf-steps{ display:flex; flex-direction:column; }
        .pf-step{ position:relative; display:flex; gap:20px; align-items:stretch; text-align:left; background:none; border:none; cursor:pointer; padding:30px 0; width:100%; }
        .pf-step + .pf-step{ border-top:1px solid var(--warm-200); }
        .pf-rail{ position:relative; width:4px; flex:0 0 auto; align-self:stretch; }
        .pf-rail-track{ position:absolute; inset:0; border-radius:var(--r-full); background:var(--warm-200); opacity:0; transition:opacity .3s ease; }
        .pf-rail-fill{ position:absolute; left:0; top:0; width:4px; border-radius:var(--r-full); background:var(--ember); height:0; }
        .pf-step.on .pf-rail-track{ opacity:1; }
        .pf-step.on .pf-rail-fill{ animation:cctFill ${CREATE_TABS_MS}ms linear forwards; }
        @keyframes cctFill{ from{ height:0; } to{ height:100%; } }
        .pf-step-body{ min-width:0; }
        .pf-step-t{ display:flex; align-items:center; gap:11px; font-family:var(--font-display); font-weight:800; font-size:21px; letter-spacing:-.02em; color:var(--warm-900); }
        .pf-step-dw{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .4s ease; }
        .pf-step.on .pf-step-dw{ grid-template-rows:1fr; }
        .pf-step-d{ overflow:hidden; margin-top:0; font:400 16px/1.5 var(--font-body); color:var(--warm-600); }
        .pf-step.on .pf-step-d{ margin-top:12px; }
        .pf-step:not(.on){ opacity:.4; } .pf-step:not(.on):hover{ opacity:.7; }
        .pf-visual{ position:relative; align-self:center; width:100%; aspect-ratio:5/3; overflow:hidden;
          border-radius:var(--r-xl);
          background:var(--warm-100); }
        .pf-img{ position:absolute; inset:0; width:100%; height:100%;
          object-fit:contain; object-position:center; opacity:0; transition:opacity .5s ease; }
        .pf-img.on{ opacity:1; }
        .pf-step-fig{ display:none; }
        @media (max-width:900px){
          .pf-grid{ grid-template-columns:1fr; gap:0; }
          .pf-visual{ display:none; }
          .pf-step{ gap:0; padding:22px 0; }
          .pf-rail{ display:none; }
          .pf-step-fig{ display:grid; grid-template-rows:0fr; transition:grid-template-rows .45s ease; }
          .pf-step.on .pf-step-fig{ grid-template-rows:1fr; }
          .pf-step-fig-in{ overflow:hidden; min-height:0; }
          .cct-img-m{ display:block; width:100%; height:auto; margin:16px 0 4px; border-radius:var(--r-xl); box-shadow:0 12px 28px rgba(15,28,46,.12); }
        }
        @media (prefers-reduced-motion: reduce){ .pf-rail-fill{ animation:none; height:100%; } .pf-img{ transition:none; } .pf-step-fig{ transition:none; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §3b — "Why creators earn with Involve." (3 icon columns) — Figma 2667:17675 ---------- */
const WE_ICONS = {
  bag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 8h12l-1 12.5H7L6 8Z" /><path d="M9 8a3 3 0 0 1 6 0" /></svg>,
  heart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 20.5S4.5 16 4.5 10.6A3.6 3.6 0 0 1 12 7.5a3.6 3.6 0 0 1 7.5 3.1C19.5 16 12 20.5 12 20.5Z" /></svg>,
  file: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path d="M14 3v5h5" /><path d="M9.3 14.4l1.9 1.9 3.5-3.7" /></svg>,
  ui: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 9h18" /><path d="M8 4v5" /></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>,
  bolt: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" /></svg>,
  code: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M8 8l-4 4 4 4" /><path d="M16 8l4 4-4 4" /><path d="M13 6l-2 12" /></svg>,
};
const WHY_EARN = [
  ['ui', 'Your product, your experience.', 'Offers live inside your own UI. You control how they look and where they appear.'],
  ['grid', 'One integration, hundreds of brands.', 'Connect once to access 500+ brands and 4,000+ offers.'],
  ['bolt', 'Real-time and hands-off.', 'Postback and the API keep offers current and conversions flowing, so no one has to check a dashboard.'],
  ['code', 'Built for developers.', 'Clear API docs, item-level tracking, and reliable payouts.'],
];
function WhyEarn() {
  return (
    <section id="cc-why" className="we-sec">
      <div className="wrap">
        <h2 className="we-title" data-reveal>Why technology partners build on Involve.</h2>
        <div className="we-grid">
          {WHY_EARN.map(([ic, t, d], i) => (
            <div className="we-item" key={t} data-reveal data-reveal-delay={i + 1}>
              <span className="we-icon">{WE_ICONS[ic]}</span>
              <h3 className="we-ct">{t}</h3>
              <p className="we-cd">{d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .we-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .we-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .we-grid{ margin-top:clamp(34px,5vh,54px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(24px,3vw,40px); }
        @media (max-width:960px){ .we-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); } }
        .we-item{ min-width:0; }
        .we-icon{ display:inline-flex; align-items:center; justify-content:center; width:48px; height:48px; border-radius:var(--r-xl); background:rgba(240,88,38,.12); color:var(--ember); }
        .we-icon svg{ width:24px; height:24px; display:block; }
        .we-ct{ margin-top:clamp(20px,3vh,26px); font-family:var(--font-display); font-weight:800; font-size:20px; letter-spacing:-.01em; color:var(--warm-900); }
        .we-cd{ margin-top:8px; font:400 16px/1.45 var(--font-body); color:var(--warm-600); max-width:340px; }
        @media (max-width:760px){ .we-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; margin-inline:auto; } }
      `}</style>
    </section>
  );
}
/* ---------- CC §2b — "How it works" (3 numbered steps) — Figma 2546:45011 ---------- */
const HIW_STEPS = [
  { t: 'Connect the API', d: 'Integrate once, and bring product data, trackable links, and real-time conversions into your own product.', img: 'general-hye-01.png' },
  { t: 'Surface relevant offers', d: 'Show cashback and deals your users actually want, inside your own UI.', img: 'tp-hye-02.png' },
  { t: 'Earn on every sale', d: 'When a user buys through your product, the sale is credited to you.', img: 'general-hye-03.png' },
  { t: 'Get paid', d: 'Withdraw in your local currency once sales are validated, or sooner with Express Withdrawal.', img: 'general-hye-04.png' },
];
// Card 1 (Connect the API): a code editor card that bleeds off the right & bottom
// of the frame (cropped), with the request lines typing in then a JSON response
// section revealing, on a loop. All values are placeholders, not real credentials.
const AC_REQ = '// Initialize connection with Involve API\nGET https://api.example.com/v2/offers\nAuthorization: Bearer ia_app_key_••••••';
function ApiCard() {
  const reduced = prefersReduced();
  const [n, setN] = React.useState(0);
  const [resp, setResp] = React.useState(false);
  React.useEffect(() => {
    if (reduced) { setN(AC_REQ.length); setResp(true); return; }
    let alive = true;
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    (async () => {
      while (alive) {
        setN(0); setResp(false); await sleep(520); if (!alive) return;
        for (let i = 1; i <= AC_REQ.length; i++) { if (!alive) return; setN(i); await sleep(24); }  // type request
        await sleep(560); if (!alive) return;
        setResp(true); await sleep(2600); if (!alive) return;                                       // reveal JSON response + hold
      }
    })();
    return () => { alive = false; };
  }, [reduced]);
  const done = n >= AC_REQ.length;
  return (
    <div className="ac-card" aria-hidden="true">
      <div className="ac-head"><span className="ac-dots"><i /><i /><i /></span><span className="ac-file">involve_asia_api_v2.json</span></div>
      {done ? (
        <div className="ac-code">
          <div className="ac-mut">// Initialize connection with Involve API</div>
          <div><span className="ac-kw">GET</span> <span className="ac-url">https://api.example.com/v2/offers</span></div>
          <div>Authorization: Bearer <span className="ac-key">ia_app_key_{'••••••'}</span></div>
          <div className={'ac-resp' + (resp ? ' in' : '')}>
            <div className="ac-div" />
            <div className="ac-mut">// JSON Response</div>
            <div>{'{'}</div>
          </div>
        </div>
      ) : (
        <pre className="ac-code ac-typing">{AC_REQ.slice(0, n)}<span className="ac-caret" /></pre>
      )}
    </div>
  );
}
// Card 4 (Get paid): one pill whose currency steps USD -> MYR -> EUR, each code
// fading up & out then the next fading in from below (echoes the publisher tier pill, no icon).
const GP_CURR = [
  { key: 'usd', label: 'USD', amount: '1,000' },
  { key: 'myr', label: 'MYR', amount: '4,086' },
  { key: 'eur', label: 'EUR', amount: '883' },
];
const GP_HOLD = 2600;   // each currency holds ~2.6s
const GP_EXIT = 340;    // last 340ms = old code fades up & out
function GetPaidPill() {
  const [step, setStep] = React.useState(0);
  const [phase, setPhase] = React.useState('in');
  React.useEffect(() => {
    if (prefersReduced()) { setStep(0); setPhase('in'); return; }
    setPhase('in');
    const tOut = setTimeout(() => setPhase('out'), GP_HOLD - GP_EXIT);
    const tNext = setTimeout(() => setStep((s) => (s + 1) % GP_CURR.length), GP_HOLD);
    return () => { clearTimeout(tOut); clearTimeout(tNext); };
  }, [step]);
  const c = GP_CURR[step];
  const ph = phase === 'out' ? ' is-out' : ' is-in';
  return (
    <span className="gp-pill" aria-live="polite">
      <em className={'gp-label' + ph} key={c.key}>{c.label}<span className="gp-amt">{c.amount}</span></em>
    </span>
  );
}
function HowItWorks() {
  return (
    <section id="cc-how" className="hiw-sec">
      <div className="wrap">
        <h2 className="hiw-title" data-reveal>How you earn.</h2>
        <div className="hiw-grid">
          {HIW_STEPS.map((s, i) => (
            <div className="hiw-step" key={s.t} data-reveal data-reveal-delay={i + 1}>
              <div className="hiw-card"><img src={`media/figma/${s.img}`} alt="" loading="lazy" onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }} /></div>
              <h3 className="hiw-ct">{i + 1}. {s.t}</h3>
              <p className="hiw-cd">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .hiw-sec{ background:var(--warm-50); padding:clamp(40px,7vh,88px) 0; }
        .hiw-title{ text-align:center; font-family:var(--font-display); font-weight:800; font-size:clamp(24px,3vw,34px); line-height:1.12; letter-spacing:-.03em; color:var(--warm-900); }
        .hiw-grid{ margin-top:clamp(34px,5.5vh,58px); display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:clamp(20px,2.2vw,32px); }
        .hiw-step{ min-width:0; }
        .hiw-card{ height:178px; border-radius:var(--r-lg); background:var(--warm-100); overflow:hidden; display:flex; align-items:center; justify-content:center; }
        .hiw-card img{ width:100%; height:100%; object-fit:cover; object-position:left center; display:block; }   /* art bleeds off the right; keep its left inset */
        /* card 1 — code editor card cropped off the right & bottom of the frame */
        .hiw-card-api{ position:relative; }
        .ac-card{ position:absolute; top:26px; left:32px; width:300px; min-height:180px; box-sizing:border-box;
          background:#1c1c20; border-radius:16px 16px 0 0; padding:13px 15px 16px; box-shadow:0 18px 40px rgba(15,28,46,.18); }
        .ac-head{ display:flex; align-items:center; gap:10px; margin-bottom:12px; }
        .ac-dots{ display:flex; gap:5px; } .ac-dots i{ width:8px; height:8px; border-radius:50%; }
        .ac-dots i:nth-child(1){ background:#ff5f57; } .ac-dots i:nth-child(2){ background:#febc2e; } .ac-dots i:nth-child(3){ background:#28c840; }
        .ac-file{ font:400 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace; color:#8a8d93; }
        .ac-code{ font-family:ui-monospace,SFMono-Regular,Menlo,monospace; font-size:9px; line-height:1.85; color:#e6e7e9; white-space:pre; }
        .ac-typing{ margin:0; min-height:5.2em; }
        .ac-mut{ color:#7d8089; }
        .ac-kw{ color:#e6e7e9; }
        .ac-url{ color:#5bd66f; }
        .ac-key{ color:#e6e7e9; }
        .ac-caret{ display:inline-block; width:5px; height:1em; background:#cfd1d4; margin-left:1px; vertical-align:-1px; animation:acBlink 1s steps(1) infinite; }
        @keyframes acBlink{ 50%{ opacity:0; } }
        .ac-div{ height:1px; background:rgba(255,255,255,.12); margin:9px 0; }
        .ac-resp{ opacity:0; transform:translateY(6px); transition:opacity .4s ease, transform .4s ease; }
        .ac-resp.in{ opacity:1; transform:none; }
        @media (prefers-reduced-motion: reduce){ .ac-resp{ transition:none; } .ac-caret{ animation:none; } }
        .hiw-card-pay{ position:relative; }
        .gp-pill{ position:absolute; left:24px; top:50%; transform:translateY(-50%);
          display:inline-flex; align-items:center; justify-content:flex-start; width:420px; flex:0 0 auto; box-sizing:border-box;
          background:#fff; border-radius:var(--r-xl); padding:18px 30px; box-shadow:0 8px 18px rgba(15,28,46,.10);
          font-family:var(--font-display); font-weight:800; font-size:32px; letter-spacing:.005em; color:var(--warm-900); white-space:nowrap; }
        .gp-label{ font-style:normal; display:inline-block; }
        .gp-amt{ color:var(--warm-300); margin-left:0.198em; }
        .gp-label.is-in{ animation:gp-in .42s cubic-bezier(.2,.7,.3,1) both; }
        .gp-label.is-out{ animation:gp-out .32s ease both; }
        @keyframes gp-in{ from{ opacity:0; transform:translateY(12px); } to{ opacity:1; transform:translateY(0); } }
        @keyframes gp-out{ from{ opacity:1; transform:translateY(0); } to{ opacity:0; transform:translateY(-12px); } }
        @media (prefers-reduced-motion: reduce){ .gp-label{ animation:none; opacity:1; transform:none; } }
        .hiw-ct{ margin-top:22px; font-family:var(--font-display); font-weight:800; font-size:21px; line-height:1.38; letter-spacing:-.02em; color:var(--warm-900); }
        .hiw-cd{ margin-top:14px; font:400 16px/1.31 var(--font-body); color:var(--warm-600); }
        @media (max-width:900px){ .hiw-grid{ grid-template-columns:repeat(2,minmax(0,1fr)); gap:clamp(24px,3vw,32px); } }
        @media (max-width:520px){ .hiw-grid{ grid-template-columns:1fr; gap:clamp(24px,4vh,34px); max-width:440px; } }
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
        <MadeFor />
        <HowItWorks />
        <BuiltCreate />
        <WhyEarn />
        <PubVoices />
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
