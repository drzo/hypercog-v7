<script lang="ts">
  import type { ValidationRule } from '$lib/utils/validation';
  import { createEventDispatcher } from 'svelte';
  
  export let id: string;
  export let label: string;
  export let value: string = '';
  export let rules: ValidationRule[] = [];
  
  const dispatch = createEventDispatcher<{
    change: string;
    validate: string | null;
  }>();
  
  let error: string | null = null;
  
  const validate = () => {
    for (const rule of rules) {
      const result = rule(value);
      if (result) {
        error = result;
        dispatch('validate', error);
        return;
      }
    }
    error = null;
    dispatch('validate', null);
  };
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    value = target.value;
    dispatch('change', value);
    validate();
  };
</script>

<div>
  <label for={id} class="block text-sm font-medium text-gray-700">{label}</label>
  <div class="mt-1">
    <input
      {id}
      {value}
      on:input={handleInput}
      class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
      class:border-red-300={error}
    />
  </div>
  {#if error}
    <p class="mt-2 text-sm text-red-600">{error}</p>
  {/if}
</div>