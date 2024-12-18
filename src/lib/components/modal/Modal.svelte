<script lang="ts">
  import { modal } from '$lib/stores/modal';
  import { scale } from 'svelte/transition';
  import { createEventDispatcher } from 'svelte';
  import ModalOverlay from './ModalOverlay.svelte';

  export let closeOnEscape = true;
  export let closeOnOutsideClick = true;

  const dispatch = createEventDispatcher();

  function handleClose() {
    modal.close();
    dispatch('close');
  }

  function handleKeydown(e: { key: string }) {
    if (closeOnEscape && e.key === 'Escape' && $modal.isOpen) {
      handleClose();
    }
  }

  function handleOverlayClick() {
    if (closeOnOutsideClick) {
      handleClose();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

{#if $modal.isOpen}
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    role="dialog"
    aria-modal="true"
  >
    <div class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      <ModalOverlay onClick={handleOverlayClick} />

      <div 
        class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
        transition:scale={{ duration: 200, start: 0.95 }}
      >
        {#if $modal.component}
          <svelte:component this={$modal.component} {...($modal.props || {})} />
        {:else}
          <slot name="header" />
          <slot />
        {/if}
      </div>
    </div>
  </div>
{/if}