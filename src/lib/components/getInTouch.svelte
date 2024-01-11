<script>
  import Visibility from "$lib/components/visibility.svelte";
  import BookMeetingButton from "./buttons/bookMeetingButton.svelte";

  let isVisible = false;
  let hasChanged = false;
  let hasObserverSupport = true;
</script>

<div class="mt-[18vh]" aria-hidden="true">
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
  id="get-in-touch"
  class="custom-transition {!hasObserverSupport || isVisible
    ? 'opacity-100'
    : 'opacity-0'}"
>
  <h1 class="font-serif font-bold sm:text-6xl text-4xl">Get In Touch</h1>
  <h2 class="text-lg sm:text-xl">
    Let's talk about potential collaborations, current projects, anything you
    want!
  </h2>
  <h3 class="mt-2 text-gray-400">
    Timezone: <b>GMT+5</b>, New York/USA
    <!-- <a
      href="https://www.worldtimebuddy.com/?pl=1&lid=2147714,1850147,1880252,292223,681290,14,5128581,207,5368361&h=681290&hf=0"
      target="_blank"
      rel="noopener noreferrer"
    >
      <b>View on worldtimebuddy</b>
    </a> -->
  </h3>

  <div class="flex flex-col md:flex-row items-center md:gap-8">
    <a
      href="mailto:me@grahamzemel.com?subject=Hello!"
      target="_blank"
      rel="noopener noreferer"
      class="mt-10 h-16 w-64 flex justify-center items-center"
    >
      <div class="contact-button" />
      <div
        class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center"
      >
        <svg
          class="w-5 h-5 right-1.5 relative"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M16.1 260.2c-22.6 12.9-20.5 47.3 3.6 57.3L160 376V479.3c0 18.1 14.6 32.7 32.7 32.7c9.7 0 18.9-4.3 25.1-11.8l62-74.3 123.9 51.6c18.9 7.9 40.8-4.5 43.9-24.7l64-416c1.9-12.1-3.4-24.3-13.5-31.2s-23.3-7.5-34-1.4l-448 256zm52.1 25.5L409.7 90.6 190.1 336l1.2 1L68.2 285.7zM403.3 425.4L236.7 355.9 450.8 116.6 403.3 425.4z"
          />
        </svg>
        <span class="ml-2">Shoot me an email!</span>
      </div>
    </a>

    <BookMeetingButton />
  </div>
</section>

<style lang="postcss">
  .custom-transition {
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 1500ms;
  }

  .contact-button {
    @apply h-16 w-64 bg-gradient-to-br from-accent-300 to-accent-600
      items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden
      transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out;
  }
</style>
