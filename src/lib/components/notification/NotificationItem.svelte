<script lang="ts">
  import type { Notification } from '$lib/utils/types';
  import { NOTIFICATION_VARIANTS } from '$lib/features/core/constants';
  import { notifications } from '$lib/stores/notification';
  import NotificationIcon from './NotificationIcon.svelte';
  
  export let notification: Notification;
</script>

<div class="{NOTIFICATION_VARIANTS[notification.status].bgColor} p-4 rounded-md shadow-sm">
  <div class="flex">
    <div class="flex-shrink-0">
      <NotificationIcon status={notification.status} />
    </div>
    <div class="ml-3 flex-1">
      <h3 class="text-sm font-medium text-gray-900">
        {notification.title}
      </h3>
      <div class="mt-2 text-sm text-gray-700">
        <p>{notification.message}</p>
      </div>
    </div>
    <div class="ml-4 flex-shrink-0 flex">
      <button
        type="button"
        class="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        on:click={() => notifications.remove(notification.id)}
      >
        <span class="sr-only">Close</span>
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</div>