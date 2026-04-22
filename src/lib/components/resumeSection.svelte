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
  <h2 class="mt-4 text-lg sm:text-xl text-gray-300">
    A direct PDF embed with simple download access, styled like the rest of the
    site instead of a separate landing page.
  </h2>

  <div class="resume-frame mt-8">
    <div class="resume-frame-header">
      <span class="resume-label">PDF</span>
      <div class="resume-links">
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
</section>

<style lang="postcss">
  .custom-transition {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1500ms;
  }

  .resume-frame {
    @apply overflow-hidden rounded-2xl border border-slate-800;
    background: rgba(11, 15, 20, 0.94);
  }

  .resume-frame-header {
    @apply flex items-center justify-between gap-4 border-b border-slate-800 px-5 py-4 text-sm;
  }

  .resume-label {
    @apply uppercase tracking-[0.22em] text-xs text-gray-500 font-semibold;
  }

  .resume-links {
    @apply flex items-center gap-4 text-gray-400;
  }

  .resume-links a {
    @apply transition-colors;
  }

  .resume-links a:hover,
  .resume-fallback a:hover {
    @apply text-accent-300;
  }

  .resume-object {
    @apply w-full bg-white;
    height: min(88vh, 1100px);
  }

  .resume-fallback {
    @apply flex h-full min-h-[24rem] flex-col items-start justify-center p-8 md:p-10;
    background: rgba(11, 15, 20, 0.96);
  }
</style>
