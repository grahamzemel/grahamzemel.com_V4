<script lang="ts">
  import { onDestroy, onMount } from "svelte";

  export let visibilityUpdate: (isVisible: boolean) => void;
  export let hasObserverSupport = false;
  export let observerOptions = {
    rootMargin: `0px 0px 0px 0px`,
    threshold: 1,
  };

  let element: HTMLElement;
  let unobserve = () => {};

  const onIntersection: IntersectionObserverCallback = (entries, _) => {
    visibilityUpdate(entries[0]?.isIntersecting ?? true);
  };

  onMount(() => {
    hasObserverSupport =
      "IntersectionObserver" in window &&
      "IntersectionObserverEntry" in window &&
      "intersectionRatio" in window.IntersectionObserverEntry.prototype;

    if (hasObserverSupport) {
      let observer = new IntersectionObserver(onIntersection, observerOptions);
      observer.observe(element);
      unobserve = () => observer.unobserve(element);
    } else {
      console.warn("IntersectionObserver unavailable.");
      visibilityUpdate(true);
    }
  });

  onDestroy(() => {
    unobserve();
  });
</script>

<div bind:this={element} />
