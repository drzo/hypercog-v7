<script lang="ts">
  export let tabs: { id: string; label: string }[];
  export let activeTab: string;

  function handleTabClick(tabId: string) {
    activeTab = tabId;
  }
</script>

<div>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      {#each tabs as tab}
        <button
          class="whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          class:border-indigo-500={activeTab === tab.id}
          class:text-indigo-600={activeTab === tab.id}
          class:border-transparent={activeTab !== tab.id}
          class:text-gray-500={activeTab !== tab.id}
          class:hover:text-gray-700={activeTab !== tab.id}
          class:hover:border-gray-300={activeTab !== tab.id}
          aria-current={activeTab === tab.id ? 'page' : undefined}
          on:click={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>
  <div class="mt-4">
    <slot {activeTab} />
  </div>
</div>