<script>
  import BookMeetingButton from "./buttons/bookMeetingButton.svelte";
</script>

<!-- Icon credit: https://brittanychiang.com/ -->

<div class="socials-row custom-fade-in-socials">
  <p class="font-light lg:block md:block hidden">Socials:</p>
  <a
    href="https://github.com/grahamzemel"
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
    >
      <title>GitHub</title>
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
  </a>
  <a
    href="https://www.linkedin.com/in/grahamzemel/"
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
    >
      <title>LinkedIn</title>
      <path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
      /> <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  </a>
  <a
    href="https://www.instagram.com/grahamzemel/"
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
    >
      <title>Instagram</title>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  </a>
  <a
    href="https://twitter.com/grahamzemel"
    target="_blank"
    rel="noopener noreferer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.8"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="icon"
    >
      <title>Twitter</title>
      <path
        d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
      />
    </svg>
  </a>
</div>

<div class="custom-fade-in-socials">
  <p class="md:hidden md:mt-0 mt-12 font-light">
    <BookMeetingButton noMargin={true} />
    <br />
    Or shoot me an email:
  </p>
  <a
    href="mailto:me@grahamzemel.com?subject=Hello!"
    target="_blank"
    rel="noopener noreferer"
    class="email no-border"
  >
    me@grahamzemel.com
  </a>
</div>

<div class="scroll-msg">
  scroll to see more
  <br />

  <svg
    class="animate-bounce h-5 w-5 mx-auto mt-2"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 14.975q-.2 0-.375-.062T11.3 14.7l-4.6-4.6q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l3.9 3.9l3.9-3.9q.275-.275.7-.275t.7.275q.275.275.275.7t-.275.7l-4.6 4.6q-.15.15-.325.213t-.375.062Z"
    />
  </svg>
</div>

<style lang="postcss">
  .socials-row {
    @apply select-none flex md:fixed 
      /* Vertical (left) sidebar: */
      md:bottom-32 md:left-0 md:-ml-8 md:z-30 md:-rotate-90 md:flex-row md:gap-5 md:items-end
      /* Inline (on mobile): */
      mt-10 gap-4 items-center;
  }

  .email {
    /* Vertical (right) on desktop, inline on mobile: */
    @apply flex md:fixed md:bottom-32 md:right-0 md:-mr-8 md:z-30 md:rotate-90
    md:flex-row md:gap-5 md:items-end transition-colors
    text-xl md:text-lg font-normal md:font-light;
  }

  .icon {
    @apply md:rotate-90 h-5 w-5 transition-colors;
  }

  a {
    @apply p-2 md:p-0 md:border-none border-base-300 border-2 rounded-full
      hover:border-accent-300 cursor-pointer;
  }

  .no-border {
    @apply border-none p-0;
  }

  .icon:hover {
    @apply text-accent-300;
  }

  .email:hover {
    @apply text-accent-300;
  }

  /* Transitions */

  .custom-fade-in-socials {
    animation: fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: both;
    animation-delay: 500ms;
  }

  .scroll-msg {
    animation: fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: both;
    animation-delay: 1000ms;

    @apply mt-24 md:mt-[55vh] text-center text-gray-400 font-light select-none;
  }

  @keyframes fade-in-animation {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 100%;
    }
  }
</style>
