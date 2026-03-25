<script>
  import { onMount } from "svelte";
  import { get } from "$lib/api.js";

  let payments = [];
  let totalExpected = 0;
  let days = 90;
  let loading = true;
  let error = null;

  onMount(() => loadCashflow());

  async function loadCashflow() {
    loading = true;
    try {
      const res = await get(`/api/projections/cashflow?days=${days}`);
      payments = res.payments;
      totalExpected = res.totalExpected;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  // Group payments by month
  $: grouped = payments.reduce((acc, p) => {
    const month = p.date.slice(0, 7);
    if (!acc[month]) acc[month] = { payments: [], total: 0 };
    acc[month].payments.push(p);
    acc[month].total += p.amount;
    return acc;
  }, {});

  $: months = Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));

  // Next payment
  $: nextPayment = payments[0] || null;

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);
  }

  function formatDate(dateStr) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      weekday: "short", month: "short", day: "numeric",
    });
  }

  function formatMonth(monthStr) {
    const [y, m] = monthStr.split("-");
    return new Date(parseInt(y), parseInt(m) - 1).toLocaleDateString("en-US", {
      month: "long", year: "numeric",
    });
  }

  const typeColors = {
    hourly: "border-blue-500 bg-blue-900/20",
    business: "border-purple-500 bg-purple-900/20",
    salary: "border-green-500 bg-green-900/20",
    freelance: "border-orange-500 bg-orange-900/20",
    other: "border-gray-500 bg-gray-900/20",
  };
</script>

<svelte:head>
  <title>Cash Flow | Income Engine</title>
</svelte:head>

<div class="flex justify-between items-center mb-6">
  <h2 class="text-2xl font-bold">Cash Flow Timeline</h2>
  <div class="flex gap-2">
    {#each [30, 60, 90, 180] as d}
      <button
        on:click={() => { days = d; loadCashflow(); }}
        class="px-3 py-1.5 rounded-lg text-xs font-medium transition
          {days === d
            ? 'bg-[#33FFC1]/10 text-[#33FFC1] border border-[#33FFC1]/30'
            : 'bg-gray-900 text-gray-400 border border-gray-800 hover:text-white'}"
      >
        {d}d
      </button>
    {/each}
  </div>
</div>

{#if loading}
  <p class="text-gray-400">Loading cash flow...</p>
{:else if error}
  <div class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg">{error}</div>
{:else}
  <!-- Hero: next payment -->
  {#if nextPayment}
    <div class="bg-gradient-to-r from-[#33FFC1]/10 to-transparent border border-[#33FFC1]/20 rounded-xl p-5 mb-6">
      <p class="text-xs text-[#33FFC1] uppercase tracking-wider mb-1">Next Payment</p>
      <div class="flex justify-between items-center">
        <div>
          <p class="text-lg font-semibold">{nextPayment.source}</p>
          <p class="text-sm text-gray-400">{formatDate(nextPayment.date)}</p>
        </div>
        <p class="text-2xl font-bold text-[#33FFC1]">+{formatCurrency(nextPayment.amount)}</p>
      </div>
    </div>
  {/if}

  <!-- Summary bar -->
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-8 flex justify-between items-center">
    <span class="text-sm text-gray-400">Total expected in next {days} days</span>
    <span class="text-xl font-bold text-[#33FFC1]">{formatCurrency(totalExpected)}</span>
  </div>

  <!-- Monthly groups -->
  {#if payments.length === 0}
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
      <p class="text-gray-400">No payments projected. Add income sources to see your cash flow.</p>
    </div>
  {:else}
    {#each months as [month, data]}
      <div class="mb-6">
        <div class="flex justify-between items-center mb-3">
          <h3 class="text-sm font-semibold text-gray-300">{formatMonth(month)}</h3>
          <span class="text-sm font-medium text-[#33FFC1]">{formatCurrency(data.total)}</span>
        </div>
        <div class="space-y-2">
          {#each data.payments as payment}
            <div class="border-l-2 {typeColors[payment.type] || typeColors.other} rounded-r-lg p-3 flex justify-between items-center">
              <div>
                <p class="text-sm font-medium">{payment.source}</p>
                <p class="text-xs text-gray-500">
                  {formatDate(payment.date)}
                  {#if payment.periodStart}
                    — Period: {payment.periodStart} to {payment.periodEnd}
                  {/if}
                </p>
              </div>
              <div class="text-right">
                <p class="text-sm font-medium text-green-400">+{formatCurrency(payment.amount)}</p>
                <p class="text-xs text-gray-600">Running: {formatCurrency(payment.runningTotal)}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  {/if}
{/if}
