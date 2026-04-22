<section class="mt-32 md:mt-64">
  <div class="hero-title custom-fade-in anim-delay-500" data-admin-mobile-trigger="name">Graham Zemel</div>

  <p class="hero-subtitle custom-fade-in anim-delay-900">
    Full Stack Developer | Artificial Intelligence | Ethical Hacking
  </p>
  <p class="hero-role custom-fade-in anim-delay-900">
    Director of Technology, <a href="https://ifconthehill.org">IFC on the Hill</a>
    (CU Boulder)
  </p>
  <p class="hero-subbertitle custom-fade-in anim-delay-900">
    <a href="https://grahamzemel.com">grahamzemel.com</a>
  </p>

  <div class="hero-actions custom-fade-in anim-delay-900">
    <a class="hero-action hero-action-primary" href="#resume">View Resume</a>
    <a
      class="hero-action hero-action-secondary"
      href="/graham-zemel-resume.pdf"
      download="Graham-Zemel-Resume.pdf"
    >
      Download PDF
    </a>
  </div>
</section>

<style lang="postcss">
  .hero-name {
    @apply font-bold uppercase sm:text-lg text-accent-300;
  }

  .hero-title {
    @apply font-serif font-bold sm:text-8xl text-6xl;
    touch-action: manipulation;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .hero-subtitle {
    @apply mt-8 font-light sm:text-2xl text-xl;
  }

  .hero-subbertitle {
    @apply mt-8 font-light sm:text-lg text-lg;
  }

  .hero-role {
    @apply mt-4 font-light sm:text-xl text-lg;
  }

  .hero-actions {
    @apply mt-8 flex flex-col sm:flex-row gap-4 items-start;
  }

  .hero-action {
    @apply inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300;
  }

  .hero-action-primary {
    @apply text-white;
    background: linear-gradient(135deg, #3f83f8, #c71d65);
    box-shadow: 0 18px 44px rgba(63, 131, 248, 0.2);
  }

  .hero-action-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 22px 54px rgba(199, 29, 101, 0.28);
  }

  .hero-action-secondary {
    @apply border border-slate-600/80 text-gray-100;
    background: rgba(15, 23, 42, 0.78);
  }

  .hero-action-secondary:hover {
    @apply border-slate-400 text-white;
    background: rgba(30, 41, 59, 0.92);
  }

  .hero-role a:hover,
  .hero-subbertitle a:hover {
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
