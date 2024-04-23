<script lang="ts" context="module">
  export type Tag =
    | "Quantum"
    | "AI"
    | "Web"
    | "Extension"
    | "Internet"
    | "Python"
    | "Telegram"
    | "Library"
    | "Shell"
    | "Bash"
    | "Automation"
    | "Hackathon"
    | "Crypto";
</script>

<script lang="ts">
  import ProjectCardButtons from "./projectCardButtons.svelte";

  export let title: string;
  export let description: string;
  export let image: string;
  export let demoLink: string | null;
  export let repoLink: string | null;
  export let tags: Tag[];

  const getClassesForTag = (tag: Tag) => {
    switch (tag) {
      case "Quantum":
        return "bg-red-50 text-red-600";
      case "AI":
        return "bg-orange-50 text-orange-600";
      case "Web":
        return "bg-lime-50 text-lime-600";
      case "Extension":
        return "bg-cyan-50 text-cyan-600";
      case "Internet":
        return "bg-teal-50 text-teal-600";
      case "Python":
        return "bg-green-50 text-green-600";
      case "Telegram":
        return "bg-blue-50 text-blue-600";
      case "Shell":
        return "bg-purple-50 text-purple-600";
      case "Bash":
        return "bg-red-50 text-red-600";
      case "Library":
        return "bg-indigo-50 text-indigo-600";
      case "Automation":
        return "bg-yellow-50 text-yellow-600";
      case "Hackathon":
        return "bg-pink-50 text-pink-600";
      case "Crypto":
        return "bg-blue-50 text-blue-600";
      default:
        return "bg-blue-50 text-blue-600";
    }
  };
</script>

<article
  class="flex mx-2 md:mx-0 my-10 rounded-lg bg-[#070a0d] bg-opacity-60 shadow"
>
  <div class="flex flex-col md:w-[22rem]">
    <img
      src={image}
      class="aspect-video object-cover rounded-t-lg pointer-events-none"
      alt={title}
    />
    <div class="p-4 flex flex-col grow justify-between">
      <div>
        <h3 class="text-xl font-medium text-gray-100">
          {title}
        </h3>
        <p class="mt-1 text-gray-300">
          {description}
        </p>
      </div>

      <div>
        <div class="my-4 flex gap-2">
          {#each tags as tag}
            <span class="tag {getClassesForTag(tag)}">
              {tag}
            </span>
          {/each}
        </div>

        <ProjectCardButtons {repoLink} {demoLink} />
      </div>
    </div>
  </div>
</article>

<style lang="postcss">
  .tag {
    @apply inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold;
  }
</style>
