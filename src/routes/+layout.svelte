<script>
  import "../app.postcss";

  import { dev } from "$app/environment";
  import { inject } from "@vercel/analytics";

  import { onMount } from "svelte";

  // Vercel Analytics
  inject({ mode: dev ? "development" : "production" });

  const SECRET = "Jetset14#";
  let buffer = "";

  async function authenticateWithKey(key) {
    const trimmed = String(key || "").trim();
    if (!trimmed) return;
    console.log("[admin] Authenticating...");
    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: trimmed }),
      });
      console.log("[admin] Auth response:", res.status);
      if (res.ok) {
        window.location.href = "/admin";
        return;
      }
      alert("Incorrect password.");
    } catch (err) {
      console.error("[admin] Auth error:", err);
      alert("Authentication failed.");
    }
  }

  onMount(() => {
    let tapCount = 0;
    let lastTapAt = 0;
    const tapWindowMs = 900;

    const handler = (e) => {
      console.log("[admin-key]", JSON.stringify({ key: e.key, code: e.code, type: e.type, length: e.key?.length }));
      // Use e.key for printable chars; skip modifiers, arrows, etc.
      if (!e.key || e.key.length !== 1) return;
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      buffer += e.key;
      console.log("[admin-buffer]", JSON.stringify(buffer));
      if (buffer.length > SECRET.length) {
        buffer = buffer.slice(-SECRET.length);
      }
      if (buffer === SECRET) {
        console.log("[admin] MATCH — authenticating");
        buffer = "";
        authenticateWithKey(SECRET);
      }
    };

    const tapHandler = (e) => {
      const trigger = e.target instanceof Element
        ? e.target.closest("[data-admin-mobile-trigger='name']")
        : null;
      if (!trigger) return;

      const isMobileLike =
        window.matchMedia("(max-width: 767px)").matches ||
        window.matchMedia("(pointer: coarse)").matches;
      if (!isMobileLike) return;

      e.preventDefault();

      const now = Date.now();
      tapCount = now - lastTapAt <= tapWindowMs ? tapCount + 1 : 1;
      lastTapAt = now;

      if (tapCount >= 3) {
        tapCount = 0;
        lastTapAt = 0;
        const entered = window.prompt("Enter admin password");
        if (entered !== null) {
          authenticateWithKey(entered);
        }
      }
    };

    // Use capture phase on document to fire BEFORE p5.js can intercept
    document.addEventListener("keydown", handler, true);
    window.addEventListener("touchend", tapHandler, { passive: false });
    return () => {
      document.removeEventListener("keydown", handler, true);
      window.removeEventListener("touchend", tapHandler);
    };
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
