<script lang="ts">
  import LoadingSpinner from '../ui/LoadingSpinner.svelte';
  import { createEventDispatcher } from 'svelte';
  
  export let loading = false;
  
  const dispatch = createEventDispatcher<{
    submit: { [key: string]: string };
  }>();
  
  const handleSubmit = (event: Event) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    dispatch('submit', data);
  };
</script>

<form on:submit={handleSubmit} class="space-y-6" {...$$restProps}>
  {#if loading}
    <div class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  {/if}
  <slot />
</form>