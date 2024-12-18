<script lang="ts">
  export let text: string;
  export let position: 'top' | 'right' | 'bottom' | 'left' = 'top';
  
  let visible = false;
  
  const positions = {
    top: '-translate-x-1/2 -translate-y-full left-1/2 bottom-[calc(100%+0.5rem)]',
    right: 'translate-y-1/2 left-[calc(100%+0.5rem)] top-1/2',
    bottom: '-translate-x-1/2 translate-y-full left-1/2 top-[calc(100%+0.5rem)]',
    left: 'translate-y-1/2 right-[calc(100%+0.5rem)] top-1/2'
  };
</script>

<div class="relative inline-block">
  <div
    on:mouseenter={() => visible = true}
    on:mouseleave={() => visible = false}
  >
    <slot />
  </div>
  
  {#if visible}
    <div class="absolute z-10 {positions[position]}">
      <div class="bg-gray-900 text-white text-sm rounded py-1 px-2 max-w-xs">
        {text}
      </div>
    </div>
  {/if}
</div>