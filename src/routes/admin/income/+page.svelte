<script>
  import { onMount } from "svelte";
  import { get, post, put, del } from "$lib/api.js";

  let sources = [];
  let loading = true;
  let error = null;

  // Modal state
  let showModal = false;
  let editing = null; // null = creating, string = editing ID
  let form = getEmptyForm();

  function getEmptyForm() {
    return {
      name: "",
      type: "hourly",
      hoursPerWeek: null,
      dollarsPerHour: null,
      payFrequency: "biweekly",
      payPeriodSource: "",
      amount: null,
      frequency: "monthly",
      linkedStripeAccount: "",
      nextPaymentDate: "",
      active: true,
      notes: "",
    };
  }

  onMount(loadSources);

  async function loadSources() {
    loading = true;
    try {
      const res = await get("/api/income");
      sources = res.sources;
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  function openCreate() {
    form = getEmptyForm();
    editing = null;
    showModal = true;
  }

  function openEdit(source) {
    form = {
      name: source.name || "",
      type: source.type || "other",
      hoursPerWeek: source.hoursPerWeek,
      dollarsPerHour: source.dollarsPerHour,
      payFrequency: source.payFrequency || "biweekly",
      payPeriodSource: source.payPeriodSource || "",
      amount: source.amount,
      frequency: source.frequency || "monthly",
      linkedStripeAccount: source.linkedStripeAccount || "",
      nextPaymentDate: source.nextPaymentDate || "",
      active: source.active !== false,
      notes: source.notes || "",
    };
    editing = source.id;
    showModal = true;
  }

  async function save() {
    try {
      const body = { ...form };
      // Clean up nullish strings
      if (!body.payPeriodSource) body.payPeriodSource = null;
      if (!body.linkedStripeAccount) body.linkedStripeAccount = null;
      if (!body.nextPaymentDate) body.nextPaymentDate = null;
      if (body.type !== "hourly") {
        body.hoursPerWeek = null;
        body.dollarsPerHour = null;
        body.payPeriodSource = null;
        body.payFrequency = null;
      }
      if (body.type === "hourly" || body.linkedStripeAccount) {
        body.amount = null;
        body.frequency = null;
      }

      if (editing) {
        await put(`/api/income/${editing}`, body);
      } else {
        await post("/api/income", body);
      }
      showModal = false;
      await loadSources();
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  async function remove(id) {
    if (!confirm("Delete this income source?")) return;
    try {
      await del(`/api/income/${id}`);
      await loadSources();
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  async function quickUpdateHours(source, newHours) {
    try {
      await put(`/api/income/${source.id}`, { hoursPerWeek: parseFloat(newHours) });
      await loadSources();
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount || 0);
  }
</script>

<svelte:head>
  <title>Income Sources | Income Engine</title>
</svelte:head>

<div class="flex justify-between items-center mb-6">
  <h2 class="text-2xl font-bold">Income Sources</h2>
  <button
    on:click={openCreate}
    class="bg-[#33FFC1] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2be6ad] transition"
  >
    + Add Source
  </button>
</div>

{#if loading}
  <p class="text-gray-400">Loading...</p>
{:else if error}
  <div class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg">{error}</div>
{:else if sources.length === 0}
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-8 text-center">
    <p class="text-gray-400 mb-4">No income sources yet.</p>
    <button on:click={openCreate} class="text-[#33FFC1] hover:underline text-sm">Add your first income source</button>
  </div>
{:else}
  <div class="space-y-3">
    {#each sources as source}
      <div class="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <!-- Type badge -->
        <span class="text-xs px-2 py-1 rounded-full shrink-0
          {source.type === 'hourly' ? 'bg-blue-900/50 text-blue-300' :
           source.type === 'business' ? 'bg-purple-900/50 text-purple-300' :
           source.type === 'salary' ? 'bg-green-900/50 text-green-300' :
           source.type === 'freelance' ? 'bg-orange-900/50 text-orange-300' :
           'bg-gray-800 text-gray-400'}">
          {source.type}
        </span>

        <!-- Name + details -->
        <div class="flex-1 min-w-0">
          <p class="font-medium truncate">{source.name}</p>
          {#if source.type === "hourly"}
            <p class="text-xs text-gray-500">
              <input
                type="number"
                value={source.hoursPerWeek}
                on:change={(e) => quickUpdateHours(source, e.target.value)}
                class="w-12 bg-transparent border-b border-gray-700 text-gray-300 text-xs text-center focus:outline-none focus:border-[#33FFC1]"
              /> hrs/wk
              x ${source.dollarsPerHour}/hr
              {#if source.payPeriodSource}
                — {source.payPeriodSource} pay periods
              {/if}
            </p>
          {:else if source.linkedStripeAccount}
            <p class="text-xs text-gray-500">Linked to Stripe: {source.linkedStripeAccount}</p>
          {:else if source.amount}
            <p class="text-xs text-gray-500">{formatCurrency(source.amount)} / {source.frequency}</p>
          {/if}
        </div>

        <!-- Monthly estimate -->
        <div class="text-right shrink-0">
          <p class="text-sm font-medium text-[#33FFC1]">{formatCurrency(source.estimatedMonthly)}/mo</p>
          {#if !source.active}
            <span class="text-xs text-red-400">inactive</span>
          {/if}
        </div>

        <!-- Actions -->
        <div class="flex gap-2 shrink-0">
          <button on:click={() => openEdit(source)} class="text-gray-500 hover:text-white text-sm">Edit</button>
          <button on:click={() => remove(source.id)} class="text-gray-500 hover:text-red-400 text-sm">Delete</button>
        </div>
      </div>
    {/each}
  </div>

  <!-- Summary -->
  <div class="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4 flex justify-between items-center">
    <span class="text-gray-400 text-sm">Total estimated monthly income</span>
    <span class="text-xl font-bold text-[#33FFC1]">
      {formatCurrency(sources.reduce((s, src) => s + (src.estimatedMonthly || 0), 0))}
    </span>
  </div>
{/if}

<!-- Modal -->
{#if showModal}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50" on:click|self={() => showModal = false}>
    <div class="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
      <h3 class="text-lg font-bold mb-4">{editing ? "Edit" : "Add"} Income Source</h3>

      <div class="space-y-4">
        <!-- Name -->
        <div>
          <label class="text-xs text-gray-400 block mb-1">Name</label>
          <input bind:value={form.name} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" placeholder="e.g. CU Boulder - Research Assistant" />
        </div>

        <!-- Type -->
        <div>
          <label class="text-xs text-gray-400 block mb-1">Type</label>
          <select bind:value={form.type} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]">
            <option value="hourly">Hourly</option>
            <option value="salary">Salary</option>
            <option value="business">Business / Startup</option>
            <option value="freelance">Freelance</option>
            <option value="other">Other</option>
          </select>
        </div>

        <!-- Hourly fields -->
        {#if form.type === "hourly"}
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-400 block mb-1">Hours / Week</label>
              <input type="number" step="0.5" bind:value={form.hoursPerWeek} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
            </div>
            <div>
              <label class="text-xs text-gray-400 block mb-1">$ / Hour</label>
              <input type="number" step="0.01" bind:value={form.dollarsPerHour} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
            </div>
          </div>
          <div>
            <label class="text-xs text-gray-400 block mb-1">Pay Period Source</label>
            <input bind:value={form.payPeriodSource} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" placeholder="e.g. cu_boulder" />
            <p class="text-xs text-gray-600 mt-1">Must match a pay period calendar in Settings</p>
          </div>
          <div>
            <label class="text-xs text-gray-400 block mb-1">Pay Frequency</label>
            <select bind:value={form.payFrequency} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]">
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        {/if}

        <!-- Business / Stripe-linked -->
        {#if form.type === "business"}
          <div>
            <label class="text-xs text-gray-400 block mb-1">Linked Stripe Account</label>
            <select bind:value={form.linkedStripeAccount} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]">
              <option value="">None</option>
              <option value="fratdoor">FratDoor</option>
              <option value="textcloaker">TextCloaker</option>
            </select>
          </div>
        {/if}

        <!-- Fixed amount fields (non-hourly, non-stripe-linked) -->
        {#if form.type !== "hourly" && !form.linkedStripeAccount}
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-400 block mb-1">Amount</label>
              <input type="number" step="0.01" bind:value={form.amount} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
            </div>
            <div>
              <label class="text-xs text-gray-400 block mb-1">Frequency</label>
              <select bind:value={form.frequency} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]">
                <option value="weekly">Weekly</option>
                <option value="biweekly">Biweekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
                <option value="one-time">One-time</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-xs text-gray-400 block mb-1">Next Payment Date</label>
            <input type="date" bind:value={form.nextPaymentDate} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
          </div>
        {/if}

        <!-- Active toggle -->
        <label class="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" bind:checked={form.active} class="accent-[#33FFC1]" />
          <span class="text-sm text-gray-300">Active</span>
        </label>

        <!-- Notes -->
        <div>
          <label class="text-xs text-gray-400 block mb-1">Notes</label>
          <textarea bind:value={form.notes} rows="2" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1] resize-none" />
        </div>
      </div>

      <div class="flex gap-3 mt-6">
        <button on:click={save} class="bg-[#33FFC1] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2be6ad] transition flex-1">
          {editing ? "Save Changes" : "Create"}
        </button>
        <button on:click={() => showModal = false} class="bg-gray-800 text-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition">
          Cancel
        </button>
      </div>
    </div>
  </div>
{/if}
