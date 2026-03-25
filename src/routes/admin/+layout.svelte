<script>
  import { page } from "$app/stores";

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "📊" },
    { href: "/admin/income", label: "Income Sources", icon: "💰" },
    { href: "/admin/stripe", label: "Stripe", icon: "💳" },
    { href: "/admin/cashflow", label: "Cash Flow", icon: "📈" },
    { href: "/admin/settings", label: "Settings", icon: "⚙️" },
  ];

  async function logout() {
    await fetch("/api/admin-auth", { method: "DELETE" });
    window.location.href = "/";
  }

  $: currentPath = $page.url.pathname;
</script>

<div class="min-h-screen flex bg-[#121217] text-white">
  <!-- Sidebar -->
  <aside class="w-64 border-r border-gray-800 flex flex-col p-4 shrink-0">
    <div class="mb-8">
      <h1 class="text-lg font-bold text-[#33FFC1]">Income Engine</h1>
      <p class="text-xs text-gray-500 mt-1">Graham Zemel</p>
    </div>

    <nav class="flex-1 flex flex-col gap-1">
      {#each navItems as item}
        <a
          href={item.href}
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors
            {currentPath === item.href
              ? 'bg-[#33FFC1]/10 text-[#33FFC1]'
              : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}"
        >
          <span class="text-base">{item.icon}</span>
          {item.label}
        </a>
      {/each}
    </nav>

    <button
      on:click={logout}
      class="mt-auto text-sm text-gray-500 hover:text-gray-300 transition px-3 py-2 text-left"
    >
      Logout
    </button>
  </aside>

  <!-- Main content -->
  <main class="flex-1 overflow-y-auto">
    <div class="max-w-6xl mx-auto p-8">
      <slot />
    </div>
  </main>
</div>
