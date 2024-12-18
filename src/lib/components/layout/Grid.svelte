<script lang="ts">
  export let cols: number = 1;
  export let gap: 'sm' | 'md' | 'lg' = 'md';

  const gaps = {
    sm: 'gap-4',
    md: 'gap-6',
    lg: 'gap-8'
  };

  const columns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
  };
</script>

<div class="grid {columns[cols]} {gaps[gap]}">
  <slot />
</div>