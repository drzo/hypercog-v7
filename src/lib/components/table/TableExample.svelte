<script lang="ts">
  import DataTable from './DataTable.svelte';
  import type { TableColumn } from '$lib/types/table';
  
  interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    active: boolean;
  }
  
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', active: true },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', active: false },
    // Add more sample data as needed
  ];
  
  const columns: TableColumn<User>[] = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    {
      key: 'active',
      label: 'Status',
      sortable: true,
      render: (user) => user.active ? 'Active' : 'Inactive'
    }
  ];
  
  function handleSelect(event: CustomEvent<User[]>) {
    console.log('Selected users:', event.detail);
  }
</script>

<div class="p-4">
  <h2 class="text-lg font-semibold mb-4">Users</h2>
  <DataTable
    data={users}
    {columns}
    pageSize={5}
    selectable={true}
    on:select={handleSelect}
  />
</div>