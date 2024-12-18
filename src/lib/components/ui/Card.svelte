<script lang="ts">
  export let title: string = '';
  export let className: string = '';
</script>

<div class="bg-white overflow-hidden shadow rounded-lg {className}">
  <div class="px-4 py-5 sm:p-6">
    {#if title}
      <h3 class="text-lg leading-6 font-medium text-gray-900">{title}</h3>
    {/if}
    <div class="mt-2">
      <slot />
    </div>
  </div>
</div>