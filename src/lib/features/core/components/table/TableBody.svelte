<script lang="ts">
  import type { TableColumn } from '$lib/types/table';
  
  export let data: any[];
  export let columns: TableColumn<any>[];
  export let selectable: boolean;
  export let selectedItems: any[];
  export let onRowSelect: (item: any, checked: boolean) => void;
</script>

<tbody class="bg-white divide-y divide-gray-200">
  {#each data as item}
    <tr class="hover:bg-gray-50">
      {#if selectable}
        <td class="relative w-12 px-6 sm:w-16 sm:px-8">
          <input
            type="checkbox"
            class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300"
            checked={selectedItems.includes(item)}
            on:change={(e) => onRowSelect(item, e.currentTarget.checked)}
          />
        </td>
      {/if}
      {#each columns as column}
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
          {#if column.render}
            {column.render(item)}
          {:else}
            {item[column.key]}
          {/if}
        </td>
      {/each}
    </tr>
  {/each}
</tbody>