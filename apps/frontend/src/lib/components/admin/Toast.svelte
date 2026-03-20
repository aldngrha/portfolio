<script lang="ts">
  import { onMount } from 'svelte'

  let {
    message = '',
    type = 'success',
    show = $bindable(false)
  } = $props()

  onMount(() => {
    if (show) {
      const timer = setTimeout(() => {
        show = false
      }, 3000)
      return () => clearTimeout(timer)
    }
  })

  $effect(() => {
    if (show) {
      const timer = setTimeout(() => {
        show = false
      }, 3000)
      return () => clearTimeout(timer)
    }
  })
</script>

{#if show}
  <div class="toast" class:success={type === 'success'} class:error={type === 'error'}>
    {message}
  </div>
{/if}

<style>
  .toast {
    position: fixed;
    bottom: var(--space-8);
    right: var(--space-8);
    padding: var(--space-3) var(--space-5);
    border-radius: var(--radius-full);
    font-size: 13px;
    font-weight: 500;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 9999;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .success {
    background-color: #2ea043;
    border: 1px solid #3fb950;
  }

  .error {
    background-color: #da3633;
    border: 1px solid #f85149;
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
