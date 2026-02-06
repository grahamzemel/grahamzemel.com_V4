<script lang="ts">
  import Visibility from "$lib/components/visibility.svelte";

  let isVisible = false;
  let hasChanged = false;
  let hasObserverSupport = true;

  const techStack = [
    { label: "HTML5", slug: "html5", bg: "#e34f26" },
    { label: "JavaScript", slug: "javascript", bg: "#f7df1e" },
    {
      label: "CSS3",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      bg: "#1572b6",
    },
    { label: "Svelte", slug: "svelte", bg: "#ff3e00" },
    { label: "Tailwind CSS", slug: "tailwindcss", bg: "#38bdf8" },
    { label: "npm", slug: "npm", bg: "#cb0000" },
    { label: "Node.js", slug: "nodedotjs", bg: "#3c873a" },
    {
      label: "VS Code",
      iconUrl:
        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
      bg: "#007acc",
    },
  ];
</script>

<div class="sm:mt-[30vh] mt-[20vh]" aria-hidden="true">
  <Visibility
    bind:hasObserverSupport
    visibilityUpdate={(state) => {
      // Only update one time (once visible)
      if (!hasChanged && state !== false) {
        hasChanged = true;
        isVisible = state;
      }
    }}
  />
</div>

<section
  class="section-band custom-transition {!hasObserverSupport || isVisible
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <h1 class="font-serif font-bold sm:text-6xl text-4xl">About Me</h1>
  <p class="mt-4 text-lg text-gray-300 w-full">
    I build full-stack systems with a backend focus and a growing front-end
    practice. I write daily for
    <a
      class="link-highlight"
      href="https://thegrayarea.tech"
      target="_blank"
      rel="noopener noreferer"
    >
      The Gray Area
    </a>
    and serve as Director of Technology for
    <a
      class="link-highlight"
      href="https://ifconthehill.org"
      target="_blank"
      rel="noopener noreferer"
    >
      IFC on the Hill
    </a>
    at CU Boulder.
  </p>

  <div class="current-grid mt-10">
    <article class="focus-card">
      <h3 class="text-2xl font-semibold">IFC on the Hill</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">
        As Director of Technology, I built
        <a
          class="link-highlight"
          href="https://ifceventhub.netlify.app/"
          target="_blank"
          rel="noopener noreferer"
        >
          IFC EventHub
        </a>
        from the ground up to standardize event registration and safety
        workflows, and I also built the
        <a
          class="link-highlight"
          href="https://hillneighborhoodslag.netlify.app/"
          target="_blank"
          rel="noopener noreferer"
        >
          Student Living Advocacy Group (SLAG)
        </a>
        platform to make housing issues easier to document, aggregate, and act
        on.
      </p>
      <ul class="mt-4 list-disc ml-5 text-gray-300 space-y-1">
        <li>Structured event submissions and notifications</li>
        <li>Emergency contact visibility and compliance support</li>
        <li>Neighborhood-focused reporting and advocacy</li>
      </ul>
    </article>

    <article class="focus-card">
      <h3 class="text-2xl font-semibold">Startup Founder</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">
        I’m rolling out
        <a
          class="link-highlight"
          href="https://fratdoor.com"
          target="_blank"
          rel="noopener noreferer"
        >
          FratDoor
        </a>
        across 21 fraternities (2,500+ members) to replace paper lists with a
        fast, structured door-check system.
      </p>
      <p class="mt-3 text-gray-300 leading-relaxed">
        FratDoor is my most promising startup so far, and I’m actively searching
        for new prospects to adopt it and pioneer deployments at additional
        schools.
      </p>
      <p class="mt-3 text-gray-300 leading-relaxed">
        I’m also building
        <a
          class="link-highlight"
          href="https://text-cloaker.com"
          target="_blank"
          rel="noopener noreferer"
        >
          TextCloaker
        </a>,
        a web app that cloaks AI-generated text to reduce AI-detector flags while
        keeping it readable.
      </p>
    </article>
  </div>

  <h2 class="mt-12 font-serif font-bold sm:text-3xl text-2xl">
    Tech Stack
  </h2>
  <div class="tech-grid mt-6">
    {#each techStack as tech}
      <div class="tech-badge" aria-label={tech.label}>
        <div class="tech-icon" style={`background:${tech.bg}`}>
          <img
            src={tech.iconUrl ??
              `https://cdn.simpleicons.org/${tech.slug}/ffffff?viewbox=auto&size=48`}
            alt={`${tech.label} logo`}
            loading="lazy"
          />
        </div>
        <span class="tech-label">{tech.label}</span>
      </div>
    {/each}
  </div>

  <h2 class="mt-12 font-serif font-bold sm:text-3xl text-2xl">
    Focus Areas
  </h2>
  <div class="focus-grid mt-6">
    <article class="focus-card">
      <h3 class="text-2xl font-semibold">Web Development</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">
        I have extensive experience in web development, primarily focusing on
        back-end systems. Recently I’ve been exploring front-end work and
        experimenting with modern UI frameworks. I also publish SEO tips and
        step-by-step portfolio guides on
        <a
          class="link-highlight"
          href="https://thegrayarea.tech"
          target="_blank"
          rel="noopener noreferer"
        >
          The Gray Area
        </a>.
        This site was a trial run with
        cutting-edge front-end tools — the source is on
        <a
          class="link-highlight"
          href="https://github.com/grahamzemel"
          target="_blank"
          rel="noopener noreferer"
        >
          GitHub
        </a>
        if you want to explore.
      </p>
    </article>

    <article class="focus-card">
      <h3 class="text-2xl font-semibold">Cybersecurity</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">
        When I’m not writing or building web apps, I dive into cybersecurity.
        There’s nothing like discovering a P1 vulnerability after days of bug
        hunting. I’ve built scripts that automate penetration tests and surface
        vulnerabilities faster. For a deeper take, read my satirical piece on
        <a
          class="link-highlight"
          href="https://thegrayarea.tech/finding-p1-vulnerabilities-a-step-by-step-guide-b88521195204"
          target="_blank"
          rel="noopener noreferer"
        >
          hacking
        </a>
        and online safety.
      </p>
    </article>

    <article class="focus-card">
      <h3 class="text-2xl font-semibold">Writing</h3>
      <p class="mt-3 text-gray-300 leading-relaxed">
        I publish my best work through
        <a
          class="link-highlight"
          href="https://thegrayarea.tech"
          target="_blank"
          rel="noopener noreferer"
        >
          The Gray Area
        </a>
        with over half a million readers, and share daily articles on my personal
        profile. I stay active across platforms for readers who want more.
      </p>
    </article>
  </div>

  <div class="writing-section mt-6">
    <div class="writing-header">
      <h3 class="text-2xl font-semibold">Papers & Writing</h3>
      <p class="mt-2 text-gray-300">
        My papers and long-form writing live on
        <a
          class="link-highlight"
          href="https://thegrayarea.tech"
          target="_blank"
          rel="noopener noreferer"
        >
          thegrayarea.tech
        </a>
        alongside daily posts and curated publications.
      </p>
    </div>
    <div class="writing-grid">
      <a
        class="link-card"
        href="https://thegrayarea.tech"
        target="_blank"
        rel="noopener noreferer"
      >
        <span class="link-title">The Gray Area</span>
        <span class="link-subtitle">Publications, papers, and essays</span>
      </a>
      <a
        class="link-card"
        href="https://medium.com/@grahamzemel"
        target="_blank"
        rel="noopener noreferer"
      >
        <span class="link-title">Medium</span>
        <span class="link-subtitle">@grahamzemel</span>
      </a>
      <a
        class="link-card"
        href="https://twitter.com/grahamzemel"
        target="_blank"
        rel="noopener noreferer"
      >
        <span class="link-title">Twitter</span>
        <span class="link-subtitle">@grahamzemel</span>
      </a>
      <a
        class="link-card"
        href="https://twitter.com/tgaonmedium"
        target="_blank"
        rel="noopener noreferer"
      >
        <span class="link-title">TGA Twitter</span>
        <span class="link-subtitle">@tgaonmedium</span>
      </a>
    </div>
  </div>
</section>

<style lang="postcss">
  .custom-transition {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1500ms;
  }

  .link-highlight {
    @apply text-accent-300 underline decoration-accent-300/60 underline-offset-4;
  }

  .link-highlight:hover {
    @apply text-accent-200 decoration-accent-200/70 transition-colors;
  }

  .current-grid {
    @apply grid grid-cols-1 lg:grid-cols-2 gap-6;
  }

  .tech-grid {
    @apply grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4;
  }

  .tech-badge {
    @apply flex flex-col items-center gap-2;
  }

  .tech-icon {
    @apply h-14 w-14 rounded-2xl flex items-center justify-center bg-[#0b0f14] border border-slate-800 shadow;
  }

  .tech-icon img {
    @apply h-8 w-8;
    filter: brightness(0) invert(1);
  }

  .tech-label {
    @apply text-xs text-gray-400;
  }

  .focus-grid {
    @apply grid grid-cols-1 lg:grid-cols-3 gap-6;
  }

  .focus-card {
    @apply rounded-lg bg-[#070a0d] bg-opacity-60 p-6 shadow;
  }

  .writing-section {
    @apply rounded-lg border border-slate-800 bg-[#070a0d] bg-opacity-60 p-6;
  }

  .writing-grid {
    @apply mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4;
  }

  .link-card {
    @apply rounded-lg border border-accent-400/30 bg-[#0b0f14] p-4 transition-colors;
  }

  .link-card:hover {
    @apply border-accent-300;
  }

  .link-title {
    @apply text-accent-300 font-semibold;
  }

  .link-subtitle {
    @apply mt-1 block text-sm text-gray-400;
  }
</style>
