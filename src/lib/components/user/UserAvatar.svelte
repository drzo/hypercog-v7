<script lang="ts">
  import type { User } from '$lib/types/auth';
  
  export let user: User;
  export let size: 'sm' | 'md' | 'lg' = 'md';
  
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };
</script>

<div class={`${sizeClasses[size]} rounded-full overflow-hidden bg-gray-200`}>
  {#if user.avatar}
    <img
      src={user.avatar}
      alt={user.name}
      class="h-full w-full object-cover"
    />
  {:else}
    <div class="h-full w-full flex items-center justify-center bg-indigo-600 text-white">
      {user.name.charAt(0).toUpperCase()}
    </div>
  {/if}
</div>