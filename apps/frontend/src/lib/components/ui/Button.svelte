<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'secondary',
    size = 'md',
    href = undefined,
    disabled = false,
    type = 'button',
    children,
    onclick,
    ...rest
  }: {
    variant?: 'primary' | 'secondary' | 'ghost'
    size?: 'sm' | 'md'
    href?: string
    disabled?: boolean
    type?: 'button' | 'submit' | 'reset'
    children?: Snippet
    onclick?: () => void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  } = $props()
</script>

{#if href}
  <a {href} class="btn btn--{variant} btn--{size}" {...rest}>
    {@render children?.()}
  </a>
{:else}
  <button {type} {disabled} {onclick} class="btn btn--{variant} btn--{size}" {...rest}>
    {@render children?.()}
  </button>
{/if}

<style>
  .btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-sans);
    font-weight: 500;
    border-radius: var(--radius-full);
    transition: all var(--duration) var(--ease);
    white-space: nowrap;
    text-decoration: none;
    border: 0.5px solid transparent;
  }

  .btn:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  /* Sizes */
  .btn--sm {
    font-size: 13px;
    padding: 5px 14px;
  }

  .btn--md {
    font-size: 14px;
    padding: 8px 20px;
  }

  /* Variants */
  .btn--primary {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }

  .btn--primary:hover {
    background: var(--color-accent-hover);
    border-color: var(--color-accent-hover);
  }

  .btn--secondary {
    background: var(--color-bg-secondary);
    color: var(--color-text);
    border-color: var(--color-border);
  }

  .btn--secondary:hover {
    border-color: var(--color-border-hover);
  }

  .btn--ghost {
    background: transparent;
    color: var(--color-text-2);
    border-color: transparent;
  }

  .btn--ghost:hover {
    background: var(--color-bg-secondary);
    color: var(--color-text);
  }
</style>
