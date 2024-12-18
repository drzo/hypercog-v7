<script lang="ts">
  import { notifications } from '$lib/stores/notification';
  import NotificationItem from './NotificationItem.svelte';
</script>

<div class="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50">
  <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    {#each $notifications.notifications as notification (notification.id)}
      <div class="max-w-sm w-full pointer-events-auto">
        <NotificationItem {notification} />
      </div>
    {/each}
  </div>
</div>