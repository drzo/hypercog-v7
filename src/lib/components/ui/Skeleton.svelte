<script lang="ts">
  export let width: string = '100%';
  export let height: string = '1rem';
  export let rounded: boolean = false;
</script>

<div
  class="animate-pulse bg-gray-200"
  class:rounded-full={rounded}
  class:rounded-md={!rounded}
  style="width: {width}; height: {height};"
/>