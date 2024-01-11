<script lang="ts">
  export let title: string;
  export let company: string;
  export let period: string;
  export let bullets: string[];
</script>

<article class="my-10">
  <h1 class="sm:text-2xl text-xl font-semibold">{title}</h1>
  <div class="flex flex-row items-end">
    <span class="text-accent-300">{company}</span>
    <span class="ml-2 text-sm">{period}</span>
  </div>

  <ul class="ml-8 list-disc sm:max-w-[50vw]">
    {#each bullets as bullet}
      <li>{bullet}</li>
    {/each}
  </ul>
</article>
