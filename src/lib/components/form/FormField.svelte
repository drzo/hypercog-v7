<script lang="ts">
  import { validate, type ValidationRule } from '$lib/utils/validation';
  import { createEventDispatcher } from 'svelte';
  
  export let id: string;
  export let label: string;
  export let value = '';
  export let type = 'text';
  export let rules: ValidationRule[] = [];
  
  const dispatch = createEventDispatcher();
  let error: string | null = null;
  
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    error = validate(value, rules);
    dispatch('input', value);
  }
</script>

<div>
  <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
  <input
    {id}
    {type}
    {value}
    on:input={handleInput}
    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
    class:border-red-300={error}
  />
  {#if error}
    <p class="mt-2 text-sm text-red-600">{error}</p>
  {/if}
</div>