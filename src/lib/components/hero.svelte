<section class="mt-32 md:mt-64">
  <div class="hero-title custom-fade-in anim-delay-500">Graham Zemel</div>

  <p class="hero-subtitle custom-fade-in anim-delay-900">
    Full Stack Developer | Artificial Intelligence | Ethical Hacking
  </p>
  <p class="hero-subbertitle custom-fade-in anim-delay-900">
    <a href="https://grahamzemel.com">grahamzemel.com</a>
  </p>
</section>

<style lang="postcss">
  .hero-name {
    @apply font-bold uppercase sm:text-lg text-accent-300;
  }

  .hero-title {
    @apply font-serif font-bold sm:text-8xl text-6xl;
  }

  .hero-subtitle {
    @apply mt-8 font-light sm:text-2xl text-xl;
  }

  .hero-subbertitle {
    @apply mt-8 font-light sm:text-lg text-lg;
  }

  /* a {
    @apply font-normal;
  } */
  a:hover {
    @apply transition-colors text-transparent bg-clip-text bg-gradient-to-r from-accent-100 to-accent-500;
  }

  /* Transitions */

  .custom-fade-in {
    animation: fade-in-animation 1000ms cubic-bezier(0.4, 0, 0.2, 1);
    animation-fill-mode: both;
  }

  .anim-delay-100 {
    animation-delay: 100ms;
  }

  .anim-delay-500 {
    animation-delay: 500ms;
  }

  .anim-delay-900 {
    animation-delay: 900ms;
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
