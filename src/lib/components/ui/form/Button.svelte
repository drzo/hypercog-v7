<script lang="ts">
  export let type: 'button' | 'submit' = 'button';
  export let variant: 'primary' | 'secondary' = 'primary';
  export let disabled: boolean = false;
  
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300'
  };
</script>

<button
  {type}
  {disabled}
  class="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 {variants[variant]}"
  class:opacity-50={disabled}
  on:click
>
  <slot />
</button>