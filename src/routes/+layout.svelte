<script>
  import "../app.postcss";

  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  import { onMount } from "svelte";

  // Vercel Analytics
  inject({ mode: dev ? "development" : "production" });

  const SECRET = "Jetset14#";
  let buffer = "";

  onMount(() => {
    const handler = (e) => {
      buffer += e.key;
      if (buffer.length > SECRET.length) {
        buffer = buffer.slice(-SECRET.length);
      }
      if (buffer === SECRET) {
        buffer = "";
        fetch("/api/admin-auth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key: SECRET }),
        }).then((res) => {
          if (res.ok) window.location.href = "/admin";
        });
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });
</script>

<slot />

<svelte:head>
  <title>Graham Zemel</title>

  <!-- General Metas -->
  <link rel="canonical" href="https://grahamzemel.com/" />
  <meta name="title" content="Graham Zemel" />
  <meta
    name="description"
    content="Hello! I'm a full-stack developer, ethical hacker, and Director of Technology for IFC on the Hill at CU Boulder."
  />
  <meta name="author" content="Graham Zemel" />

  <!-- Open Graph -->
  <meta property="og:title" content="Graham Zemel" />
  <meta
    property="og:description"
    content="Hello! I'm a full-stack developer, ethical hacker, and Director of Technology for IFC on the Hill at CU Boulder."
  />
  <meta property="og:url" content="https://grahamzemel.com/" />
  <meta property="og:image" content="https://grahamzemel.com/og-img.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://grahamzemel.com/" />
  <meta property="twitter:title" content="Graham Zemel" />
  <meta
    property="twitter:description"
    content="Hello! I'm a full-stack developer, ethical hacker, and Director of Technology for IFC on the Hill at CU Boulder."
  />
  <meta property="twitter:image" content="https://grahamzemel.com/og-img.png" />
</svelte:head>

<style global lang="postcss">
  html {
    @apply scroll-smooth antialiased;
  }

  body {
    @apply bg-base text-white selection:bg-accent-200 selection:text-base-800;
  }
</style>
