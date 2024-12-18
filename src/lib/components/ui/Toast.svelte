<script lang="ts">
  import { toasts, type Toast } from '$lib/stores/toast';
  
  const icons = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'information-circle'
  };
  
  const colors = {
    success: 'green',
    error: 'red',
    info: 'blue'
  };
</script>

<div class="fixed bottom-0 right-0 p-4 space-y-4">
  {#each $toasts as toast (toast.id)}
    <div
      class="bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3"
      role="alert"
    >
      <div class={`text-${colors[toast.type]}-500`}>
        <span class="sr-only">{toast.type}</span>
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={icons[toast.type]} />
        </svg>
      </div>
      <p class="text-sm font-medium text-gray-900">{toast.message}</p>
      <button
        type="button"
        class="text-gray-400 hover:text-gray-500"
        on:click={() => toasts.remove(toast.id)}
      >
        <span class="sr-only">Close</span>
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  {/each}
</div>