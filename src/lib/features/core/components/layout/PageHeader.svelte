<script lang="ts">
  export let title: string;
  export let description: string | undefined = undefined;
</script>

<div class="md:flex md:items-center md:justify-between">
  <div class="min-w-0 flex-1">
    <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
      {title}
    </h2>
    {#if description}
      <p class="mt-1 text-sm text-gray-500">
        {description}
      </p>
    {/if}
  </div>
  <div class="mt-4 flex md:ml-4 md:mt-0">
    <slot name="actions" />
  </div>
</div>