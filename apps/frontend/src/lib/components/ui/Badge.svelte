<script lang="ts">
  import type { Snippet } from 'svelte'

  let {
    variant = 'default',
    children,
  }: {
    variant?: 'default' | 'blue' | 'green' | 'amber'
    children?: Snippet
  } = $props()
</script>

<span class="badge badge--{variant}">
  {@render children?.()}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: var(--radius-full);
    white-space: nowrap;
    border: 0.5px solid;
  }

  .badge--default {
    color: var(--color-text-3);
    background: var(--color-bg-secondary);
    border-color: var(--color-border);
  }

  .badge--blue {
    color: var(--color-accent-hover);
    background: var(--color-accent-soft);
    border-color: var(--color-accent-border);
  }

  .badge--green {
    color: var(--color-green);
    background: var(--color-green-soft);
    border-color: rgba(29, 158, 117, 0.3);
  }

  .badge--amber {
    color: var(--color-amber);
    background: var(--color-amber-soft);
    border-color: rgba(186, 117, 23, 0.3);
  }
</style>
