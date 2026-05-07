<section class="hero">
  <div class="hero-eyebrow custom-fade-in anim-delay-200" aria-hidden="true">
    <span class="hero-eyebrow-dot" />
    <span class="hero-eyebrow-text">Just shipped: TextCloaker</span>
  </div>

  <h1
    class="hero-title custom-fade-in anim-delay-400"
    data-admin-mobile-trigger="name"
  >
    Graham Zemel
  </h1>

  <p class="hero-meta custom-fade-in anim-delay-600">
    <span>FULL-STACK ENGINEER</span>
    <span class="hero-sep" aria-hidden="true">·</span>
    <span>AI &amp; SECURITY</span>
    <span class="hero-sep" aria-hidden="true">·</span>
    <span>CS @ CU BOULDER</span>
  </p>

  <p class="hero-blurb custom-fade-in anim-delay-700">
    Right now I'm shipping <em>FratDoor</em> (event ops used by 42 fraternities),
    <em>TextCloaker</em> (AI text cloaking, 7,000+ users), and writing daily for
    <em>The Gray Area</em>.
  </p>

  <a class="hero-scroll custom-fade-in anim-delay-900" href="#about" aria-label="Scroll to About">
    <span class="hero-scroll-text">Scroll</span>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="6 12 12 19 18 12" />
    </svg>
  </a>
</section>

<style lang="postcss">
  .hero {
    /* The hero owns the first viewport. About Me lives below the fold. */
    position: relative;
    min-height: calc(100vh - 4rem);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    /* Asymmetric padding pushes the centered text block down slightly,
       leaving room for the absolute-positioned scroll indicator at bottom */
    padding-top: 6rem;
    padding-bottom: 5rem;
    max-width: 100%;
  }
  @media (min-width: 768px) {
    .hero {
      min-height: calc(100vh - 4.5rem);
      padding-top: 9rem;
      padding-bottom: 6rem;
    }
  }


  /* ---------- Eyebrow status ---------- */
  .hero-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    width: fit-content;
    flex: 0 0 auto;
    align-self: flex-start;
    font-family: "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: oklch(0.78 0.008 250);
    padding: 0.4rem 0.85rem 0.4rem 0.7rem;
    border-radius: 9999px;
    border: 1px solid oklch(0.32 0.012 250);
    background: oklch(0.10 0.012 250 / 0.78);
    backdrop-filter: blur(10px) saturate(1.2);
    -webkit-backdrop-filter: blur(10px) saturate(1.2);
  }

  .hero-eyebrow-dot {
    display: inline-block;
    height: 0.4375rem;
    width: 0.4375rem;
    border-radius: 9999px;
    background: oklch(0.78 0.18 145);
    box-shadow: 0 0 0 3px oklch(0.78 0.18 145 / 0.18);
    animation: pulse 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  /* ---------- Big name (fluid, never overflows, never wraps) ---------- */
  .hero-title {
    font-family: "Source Serif Pro", serif;
    font-weight: 700;
    line-height: 1;
    letter-spacing: -0.035em;
    margin: 1.25rem 0 0;
    color: oklch(0.985 0.004 250);

    /* Single-line, fluid sized to fit the content column.
       Conservative max prevents overflow at any viewport. */
    white-space: nowrap;
    font-size: clamp(2.5rem, 9vw, 6.5rem);

    /* Strong depth shading so the title sits cleanly over the fractal */
    text-shadow:
      0 1px 0 oklch(1 0 0 / 0.04),
      0 4px 32px oklch(0 0 0 / 0.7),
      0 2px 8px oklch(0 0 0 / 0.85),
      0 0 1px oklch(0 0 0 / 0.7);

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  /* ---------- Meta row (titles, uppercase mono) ---------- */
  .hero-meta {
    margin: 1.25rem 0 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.4rem 0.625rem;
    font-family: "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    color: oklch(0.82 0.008 250);
    line-height: 1.3;
  }
  @media (min-width: 768px) {
    .hero-meta { font-size: 0.8125rem; gap: 0.5rem 0.875rem; }
  }

  .hero-sep {
    color: oklch(0.45 0.01 250);
  }

  /* ---------- Bio blurb ---------- */
  .hero-blurb {
    margin: 1.5rem 0 0;
    max-width: 38ch;
    font-family: "Source Serif Pro", serif;
    font-weight: 400;
    font-size: 1.0625rem;
    line-height: 1.5;
    color: oklch(0.86 0.008 250);
  }
  @media (min-width: 768px) {
    .hero-blurb {
      font-size: 1.25rem;
      max-width: 36ch;
      line-height: 1.45;
      margin-top: 1.75rem;
    }
  }
  .hero-blurb em {
    font-style: italic;
    color: oklch(0.96 0.005 250);
    font-weight: 500;
  }

  /* ---------- Animations ---------- */
  .custom-fade-in {
    animation: fade-in-animation 1000ms cubic-bezier(0.16, 1, 0.3, 1);
    animation-fill-mode: both;
  }
  .anim-delay-200 { animation-delay: 200ms; }
  .anim-delay-400 { animation-delay: 400ms; }
  .anim-delay-600 { animation-delay: 600ms; }
  .anim-delay-700 { animation-delay: 750ms; }
  .anim-delay-900 { animation-delay: 950ms; }

  /* ---------- Scroll indicator (absolute, viewport-centered bottom) ---------- */
  .hero-scroll {
    position: absolute;
    left: 50%;
    bottom: 1.75rem;
    transform: translateX(-50%);
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: oklch(0.62 0.012 250);
    text-decoration: none;
    transition: color 220ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  @media (min-width: 768px) {
    .hero-scroll { bottom: 2.5rem; }
  }
  .hero-scroll:hover { color: oklch(0.92 0.005 250); }
  .hero-scroll-text {
    font-family: "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace;
    font-size: 0.6875rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
  }
  .hero-scroll svg {
    height: 1rem;
    width: 1rem;
    animation: bounce-y 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes bounce-y {
    0%, 100% { transform: translateY(0); opacity: 0.55; }
    50%      { transform: translateY(4px); opacity: 1; }
  }

  @keyframes fade-in-animation {
    0% { opacity: 0; transform: translateY(8px); }
    100% { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 0 3px oklch(0.78 0.18 145 / 0.20); }
    50%      { box-shadow: 0 0 0 6px oklch(0.78 0.18 145 / 0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .custom-fade-in,
    .hero-eyebrow-dot {
      animation: none !important;
    }
    .custom-fade-in {
      opacity: 1;
      transform: none;
    }
  }
</style>
