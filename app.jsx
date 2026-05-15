/* global React, ReactDOM */
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ============ TWEAK DEFAULTS ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accentHue": 285,
  "glowIntensity": 1,
  "reduceMotion": false,
  "showGrid": true,
  "accentMode": "neon"
}/*EDITMODE-END*/;

// ============ ICONS ============
const Icon = {
  bolt: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>,
  gradCap: (p) => (
    <svg viewBox="0 0 80 60" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      {/* mortarboard top */}
      <path d="M5 22 L40 8 L75 22 L40 36 Z" />
      {/* cap base */}
      <path d="M18 28 L18 40 C18 44 28 47 40 47 C52 47 62 44 62 40 L62 28" />
      {/* button */}
      <circle cx="40" cy="22" r="1.6" fill="currentColor" />
      {/* tassel */}
      <path d="M62 24 L66 32 L66 44" />
      <path d="M64 44 Q66 50 68 44 Z" fill="currentColor" />
    </svg>
  ),
  diploma: (p) => (
    <svg viewBox="0 0 64 48" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      {/* scroll */}
      <path d="M10 12 L10 36 C10 40 12 42 16 42 L48 42 C52 42 54 40 54 36 L54 12 C54 8 52 6 48 6 L16 6 C12 6 10 8 10 12 Z" />
      <path d="M16 18 L48 18 M16 24 L42 24 M16 30 L46 30" strokeOpacity="0.6" />
      {/* ribbon */}
      <path d="M22 38 L22 48 L28 44 L34 48 L34 38" fill="currentColor" fillOpacity="0.15" />
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2 L13.5 10 L22 11.5 L13.5 13 L12 22 L10.5 13 L2 11.5 L10.5 10 Z" />
    </svg>
  ),
  arrow: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14m-6-6 6 6-6 6"/></svg>,
  letter: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>,
  staff: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="9" cy="8" r="3"/><circle cx="17" cy="10" r="2.5"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M15 19c0-2.5 2-4.5 4.5-4.5"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" fill="currentColor" {...p}><path d="m12 2 2.6 6.6L22 9.7l-5.4 4.7L18.4 22 12 18.1 5.6 22l1.8-7.6L2 9.7l7.4-1.1L12 2Z"/></svg>,
  users: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="3.5"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  list: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>,
  ad: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="4" width="18" height="14" rx="2"/><path d="m3 8 9 5 9-5"/><circle cx="17" cy="6" r="2" fill="currentColor"/></svg>,
  search: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  chevron: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m6 9 6 6 6-6"/></svg>,
  close: (p) => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...p}><path d="M6 6 18 18M6 18 18 6"/></svg>,
};

// ============ DDC LOGO (recreated) ============
function DDCLogo({ size = 28, color = "currentColor" }) {
  return (
    <svg viewBox="0 0 120 40" width={size * 3} height={size} style={{ display: "block" }}>
      <text x="36" y="28" fontFamily="'Orbitron', sans-serif" fontWeight="800" fontSize="22" fill={color} letterSpacing="2">DDC</text>
      {/* arrow */}
      <g stroke={color} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.9">
        <path d="M4 34 L 28 34" />
        <path d="M22 30 L 28 34 L 22 38" />
        <path d="M8 36 L 12 36" opacity="0.7" />
        <path d="M4 32 L 8 32" opacity="0.5" />
      </g>
    </svg>
  );
}

// ============ COVER ============
function Cover({ onEnter }) {
  return (
    <section className="cover" data-screen-label="01 Cover">
      <div className="cover-image-wrap">
        <img src={window.__resources.cover} alt="Velocity 2026" className="cover-image" />
      </div>
      <button className="cover-cta" onClick={onEnter}>
        <span>Open Playbill</span>
        <Icon.arrow width="18" height="18" />
      </button>
    </section>
  );
}

// ============ SECTION HEADER ============
function SectionHeader({ kicker, title, subtitle }) {
  return (
    <header className="section-header">
      <div className="kicker">
        <span className="kicker-line" />
        <span className="kicker-text">{kicker}</span>
        <span className="kicker-line" />
      </div>
      <h2 className="section-title neon-text" data-text={title}>{title}</h2>
      {subtitle && <p className="section-sub">{subtitle}</p>}
    </header>
  );
}

// ============ WELCOME ============
function Welcome({ data }) {
  return (
    <section id="welcome" className="page" data-screen-label="02 Welcome">
      <SectionHeader kicker="01 / Welcome" title="A NOTE FROM DDC" />
      <div className="letter">
        {data.body.map((p, i) => <p key={i}>{p}</p>)}
        <div className="signature">
          <div className="sig-line" />
          <div>
            <div className="sig-name">{data.from}</div>
            <div className="sig-role">{data.role}</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============ STAFF ============
function Staff({ data }) {
  return (
    <section id="staff" className="page" data-screen-label="03 Staff">
      <SectionHeader kicker="02 / Staff" title="THE TEAM" subtitle="The dancers above, the people behind them." />

      <div className="staff-owner">
        <div className="owner-badge">Owner & Creative Director</div>
        <div className="owner-name neon-text" data-text={data.owner.name}>{data.owner.name}</div>
      </div>

      <div className="staff-group">
        <div className="group-label"><Icon.bolt width="14" height="14" /> Teachers</div>
        <div className="staff-grid">
          {data.teachers.map(n => (
            <div key={n} className="staff-chip">{n}</div>
          ))}
        </div>
      </div>

      <div className="staff-group">
        <div className="group-label"><Icon.bolt width="14" height="14" /> Assistants</div>
        <div className="staff-grid">
          {data.assistants.map(n => (
            <div key={n} className="staff-chip alt">{n}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ SENIORS ============
function Seniors({ data }) {
  return (
    <section id="seniors" className="page" data-screen-label="04 Seniors">
      <SectionHeader kicker="03 / Class of 2026" title="OUR SENIORS" subtitle="A decade on this stage. Tonight, we send them off." />
      <div className="senior-grid">
        {data.map((s, i) => (
          <article key={s.name} className={`senior-card v2 ${i % 2 ? "flip" : ""}`}>
            <div className="senior-watermark" aria-hidden="true">26</div>

            {/* Neon grad cap */}
            <div className="sticker sticker-cap" aria-hidden="true">
              <Icon.gradCap width="130" height="98" />
            </div>

            <div className="senior-photos">
              <figure className="senior-photo main">
                <span className="senior-corner tl" />
                <span className="senior-corner tr" />
                <span className="senior-corner bl" />
                <span className="senior-corner br" />
                <img src={s.photos[0]} alt={`${s.name} portrait 1`} />
              </figure>
              <figure className="senior-photo inset">
                <span className="senior-corner tl" />
                <span className="senior-corner tr" />
                <span className="senior-corner bl" />
                <span className="senior-corner br" />
                <img src={s.photos[1]} alt={`${s.name} portrait 2`} />
              </figure>
            </div>

            <div className="senior-meta">
              <div className="senior-frame">
                <div className="senior-tag">CLASS OF 2026</div>
              </div>
              <div className="senior-name neon-text" data-text={s.name}>{s.name}</div>
              <blockquote className="senior-quote">
                <span className="quote-text">Congratulations! We will miss you!</span>
              </blockquote>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// ============ CAST ============
function Cast({ data }) {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    if (!q.trim()) return data;
    const needle = q.toLowerCase();
    return data.filter(n => n.toLowerCase().includes(needle));
  }, [q, data]);

  const grouped = useMemo(() => {
    const g = {};
    filtered.forEach(name => {
      const first = name[0].toUpperCase();
      (g[first] ||= []).push(name);
    });
    return g;
  }, [filtered]);

  return (
    <section id="cast" className="page" data-screen-label="05 Cast">
      <SectionHeader kicker="04 / Cast" title="THE COMPANY" subtitle={`${data.length} dancers, one stage`} />
      <div className="search-row">
        <Icon.search width="16" height="16" />
        <input
          type="text"
          placeholder="Search dancers…"
          value={q}
          onChange={e => setQ(e.target.value)}
          className="search-input"
        />
        {q && <button className="search-clear" onClick={() => setQ("")} aria-label="Clear"><Icon.close width="14" height="14" /></button>}
      </div>

      {Object.keys(grouped).length === 0 ? (
        <div className="empty-state">No dancers matching "{q}"</div>
      ) : (
        Object.entries(grouped).map(([letter, names]) => (
          <div key={letter} className="cast-letter-group">
            <div className="cast-letter">{letter}</div>
            <div className="cast-grid">
              {names.map(n => <div key={n} className="cast-name">{n}</div>)}
            </div>
          </div>
        ))
      )}
    </section>
  );
}

// ============ PROGRAM ============
function ProgramRow({ item, open, onToggle }) {
  const isSolo = !item.group;
  const dancerCount = item.dancers ? item.dancers.split(",").length : 0;
  return (
    <div className={`prog-row ${open ? "open" : ""} ${isSolo ? "solo" : ""}`}>
      <button className="prog-head" onClick={onToggle} aria-expanded={open}>
        <div className="prog-num">{String(item.n).padStart(2, "0")}</div>
        <div className="prog-meta">
          <div className="prog-title">{item.title}</div>
          <div className="prog-sub">
            {item.group ? <span className="prog-group">{item.group}</span> : <span className="prog-solo">Solo</span>}
            <span className="prog-dot">•</span>
            <span className="prog-count">{dancerCount} {dancerCount === 1 ? "dancer" : "dancers"}</span>
          </div>
        </div>
        <div className="prog-chev"><Icon.chevron width="18" height="18" /></div>
      </button>
      <div className="prog-body" style={{ maxHeight: open ? "600px" : 0 }}>
        <div className="prog-body-inner">
          <div className="prog-label">Performed by</div>
          <div className="prog-dancers">{item.dancers}</div>
          {item.assistant && (
            <>
              <div className="prog-label">Assistant{item.assistant.includes(",") ? "s" : ""}</div>
              <div className="prog-dancers alt">{item.assistant}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Program({ data }) {
  const [openIdx, setOpenIdx] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const intermissionIdx = data.findIndex(d => d.intermission);

  return (
    <section id="program" className="page" data-screen-label="06 Program">
      <SectionHeader kicker="05 / Program" title="THE SHOW" subtitle="59 routines. 1 intermission. Tap any number to see who's on stage." />

      <div className="prog-tools">
        <button className="prog-tool-btn" onClick={() => { setOpenIdx(null); }}>Collapse all</button>
        <button className="prog-tool-btn" onClick={() => setShowAll(s => !s)}>{showAll ? "Hide all dancers" : "Show all dancers"}</button>
      </div>

      <div className="prog-list">
        {data.map((item, i) => {
          if (item.intermission) {
            return (
              <div key="int" className="prog-intermission">
                <div className="int-bar" />
                <div className="int-label">— Intermission —</div>
                <div className="int-bar" />
              </div>
            );
          }
          const open = showAll || openIdx === i;
          return (
            <ProgramRow
              key={item.n}
              item={item}
              open={open}
              onToggle={() => setOpenIdx(openIdx === i ? null : i)}
            />
          );
        })}
      </div>
    </section>
  );
}

// ============ ADS ============
function Ads({ data }) {
  const [active, setActive] = useState(null);

  return (
    <section id="ads" className="page" data-screen-label="07 Ads">
      <SectionHeader kicker="06 / Ads" title="SHOUTOUTS & SPONSORS" subtitle="The families and businesses behind the season." />

      <div className="ads-grid">
        {data.map((ad, i) => (
          <button key={i} className="ad-card" onClick={() => setActive(i)}>
            <div className="ad-corner tl" />
            <div className="ad-corner tr" />
            <div className="ad-corner bl" />
            <div className="ad-corner br" />
            <img src={ad.src} alt={ad.alt} loading="lazy" />
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="ad-modal" onClick={() => setActive(null)}>
          <button className="ad-modal-close" onClick={() => setActive(null)} aria-label="Close"><Icon.close width="22" height="22" /></button>
          <button
            className="ad-modal-nav left"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + data.length) % data.length); }}
            aria-label="Previous"
          >‹</button>
          <img
            src={data[active].src}
            alt={data[active].alt}
            onClick={e => e.stopPropagation()}
          />
          <button
            className="ad-modal-nav right"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % data.length); }}
            aria-label="Next"
          >›</button>
          <div className="ad-modal-counter">{active + 1} / {data.length}</div>
        </div>
      )}
    </section>
  );
}

// ============ FOOTER ============
function Footer() {
  return (
    <footer className="page-footer">
      <DDCLogo size={32} color="rgba(255,255,255,0.85)" />
      <div className="footer-title">VELOCITY · 2026</div>
      <div className="footer-line">Duggan's Dance Center</div>
      <div className="footer-line dim">Thank you for moving with us tonight.</div>
    </footer>
  );
}

// ============ BOTTOM NAV ============
const NAV_ITEMS = [
  { id: "welcome", label: "Welcome", icon: Icon.letter },
  { id: "staff", label: "Staff", icon: Icon.staff },
  { id: "seniors", label: "Seniors", icon: Icon.star },
  { id: "cast", label: "Cast", icon: Icon.users },
  { id: "program", label: "Program", icon: Icon.list },
  { id: "ads", label: "Ads", icon: Icon.ad },
];

function BottomNav({ active, onNav }) {
  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-inner">
        {NAV_ITEMS.map(item => {
          const I = item.icon;
          return (
            <button
              key={item.id}
              className={`nav-btn ${active === item.id ? "active" : ""}`}
              onClick={() => onNav(item.id)}
            >
              <I width="20" height="20" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ============ MAIN APP ============
function App() {
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const [active, setActive] = useState("cover");
  const [entered, setEntered] = useState(false);
  const containerRef = useRef(null);

  // Apply tweaks to CSS vars
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--accent-hue", tweaks.accentHue);
    root.style.setProperty("--glow", tweaks.glowIntensity);
    root.classList.toggle("reduce-motion", !!tweaks.reduceMotion);
    root.classList.toggle("no-grid", !tweaks.showGrid);
    root.setAttribute("data-accent-mode", tweaks.accentMode || "neon");
  }, [tweaks]);

  // Scroll spy
  useEffect(() => {
    const ids = ["welcome", "staff", "seniors", "cast", "program", "ads"];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: "-40% 0px -50% 0px" });
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [entered]);

  const handleNav = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 12;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, []);

  const handleEnter = useCallback(() => {
    setEntered(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("welcome");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const D = window.PLAYBILL;

  return (
    <div className="app" ref={containerRef}>
      {/* Background grid + glow */}
      <div className="bg-stage" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
        <div className="bg-glow bg-glow-2" />
        <div className="bg-glow bg-glow-3" />
      </div>

      <Cover onEnter={handleEnter} />

      <div className="masthead">
        <DDCLogo size={20} color="rgba(255,255,255,0.85)" />
        <div className="masthead-title">VELOCITY <span className="dim">/ 2026</span></div>
      </div>

      <main className="content">
        <Welcome data={D.welcome} />
        <Divider />
        <Staff data={D.staff} />
        <Divider />
        <Seniors data={D.seniors} />
        <Divider />
        <Cast data={D.cast} />
        <Divider />
        <Program data={D.program} />
        <Divider />
        <Ads data={D.ads} />
        <Footer />
      </main>

      <BottomNav active={active} onNav={handleNav} />

      {/* Tweaks panel */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Color">
            <window.TweakSlider label="Accent hue" value={tweaks.accentHue} min={0} max={360} step={5} onChange={v => setTweak("accentHue", v)} suffix="°" />
            <window.TweakRadio label="Accent mode" value={tweaks.accentMode} options={[
              { label: "Neon", value: "neon" },
              { label: "Mono", value: "mono" },
            ]} onChange={v => setTweak("accentMode", v)} />
          </window.TweakSection>
          <window.TweakSection title="Effects">
            <window.TweakSlider label="Glow intensity" value={tweaks.glowIntensity} min={0} max={2} step={0.1} onChange={v => setTweak("glowIntensity", v)} />
            <window.TweakToggle label="Background grid" value={tweaks.showGrid} onChange={v => setTweak("showGrid", v)} />
            <window.TweakToggle label="Reduce motion" value={tweaks.reduceMotion} onChange={v => setTweak("reduceMotion", v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

function Divider() {
  return (
    <div className="divider" aria-hidden="true">
      <span className="div-line" />
      <span className="div-bolt"><Icon.bolt width="14" height="14" /></span>
      <span className="div-line" />
    </div>
  );
}

// Mount
ReactDOM.createRoot(document.getElementById("root")).render(<App />);
