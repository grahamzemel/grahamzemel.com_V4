<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  const DEV = browser && window.location.hostname === 'localhost';
  const BASE_URL = DEV ? 'http://localhost:3000' : 'https://grahamzemelcom-596da5a7c96e.herokuapp.com';
  const CONTACT_EMAIL = 'me@grahamzemel.com';

  // Each card routes the client through grahamzemel.com/preview/{slug}.
  // The thumbnail iframe pulls from the live Netlify deploy so animations play live.
  const sites = [
    { slug: 'the-bernardi-group', name: 'The Bernardi Group', category: 'Real Estate', url: 'https://the-bernardi-group-site.netlify.app', blurb: 'Boutique Boulder realty team — lead-gen focused with neighborhood guides.' },
    { slug: 'burgess-group-compass', name: 'Burgess Group Compass', category: 'Real Estate', url: 'https://burgess-group-compass-site.netlify.app', blurb: 'Compass-affiliated team site with listing showcase and agent storytelling.' },
    { slug: 'darcy-kiefel-photography', name: 'Darcy Kiefel Photography', category: 'Wedding Photographer', url: 'https://darcy-kiefel-photography-site.netlify.app', blurb: 'Editorial wedding photography portfolio with cinematic galleries.' },
    { slug: 'veterinary-emergency-group', name: 'Veterinary Emergency Group', category: 'Veterinary Clinic', url: 'https://veterinary-emergency-group-site.netlify.app', blurb: '24/7 emergency vet clinic — built for panic-moment clarity.' },
    { slug: 'vasu-skin-solutions', name: 'Vasu Skin Solutions', category: 'Med Spa', url: 'https://vasu-skin-solutions-site.netlify.app', blurb: 'Luxe med spa experience with treatment menus and booking funnel.' },
    { slug: 'terry-chiropractic-boulder', name: 'Terry Chiropractic Boulder', category: 'Chiropractor', url: 'https://terry-chiropractic-boulder-site.netlify.app', blurb: 'Neighborhood chiropractor — friendly, fast, new-patient ready.' },
    { slug: 'physical-therapy-of-boulder', name: 'Physical Therapy of Boulder', category: 'Physical Therapy', url: 'https://physical-therapy-of-boulder-site.netlify.app', blurb: 'Established PT clinic with provider bios and specialty programs.' },
    { slug: 'north-boulder-physical-therapy-foothills', name: 'North Boulder PT — Foothills', category: 'Physical Therapy', url: 'https://north-boulder-physical-therapy-foothills-site.netlify.app', blurb: 'North Boulder PT clinic location — clean service-area landing page.' },
    { slug: 'the-joint-chiropractic', name: 'The Joint Chiropractic', category: 'Chiropractor', url: 'https://the-joint-chiropractic-site.netlify.app', blurb: 'Membership-based chiropractic — pricing transparency front and center.' },
  ];

  let hidden = new Set();
  let loadedVisibility = false;
  let isAdmin = false;
  let showLogin = false;
  let pwInput = '';
  let loginError = '';
  let loginLoading = false;
  let savingSet = new Set();
  let activeFilter = 'All';
  let authToken = '';

  $: categories = ['All', ...Array.from(new Set(sites.map((s) => s.category)))];
  $: visibleSites = sites
    .filter((s) => isAdmin || !hidden.has(s.slug))
    .filter((s) => activeFilter === 'All' || s.category === activeFilter);
  $: visibleCount = sites.filter((s) => !hidden.has(s.slug)).length;

  onMount(async () => {
    if (!browser) return;
    await verifyStoredToken();
    await loadVisibility();
  });

  async function verifyStoredToken() {
    const t = localStorage.getItem('gz_admin_token') || '';
    if (!t) return;
    try {
      const res = await fetch(`${BASE_URL}/api/auth/verify`, {
        headers: { Authorization: `Bearer ${t}` },
      });
      if (res.ok) {
        authToken = t;
        isAdmin = true;
      } else {
        localStorage.removeItem('gz_admin_token');
      }
    } catch {}
  }

  async function loadVisibility() {
    try {
      const res = await fetch(`${BASE_URL}/api/preview-visibility`, { mode: 'cors' });
      if (!res.ok) throw new Error(`visibility ${res.status}`);
      const data = await res.json();
      hidden = new Set(data.hidden || []);
    } catch (e) {
      console.error('visibility load failed', e);
    } finally {
      loadedVisibility = true;
      hidden = hidden;
    }
  }

  // Login via SvelteKit's same-origin /api/admin-auth (no CORS).
  // That matches how the main site logs admins in (see routes/+layout.svelte).
  async function login() {
    if (!pwInput) return;
    loginLoading = true;
    loginError = '';
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: pwInput }),
      });
      if (!res.ok) throw new Error('Incorrect password');
      authToken = 'gz_admin_a8f3e7c2d1b9';
      localStorage.setItem('gz_admin_token', authToken);
      isAdmin = true;
      showLogin = false;
      pwInput = '';
    } catch (e) {
      loginError = e.message || 'Login failed';
    } finally {
      loginLoading = false;
    }
  }

  function logout() {
    localStorage.removeItem('gz_admin_token');
    authToken = '';
    isAdmin = false;
  }

  async function toggle(slug) {
    if (!isAdmin) return;
    const next = new Set(hidden);
    if (next.has(slug)) next.delete(slug);
    else next.add(slug);

    savingSet.add(slug);
    savingSet = savingSet;
    hidden = next;

    try {
      const res = await fetch(`${BASE_URL}/api/preview-visibility`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ hidden: Array.from(next) }),
      });
      if (!res.ok) throw new Error('save failed');
    } catch (e) {
      const reverted = new Set(hidden);
      if (reverted.has(slug)) reverted.delete(slug);
      else reverted.add(slug);
      hidden = reverted;
      alert('Could not save visibility change: ' + e.message);
    } finally {
      savingSet.delete(slug);
      savingSet = savingSet;
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape' && showLogin) showLogin = false;
  }

  const services = [
    {
      title: 'Pixel-perfect, hand-written code',
      body: 'No templates, no drag-and-drop builders. Every layout, animation, and interaction is custom HTML/CSS/JS written for your brand.',
    },
    {
      title: 'Built to convert, not decorate',
      body: 'Clear CTAs, fast load, mobile-first, SEO-ready. The goal is phone calls and form fills — design is the vehicle, not the point.',
    },
    {
      title: 'Ships in 2–4 weeks',
      body: 'Small scopes, tight loops, weekly check-ins. You see real progress on a staging URL from week one, not a black box for two months.',
    },
    {
      title: 'Own your site, forever',
      body: 'Static hosting on Netlify, free SSL, deploys from git. No CMS subscription, no platform lock-in — your yearly bill stays under $30.',
    },
  ];

  const process = [
    { num: '01', title: 'Call', text: 'Free 30 min. We talk goals, brand, and what your customers are actually searching for.' },
    { num: '02', title: 'Design', text: 'I send a first mockup within a week. You give notes. We iterate until it feels right.' },
    { num: '03', title: 'Build', text: 'I hand-code it. You get a staging URL to poke at in real time.' },
    { num: '04', title: 'Launch', text: 'Domain, SSL, analytics, SEO basics. Handoff doc included. You\'re live.' },
  ];
</script>

<svelte:head>
  <title>Portfolio — Graham Zemel</title>
  <meta name="description" content="Hand-crafted websites by Graham Zemel — custom-coded sites for any brand that needs to look like it means business." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="shell">
  <div class="grid-bg"></div>
  <div class="aura"></div>

  <div class="wrap">
    <!-- HERO -->
    <header class="hero">
      <div class="eyebrow">
        <span class="dot"></span>
        Taking 2 projects this quarter
      </div>

      <h1>
        <span class="h-line">Hand-crafted</span>
        <span class="h-line h-accent">websites</span>
        <span class="h-line">for businesses</span>
        <span class="h-line">that hustle.</span>
      </h1>

      <p class="lede">
        Every site below was designed and hand-coded by me from scratch — no themes, no page
        builders, no drag-and-drop. Real HTML, CSS, and JavaScript, written line by line for
        the way each business actually earns.
      </p>

      <!-- Disclaimer / reassurance -->
      <div class="disclaimer">
        <div class="dis-ico">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
          </svg>
        </div>
        <p>
          <strong>Don't see your industry here?</strong> Doesn't matter. These are just the
          ones that went live recently — I build for any brand that needs a site that actually
          works. <a href="mailto:{CONTACT_EMAIL}?subject=Project%20inquiry">Tell me what you do</a>
          and we'll figure it out.
        </p>
      </div>

      <div class="cta-row">
        <a class="cta primary" href="mailto:{CONTACT_EMAIL}?subject=New%20website%20project">
          Start a project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
        <a class="cta ghost" href="#work">See the work</a>
      </div>

      <div class="stats">
        <div class="stat">
          <span class="stat-num">{visibleCount}</span>
          <span class="stat-label">live sites</span>
        </div>
        <div class="stat-div"></div>
        <div class="stat">
          <span class="stat-num">{categories.length - 1}</span>
          <span class="stat-label">industries</span>
        </div>
        <div class="stat-div"></div>
        <div class="stat">
          <span class="stat-num">2–4<span class="stat-unit">wks</span></span>
          <span class="stat-label">typical turnaround</span>
        </div>
        <div class="stat-div"></div>
        <div class="stat">
          <span class="stat-num">0</span>
          <span class="stat-label">page builders used</span>
        </div>
      </div>
    </header>

    <!-- SERVICES -->
    <section class="services">
      <div class="section-head">
        <span class="kicker">What you get</span>
        <h2>Not a template. Not a drag-and-drop. An <em>actual</em> website.</h2>
      </div>

      <div class="services-grid">
        {#each services as s, i}
          <div class="svc-card">
            <span class="svc-num">0{i + 1}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- WORK -->
    <section id="work" class="work">
      {#if loadedVisibility}
        <div class="section-head work-head">
          <div>
            <span class="kicker">The work</span>
            <h2>{visibleCount} sites, {categories.length - 1} industries, <em>zero</em> templates.</h2>
          </div>

          <div class="filter-row">
            <div class="filters">
              {#each categories as cat}
                <button
                  class="chip"
                  class:active={activeFilter === cat}
                  on:click={() => (activeFilter = cat)}
                >
                  {cat}
                </button>
              {/each}
            </div>
            {#if isAdmin}
              <div class="admin-badge">
                <span class="pulse"></span>
                Admin · {hidden.size} hidden
                <button class="linklike" on:click={logout}>sign out</button>
              </div>
            {/if}
          </div>
        </div>

        <div class="grid">
          {#each visibleSites as site (site.slug)}
            {@const isHidden = hidden.has(site.slug)}
            {@const saving = savingSet.has(site.slug)}
            <div class="card" class:hidden-card={isHidden}>
              <a href="/preview/{site.slug}" class="card-link" aria-label="Open {site.name}">
                <!-- Browser-chrome framed live iframe -->
                <div class="browser">
                  <div class="browser-bar">
                    <span class="dot-r"></span>
                    <span class="dot-y"></span>
                    <span class="dot-g"></span>
                    <div class="url-pill">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                      grahamzemel.com/preview/<span class="url-slug">{site.slug}</span>
                    </div>
                  </div>
                  <div class="thumb">
                    <iframe
                      src={site.url}
                      title={site.name}
                      loading="lazy"
                      sandbox="allow-scripts allow-same-origin"
                    ></iframe>
                    <div class="thumb-overlay">
                      <span class="view-btn">
                        Open preview
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M7 17L17 7M7 7h10v10"/>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
              <div class="info">
                <div class="info-top">
                  <span class="cat-chip">{site.category}</span>
                  {#if isAdmin && isHidden}
                    <span class="status-chip hidden-chip">Hidden</span>
                  {/if}
                </div>
                <h3>{site.name}</h3>
                <p class="blurb">{site.blurb}</p>
                <div class="info-row">
                  <span class="host">{site.url.replace(/^https?:\/\//, '')}</span>
                  {#if isAdmin}
                    <label class="toggle" title={isHidden ? 'Show to visitors' : 'Hide from visitors'}>
                      <input
                        type="checkbox"
                        checked={!isHidden}
                        disabled={saving}
                        on:change={() => toggle(site.slug)}
                      />
                      <span class="slider"></span>
                    </label>
                  {/if}
                </div>
              </div>
            </div>
          {/each}
        </div>

        {#if visibleSites.length === 0}
          <div class="empty"><p>No sites match this filter yet.</p></div>
        {/if}
      {:else}
        <div class="grid">
          {#each Array(6) as _}
            <div class="card skeleton">
              <div class="browser"><div class="browser-bar"></div><div class="thumb"></div></div>
              <div class="info">
                <div class="sk-line sk-sm"></div>
                <div class="sk-line sk-lg"></div>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </section>

    <!-- PROCESS -->
    <section class="process">
      <div class="section-head">
        <span class="kicker">How it works</span>
        <h2>Four steps. No mystery. No scope creep.</h2>
      </div>

      <div class="process-grid">
        {#each process as step, i}
          <div class="step">
            <div class="step-head">
              <span class="step-num">{step.num}</span>
              {#if i < process.length - 1}<span class="step-line"></span>{/if}
            </div>
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </div>
        {/each}
      </div>
    </section>

    <!-- PROOF -->
    <section class="proof">
      <div class="proof-grid">
        <div class="proof-lead">
          <span class="kicker">Why hand-coded</span>
          <h2>Squarespace makes a website. I make <em>your</em> website.</h2>
          <p>
            Template sites look like templates because they are. The fonts, the layouts, the
            animations, the SEO — all shared with ten thousand other businesses. When I build
            something for you, it's yours. Every detail is intentional, every line of code is
            written to match your brand, your customers, and how they actually buy.
          </p>
        </div>
        <ul class="proof-list">
          <li><span class="check">✓</span> Custom design system per project</li>
          <li><span class="check">✓</span> Mobile-first, 95+ Lighthouse scores</li>
          <li><span class="check">✓</span> On-page SEO, schema, sitemap built in</li>
          <li><span class="check">✓</span> Analytics + contact-form notifications wired on day one</li>
          <li><span class="check">✓</span> You own the code, the domain, and the traffic</li>
        </ul>
      </div>
    </section>

    <!-- CTA FOOTER -->
    <section class="foot">
      <div class="foot-glow"></div>
      <div class="foot-inner">
        <span class="kicker">Let's build</span>
        <h2>Got a business that deserves a better website?</h2>
        <p>
          Send me a note with what you do and where you're stuck. I'll reply within 24 hours
          with honest thoughts — whether or not we end up working together.
        </p>
        <div class="foot-ctas">
          <a class="cta primary big" href="mailto:{CONTACT_EMAIL}?subject=New%20website%20project">
            {CONTACT_EMAIL}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 12h14M13 5l7 7-7 7"/>
            </svg>
          </a>
          <a class="cta ghost big" href="/">About Graham</a>
        </div>
      </div>
    </section>
  </div>

  {#if !isAdmin}
    <button
      class="admin-trigger"
      on:click={() => (showLogin = true)}
      aria-label="Admin"
      title="Admin"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"/>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
      </svg>
    </button>
  {/if}

  {#if showLogin}
    <div class="modal-backdrop" on:click={() => (showLogin = false)}>
      <form class="modal" on:submit|preventDefault={login} on:click|stopPropagation>
        <h2>Admin access</h2>
        <p class="modal-sub">Enter the password to show/hide portfolio sites.</p>
        <input
          type="password"
          bind:value={pwInput}
          placeholder="Password"
          autofocus
          autocomplete="off"
        />
        {#if loginError}<p class="err">{loginError}</p>{/if}
        <div class="modal-actions">
          <button type="button" class="cta ghost" on:click={() => (showLogin = false)}>Cancel</button>
          <button type="submit" class="cta primary" disabled={loginLoading || !pwInput}>
            {loginLoading ? 'Checking…' : 'Unlock'}
          </button>
        </div>
      </form>
    </div>
  {/if}
</div>

<style>
  :global(body) { background: #121217; }

  .shell {
    --accent-1: #33FFC1;   /* mint */
    --accent-2: #34F8FF;   /* cyan */
    --accent-3: #3377FF;   /* blue */
    --accent-4: #0C55FF;   /* deep blue */
    --accent-grad: linear-gradient(135deg, #33FFC1 0%, #34F8FF 35%, #3377FF 80%, #0C55FF 100%);
    --accent-grad-text: linear-gradient(120deg, #33FFC1 0%, #34F8FF 35%, #3377FF 75%, #0C55FF 100%);
    --bg: #121217;
    --surface: rgba(255,255,255,0.025);
    --border: rgba(255,255,255,0.07);
    --border-hi: rgba(255,255,255,0.16);
    --ink: #ebebef;
    --muted: #a8a8b3;
    --muted-2: #6b6b75;

    position: relative;
    min-height: 100vh;
    color: var(--ink);
    font-family: 'Source Sans Pro', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    overflow-x: hidden;
  }

  /* Grid background with radial mask — scoped to hero area */
  .grid-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    height: 1000px;
    pointer-events: none;
    background-image:
      linear-gradient(to right, rgba(52,248,255,0.06) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(52,248,255,0.06) 1px, transparent 1px);
    background-size: 64px 64px;
    -webkit-mask-image: radial-gradient(ellipse 80% 55% at 50% 0%, #000 45%, transparent 90%);
    mask-image: radial-gradient(ellipse 80% 55% at 50% 0%, #000 45%, transparent 90%);
  }
  .aura {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(900px 600px at 12% -10%, rgba(51,255,193,0.08), transparent 60%),
      radial-gradient(800px 500px at 88% 5%, rgba(51,119,255,0.13), transparent 55%),
      radial-gradient(1000px 600px at 50% 115%, rgba(12,85,255,0.1), transparent 60%);
  }

  .wrap {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 80px 28px 100px;
  }

  /* ---------- HERO ---------- */
  .hero { margin-bottom: 160px; max-width: 960px; }

  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: #33FFC1;
    background: linear-gradient(180deg, rgba(51,255,193,0.1), rgba(51,255,193,0.03));
    border: 1px solid rgba(51,255,193,0.25);
    padding: 7px 14px;
    border-radius: 999px;
    margin-bottom: 32px;
    backdrop-filter: blur(8px);
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #33FFC1;
    box-shadow: 0 0 12px #33FFC1;
    animation: pulse 2.4s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.55; transform: scale(1.35); }
  }

  h1 {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: clamp(42px, 7.5vw, 92px);
    font-weight: 700;
    line-height: 0.98;
    letter-spacing: -0.03em;
    margin: 0 0 32px;
  }
  .h-line {
    display: block;
    background: linear-gradient(180deg, #ffffff 0%, rgba(200,200,215,0.55) 110%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .h-accent {
    background: var(--accent-grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-style: italic;
  }

  .lede {
    font-size: 18px;
    line-height: 1.65;
    color: var(--muted);
    margin: 0 0 28px;
    max-width: 640px;
  }

  .disclaimer {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 16px 20px;
    background: linear-gradient(90deg, rgba(51,255,193,0.06), rgba(51,119,255,0.05));
    border: 1px solid rgba(51,255,193,0.18);
    border-radius: 14px;
    margin-bottom: 36px;
    max-width: 680px;
  }
  .dis-ico {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: rgba(51,255,193,0.14);
    color: #33FFC1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }
  .disclaimer p {
    font-size: 14px;
    line-height: 1.55;
    color: #c4c4cc;
    margin: 0;
  }
  .disclaimer strong { color: #fff; font-weight: 600; }
  .disclaimer a {
    color: #34F8FF;
    text-decoration: none;
    border-bottom: 1px solid rgba(52,248,255,0.4);
    transition: border-color 0.15s;
  }
  .disclaimer a:hover { border-bottom-color: #34F8FF; }

  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 60px; }

  .cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: transform 0.15s, background 0.2s, border-color 0.2s, color 0.2s, box-shadow 0.2s;
    font-family: inherit;
  }
  .cta.big { padding: 14px 26px; font-size: 15px; }
  .cta.primary {
    background: var(--accent-grad);
    color: #081029;
    font-weight: 600;
    box-shadow: 0 10px 30px -10px rgba(51,119,255,0.6), 0 0 0 1px rgba(255,255,255,0.15) inset;
  }
  .cta.primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 14px 34px -8px rgba(51,119,255,0.7), 0 0 0 1px rgba(255,255,255,0.2) inset;
  }
  .cta.primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .cta.ghost {
    background: transparent;
    color: var(--ink);
    border-color: rgba(255,255,255,0.14);
  }
  .cta.ghost:hover { border-color: rgba(52,248,255,0.4); background: rgba(52,248,255,0.04); color: #34F8FF; }

  .stats {
    display: flex;
    align-items: center;
    gap: 28px;
    flex-wrap: wrap;
    padding: 22px 26px;
    background: rgba(255,255,255,0.02);
    border: 1px solid var(--border);
    border-radius: 16px;
    backdrop-filter: blur(10px);
  }
  .stat { display: flex; flex-direction: column; gap: 2px; }
  .stat-num {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .stat-unit { font-size: 14px; color: var(--muted); font-weight: 500; margin-left: 2px; font-family: 'Source Sans Pro', sans-serif; }
  .stat-label {
    font-size: 11px;
    color: var(--muted-2);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }
  .stat-div { width: 1px; height: 28px; background: rgba(255,255,255,0.08); }

  /* ---------- SECTION COMMON ---------- */
  .section-head { margin-bottom: 48px; }
  .kicker {
    display: inline-block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: #34F8FF;
    margin-bottom: 16px;
  }
  section h2 {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: clamp(28px, 4.2vw, 44px);
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.1;
    color: #fff;
    margin: 0;
    max-width: 820px;
  }
  section h2 em {
    font-style: italic;
    background: var(--accent-grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  /* ---------- SERVICES ---------- */
  .services { margin-bottom: 160px; }
  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 18px;
  }
  .svc-card {
    position: relative;
    background: linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.01));
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 28px 24px;
    transition: border-color 0.2s, transform 0.2s, background 0.2s;
    overflow: hidden;
  }
  .svc-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(400px circle at 0% 0%, rgba(51,119,255,0.08), transparent 50%);
    opacity: 0;
    transition: opacity 0.3s;
    pointer-events: none;
  }
  .svc-card:hover::before { opacity: 1; }
  .svc-card:hover {
    border-color: rgba(51,119,255,0.3);
    transform: translateY(-3px);
  }
  .svc-num {
    display: inline-block;
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: 13px;
    font-weight: 700;
    font-style: italic;
    background: var(--accent-grad-text);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: 0.04em;
    margin-bottom: 18px;
  }
  .svc-card h3 {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: 19px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 10px;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }
  .svc-card p {
    font-size: 14px;
    line-height: 1.6;
    color: var(--muted);
    margin: 0;
  }

  /* ---------- WORK ---------- */
  .work { margin-bottom: 160px; scroll-margin-top: 40px; }
  .work-head {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 28px;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }
  .filter-row {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: flex-end;
  }
  .filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip {
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    padding: 7px 13px;
    border-radius: 999px;
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: all 0.15s;
  }
  .chip:hover { color: var(--ink); border-color: rgba(52,248,255,0.35); }
  .chip.active {
    background: var(--accent-grad);
    color: #081029;
    border-color: transparent;
    font-weight: 600;
  }
  .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 11px;
    color: var(--muted);
    background: rgba(51,255,193,0.08);
    border: 1px solid rgba(51,255,193,0.28);
    padding: 5px 11px;
    border-radius: 999px;
  }
  .pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #33FFC1;
    animation: pulse 2s infinite;
  }
  .linklike {
    background: none;
    border: none;
    color: var(--muted-2);
    font-family: inherit;
    font-size: 11px;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    text-decoration: underline;
    text-decoration-color: rgba(255,255,255,0.2);
  }
  .linklike:hover { color: var(--ink); }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
    gap: 26px;
  }

  .card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 18px;
    overflow: hidden;
    transition: transform 0.25s cubic-bezier(.2,.8,.2,1), border-color 0.2s, box-shadow 0.25s;
    display: flex;
    flex-direction: column;
  }
  .card:hover {
    border-color: rgba(52,248,255,0.3);
    transform: translateY(-4px);
    box-shadow: 0 20px 40px -20px rgba(51,119,255,0.3);
  }
  .card.hidden-card { opacity: 0.55; border-style: dashed; }
  .card.hidden-card:hover { opacity: 0.9; }
  .card-link { display: block; text-decoration: none; color: inherit; }

  /* Browser chrome wrapping the iframe */
  .browser {
    position: relative;
    background: #0a0a0d;
    border-bottom: 1px solid var(--border);
  }
  .browser-bar {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 12px;
    background: linear-gradient(180deg, #1a1a22, #121218);
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .dot-r, .dot-y, .dot-g {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .dot-r { background: #ff5f57; }
  .dot-y { background: #febc2e; }
  .dot-g { background: #28c840; }
  .url-pill {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: 10px;
    padding: 4px 10px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 999px;
    font-size: 10.5px;
    color: var(--muted-2);
    font-family: 'SF Mono', ui-monospace, monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .url-slug { color: #34F8FF; }

  .thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #050506;
  }
  .thumb iframe {
    position: absolute;
    top: 0; left: 0;
    width: 200%; height: 200%;
    transform: scale(0.5);
    transform-origin: top left;
    border: none;
    pointer-events: none;
  }
  .thumb-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.7) 100%);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 14px;
    opacity: 0;
    transition: opacity 0.2s;
  }
  .card:hover .thumb-overlay { opacity: 1; }
  .view-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    color: #081029;
    background: var(--accent-grad);
    padding: 8px 14px;
    border-radius: 999px;
    box-shadow: 0 4px 12px rgba(51,119,255,0.3);
  }

  .info { padding: 20px 22px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
  .info-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .cat-chip {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #34F8FF;
    background: rgba(52,248,255,0.08);
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(52,248,255,0.18);
  }
  .status-chip {
    font-size: 10px;
    font-weight: 600;
    padding: 4px 9px;
    border-radius: 999px;
    letter-spacing: 0.04em;
  }
  .hidden-chip {
    color: #fca5a5;
    background: rgba(248,113,113,0.08);
    border: 1px solid rgba(248,113,113,0.22);
  }
  .card h3 {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: 19px;
    font-weight: 700;
    letter-spacing: -0.01em;
    margin: 2px 0 0;
    color: #fafafa;
  }
  .blurb { font-size: 13.5px; color: #8a8a93; line-height: 1.55; margin: 0; }
  .info-row {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 12px;
    border-top: 1px solid rgba(255,255,255,0.04);
  }
  .host {
    font-size: 11px;
    color: var(--muted-2);
    font-family: 'SF Mono', ui-monospace, monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .toggle {
    position: relative;
    display: inline-block;
    width: 36px;
    height: 20px;
    flex-shrink: 0;
    cursor: pointer;
  }
  .toggle input { opacity: 0; width: 0; height: 0; }
  .slider {
    position: absolute;
    inset: 0;
    background: rgba(255,255,255,0.12);
    border-radius: 20px;
    transition: background 0.2s;
  }
  .slider::before {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
    left: 3px;
    top: 3px;
    background: #fff;
    border-radius: 50%;
    transition: transform 0.2s;
  }
  .toggle input:checked + .slider { background: var(--accent-grad); }
  .toggle input:checked + .slider::before { transform: translateX(16px); }
  .toggle input:disabled + .slider { opacity: 0.5; }

  .empty { text-align: center; padding: 60px 20px; color: var(--muted-2); }

  .skeleton .thumb {
    background: linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 100%);
    background-size: 200% 100%;
    animation: shimmer 1.8s infinite;
  }
  .sk-line { background: rgba(255,255,255,0.05); border-radius: 4px; height: 10px; margin-bottom: 8px; }
  .sk-sm { width: 40%; }
  .sk-lg { width: 70%; height: 14px; }
  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* ---------- PROCESS ---------- */
  .process { margin-bottom: 160px; }
  .process-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 24px;
  }
  .step {
    padding: 28px 24px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    position: relative;
    transition: border-color 0.2s, transform 0.2s;
  }
  .step:hover { border-color: rgba(52,248,255,0.25); transform: translateY(-2px); }
  .step-head {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 18px;
  }
  .step-num {
    font-family: 'SF Mono', ui-monospace, monospace;
    font-size: 12px;
    color: #34F8FF;
    background: rgba(52,248,255,0.1);
    padding: 4px 9px;
    border-radius: 6px;
    font-weight: 600;
    letter-spacing: 0.04em;
    border: 1px solid rgba(52,248,255,0.2);
  }
  .step-line { flex: 1; height: 1px; background: linear-gradient(90deg, rgba(52,248,255,0.35), transparent); }
  .step h3 {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: 19px;
    font-weight: 700;
    margin: 0 0 10px;
    color: #fff;
    letter-spacing: -0.01em;
  }
  .step p { font-size: 13.5px; line-height: 1.6; color: var(--muted); margin: 0; }

  /* ---------- PROOF ---------- */
  .proof { margin-bottom: 160px; }
  .proof-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 56px;
    align-items: start;
    padding: 56px;
    background:
      linear-gradient(135deg, rgba(51,255,193,0.05), rgba(51,119,255,0.05) 60%, rgba(12,85,255,0.04));
    border: 1px solid rgba(51,119,255,0.18);
    border-radius: 22px;
    position: relative;
    overflow: hidden;
  }
  .proof-grid::before {
    content: "";
    position: absolute;
    top: -50%;
    right: -20%;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(51,119,255,0.12), transparent 60%);
    pointer-events: none;
  }
  .proof-lead { position: relative; }
  .proof-lead p {
    font-size: 15px;
    line-height: 1.75;
    color: var(--muted);
    margin: 20px 0 0;
  }
  .proof-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    position: relative;
  }
  .proof-list li {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    font-size: 14.5px;
    color: #d4d4da;
    line-height: 1.5;
  }
  .check {
    color: #33FFC1;
    font-weight: 700;
    flex-shrink: 0;
    font-size: 14px;
    margin-top: 2px;
  }

  /* ---------- FOOTER CTA ---------- */
  .foot {
    position: relative;
    padding: 72px 56px;
    border-radius: 24px;
    border: 1px solid rgba(51,119,255,0.2);
    background: rgba(255,255,255,0.015);
    overflow: hidden;
    text-align: center;
  }
  .foot-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(700px 220px at 50% 0%, rgba(51,119,255,0.22), transparent 70%),
      radial-gradient(500px 200px at 20% 100%, rgba(51,255,193,0.12), transparent 70%),
      radial-gradient(500px 200px at 80% 100%, rgba(52,248,255,0.14), transparent 70%);
    pointer-events: none;
  }
  .foot-inner { position: relative; z-index: 1; max-width: 640px; margin: 0 auto; }
  .foot h2 { margin: 0 auto 16px; max-width: 540px; }
  .foot-inner p {
    font-size: 15px;
    line-height: 1.65;
    color: var(--muted);
    margin: 0 0 32px;
  }
  .foot-ctas {
    display: flex;
    gap: 12px;
    justify-content: center;
    flex-wrap: wrap;
  }

  .admin-trigger {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 20;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    color: var(--muted-2);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.35;
    transition: opacity 0.2s, color 0.2s, border-color 0.2s;
  }
  .admin-trigger:hover { opacity: 1; color: #34F8FF; border-color: rgba(52,248,255,0.4); }

  .modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.7);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  .modal {
    background: #15151c;
    border: 1px solid rgba(52,248,255,0.15);
    border-radius: 16px;
    padding: 28px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 25px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(52,248,255,0.05);
  }
  .modal h2 {
    font-family: 'Source Serif Pro', Georgia, serif;
    font-size: 20px;
    font-weight: 700;
    margin: 0 0 6px;
    color: #fff;
    letter-spacing: -0.01em;
  }
  .modal-sub { font-size: 13px; color: var(--muted); margin: 0 0 18px; }
  .modal input {
    width: 100%;
    padding: 11px 14px;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    color: #fff;
    font-size: 14px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    box-sizing: border-box;
  }
  .modal input:focus { border-color: rgba(52,248,255,0.5); }
  .err { color: #fca5a5; font-size: 12px; margin: 10px 0 0; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

  @media (max-width: 900px) {
    .proof-grid { grid-template-columns: 1fr; gap: 32px; padding: 36px; }
    .work-head { flex-direction: column; align-items: flex-start; }
    .filter-row { justify-content: flex-start; }
    .url-pill { font-size: 9.5px; }
  }
  @media (max-width: 520px) {
    .wrap { padding: 52px 18px 72px; }
    .hero { margin-bottom: 100px; }
    .services, .work, .process, .proof { margin-bottom: 100px; }
    .grid { grid-template-columns: 1fr; }
    .foot { padding: 48px 28px; }
    .stats { gap: 18px; padding: 18px 20px; }
    .stat-div { display: none; }
    .url-slug { display: none; }
  }
</style>
