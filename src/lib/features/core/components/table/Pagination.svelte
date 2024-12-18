<script lang="ts">
  export let currentPage: number;
  export let totalPages: number;
  export let onPageChange: (page: number) => void;
  
  $: pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  function handlePrevious() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  }
  
  function handleNext() {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }
</script>

<nav class="flex items-center justify-between">
  <div class="flex-1 flex justify-between sm:hidden">
    <button
      class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      disabled={currentPage === 1}
      on:click={handlePrevious}
    >
      Previous
    </button>
    <button
      class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
      disabled={currentPage === totalPages}
      on:click={handleNext}
    >
      Next
    </button>
  </div>
  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
    <div>
      <p class="text-sm text-gray-700">
        Page <span class="font-medium">{currentPage}</span> of <span class="font-medium">{totalPages}</span>
      </p>
    </div>
    <div>
      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
        <button
          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          disabled={currentPage === 1}
          on:click={handlePrevious}
        >
          <span class="sr-only">Previous</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
        {#each pages as page}
          <button
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium hover:bg-gray-50"
            class:bg-indigo-50={page === currentPage}
            class:text-indigo-600={page === currentPage}
            class:text-gray-700={page !== currentPage}
            on:click={() => onPageChange(page)}
          >
            {page}
          </button>
        {/each}
        <button
          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          disabled={currentPage === totalPages}
          on:click={handleNext}
        >
          <span class="sr-only">Next</span>
          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  </div>
</nav>