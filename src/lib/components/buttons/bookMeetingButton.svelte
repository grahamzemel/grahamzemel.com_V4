<script>
  import BookMeeting from "../modals/bookMeeting.svelte";

  export let noMargin = false;

  let showModal = false;
</script>

<BookMeeting bind:showModal />

<button
  class="h-16 w-64 flex justify-center items-center {noMargin ? '' : 'mt-10'}"
  on:click={() => (showModal = true)}
>
  <div class="meet-button" />
  <div
    class="text-center text-white font-semibold z-10 pointer-events-none flex justify-content items-center"
  >
    <svg
      class="w-5 h-5 right-1.5 relative"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.-->
      <path
        fill="currentColor"
        d="M96 32V64H48C21.5 64 0 85.5 0 112v48H448V112c0-26.5-21.5-48-48-48H352V32c0-17.7-14.3-32-32-32s-32 14.3-32 32V64H160V32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192H0V464c0 26.5 21.5 48 48 48H400c26.5 0 48-21.5 48-48V192zM224 248c13.3 0 24 10.7 24 24v56h56c13.3 0 24 10.7 24 24s-10.7 24-24 24H248v56c0 13.3-10.7 24-24 24s-24-10.7-24-24V376H144c-13.3 0-24-10.7-24-24s10.7-24 24-24h56V272c0-13.3 10.7-24 24-24z"
      />
    </svg>
    <span class="ml-2">Book a meeting</span>
  </div>
</button>

<style lang="postcss">
  .meet-button {
    @apply h-16 w-64 bg-gradient-to-br from-accent-300 to-accent-600
      items-center rounded-xl shadow-2xl cursor-pointer absolute overflow-hidden
      transform hover:scale-x-110 hover:scale-y-105 transition duration-300 ease-out;
  }
</style>
