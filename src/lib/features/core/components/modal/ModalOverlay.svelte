<script lang="ts">
  import { fade } from 'svelte/transition';
  
  export let onClick: () => void;
</script>

<div
  class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
  aria-hidden="true"
  on:click|preventDefault={onClick}
  transition:fade={{ duration: 200 }}
/>