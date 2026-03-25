<script>
  import { onMount } from "svelte";
  import { get } from "$lib/api.js";

  let summary = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      summary = await get("/api/dashboard/summary");
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  });

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount || 0);
  }
</script>

<svelte:head>
  <title>Dashboard | Income Engine</title>
</svelte:head>

<h2 class="text-2xl font-bold mb-6">Dashboard</h2>

{#if loading}
  <div class="text-gray-400">Loading...</div>
{:else if error}
  <div class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg">
    {error}
  </div>
{:else if summary}
  <!-- Top metrics -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Monthly Income</p>
      <p class="text-3xl font-bold text-[#33FFC1]">
        {formatCurrency(summary.totalMonthlyIncome)}
      </p>
    </div>
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">Annual Income</p>
      <p class="text-3xl font-bold">
        {formatCurrency(summary.totalAnnualIncome)}
      </p>
    </div>
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
      <p class="text-xs text-gray-500 uppercase tracking-wider mb-1">YTD Estimate</p>
      <p class="text-3xl font-bold">
        {formatCurrency(summary.ytdEstimate)}
      </p>
    </div>
  </div>

  <!-- This month progress -->
  {#if summary.thisMonth}
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
      <div class="flex justify-between items-center mb-2">
        <p class="text-sm text-gray-400">This Month's Progress</p>
        <p class="text-sm text-gray-400">
          {formatCurrency(summary.thisMonth.soFar)} / {formatCurrency(summary.thisMonth.expected)}
        </p>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-3">
        <div
          class="bg-[#33FFC1] h-3 rounded-full transition-all"
          style="width: {Math.min(summary.thisMonth.progress, 100)}%"
        />
      </div>
      <p class="text-xs text-gray-500 mt-1">{summary.thisMonth.progress}% of month elapsed</p>
    </div>
  {/if}

  <!-- Stripe balances + MRR -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
    {#each Object.entries(summary.stripeBalances) as [account, balance]}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p class="text-xs text-gray-500 uppercase tracking-wider mb-3">
          {balance.label || account} — Stripe
        </p>
        {#if balance.error}
          <p class="text-red-400 text-sm">{balance.error}</p>
        {:else}
          <div class="flex gap-6">
            <div>
              <p class="text-xs text-gray-500">Available</p>
              <p class="text-xl font-semibold text-green-400">
                {formatCurrency(balance.availableTotal)}
              </p>
            </div>
            <div>
              <p class="text-xs text-gray-500">Pending</p>
              <p class="text-xl font-semibold text-yellow-400">
                {formatCurrency(balance.pendingTotal)}
              </p>
            </div>
            {#if summary.stripeMRR[account] && !summary.stripeMRR[account].error}
              <div>
                <p class="text-xs text-gray-500">MRR</p>
                <p class="text-xl font-semibold text-[#33FFC1]">
                  {formatCurrency(summary.stripeMRR[account].mrr)}
                </p>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>

  <!-- Income breakdown -->
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
    <p class="text-sm font-semibold text-gray-300 mb-4">Income Breakdown (Monthly)</p>
    {#if summary.incomeBreakdown.length === 0}
      <p class="text-gray-500 text-sm">No income sources configured. <a href="/admin/income" class="text-[#33FFC1] hover:underline">Add one</a></p>
    {:else}
      <div class="space-y-3">
        {#each summary.incomeBreakdown as source}
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="text-xs px-2 py-0.5 rounded-full
                {source.type === 'hourly' ? 'bg-blue-900/50 text-blue-300' :
                 source.type === 'business' ? 'bg-purple-900/50 text-purple-300' :
                 'bg-gray-800 text-gray-400'}">
                {source.type}
              </span>
              <span class="text-sm">{source.name}</span>
            </div>
            <span class="text-sm font-medium">{formatCurrency(source.estimatedMonthly)}/mo</span>
          </div>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Next payments -->
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
    <p class="text-sm font-semibold text-gray-300 mb-4">Upcoming Payments</p>
    {#if summary.nextPayments.length === 0}
      <p class="text-gray-500 text-sm">No upcoming payments projected.</p>
    {:else}
      <div class="space-y-2">
        {#each summary.nextPayments as payment}
          <div class="flex justify-between items-center py-2 border-b border-gray-800 last:border-0">
            <div>
              <p class="text-sm">{payment.source}</p>
              <p class="text-xs text-gray-500">{payment.date}</p>
            </div>
            <p class="text-sm font-medium text-green-400">+{formatCurrency(payment.amount)}</p>
          </div>
        {/each}
      </div>
    {/if}
  </div>
{/if}
