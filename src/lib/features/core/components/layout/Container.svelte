<script lang="ts">
  export let maxWidth: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' = 'lg';
  export let padding: boolean = true;

  const maxWidths = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    'full': 'max-w-full'
  };
</script>

<div class="mx-auto {maxWidths[maxWidth]} {padding ? 'px-4 sm:px-6 lg:px-8' : ''}">
  <slot />
</div>