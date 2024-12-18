<script lang="ts">
  import { appConfig } from '$lib/config/app';
</script>

<div class="lg:text-center">
  <h2 class="text-base text-indigo-600 font-semibold tracking-wide uppercase">Welcome</h2>
  <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
    Get Started with {appConfig.name}
  </p>
  <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
    {appConfig.description}
  </p>
</div>