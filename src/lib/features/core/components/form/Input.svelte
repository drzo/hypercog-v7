<script lang="ts">
  export let id: string;
  export let label: string;
  export let type = 'text';
  export let value = '';
  export let error = '';
  export let required = false;
</script>

<div>
  <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
  <div class="mt-1">
    <input
      {id}
      type={type}
      {required}
      {value}
      on:input
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      class:border-red-300={error}
    />
  </div>
  {#if error}
    <p class="mt-2 text-sm text-red-600">{error}</p>
  {/if}
</div>