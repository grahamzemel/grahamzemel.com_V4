<script>
  import { onMount } from "svelte";
  import { get } from "$lib/api.js";

  let activeTab = "fratdoor";
  let balances = {};
  let mrrs = {};
  let payouts = {};
  let revenue = {};
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const [balRes, mrrRes, payRes, revRes] = await Promise.all([
        get("/api/stripe/balance"),
        get("/api/stripe/mrr"),
        get("/api/stripe/payouts?limit=15"),
        get("/api/stripe/revenue"),
      ]);

      // Index by account name
      for (const b of balRes.balances) balances[b.account] = b;
      for (const m of mrrRes.mrr) mrrs[m.account] = m;

      // Group payouts by account
      for (const p of payRes.payouts) {
        if (!payouts[p.account]) payouts[p.account] = [];
        payouts[p.account].push(p);
      }

      // Index revenue by account
      for (const r of revRes.revenue) revenue[r.account] = r;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  $: accounts = Object.keys(balances);
  $: currentBalance = balances[activeTab];
  $: currentMRR = mrrs[activeTab];
  $: currentPayouts = payouts[activeTab] || [];
  $: currentRevenue = revenue[activeTab];

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);
  }

  function formatDate(iso) {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  }
</script>

<svelte:head>
  <title>Stripe | Income Engine</title>
</svelte:head>

<h2 class="text-2xl font-bold mb-6">Stripe Accounts</h2>

{#if loading}
  <p class="text-gray-400">Loading Stripe data...</p>
{:else if error}
  <div class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg">{error}</div>
{:else}
  <!-- Account tabs -->
  <div class="flex gap-2 mb-6">
    {#each accounts as account}
      <button
        on:click={() => activeTab = account}
        class="px-4 py-2 rounded-lg text-sm font-medium transition
          {activeTab === account
            ? 'bg-[#33FFC1]/10 text-[#33FFC1] border border-[#33FFC1]/30'
            : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'}"
      >
        {balances[account]?.label || account}
      </button>
    {/each}
  </div>

  {#if currentBalance}
    <!-- Balance cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Available</p>
        <p class="text-2xl font-bold text-green-400">{formatCurrency(currentBalance.availableTotal)}</p>
      </div>
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Pending</p>
        <p class="text-2xl font-bold text-yellow-400">{formatCurrency(currentBalance.pendingTotal)}</p>
      </div>
      {#if currentMRR}
        <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">MRR</p>
          <p class="text-2xl font-bold text-[#33FFC1]">{formatCurrency(currentMRR.mrr)}</p>
        </div>
      {/if}
    </div>

    <!-- Revenue summary -->
    {#if currentRevenue}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm font-semibold text-gray-300">Revenue (Last 30 Days)</p>
          <p class="text-lg font-bold text-[#33FFC1]">{formatCurrency(currentRevenue.totalRevenue)}</p>
        </div>
        {#if currentRevenue.daily.length > 0}
          <!-- Simple bar visualization -->
          <div class="flex items-end gap-px h-32">
            {#each currentRevenue.daily as day}
              {@const maxRevenue = Math.max(...currentRevenue.daily.map(d => d.amount))}
              {@const height = maxRevenue > 0 ? (day.amount / maxRevenue) * 100 : 0}
              <div class="flex-1 group relative">
                <div
                  class="bg-[#33FFC1]/60 hover:bg-[#33FFC1] rounded-t transition-colors"
                  style="height: {Math.max(height, 2)}%"
                />
                <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-xs text-white px-2 py-1 rounded whitespace-nowrap z-10">
                  {day.date}: {formatCurrency(day.amount)}
                </div>
              </div>
            {/each}
          </div>
          <div class="flex justify-between mt-1">
            <span class="text-xs text-gray-600">{currentRevenue.daily[0]?.date}</span>
            <span class="text-xs text-gray-600">{currentRevenue.daily[currentRevenue.daily.length - 1]?.date}</span>
          </div>
        {:else}
          <p class="text-gray-500 text-sm">No revenue data in this period.</p>
        {/if}
      </div>
    {/if}

    <!-- Recent payouts -->
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p class="text-sm font-semibold text-gray-300 mb-4">Recent Payouts</p>
      {#if currentPayouts.length === 0}
        <p class="text-gray-500 text-sm">No payouts found.</p>
      {:else}
        <div class="space-y-2">
          {#each currentPayouts as payout}
            <div class="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
              <div>
                <p class="text-sm">{formatDate(payout.arrivalDate)}</p>
                <span class="text-xs px-1.5 py-0.5 rounded
                  {payout.status === 'paid' ? 'bg-green-900/50 text-green-300' :
                   payout.status === 'in_transit' ? 'bg-yellow-900/50 text-yellow-300' :
                   payout.status === 'pending' ? 'bg-blue-900/50 text-blue-300' :
                   'bg-gray-800 text-gray-400'}">
                  {payout.status}
                </span>
              </div>
              <p class="text-sm font-medium text-green-400">{formatCurrency(payout.amount)}</p>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  {/if}
{/if}
