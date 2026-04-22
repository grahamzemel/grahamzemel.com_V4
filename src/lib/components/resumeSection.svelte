<script lang="ts">
  import Visibility from "$lib/components/visibility.svelte";

  let isVisible = false;
  let hasChanged = false;
  let hasObserverSupport = true;

  const resumeHref = "/graham-zemel-resume.pdf";
</script>

<div class="sm:mt-[12vh] mt-[8vh]" aria-hidden="true">
  <Visibility
    bind:hasObserverSupport
    visibilityUpdate={(state) => {
      if (!hasChanged && state !== false) {
        hasChanged = true;
        isVisible = state;
      }
    }}
  />
</div>

<section
  id="resume"
  class="section-band custom-transition {!hasObserverSupport || isVisible
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <h1 class="font-serif font-bold sm:text-6xl text-4xl">Resume</h1>
  <div class="resume-layout mt-8">
    <div class="resume-summary">
      <p class="resume-kicker">Builder at heart</p>
      <h2 class="resume-lead">
        I’m driven by turning rough ideas into real products people actually use.
      </h2>

      <p class="resume-copy">
        I’m a college student, full-stack developer, and startup-minded builder.
        What I enjoy most is taking an idea out of the abstract and forcing it
        into the real world: shipping it, testing it under pressure, fixing what
        breaks, and improving it until it becomes genuinely useful.
      </p>

      <p class="resume-copy">
        That’s why my work spans SaaS, student tools, event platforms, AI
        products, automations, and data-heavy web apps. I care less about fitting
        into one category and more about solving real problems well. I like
        moving quickly, tightening the details, and building products that can
        grow into real tools, systems, and businesses.
      </p>

      <div class="resume-stat-grid">
        <div class="resume-stat">
          <span class="resume-stat-value">42</span>
          <span class="resume-stat-label">Fraternities using FratDoor</span>
        </div>
        <div class="resume-stat">
          <span class="resume-stat-value">300,000+</span>
          <span class="resume-stat-label">Check-ins processed</span>
        </div>
        <div class="resume-stat">
          <span class="resume-stat-value">7,000+</span>
          <span class="resume-stat-label">TextCloaker users</span>
        </div>
        <div class="resume-stat">
          <span class="resume-stat-value">3.7</span>
          <span class="resume-stat-label">CU Boulder GPA</span>
        </div>
      </div>

      <ul class="resume-points">
        <li>I move fast, but I care about getting the details right.</li>
        <li>I like owning the process from rough concept to finished product.</li>
        <li>I’m usually building the next tool, system, or experiment.</li>
      </ul>

      <div class="resume-links">
        <a href={resumeHref} target="_blank" rel="noopener noreferrer">
          View full resume
        </a>
        <a href={resumeHref} download="Graham-Zemel-Resume.pdf">
          Download PDF
        </a>
      </div>
    </div>

    <div class="resume-frame">
      <div class="resume-frame-header">
        <span class="resume-label">Resume PDF</span>
        <div class="resume-frame-actions">
          <a href={resumeHref} target="_blank" rel="noopener noreferrer">
            Open
          </a>
          <a href={resumeHref} download="Graham-Zemel-Resume.pdf">
            Download
          </a>
        </div>
      </div>

      <object
        class="resume-object"
        data={`${resumeHref}#view=FitH`}
        type="application/pdf"
        aria-label="Graham Zemel resume PDF"
      >
        <div class="resume-fallback">
          <p class="text-gray-300">
            Your browser can’t preview the PDF inline here.
          </p>
          <p class="mt-4">
            <a href={resumeHref} download="Graham-Zemel-Resume.pdf">Download the PDF</a>
            or
            <a href={resumeHref} target="_blank" rel="noopener noreferrer">
              open it in a new tab
            </a>.
          </p>
        </div>
      </object>
    </div>
  </div>
</section>

<style lang="postcss">
  .custom-transition {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1500ms;
  }

  .resume-layout {
    @apply grid gap-8 items-start;
  }

  .resume-summary {
    @apply rounded-2xl border border-slate-800 p-6 md:p-8;
    background: rgba(11, 15, 20, 0.72);
  }

  .resume-kicker {
    @apply uppercase tracking-[0.22em] text-xs text-gray-500 font-semibold;
  }

  .resume-lead {
    @apply mt-4 font-serif text-3xl leading-tight text-white;
  }

  .resume-copy {
    @apply mt-5 text-lg leading-relaxed text-gray-300;
  }

  .resume-stat-grid {
    @apply mt-8 grid grid-cols-2 gap-3;
  }

  .resume-stat {
    @apply rounded-xl border border-slate-800 px-4 py-4;
    background: rgba(15, 23, 42, 0.36);
  }

  .resume-stat-value {
    @apply block text-2xl font-semibold text-white;
  }

  .resume-stat-label {
    @apply mt-1 block text-sm leading-snug text-gray-400;
  }

  .resume-points {
    @apply mt-8 space-y-3 text-gray-300;
  }

  .resume-points li {
    @apply list-none pl-5 relative;
  }

  .resume-points li::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7rem;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 9999px;
    background: rgba(103, 232, 249, 0.7);
  }

  .resume-links {
    @apply mt-8 flex flex-wrap gap-5 text-sm text-gray-400;
  }

  .resume-links a {
    @apply transition-colors;
  }

  .resume-frame {
    @apply overflow-hidden rounded-2xl border border-slate-800 justify-self-center w-full;
    background: rgba(11, 15, 20, 0.94);
    max-width: 42rem;
  }

  .resume-frame-header {
    @apply flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4 text-sm;
  }

  .resume-label {
    @apply uppercase tracking-[0.22em] text-xs text-gray-500 font-semibold;
  }

  .resume-frame-actions {
    @apply flex items-center gap-4 text-gray-400;
  }

  .resume-frame-actions a {
    @apply transition-colors;
  }

  .resume-links a:hover,
  .resume-frame-actions a:hover,
  .resume-fallback a:hover {
    @apply text-accent-300;
  }

  .resume-object {
    @apply w-full bg-white;
    height: min(70vh, 52rem);
  }

  .resume-fallback {
    @apply flex h-full min-h-[24rem] flex-col items-start justify-center p-8 md:p-10;
    background: rgba(11, 15, 20, 0.96);
  }

  @media (min-width: 1024px) {
    .resume-layout {
      grid-template-columns: minmax(0, 1fr) minmax(22rem, 42rem);
    }
  }

  @media (max-width: 640px) {
    .resume-stat-grid {
      @apply grid-cols-1;
    }

    .resume-lead {
      @apply text-2xl;
    }

    .resume-object {
      height: 30rem;
    }
  }
</style>
