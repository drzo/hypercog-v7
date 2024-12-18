<script lang="ts">
  export let title: string | undefined = undefined;
  export let description: string | undefined = undefined;
</script>

<div class="bg-white shadow sm:rounded-lg">
  {#if title || description}
    <div class="px-4 py-5 sm:p-6">
      {#if title}
        <h3 class="text-lg font-medium leading-6 text-gray-900">{title}</h3>
      {/if}
      {#if description}
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>{description}</p>
        </div>
      {/if}
    </div>
  {/if}
  <div class="px-4 py-5 sm:p-6">
    <slot />
  </div>
</div>