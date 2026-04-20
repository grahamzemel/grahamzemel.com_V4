<script>
  const sites = [
    { slug: 'the-bernardi-group', name: 'The Bernardi Group', category: 'Real Estate', url: 'https://the-bernardi-group-site.netlify.app' },
    { slug: 'burgess-group-compass', name: 'Burgess Group Compass', category: 'Real Estate', url: 'https://burgess-group-compass-site.netlify.app' },
    { slug: 'darcy-kiefel-photography', name: 'Darcy Kiefel Photography', category: 'Wedding Photographer', url: 'https://darcy-kiefel-photography-site.netlify.app' },
    { slug: 'veterinary-emergency-group', name: 'Veterinary Emergency Group', category: 'Veterinary Clinic', url: 'https://veterinary-emergency-group-site.netlify.app' },
    { slug: 'vasu-skin-solutions', name: 'Vasu Skin Solutions', category: 'Med Spa', url: 'https://vasu-skin-solutions-site.netlify.app' },
    { slug: 'terry-chiropractic-boulder', name: 'Terry Chiropractic Boulder', category: 'Chiropractor', url: 'https://terry-chiropractic-boulder-site.netlify.app' },
    { slug: 'physical-therapy-of-boulder', name: 'Physical Therapy of Boulder', category: 'Physical Therapy', url: 'https://physical-therapy-of-boulder-site.netlify.app' },
    { slug: 'north-boulder-physical-therapy-foothills', name: 'North Boulder PT - Foothills', category: 'Physical Therapy', url: 'https://north-boulder-physical-therapy-foothills-site.netlify.app' },
    { slug: 'the-joint-chiropractic', name: 'The Joint Chiropractic', category: 'Chiropractor', url: 'https://the-joint-chiropractic-site.netlify.app' },
  ];
</script>

<svelte:head>
  <title>Site Previews — Graham Zemel</title>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="wrap">
  <header>
    <h1>Site Previews</h1>
    <p>{sites.length} sites</p>
  </header>

  <div class="grid">
    {#each sites as site}
      <a href="/preview/{site.slug}" class="card">
        <div class="thumb">
          <iframe
            src={site.url}
            title={site.name}
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
        <div class="info">
          <span class="cat">{site.category}</span>
          <h3>{site.name}</h3>
        </div>
      </a>
    {/each}
  </div>
</div>

<style>
  .wrap {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #0a0a0a;
    color: #fafafa;
    min-height: 100vh;
    padding: 48px 24px 80px;
    max-width: 1280px;
    margin: 0 auto;
  }
  header { margin-bottom: 40px; }
  h1 { font-size: 28px; font-weight: 700; margin: 0 0 4px; }
  header p { color: #555; margin: 0; font-size: 14px; }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 20px;
  }

  .card {
    display: block;
    background: #111;
    border: 1px solid #222;
    border-radius: 10px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, transform 0.2s;
  }
  .card:hover { border-color: #444; transform: translateY(-2px); }

  .thumb {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #080808;
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

  .info { padding: 14px 18px 18px; }
  .cat {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #555;
  }
  h3 { font-size: 16px; font-weight: 600; margin: 4px 0 0; }

  @media (max-width: 480px) {
    .grid { grid-template-columns: 1fr; }
  }
</style>
