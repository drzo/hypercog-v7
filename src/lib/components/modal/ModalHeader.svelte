<script lang="ts">
  export let onClose: () => void;
</script>

<div class="flex justify-between items-center pb-3">
  <div class="text-lg font-semibold">
    <slot />
  </div>
  <button
    type="button"
    class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    on:click|preventDefault={onClose}
    aria-label="Close modal"
  >
    <span class="sr-only">Close</span>
    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </button>
</div>