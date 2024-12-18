<script lang="ts">
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };
</script>

<div class="flex justify-center">
  <div class={`animate-spin rounded-full border-t-2 border-b-2 border-indigo-600 ${sizeClasses[size]}`}></div>
</div>