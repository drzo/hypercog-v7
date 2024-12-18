<script lang="ts">
  import { page } from '$app/stores';
  import { mainNavItems } from '$lib/config/navigation';
  import { appConfig } from '$lib/config/app';
  import { isActiveRoute } from '$lib/utils/navigation';
</script>

<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex">
        <div class="flex-shrink-0 flex items-center">
          <a href="/" class="text-xl font-bold text-gray-800">{appConfig.name}</a>
        </div>
        <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
          {#each mainNavItems as {href, label, exact}}
            <a 
              {href}
              class="inline-flex items-center px-1 pt-1 text-sm font-medium"
              class:text-gray-900={isActiveRoute($page.url.pathname, href, exact)}
              class:text-gray-500={!isActiveRoute($page.url.pathname, href, exact)}
              class:hover:text-gray-900={true}
            >
              {label}
            </a>
          {/each}
        </div>
      </div>
    </div>
  </div>
</nav>