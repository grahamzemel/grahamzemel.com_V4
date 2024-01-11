<script lang="ts">
    import { cubicOut } from "svelte/easing";
    import { fade } from "svelte/transition";
  
    export let showModal = false;
  </script>
  
  {#if showModal}
    <div
      class="fixed inset-0 z-10 bg-secondary-700/30"
      transition:fade={{ duration: 50, easing: cubicOut }}
    />
    <div
      class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0"
      transition:fade={{ duration: 350, easing: cubicOut }}
    >
      <div
        class="mx-auto overflow-x-hidden rounded-lg bg-[#101010] shadow-xl w-full h-full md:max-w-[85vw] md:max-h-[85vh]"
      >
        <div class="relative p-6">
          <button
            type="button"
            class="absolute top-4 right-4 rounded-lg p-1 text-center font-medium text-secondary-500 transition-all hover:bg-secondary-100"
            on:click={() => {
              showModal = false;
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="h-6 w-6"
            >
              <path
                d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
              />
            </svg>
          </button>
  
          <h3 class="text-lg font-medium text-secondary-900">Graham Zemel (.com)</h3>
  
          <div class="flex justify-center">
            // Graham Zemel extended info 
          </div>
        </div>
      </div>
    </div>
  {/if}
  