<script lang="ts">
  export let padding = true;
</script>

<div class="mt-3 sm:mt-0 {padding ? 'p-4' : ''}">
  <slot />
</div>