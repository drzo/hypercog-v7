<script>
  import { APP_CONFIG } from '$lib/utils/core';
</script>

<svelte:head>
  <title>{APP_CONFIG.name}</title>
  <meta name="description" content={APP_CONFIG.description} />
</svelte:head>

<div class="py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center">
      <h1 class="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
        {APP_CONFIG.name}
      </h1>
      <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
        {APP_CONFIG.description}
      </p>
    </div>
  </div>
</div>