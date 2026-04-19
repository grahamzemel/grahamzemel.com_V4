<script>
  import { onMount } from 'svelte';

  let sites = [];
  let loading = true;

  // Hardcoded site list — updated by the outreach engine after each run
  // Each entry: { slug, name, category, url }
  const SITES = [
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

  onMount(() => {
    sites = SITES;
    loading = false;
  });
</script>

<svelte:head>
  <title>Site Previews — Graham Zemel</title>
  <meta name="robots" content="noindex, nofollow" />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</svelte:head>

<div class="preview-page">
  <header>
    <div class="container">
      <h1>Site Previews</h1>
      <p class="subtitle">{sites.length} sites generated</p>
    </div>
  </header>

  <main class="container">
    {#if loading}
      <p class="loading">Loading sites...</p>
    {:else}
      <div class="grid">
        {#each sites as site}
          <a href={site.url} target="_blank" rel="noopener" class="card">
            <div class="card-preview">
              <iframe
                src={site.url}
                title={site.name}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
            <div class="card-info">
              <span class="category">{site.category}</span>
              <h3>{site.name}</h3>
              <span class="url">{site.slug}.netlify.app</span>
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </main>

  <footer>
    <div class="container">
      <p>&copy; {new Date().getFullYear()} Graham Zemel — Freelance Web Development</p>
    </div>
  </footer>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  .preview-page {
    font-family: 'Inter', -apple-system, sans-serif;
    background: #0a0a0a;
    color: #fafafa;
    min-height: 100vh;
  }

  .container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 24px;
  }

  header {
    padding: 48px 0 32px;
    border-bottom: 1px solid #1a1a1a;
  }

  h1 {
    font-size: 32px;
    font-weight: 700;
    margin: 0 0 8px;
    letter-spacing: -0.02em;
  }

  .subtitle {
    color: #666;
    margin: 0;
    font-size: 15px;
  }

  main {
    padding: 40px 0 80px;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 24px;
  }

  .card {
    display: block;
    background: #111;
    border: 1px solid #1a1a1a;
    border-radius: 12px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s, transform 0.2s;
  }

  .card:hover {
    border-color: #333;
    transform: translateY(-2px);
  }

  .card-preview {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 10;
    overflow: hidden;
    background: #0a0a0a;
  }

  .card-preview iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(0.5);
    transform-origin: top left;
    border: none;
    pointer-events: none;
  }

  .card-info {
    padding: 16px 20px 20px;
  }

  .category {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #666;
  }

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 6px 0 8px;
    letter-spacing: -0.01em;
  }

  .url {
    font-size: 13px;
    color: #444;
    font-family: 'SF Mono', 'Fira Code', monospace;
  }

  footer {
    border-top: 1px solid #1a1a1a;
    padding: 24px 0;
    text-align: center;
  }

  footer p {
    color: #444;
    font-size: 13px;
    margin: 0;
  }

  .loading {
    text-align: center;
    color: #666;
    padding: 80px 0;
  }

  @media (max-width: 480px) {
    .grid {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 24px;
    }
  }
</style>
