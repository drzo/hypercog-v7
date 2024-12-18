<script lang="ts">
  import { page } from '$app/stores';
  import ErrorMessage from '$lib/components/ui/ErrorMessage.svelte';
</script>

<div class="min-h-screen pt-16 pb-12 flex flex-col bg-white">
  <main class="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex-shrink-0 flex justify-center">
      <ErrorMessage message={$page.error?.message || 'Something went wrong'} />
    </div>
  </main>
</div>