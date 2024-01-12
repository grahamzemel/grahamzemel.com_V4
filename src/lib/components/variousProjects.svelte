<script lang="ts" context="module">
  import type { ComponentProps } from "svelte";
  export type ProjectProps = ComponentProps<ProjectCard>;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import ProjectCard from "./projectCard.svelte";

  let isHovering = false;
  const scrollSpeed = 1; // Adjust the speed as needed

  const autoScroll = () => {
    if (!isHovering) {
      list.scrollLeft += scrollSpeed;
      // Check if near the end of the first set and reset if needed
      if (list.scrollLeft >= list.scrollWidth - list.clientWidth) {
        list.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoScroll);
  };
  const toggleHover = (hover: boolean) => {
    isHovering = hover;
  };

  const projects: ProjectProps[] = [
    {
      title: "Aesculapius",
      description: `
      The winning project for the healthcare track in the MetroHacks 2022 hackathon. A 24 hour project based on furthering healthcare accessibility made with Svelte, Tailwind, Typescript, and a custom co:here AI chat bot.
      `,
      image:
        "/aesculapiusss.png",
      tags: ["Web", "Hackathon"],
      repoLink: "https://github.com/grahamzemel/Aesculapius-FrontEnd",
      demoLink: "https://aesculapius.tech",
    },
    {
      title: "Template Project",
      description: `
        A simple template project built with Svelte and Bulma on the front-end, and Python on the back-end. It's a great starting point for any web project. 
      `,
      image:
        "/templateprojss.png",
      tags: ["Web", "Internet"],
      repoLink: "https://github.com/grahamzemel/TemplateProj",
      demoLink: null,
    },
    {
      title: "Crypto Token Template",
      description: `
        This project was created as a template for web3 developers to build custom cryptocurrencies on the ERC20 blockchain. You can also do rug pulls with it, but I don't recommend that.
      `,
      image: "/cryptoss.png",
      tags: ["Internet", "Crypto"],
      repoLink: "https://github.com/grahamzemel/CreateCryptoToken",
      demoLink: null,
    },
    {
      title: "Discrete Mathematics",
      description: `
        A collection of my notes from my discrete mathematics class. It's a great resource for anyone looking to learn the basics of discrete math.
      `,
      image:
        "/fractalsss.png",
      tags: ["Python"],
      repoLink: "https://github.com/grahamzemel/DiscreteMath",
      demoLink: null,
    },
  ];

  // --- List scrolling:

  let list: HTMLElement;
  let scrollState = { listX: 0, clientX: 0 };

  const onMouseDown = (e: MouseEvent) => {
    list.style.cursor = "grabbing";
    list.style.userSelect = "none";

    // Update the current scroll position
    scrollState = {
      listX: list.scrollLeft,
      clientX: e.clientX,
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    // Update the scroll position on the list
    const dx = e.clientX - scrollState.clientX;
    list.scrollLeft = scrollState.listX - dx;
  };

  const onMouseUp = (e: MouseEvent) => {
    list.style.cursor = "grab";
    list.style.removeProperty("user-select");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };


  onMount(() => {
    list.addEventListener("mousedown", onMouseDown);
    requestAnimationFrame(autoScroll); // Start the auto-scroll

  });
</script>

<div class="projects-container">
  <div
    class="project-list flex flex-col md:flex-row overflow-x-auto no-scrollbar md:gap-8 cursor-grab"
    bind:this={list}
    on:mouseenter={() => toggleHover(true)}
    on:mouseleave={() => toggleHover(false)}
  >
    {#each projects as project}
      <ProjectCard {...project} />
    {/each}
  </div>
</div>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .projects-container {
    position: relative;
    /* overflow: hidden; */
    /* overflow-y:scroll; */
    /* overflow-x:auto;
    white-space: nowrap; Prevents wrapping of inline elements */
  }

  .projects-container::before,
  .projects-container::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 25px; /* Control the width of the fade effect */
    pointer-events: none;
    z-index: 2;
  }

  .projects-container::before {
  left: 0;
  background: linear-gradient(to right, rgba(15, 20, 26, 1), transparent);
}

.projects-container::after {
  right: 0;
  background: linear-gradient(to left, rgba(15, 20, 26, 1), transparent);
}

@media (max-width: 640px) {
  .projects-container::before,
  .projects-container::after {
    background: none;
  }
}
</style>