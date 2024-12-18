<script lang="ts">
  import Button from '$lib/components/ui/form/Button.svelte';
  
  export let title: string;
  export let message: string;
  export let confirmText: string = 'Confirm';
  export let cancelText: string = 'Cancel';
  export let onConfirm: () => void;
  export let onCancel: () => void;
</script>

<div>
  <h3 class="text-lg font-medium leading-6 text-gray-900">
    {title}
  </h3>
  <div class="mt-2">
    <p class="text-sm text-gray-500">
      {message}
    </p>
  </div>
  <div class="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
    <Button
      variant="primary"
      on:click={onConfirm}
      class="w-full sm:ml-3 sm:w-auto"
    >
      {confirmText}
    </Button>
    <Button
      variant="secondary"
      on:click={onCancel}
      class="mt-3 w-full sm:mt-0 sm:w-auto"
    >
      {cancelText}
    </Button>
  </div>
</div>