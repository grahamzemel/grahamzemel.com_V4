<script>
  import { onMount } from "svelte";
  import { get, put, post, del } from "$lib/api.js";

  let config = {};
  let loading = true;
  let error = null;
  let saving = false;
  let message = "";

  // Pay period generation form
  let genSource = "";
  let genName = "";
  let genStartDate = "";
  let genCount = 26;
  let genPayDayOffset = 5;

  // New period manual entry
  let newPeriodSource = "";
  let newPeriod = { startDate: "", endDate: "", payDate: "" };

  onMount(loadConfig);

  async function loadConfig() {
    loading = true;
    try {
      config = await get("/api/config");
    } catch (e) {
      error = e.message;
    } finally {
      loading = false;
    }
  }

  async function saveConfig() {
    saving = true;
    message = "";
    try {
      await put("/api/config", { taxRate: config.taxRate || 0.25 });
      message = "Settings saved.";
      setTimeout(() => message = "", 3000);
    } catch (e) {
      message = "Error: " + e.message;
    } finally {
      saving = false;
    }
  }

  async function generatePeriods() {
    if (!genSource || !genName || !genStartDate || !genCount) {
      alert("All fields required.");
      return;
    }
    try {
      await post(`/api/config/pay-periods/${genSource}/generate`, {
        name: genName,
        startDate: genStartDate,
        count: parseInt(genCount),
        payDayOffset: parseInt(genPayDayOffset),
      });
      await loadConfig();
      message = `Generated ${genCount} pay periods for ${genName}.`;
      setTimeout(() => message = "", 3000);
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  async function addPeriod() {
    if (!newPeriodSource || !newPeriod.startDate || !newPeriod.endDate || !newPeriod.payDate) {
      alert("All fields required.");
      return;
    }
    try {
      const calendar = config.payPeriodCalendars?.[newPeriodSource];
      if (!calendar) {
        alert("Pay period source not found. Generate it first.");
        return;
      }
      const periods = [...(calendar.periods || []), { ...newPeriod }];
      periods.sort((a, b) => a.payDate.localeCompare(b.payDate));
      await put(`/api/config/pay-periods/${newPeriodSource}`, {
        name: calendar.name,
        periods,
      });
      newPeriod = { startDate: "", endDate: "", payDate: "" };
      await loadConfig();
      message = "Period added.";
      setTimeout(() => message = "", 3000);
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  async function deleteCalendar(source) {
    if (!confirm(`Delete the "${source}" pay period calendar?`)) return;
    try {
      await del(`/api/config/pay-periods/${source}`);
      await loadConfig();
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  async function removePeriod(source, index) {
    try {
      const calendar = config.payPeriodCalendars[source];
      const periods = calendar.periods.filter((_, i) => i !== index);
      await put(`/api/config/pay-periods/${source}`, {
        name: calendar.name,
        periods,
      });
      await loadConfig();
    } catch (e) {
      alert("Error: " + e.message);
    }
  }

  $: calendars = Object.entries(config.payPeriodCalendars || {});

  function formatDate(dateStr) {
    return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  }
</script>

<svelte:head>
  <title>Settings | Income Engine</title>
</svelte:head>

<h2 class="text-2xl font-bold mb-6">Settings</h2>

{#if loading}
  <p class="text-gray-400">Loading...</p>
{:else if error}
  <div class="bg-red-900/30 border border-red-700 text-red-300 px-4 py-3 rounded-lg mb-4">{error}</div>
{:else}
  {#if message}
    <div class="bg-green-900/30 border border-green-700 text-green-300 px-4 py-3 rounded-lg mb-4">{message}</div>
  {/if}

  <!-- General settings -->
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
    <p class="text-sm font-semibold text-gray-300 mb-4">General</p>
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label class="text-xs text-gray-400 block mb-1">Tax Rate (%)</label>
        <input
          type="number" step="0.01" min="0" max="1"
          bind:value={config.taxRate}
          class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]"
        />
        <p class="text-xs text-gray-600 mt-1">Decimal (e.g. 0.25 = 25%)</p>
      </div>
    </div>
    <button
      on:click={saveConfig}
      disabled={saving}
      class="mt-4 bg-[#33FFC1] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2be6ad] transition disabled:opacity-50"
    >
      {saving ? "Saving..." : "Save Settings"}
    </button>
  </div>

  <!-- Pay Period Calendars -->
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-8">
    <p class="text-sm font-semibold text-gray-300 mb-4">Pay Period Calendars</p>

    {#if calendars.length === 0}
      <p class="text-gray-500 text-sm mb-4">No pay period calendars configured. Generate one below.</p>
    {:else}
      {#each calendars as [source, calendar]}
        <div class="mb-6 last:mb-0">
          <div class="flex justify-between items-center mb-2">
            <div>
              <p class="text-sm font-medium">{calendar.name}</p>
              <p class="text-xs text-gray-500">Source key: <code class="text-[#33FFC1]">{source}</code> — {calendar.periods?.length || 0} periods</p>
            </div>
            <button on:click={() => deleteCalendar(source)} class="text-xs text-red-400 hover:text-red-300">Delete Calendar</button>
          </div>

          {#if calendar.periods?.length > 0}
            <div class="max-h-48 overflow-y-auto border border-gray-800 rounded-lg">
              <table class="w-full text-xs">
                <thead class="bg-gray-800 sticky top-0">
                  <tr>
                    <th class="text-left px-3 py-2 text-gray-400">Period Start</th>
                    <th class="text-left px-3 py-2 text-gray-400">Period End</th>
                    <th class="text-left px-3 py-2 text-gray-400">Pay Date</th>
                    <th class="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {#each calendar.periods as period, i}
                    <tr class="border-t border-gray-800">
                      <td class="px-3 py-1.5">{period.startDate}</td>
                      <td class="px-3 py-1.5">{period.endDate}</td>
                      <td class="px-3 py-1.5 text-[#33FFC1]">{period.payDate}</td>
                      <td class="px-3 py-1.5 text-right">
                        <button on:click={() => removePeriod(source, i)} class="text-gray-600 hover:text-red-400">x</button>
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          {/if}

          <!-- Add single period to this calendar -->
          <div class="mt-3 flex gap-2 items-end">
            <div class="flex-1">
              <label class="text-xs text-gray-500">Start</label>
              <input type="date" bind:value={newPeriod.startDate} on:focus={() => newPeriodSource = source}
                class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#33FFC1]" />
            </div>
            <div class="flex-1">
              <label class="text-xs text-gray-500">End</label>
              <input type="date" bind:value={newPeriod.endDate} on:focus={() => newPeriodSource = source}
                class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#33FFC1]" />
            </div>
            <div class="flex-1">
              <label class="text-xs text-gray-500">Pay Date</label>
              <input type="date" bind:value={newPeriod.payDate} on:focus={() => newPeriodSource = source}
                class="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-[#33FFC1]" />
            </div>
            <button on:click={() => { newPeriodSource = source; addPeriod(); }}
              class="bg-gray-800 text-gray-300 px-3 py-1 rounded text-xs hover:bg-gray-700 shrink-0">
              Add
            </button>
          </div>
        </div>
      {/each}
    {/if}
  </div>

  <!-- Generate pay periods -->
  <div class="bg-gray-900 border border-gray-800 rounded-xl p-5">
    <p class="text-sm font-semibold text-gray-300 mb-4">Generate Pay Periods (Biweekly)</p>
    <p class="text-xs text-gray-500 mb-4">
      Auto-generate biweekly pay periods from a start date. Each period is 14 days, with pay arriving after the offset.
    </p>
    <div class="grid grid-cols-2 md:grid-cols-5 gap-3">
      <div>
        <label class="text-xs text-gray-400 block mb-1">Source Key</label>
        <input bind:value={genSource} placeholder="cu_boulder" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
      </div>
      <div>
        <label class="text-xs text-gray-400 block mb-1">Display Name</label>
        <input bind:value={genName} placeholder="CU Boulder" class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
      </div>
      <div>
        <label class="text-xs text-gray-400 block mb-1">First Period Start</label>
        <input type="date" bind:value={genStartDate} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
      </div>
      <div>
        <label class="text-xs text-gray-400 block mb-1"># Periods</label>
        <input type="number" bind:value={genCount} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
      </div>
      <div>
        <label class="text-xs text-gray-400 block mb-1">Pay Day Offset (days)</label>
        <input type="number" bind:value={genPayDayOffset} class="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#33FFC1]" />
      </div>
    </div>
    <button
      on:click={generatePeriods}
      class="mt-4 bg-[#33FFC1] text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#2be6ad] transition"
    >
      Generate Periods
    </button>
  </div>
{/if}
