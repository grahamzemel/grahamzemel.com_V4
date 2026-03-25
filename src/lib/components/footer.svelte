<footer class="mt-[16vh] text-center text-sm">
  <p class="text-gray-400">
    Built with Svelte & Tailwind - <a
      href="https://github.com/grahamzemel/grahamzemel.com"
      target="_blank"
      rel="noopener noreferer"
    >
      See inside!
    </a>
  </p>
  <p class="text-gray-500">
    &copy; Graham Zemel {new Date().getFullYear()}. All rights reserved.
  </p>
  <div class="mt-4 pt-4 border-t border-gray-700">
    <button
      on:click={() => {
        const password = prompt('Enter admin password:');
        if (password) {
          window.location.href = `/admin?pwd=${encodeURIComponent(password)}`;
        }
      }}
      class="text-gray-500 hover:text-gray-300 text-xs transition"
    >
      Admin
    </button>
  </div>
</footer>
<div class="h-10" aria-hidden="true" />
