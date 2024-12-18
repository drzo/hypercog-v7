<script lang="ts">
  import type { ValidationRule } from '$lib/features/core/utils/validation/types';
  import { validate } from '$lib/features/core/utils/validation';
  import { createEventDispatcher } from 'svelte';
  
  export let id: string;
  export let label: string;
  export let value = '';
  export let type = 'text';
  export let rules: ValidationRule[] = [];
  export let options: { value: string; label: string }[] = [];
  
  const dispatch = createEventDispatcher<{
    change: string;
    validate: string | null;
  }>();
  
  let error: string | null = null;
  
  const validateField = () => {
    const result = validate(value, rules);
    error = result.errors[0] || null;
    dispatch('validate', error);
  };
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    value = target.type === 'checkbox' ? target.checked : target.value;
    dispatch('change', value);
    validateField();
  };
</script>

<div>
  <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
  <div class="mt-1">
    {#if type === 'select'}
      <select
        {id}
        bind:value
        on:change={handleInput}
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        class:border-red-300={error}
      >
        {#each options as option}
          <option value={option.value}>{option.label}</option>
        {/each}
      </select>
    {:else if type === 'checkbox'}
      <input
        {id}
        type="checkbox"
        on:change={handleInput}
        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
    {:else}
      <input
        {id}
        {type}
        {value}
        on:input={handleInput}
        class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        class:border-red-300={error}
      />
    {/if}
  </div>
  {#if error}
    <p class="mt-2 text-sm text-red-600">{error}</p>
  {/if}
</div>