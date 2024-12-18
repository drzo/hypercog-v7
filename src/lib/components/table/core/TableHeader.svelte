<script lang="ts">
  import type { TableColumn } from '$lib/types/table';
  
  export let columns: TableColumn<any>[];
  export let selectable: boolean;
  export let sortKey: keyof any | null;
  export let sortDirection: 'asc' | 'desc';
  export let onSort: (column: TableColumn<any>) => void;
  export let onSelectAll: (checked: boolean) => void;
  export let allSelected: boolean;
</script>

<thead class="bg-gray-50">
  <tr>
    {#if selectable}
      <th scope="col" class="relative w-12 px-6 sm:w-16 sm:px-8">
        <input
          type="checkbox"
          class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300"
          checked={allSelected}
          on:change={(e) => onSelectAll(e.currentTarget.checked)}
        />
      </th>
    {/if}
    {#each columns as column}
      <th
        scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        class:cursor-pointer={column.sortable}
        on:click={() => column.sortable && onSort(column)}
      >
        <div class="flex items-center space-x-1">
          <span>{column.label}</span>
          {#if column.sortable}
            <span class="text-gray-400">
              {#if sortKey === column.key}
                {sortDirection === 'asc' ? '↑' : '↓'}
              {:else}
                ↕
              {/if}
            </span>
          {/if}
        </div>
      </th>
    {/each}
  </tr>
</thead>