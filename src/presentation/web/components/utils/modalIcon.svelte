<script lang="ts">
    export let typeIcon: 'loading' | 'error' | 'warning' | 'information' | 'success' | 'confirmation' = 'information';


    const icons = {
        error: `
            <div class="rounded-full bg-red-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-red-500 icon-shake" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
        `,
        success: `
            <div class="rounded-full bg-green-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-green-500 icon-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
        `,
        warning: `
            <div class="rounded-full bg-yellow-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-yellow-500 icon-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
        `,
        information: `
            <div class="rounded-full bg-picton-blue-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-picton-blue-500 icon-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
        `,
        confirmation: `
            <div class="rounded-full bg-purple-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-500 icon-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
        `,
        loading: `
            <div class="rounded-full bg-indigo-100 p-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-indigo-500 icon-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
        `,
    };

</script>

<div class="flex items-center justify-center mb-4">
    {@html icons[typeIcon]}
</div>