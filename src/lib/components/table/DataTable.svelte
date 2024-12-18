<script lang="ts">
  import type { TableProps, TableColumn, TableState } from '$lib/types/table';
  import TableHeader from './core/TableHeader.svelte';
  import TableBody from './core/TableBody.svelte';
  import Pagination from './Pagination.svelte';
  import { sortData } from './hooks/useTableSort';
  import { paginateData, calculateTotalPages } from './hooks/useTablePagination';
  import { createTableSelection } from './hooks/useTableSelection';
  import { createEventDispatcher } from 'svelte';
  
  export let data: TableProps<any>['data'] = [];
  export let columns: TableProps<any>['columns'] = [];
  export let pageSize: TableProps<any>['pageSize'] = 10;
  export let selectable: TableProps<any>['selectable'] = false;
  
  const dispatch = createEventDispatcher();
  const selection = createTableSelection();
  
  let state: TableState<any> = {
    currentPage: 1,
    sortKey: null,
    sortDirection: 'asc',
    selectedItems: []
  };
  
  $: sortedData = sortData(data, state);
  $: paginatedData = paginateData(sortedData, { currentPage: state.currentPage, pageSize });
  $: totalPages = calculateTotalPages(data.length, pageSize);
  
  function handleSort(column: TableColumn<any>) {
    if (!column.sortable) return;
    
    if (state.sortKey === column.key) {
      state.sortDirection = state.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      state.sortKey = column.key;
      state.sortDirection = 'asc';
    }
  }
  
  function handlePageChange(page: number) {
    state.currentPage = page;
  }
  
  function handleRowSelect(item: any, checked: boolean) {
    state.selectedItems = selection.selectItem(state, item, checked);
    dispatch('select', state.selectedItems);
  }
  
  function handleSelectAll(checked: boolean) {
    state.selectedItems = checked ? selection.selectAll(paginatedData) : selection.deselectAll();
    dispatch('select', state.selectedItems);
  }
</script>

<div class="overflow-x-auto">
  <table class="min-w-full divide-y divide-gray-200">
    <TableHeader
      {columns}
      {selectable}
      sortKey={state.sortKey}
      sortDirection={state.sortDirection}
      onSort={handleSort}
      onSelectAll={handleSelectAll}
      allSelected={selection.isAllSelected(state, paginatedData)}
    />
    
    <TableBody
      data={paginatedData}
      {columns}
      {selectable}
      selectedItems={state.selectedItems}
      onRowSelect={handleRowSelect}
    />
  </table>
</div>

{#if totalPages > 1}
  <div class="mt-4">
    <Pagination
      currentPage={state.currentPage}
      {totalPages}
      onPageChange={handlePageChange}
    />
  </div>
{/if}