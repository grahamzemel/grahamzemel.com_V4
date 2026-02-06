<script>
  import Visibility from "$lib/components/visibility.svelte";
  import ProjectsGrid from "./projectsGrid.svelte";

  let isVisible = false;
  let hasChanged = false;
  let hasObserverSupport = true;
</script>

<div class="sm:mt-[18vh] mt-[12vh]" aria-hidden="true">
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
  <h1 class="font-serif font-bold sm:text-6xl text-4xl">Projects</h1>
  <ProjectsGrid />
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
