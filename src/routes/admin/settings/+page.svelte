<script>
  import { onMount } from "svelte";
  import { get, put, post, del } from "$lib/api.js";

  let config = {};
  let loading = true;
  let error = null;
  let saving = false;
  let message = "";

  let genSource = "";
  let genName = "";
  let genStartDate = "";
  let genCount = 26;
  let genPayDayOffset = 0;

  let newPeriodSource = "";
  let newPeriod = { startDate: "", endDate: "", payDate: "" };

  onMount(loadConfig);

  async function loadConfig() {
    loading = true;
    try { config = await get("/api/config"); }
    catch (e) { error = e.message; }
    finally { loading = false; }
  }

  async function saveConfig() {
    saving = true; message = "";
    try {
      await put("/api/config", { taxRate: config.taxRate || 0.0025 });
      message = "Saved";
      setTimeout(() => message = "", 2000);
    } catch (e) { message = "Error: " + e.message; }
    finally { saving = false; }
  }

  async function generatePeriods() {
    if (!genSource || !genName || !genStartDate || !genCount) { alert("All fields required."); return; }
    try {
      await post(`/api/config/pay-periods/${genSource}/generate`, { name: genName, startDate: genStartDate, count: parseInt(genCount), payDayOffset: parseInt(genPayDayOffset) });
      await loadConfig();
      message = `Generated ${genCount} periods for ${genName}.`;
      setTimeout(() => message = "", 3000);
    } catch (e) { alert(e.message); }
  }

  async function addPeriod() {
    if (!newPeriodSource || !newPeriod.startDate || !newPeriod.endDate || !newPeriod.payDate) { alert("All fields required."); return; }
    try {
      const cal = config.payPeriodCalendars?.[newPeriodSource];
      if (!cal) { alert("Source not found. Generate it first."); return; }
      const periods = [...(cal.periods || []), { ...newPeriod }];
      periods.sort((a, b) => a.payDate.localeCompare(b.payDate));
      await put(`/api/config/pay-periods/${newPeriodSource}`, { name: cal.name, periods });
      newPeriod = { startDate: "", endDate: "", payDate: "" };
      await loadConfig();
    } catch (e) { alert(e.message); }
  }

  async function deleteCalendar(source) {
    if (!confirm(`Delete "${source}" calendar?`)) return;
    try { await del(`/api/config/pay-periods/${source}`); await loadConfig(); }
    catch (e) { alert(e.message); }
  }

  async function removePeriod(source, index) {
    try {
      const cal = config.payPeriodCalendars[source];
      const periods = cal.periods.filter((_, i) => i !== index);
      await put(`/api/config/pay-periods/${source}`, { name: cal.name, periods });
      await loadConfig();
    } catch (e) { alert(e.message); }
  }

  $: calendars = Object.entries(config.payPeriodCalendars || {});
</script>

<svelte:head><title>Settings | Income Engine</title></svelte:head>

<div class="mb-8">
  <h1 class="text-2xl font-semibold text-gray-900">Settings</h1>
  <p class="text-sm text-gray-400 mt-1">Tax rates, pay period calendars</p>
</div>

{#if loading}
  <p class="text-gray-400 text-sm">Loading...</p>
{:else if error}
  <div class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">{error}</div>
{:else}
  {#if message}
    <div class="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2.5 rounded-lg text-sm mb-6">{message}</div>
  {/if}

  <!-- General -->
  <div class="bg-white border border-gray-200 rounded-xl p-6 mb-8">
    <h2 class="text-sm font-medium text-gray-900 mb-4">Tax Rate</h2>
    <div class="flex items-end gap-4">
      <div class="w-48">
        <label class="text-xs text-gray-400 block mb-1">Effective rate (decimal)</label>
        <input type="number" step="0.001" min="0" max="1" bind:value={config.taxRate}
          class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500" />
        <p class="text-[11px] text-gray-400 mt-1">0.0025 = 0.25% (CU Boulder student exempt)</p>
      </div>
      <button on:click={saveConfig} disabled={saving}
        class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition disabled:opacity-50">
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  </div>

  <!-- Pay Period Calendars -->
  <div class="bg-white border border-gray-200 rounded-xl p-6 mb-8">
    <h2 class="text-sm font-medium text-gray-900 mb-5">Pay Period Calendars</h2>

    {#if calendars.length === 0}
      <p class="text-sm text-gray-400 mb-4">No calendars yet. Generate one below.</p>
    {:else}
      {#each calendars as [source, cal]}
        <div class="mb-8 last:mb-0">
          <div class="flex justify-between items-center mb-3">
            <div>
              <p class="text-sm font-medium text-gray-700">{cal.name}</p>
              <p class="text-xs text-gray-400"><code class="text-emerald-600">{source}</code> &middot; {cal.periods?.length || 0} periods</p>
            </div>
            <button on:click={() => deleteCalendar(source)} class="text-xs text-red-400 hover:text-red-600">Delete</button>
          </div>

          {#if cal.periods?.length > 0}
            <div class="border border-gray-100 rounded-lg overflow-hidden max-h-56 overflow-y-auto mb-3">
              <table class="w-full text-xs">
                <thead class="bg-gray-50 sticky top-0">
                  <tr>
                    <th class="text-left px-4 py-2 text-gray-400 font-medium">Start</th>
                    <th class="text-left px-4 py-2 text-gray-400 font-medium">End</th>
                    <th class="text-left px-4 py-2 text-gray-400 font-medium">Pay Date</th>
                    <th class="px-4 py-2 w-8"></th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-50">
                  {#each cal.periods as period, i}
                    <tr class="hover:bg-gray-50/50">
                      <td class="px-4 py-2 text-gray-600">{period.startDate}</td>
                      <td class="px-4 py-2 text-gray-600">{period.endDate}</td>
                      <td class="px-4 py-2 text-emerald-600 font-medium">{period.payDate}</td>
                      <td class="px-4 py-2 text-right">
                        <button on:click={() => removePeriod(source, i)} class="text-gray-300 hover:text-red-400">&times;</button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}

          <!-- Add single period -->
          <div class="flex gap-2 items-end">
            <div class="flex-1">
              <label class="text-[10px] text-gray-400">Start</label>
              <input type="date" bind:value={newPeriod.startDate} on:focus={() => newPeriodSource = source}
                class="w-full border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div class="flex-1">
              <label class="text-[10px] text-gray-400">End</label>
              <input type="date" bind:value={newPeriod.endDate} on:focus={() => newPeriodSource = source}
                class="w-full border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500" />
            </div>
            <div class="flex-1">
              <label class="text-[10px] text-gray-400">Pay date</label>
              <input type="date" bind:value={newPeriod.payDate} on:focus={() => newPeriodSource = source}
                class="w-full border border-gray-200 rounded px-2 py-1.5 text-xs text-gray-900 bg-white focus:outline-none focus:border-emerald-500" />
            </div>
            <button on:click={() => { newPeriodSource = source; addPeriod(); }}
              class="border border-gray-200 text-gray-600 px-3 py-1.5 rounded text-xs hover:bg-gray-50 shrink-0">
              Add
            </button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Generate -->
  <div class="bg-white border border-gray-200 rounded-xl p-6">
    <h2 class="text-sm font-medium text-gray-900 mb-1">Generate Pay Periods</h2>
    <p class="text-xs text-gray-400 mb-5">Auto-generate biweekly periods from a start date.</p>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
      <div>
        <label class="text-[10px] text-gray-400 block mb-1">Source key</label>
        <input bind:value={genSource} placeholder="cu_boulder" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label class="text-[10px] text-gray-400 block mb-1">Display name</label>
        <input bind:value={genName} placeholder="CU Boulder" class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label class="text-[10px] text-gray-400 block mb-1">First period start</label>
        <input type="date" bind:value={genStartDate} class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label class="text-[10px] text-gray-400 block mb-1"># Periods</label>
        <input type="number" bind:value={genCount} class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
      </div>
      <div>
        <label class="text-[10px] text-gray-400 block mb-1">Pay offset (days)</label>
        <input type="number" bind:value={genPayDayOffset} class="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500" />
      </div>
    </div>
    <button on:click={generatePeriods} class="bg-gray-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
      Generate
    </button>
  </div>
{/if}
