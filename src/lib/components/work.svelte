<script>
  import Visibility from "$lib/components/visibility.svelte";
  import ProgrammingProjects from "./programmingProjects.svelte";
  import CybersecurityProjects from "./cybersecProjects.svelte";
  import VariousProjects from "./variousProjects.svelte";
  import RecentProjects from "./recentProjects.svelte";

  let isVisible = false;
  let hasChanged = false;
  let hasObserverSupport = true;
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
  class="custom-transition {!hasObserverSupport || isVisible
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <h1 class="font-serif font-bold sm:text-6xl text-4xl">My Work</h1>

  <!-- Projects -->
  <!-- <h2 class="mt-24 font-serif font-bold sm:text-3xl text-2xl">
    Recent Projects &rarr;
  </h2>

  <RecentProjects /> -->

  <h2 class="mt-24 font-serif font-bold sm:text-3xl text-2xl">
    Programming Projects &rarr;
  </h2>

  <ProgrammingProjects />

  <h2 class="mt-24 font-serif font-bold sm:text-3xl text-2xl">
    Cybersecurity Projects &rarr;
  </h2>

  <CybersecurityProjects />

  <h2 class="mt-24 font-serif font-bold sm:text-3xl text-2xl">
    Misc Projects &rarr;
  </h2>

  <VariousProjects />
</section>

<style lang="postcss">
  .custom-transition {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1500ms;
  }

  .resume-button {
    @apply flex flex-row w-min whitespace-nowrap mt-8 text-accent-300
      cursor-pointer select-none;
  }

  .resume-button:hover {
    @apply transition-colors text-accent-200;
  }
</style>
