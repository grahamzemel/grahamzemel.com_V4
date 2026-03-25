<script>
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { post, get } from "$lib/api.js";

  const navItems = [
    { href: "/admin", label: "Overview" },
    { href: "/admin/income", label: "Income" },
    { href: "/admin/stripe", label: "Startups" },
    { href: "/admin/cashflow", label: "Cash Flow" },
    { href: "/admin/settings", label: "Settings" },
  ];

  let pushSupported = false;
  let pushSubscribed = false;
  let pushSettings = null;
  let menuOpen = false;

  async function logout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    localStorage.removeItem("gz_admin_token");
    window.location.href = "/";
  }

  $: currentPath = $page.url.pathname;
  // Close menu on navigation
  $: currentPath, menuOpen = false;

  onMount(async () => {
    if (!browser) return;

    if ('serviceWorker' in navigator) {
      try {
        const reg = await navigator.serviceWorker.register('/sw.js');
        pushSupported = 'PushManager' in window;

        if (pushSupported) {
          const sub = await reg.pushManager.getSubscription();
          pushSubscribed = !!sub;
        }
        pushSettings = await get('/api/push/status').catch(() => null);
      } catch (err) {
        console.error('[SW] Registration failed:', err);
      }
    }
  });

  async function enablePush() {
    try {
      const reg = await navigator.serviceWorker.ready;
      const { publicKey } = await get('/api/push/vapid-key');
      if (!publicKey) { alert('Push not configured on server'); return; }

      const vapidKey = urlBase64ToUint8Array(publicKey);
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey,
      });

      await post('/api/push/subscribe', { subscription: sub.toJSON() });
      pushSubscribed = true;

      pushSettings = await get('/api/push/status').catch(() => pushSettings);
      if (pushSettings?.settings?.autoSendTestOnSubscribe !== false) {
        await post('/api/push/test');
      }
    } catch (err) {
      console.error('[Push] Error:', err);
      alert('Could not enable notifications: ' + err.message);
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) outputArray[i] = rawData.charCodeAt(i);
    return outputArray;
  }
</script>

<svelte:head>
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#111827" />
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
  <meta name="apple-mobile-web-app-title" content="Income Engine" />
  <link rel="apple-touch-icon" href="/icons/icon-192.svg" />
</svelte:head>

<!-- Override the global dark body for the admin area — fixed position covers everything -->
<div class="fixed inset-0 bg-[#fafafa] text-gray-900 overflow-y-auto z-50">
  <!-- Top nav -->
  <header class="bg-white border-b border-gray-200 sticky top-0 z-10">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14">
      <div class="flex items-center gap-8">
        <a href="/admin" class="text-sm font-semibold text-gray-900 tracking-tight">Income Engine</a>
        <!-- Desktop nav -->
        <nav class="hidden md:flex gap-1">
          {#each navItems as item}
            <a
              href={item.href}
              class="px-3 py-1.5 rounded-md text-sm transition-colors
                {currentPath === item.href
                  ? 'bg-gray-100 text-gray-900 font-medium'
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}"
            >
              {item.label}
            </a>
          {/each}
        </nav>
      </div>
      <div class="flex items-center gap-3">
        {#if pushSupported && !pushSubscribed}
          <button
            on:click={enablePush}
            class="hidden sm:inline text-xs text-emerald-600 hover:text-emerald-700 transition"
            title="Enable push notifications"
          >
            Enable notifications
          </button>
        {/if}
        {#if pushSubscribed}
          <span class="hidden sm:inline text-[10px] text-emerald-500" title="Push notifications active">notifications on</span>
        {/if}
        <button
          on:click={logout}
          class="hidden md:inline text-xs text-gray-400 hover:text-gray-600 transition"
        >
          Sign out
        </button>
        <!-- Hamburger (mobile) -->
        <button
          on:click={() => menuOpen = !menuOpen}
          class="md:hidden w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {#if menuOpen}
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          {:else}
            <svg class="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          {/if}
        </button>
      </div>
    </div>

    <!-- Mobile dropdown menu -->
    {#if menuOpen}
      <nav class="md:hidden border-t border-gray-100 bg-white px-4 pb-3 pt-1">
        {#each navItems as item}
          <a
            href={item.href}
            class="block px-3 py-2.5 rounded-md text-sm transition-colors
              {currentPath === item.href
                ? 'bg-gray-100 text-gray-900 font-medium'
                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}"
          >
            {item.label}
          </a>
        {/each}
        <div class="border-t border-gray-100 mt-2 pt-2 flex items-center justify-between px-3">
          {#if pushSupported && !pushSubscribed}
            <button
              on:click={enablePush}
              class="text-xs text-emerald-600 hover:text-emerald-700 transition"
            >
              Enable notifications
            </button>
          {:else if pushSubscribed}
            <span class="text-[10px] text-emerald-500">notifications on</span>
          {:else}
            <span></span>
          {/if}
          <button
            on:click={logout}
            class="text-xs text-gray-400 hover:text-gray-600 transition"
          >
            Sign out
          </button>
        </div>
      </nav>
    {/if}
  </header>

  <!-- Main content -->
  <main class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
    <slot />
  </main>
</div>
