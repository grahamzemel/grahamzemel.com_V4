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
  <div class="resume-shell">
    <div class="resume-copy">
      <p class="resume-kicker">PDF Resume</p>
      <h1 class="font-serif font-bold sm:text-6xl text-4xl">Resume</h1>
      <p class="mt-5 text-lg text-gray-300 leading-relaxed">
        The same polished PDF I use for applications and outreach, embedded
        directly on the site and available as a one-click download.
      </p>

      <div class="resume-actions">
        <a
          class="resume-button resume-button-primary"
          href={resumeHref}
          download="Graham-Zemel-Resume.pdf"
        >
          Download PDF
        </a>
        <a
          class="resume-button resume-button-secondary"
          href={resumeHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open Fullscreen
        </a>
      </div>

      <div class="resume-chips" aria-label="Resume highlights">
        <span>Real PDF</span>
        <span>Downloadable</span>
        <span>Recruiter-ready</span>
      </div>
    </div>

    <div class="resume-preview">
      <div class="resume-toolbar" aria-hidden="true">
        <div class="resume-dots">
          <span />
          <span />
          <span />
        </div>
        <span class="resume-filename">graham-zemel-resume.pdf</span>
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
          <div class="resume-actions">
            <a
              class="resume-button resume-button-primary"
              href={resumeHref}
              download="Graham-Zemel-Resume.pdf"
            >
              Download PDF
            </a>
            <a
              class="resume-button resume-button-secondary"
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in New Tab
            </a>
          </div>
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

  .resume-shell {
    @apply grid gap-8 items-start;
  }

  .resume-copy {
    @apply rounded-[2rem] border border-slate-700/70 p-8 md:p-10;
    background:
      radial-gradient(circle at top left, rgba(84, 132, 191, 0.22), transparent 36%),
      linear-gradient(145deg, rgba(18, 18, 23, 0.92), rgba(17, 24, 39, 0.98));
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.28);
  }

  .resume-kicker {
    @apply uppercase tracking-[0.32em] text-xs text-accent-300 font-semibold;
  }

  .resume-actions {
    @apply mt-8 flex flex-col sm:flex-row gap-4;
  }

  .resume-button {
    @apply inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300;
  }

  .resume-button-primary {
    @apply text-white;
    background: linear-gradient(135deg, #3f83f8, #c71d65);
    box-shadow: 0 18px 50px rgba(63, 131, 248, 0.22);
  }

  .resume-button-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 24px 55px rgba(199, 29, 101, 0.28);
  }

  .resume-button-secondary {
    @apply border border-slate-600/80 text-gray-100;
    background: rgba(15, 23, 42, 0.72);
  }

  .resume-button-secondary:hover {
    @apply border-slate-400 text-white;
    background: rgba(30, 41, 59, 0.92);
  }

  .resume-chips {
    @apply mt-8 flex flex-wrap gap-3 text-sm text-gray-300;
  }

  .resume-chips span {
    @apply rounded-full border border-slate-700/80 px-3 py-1.5;
    background: rgba(15, 23, 42, 0.7);
  }

  .resume-preview {
    @apply overflow-hidden rounded-[2rem] border border-slate-700/70;
    background: linear-gradient(180deg, rgba(13, 20, 34, 0.98), rgba(2, 6, 23, 0.98));
    box-shadow: 0 30px 90px rgba(0, 0, 0, 0.34);
  }

  .resume-toolbar {
    @apply flex items-center justify-between gap-4 border-b border-slate-700/70 px-5 py-4 text-sm text-gray-400;
    background: rgba(15, 23, 42, 0.88);
  }

  .resume-dots {
    @apply flex items-center gap-2;
  }

  .resume-dots span {
    @apply block h-3 w-3 rounded-full;
  }

  .resume-dots span:nth-child(1) {
    background: #fb7185;
  }

  .resume-dots span:nth-child(2) {
    background: #fbbf24;
  }

  .resume-dots span:nth-child(3) {
    background: #34d399;
  }

  .resume-filename {
    @apply truncate;
  }

  .resume-object {
    @apply w-full bg-white;
    height: min(78vh, 900px);
  }

  .resume-fallback {
    @apply flex h-full min-h-[24rem] flex-col items-start justify-center p-8 md:p-10;
    background:
      radial-gradient(circle at top left, rgba(84, 132, 191, 0.18), transparent 30%),
      linear-gradient(180deg, rgba(17, 24, 39, 0.98), rgba(2, 6, 23, 0.98));
  }

  @media (min-width: 1024px) {
    .resume-shell {
      grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.25fr);
    }
  }
</style>
