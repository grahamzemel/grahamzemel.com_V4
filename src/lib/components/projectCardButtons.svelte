<script lang="ts">
  export let demoLink: string | null;
  export let repoLink: string | null;
</script>

<div class="flex flex-row {demoLink ? 'justify-between' : 'justify-end'}">
  {#if demoLink}
    <a
      class="learn-more-btn"
      href={demoLink}
      target="_blank"
      rel="noopener noreferer"
    >
      <svg
        class="h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
      >
        <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
        <path
          fill="currentColor"
          d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32h82.7L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V32c0-17.7-14.3-32-32-32H320zM80 32C35.8 32 0 67.8 0 112V432c0 44.2 35.8 80 80 80H400c44.2 0 80-35.8 80-80V320c0-17.7-14.3-32-32-32s-32 14.3-32 32V432c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V112c0-8.8 7.2-16 16-16H192c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z"
        />
      </svg>
      <span class="ml-2 font-bold"> Try it! </span>
    </a>
  {/if}
  {#if repoLink}
  <a
    class="learn-more-btn"
    href={repoLink}
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-4 w-4"
    >
      <title>GitHub</title>
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
    <span class="ml-2"> View Repo </span>
  </a>
  {/if}
</div>

<style lang="postcss">
  .learn-more-btn {
    @apply flex flex-row justify-end items-center whitespace-nowrap
      text-accent-300 cursor-pointer select-none;
  }

  .learn-more-btn:hover {
    @apply transition-colors text-accent-200;
  }
</style>
