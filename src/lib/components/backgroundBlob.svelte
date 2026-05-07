<!--
  Static, always-visible backdrop layer.
  Sits at z-index: -2 so the WebGL fractal canvas (z-index: -1, fixed) renders
  on top when it loads. If WebGL fails, this layer alone provides the depth.
-->

<div class="bg-blob" aria-hidden="true">
  <div class="bg-blob-glow bg-blob-glow-tl" />
  <div class="bg-blob-glow bg-blob-glow-br" />
  <div class="bg-blob-grain" />
</div>

<style lang="postcss">
  .bg-blob {
    position: fixed;
    inset: 0;
    z-index: -2;
    overflow: hidden;
    pointer-events: none;
    /* Transparent base — html bg-base shows through if WebGL fails. The
       canvas (z-index: -1) renders on top of this layer when it loads. */
    background: transparent;
  }

  .bg-blob-glow {
    position: absolute;
    border-radius: 9999px;
    filter: blur(80px);
    opacity: 0.55;
    will-change: transform;
  }

  /* Solid, heavily-blurred color disks. No gradients — color is added by
     a single flat hue per disk, softened by `filter: blur(...)`. */
  .bg-blob-glow-tl {
    top: -16rem;
    left: -16rem;
    height: 28rem;
    width: 28rem;
    background: oklch(0.34 0.11 245);
    opacity: 0.32;
    filter: blur(110px);
    animation: drift-tl 28s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
  }

  .bg-blob-glow-br {
    bottom: -18rem;
    right: -16rem;
    height: 30rem;
    width: 30rem;
    background: oklch(0.32 0.09 195);
    opacity: 0.32;
    filter: blur(110px);
    animation: drift-br 34s cubic-bezier(0.4, 0, 0.6, 1) infinite alternate;
  }

  /* (grain texture removed — keep canvas clean) */
  .bg-blob-grain { display: none; }

  @keyframes drift-tl {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(2.5rem, 1.5rem); }
  }

  @keyframes drift-br {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-2.5rem, -1.5rem); }
  }

  @media (prefers-reduced-motion: reduce) {
    .bg-blob-glow {
      animation: none;
    }
  }
</style>
