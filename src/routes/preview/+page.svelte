<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  const DEV = browser && window.location.hostname === 'localhost';
  const BASE_URL = DEV ? 'http://localhost:3000' : 'https://grahamzemelcom-596da5a7c96e.herokuapp.com';

  const sites = [
    { slug: 'the-bernardi-group', name: 'The Bernardi Group', category: 'Real Estate', url: 'https://the-bernardi-group-site.netlify.app' },
    { slug: 'burgess-group-compass', name: 'Burgess Group Compass', category: 'Real Estate', url: 'https://burgess-group-compass-site.netlify.app' },
    { slug: 'darcy-kiefel-photography', name: 'Darcy Kiefel Photography', category: 'Wedding Photographer', url: 'https://darcy-kiefel-photography-site.netlify.app' },
    { slug: 'veterinary-emergency-group', name: 'Veterinary Emergency Group', category: 'Veterinary Clinic', url: 'https://veterinary-emergency-group-site.netlify.app' },
    { slug: 'vasu-skin-solutions', name: 'Vasu Skin Solutions', category: 'Med Spa', url: 'https://vasu-skin-solutions-site.netlify.app' },
    { slug: 'terry-chiropractic-boulder', name: 'Terry Chiropractic Boulder', category: 'Chiropractor', url: 'https://terry-chiropractic-boulder-site.netlify.app' },
    { slug: 'physical-therapy-of-boulder', name: 'Physical Therapy of Boulder', category: 'Physical Therapy', url: 'https://physical-therapy-of-boulder-site.netlify.app' },
    { slug: 'north-boulder-physical-therapy-foothills', name: 'North Boulder PT — Foothills', category: 'Physical Therapy', url: 'https://north-boulder-physical-therapy-foothills-site.netlify.app' },
    { slug: 'the-joint-chiropractic', name: 'The Joint Chiropractic', category: 'Chiropractor', url: 'https://the-joint-chiropractic-site.netlify.app' },
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
    authToken = localStorage.getItem('gz_admin_token') || '';
    isAdmin = !!authToken;
    await loadVisibility();
  });

  async function loadVisibility() {
    try {
      const res = await fetch(`${BASE_URL}/api/preview-visibility`);
      const data = await res.json();
      hidden = new Set(data.hidden || []);
    } catch (e) {
      console.error('visibility load failed', e);
    } finally {
      loadedVisibility = true;
      hidden = hidden;
    }
  }

  async function login() {
    if (!pwInput) return;
    loginLoading = true;
    loginError = '';
    try {
      const res = await fetch(`${BASE_URL}/api/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
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
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        credentials: 'include',
        body: JSON.stringify({ hidden: Array.from(next) }),
      });
      if (!res.ok) throw new Error('save failed');
    } catch (e) {
      // revert
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
</script>

<svelte:head>
  <title>Portfolio — Graham Zemel</title>
  <meta name="description" content="Custom websites built for local businesses by Graham Zemel." />
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<svelte:window on:keydown={handleKeydown} />

<div class="shell">
  <div class="bg-aura"></div>

  <div class="wrap">
    <header class="hero">
      <div class="eyebrow">
        <span class="dot"></span>
        Portfolio · Graham Zemel
      </div>
      <h1>Websites that feel handmade, built for businesses that hustle.</h1>
      <p class="lede">
        A selection of sites I've designed and shipped end-to-end — from real estate teams to
        chiropractors, photographers, and med spas. Each one is a live preview you can scroll.
      </p>

      <div class="stats">
        <div class="stat">
          <span class="stat-num">{visibleCount}</span>
          <span class="stat-label">live sites</span>
        </div>
        <div class="stat">
          <span class="stat-num">{categories.length - 1}</span>
          <span class="stat-label">industries</span>
        </div>
        <div class="stat">
          <span class="stat-num">100%</span>
          <span class="stat-label">custom-built</span>
        </div>
      </div>

      <div class="cta-row">
        <a class="cta primary" href="mailto:grahamzemel126@gmail.com?subject=New%20website%20project">
          Start a project
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
        <a class="cta ghost" href="/">About Graham</a>
      </div>
    </header>

    {#if loadedVisibility}
      <div class="filter-bar">
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
            Admin mode · {hidden.size} hidden
            <button class="linklike" on:click={logout}>sign out</button>
          </div>
        {/if}
      </div>

      <div class="grid">
        {#each visibleSites as site (site.slug)}
          {@const isHidden = hidden.has(site.slug)}
          {@const saving = savingSet.has(site.slug)}
          <div class="card" class:hidden-card={isHidden}>
            <a href="/preview/{site.slug}" class="card-link" aria-label="Open {site.name}">
              <div class="thumb">
                <iframe
                  src={site.url}
                  title={site.name}
                  loading="lazy"
                  sandbox="allow-scripts allow-same-origin"
                ></iframe>
                <div class="thumb-overlay">
                  <span class="view-btn">
                    View site
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M7 17L17 7M7 7h10v10"/>
                    </svg>
                  </span>
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
        <div class="empty">
          <p>No sites match this filter yet.</p>
        </div>
      {/if}
    {:else}
      <div class="grid">
        {#each Array(6) as _}
          <div class="card skeleton">
            <div class="thumb"></div>
            <div class="info">
              <div class="sk-line sk-sm"></div>
              <div class="sk-line sk-lg"></div>
            </div>
          </div>
        {/each}
      </div>
    {/if}

    <footer class="foot">
      <div>
        <p class="foot-title">Building something next?</p>
        <p class="foot-sub">I take on a handful of projects a quarter. Let's talk.</p>
      </div>
      <a class="cta primary" href="mailto:grahamzemel126@gmail.com?subject=New%20website%20project">
        grahamzemel126@gmail.com
      </a>
    </footer>
  </div>

  <!-- Subtle admin trigger (bottom-right gear) -->
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
  :global(body) { background: #0a0a0b; }

  .shell {
    position: relative;
    min-height: 100vh;
    color: #e8e8ea;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    overflow-x: hidden;
  }

  .bg-aura {
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background:
      radial-gradient(900px 600px at 15% -10%, rgba(124, 92, 255, 0.12), transparent 60%),
      radial-gradient(700px 500px at 90% 10%, rgba(52, 211, 153, 0.08), transparent 55%),
      radial-gradient(800px 500px at 50% 110%, rgba(56, 189, 248, 0.07), transparent 60%);
  }

  .wrap {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    padding: 64px 28px 80px;
  }

  /* Hero */
  .hero { margin-bottom: 56px; max-width: 780px; }
  .eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #9b9ba3;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.08);
    padding: 6px 12px;
    border-radius: 999px;
    margin-bottom: 24px;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #34d399;
    box-shadow: 0 0 10px #34d399;
  }
  h1 {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 700;
    line-height: 1.08;
    letter-spacing: -0.025em;
    margin: 0 0 20px;
    background: linear-gradient(180deg, #ffffff 0%, #a8a8b3 110%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .lede {
    font-size: 17px;
    line-height: 1.6;
    color: #a8a8b3;
    margin: 0 0 32px;
    max-width: 640px;
  }

  .stats {
    display: flex;
    gap: 40px;
    margin-bottom: 32px;
    flex-wrap: wrap;
  }
  .stat { display: flex; flex-direction: column; gap: 2px; }
  .stat-num {
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .stat-label {
    font-size: 12px;
    color: #6b6b75;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .cta {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 11px 20px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    border: 1px solid transparent;
    cursor: pointer;
    transition: transform 0.15s, background 0.2s, border-color 0.2s, color 0.2s;
    font-family: inherit;
  }
  .cta.primary {
    background: #fff;
    color: #0a0a0b;
  }
  .cta.primary:hover { transform: translateY(-1px); background: #f0f0f2; }
  .cta.primary:disabled { opacity: 0.5; cursor: not-allowed; }
  .cta.ghost {
    background: transparent;
    color: #e8e8ea;
    border-color: rgba(255,255,255,0.14);
  }
  .cta.ghost:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.04); }

  /* Filter bar */
  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 24px;
    padding-bottom: 18px;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .filters { display: flex; gap: 6px; flex-wrap: wrap; }
  .chip {
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    padding: 7px 14px;
    border-radius: 999px;
    background: transparent;
    color: #9b9ba3;
    border: 1px solid rgba(255,255,255,0.08);
    cursor: pointer;
    transition: all 0.15s;
  }
  .chip:hover { color: #e8e8ea; border-color: rgba(255,255,255,0.18); }
  .chip.active {
    background: #fff;
    color: #0a0a0b;
    border-color: #fff;
  }
  .admin-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: #a8a8b3;
    background: rgba(52, 211, 153, 0.08);
    border: 1px solid rgba(52, 211, 153, 0.25);
    padding: 6px 12px;
    border-radius: 999px;
  }
  .pulse {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #34d399;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.3); }
  }
  .linklike {
    background: none;
    border: none;
    color: #6b6b75;
    font-family: inherit;
    font-size: 12px;
    cursor: pointer;
    padding: 0;
    margin-left: 4px;
    text-decoration: underline;
    text-decoration-color: rgba(255,255,255,0.2);
  }
  .linklike:hover { color: #e8e8ea; }

  /* Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 22px;
  }

  .card {
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.07);
    border-radius: 16px;
    overflow: hidden;
    transition: transform 0.2s, border-color 0.2s, background 0.2s;
    display: flex;
    flex-direction: column;
  }
  .card:hover {
    border-color: rgba(255,255,255,0.16);
    background: rgba(255,255,255,0.035);
    transform: translateY(-3px);
  }
  .card.hidden-card {
    opacity: 0.55;
    border-style: dashed;
  }
  .card.hidden-card:hover { opacity: 0.85; }

  .card-link { display: block; text-decoration: none; color: inherit; }

  .thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #050506;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .thumb iframe {
    position: absolute;
    top: 0; left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: top left;
    border: none;
    pointer-events: none;
  }
  .thumb-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.6) 100%);
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
    color: #0a0a0b;
    background: #fff;
    padding: 7px 12px;
    border-radius: 999px;
  }

  .info { padding: 18px 20px 18px; display: flex; flex-direction: column; gap: 8px; flex: 1; }
  .info-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
  .cat-chip {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9b9ba3;
    background: rgba(255,255,255,0.04);
    padding: 4px 9px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.06);
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
    background: rgba(248, 113, 113, 0.08);
    border: 1px solid rgba(248, 113, 113, 0.2);
  }
  h3 {
    font-size: 17px;
    font-weight: 600;
    letter-spacing: -0.01em;
    margin: 2px 0 0;
    color: #fafafa;
  }
  .info-row {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding-top: 8px;
  }
  .host {
    font-size: 11px;
    color: #6b6b75;
    font-family: 'SF Mono', ui-monospace, monospace;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* Toggle switch */
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
  .toggle input:checked + .slider { background: #34d399; }
  .toggle input:checked + .slider::before { transform: translateX(16px); }
  .toggle input:disabled + .slider { opacity: 0.5; }

  /* Empty state */
  .empty {
    text-align: center;
    padding: 80px 20px;
    color: #6b6b75;
  }

  /* Skeleton */
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

  /* Footer */
  .foot {
    margin-top: 80px;
    padding: 32px 32px;
    background: linear-gradient(135deg, rgba(124, 92, 255, 0.08), rgba(52, 211, 153, 0.06));
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
  }
  .foot-title { font-size: 20px; font-weight: 600; color: #fff; margin: 0 0 4px; letter-spacing: -0.01em; }
  .foot-sub { font-size: 14px; color: #a8a8b3; margin: 0; }

  /* Admin trigger (gear) */
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
    color: #6b6b75;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    opacity: 0.4;
    transition: opacity 0.2s, color 0.2s, border-color 0.2s;
  }
  .admin-trigger:hover { opacity: 1; color: #e8e8ea; border-color: rgba(255,255,255,0.25); }

  /* Modal */
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
    background: #131316;
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px;
    padding: 28px;
    width: 100%;
    max-width: 380px;
    box-shadow: 0 25px 60px rgba(0,0,0,0.5);
  }
  .modal h2 { font-size: 18px; font-weight: 600; margin: 0 0 4px; color: #fff; letter-spacing: -0.01em; }
  .modal-sub { font-size: 13px; color: #9b9ba3; margin: 0 0 18px; }
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
  .modal input:focus { border-color: rgba(255,255,255,0.3); }
  .err { color: #fca5a5; font-size: 12px; margin: 10px 0 0; }
  .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }

  @media (max-width: 520px) {
    .wrap { padding: 40px 18px 60px; }
    .grid { grid-template-columns: 1fr; }
    .foot { flex-direction: column; align-items: flex-start; text-align: left; padding: 24px; }
    .stats { gap: 28px; }
  }
</style>
