<script lang="ts">
  import { auth } from '$lib/stores/auth';
  import UserAvatar from './UserAvatar.svelte';
  import Button from '$lib/components/ui/form/Button.svelte';
  
  const handleLogout = () => {
    auth.logout();
  };
</script>

{#if $auth.user}
  <div class="flex items-center space-x-4">
    <UserAvatar user={$auth.user} />
    <div>
      <p class="text-sm font-medium text-gray-700">{$auth.user.name}</p>
      <Button variant="secondary" on:click={handleLogout}>
        Logout
      </Button>
    </div>
  </div>
{/if}