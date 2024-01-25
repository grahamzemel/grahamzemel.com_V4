<script lang="ts" context="module">
  import type { ComponentProps } from "svelte";
  export type ProjectProps = ComponentProps<ProjectCard>;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import ProjectCard from "./projectCard.svelte";

  let isHovering = false;
  const scrollSpeed = 0; // Adjust the speed as needed

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
      title: "Web Heck Scanner",
      description: `
      A hacking tool built for the bug hunters, Web Heck Scanner is a compilation of 3 popular hacking tools and 5 components that hands you bugs on a silver platter.
      `,
      image:
        "/webheckscannerss.png",
      tags: ["Shell", "Internet", "Bash"],
      repoLink: "https://github.com/grahamzemel/WebHeckScanner",
      demoLink: null,
    },
    {
      title: "Hecker Bot",
      description: `
      This telegram bot that I coded from scratch automates hacking processes for bug hunting and general cybersecurity purposes. 
      `,
      image:
        "/heckerbotss.jpg",
      tags: ["Automation", "Telegram"],
      repoLink: null,
      demoLink: "https://t.me/heckerbot2022bot",
    },
    {
      title: "Bash Bunny",
      description: `
      I created multiple scripts for physical pen-testing using my Bash Bunny, a hotplug attack tool. The bash bunny is one of the most powerful physical attack vectors I've ever used. 
      `,
      image: "/bashbunnyss.png",
      tags: ["Automation", "Bash"],
      repoLink: "https://github.com/grahamzemel/Hotplug_Attacks",
      demoLink: null,
    },
    {
      title: "IDOR Automation",
      description: `
      This was a simple Python script for parsing data from hacked sites. Check out some hacking write-ups for vulnerabilities like IDORs, XSS, Broken Access Control, and more on The Gray Area!
      `,
      image:
        "/idorss.png",
      tags: ["Python", "Automation"],
      repoLink: "https://github.com/grahamzemel/idorAutomation",
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
  background: linear-gradient(to right, rgba(18, 18, 23, 1), transparent);
}

.projects-container::after {
  right: 0;
  background: linear-gradient(to left, rgba(18, 18, 23, 1), transparent);
}

@media (max-width: 640px) {
  .projects-container::before,
  .projects-container::after {
    background: none;
  }
}
</style>