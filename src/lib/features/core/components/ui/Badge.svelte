<script lang="ts">
  export let variant: 'primary' | 'success' | 'warning' | 'error' = 'primary';
  export let size: 'sm' | 'md' | 'lg' = 'md';

  const variants = {
    primary: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base'
  };
</script>

<span class="inline-flex items-center rounded-full font-medium {variants[variant]} {sizes[size]}">
  <slot />
</span>