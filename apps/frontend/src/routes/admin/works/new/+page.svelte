<script lang="ts">
  import WorkForm from '$lib/components/admin/WorkForm.svelte'
  import type { ActionData } from './$types'
  let { form }: { form?: ActionData } = $props()
  let loading = false
</script>

<svelte:head><title>New Work — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <a href="/admin/works" class="back">← Works</a>
    <h1 class="page-title">New work</h1>
  </div>

  {#if form?.error}
    <div class="error-msg">{form.error}</div>
  {/if}

  <WorkForm action="?/default" bind:loading />
</div>

<style>
  .page { max-width: 900px; }
  .page-header { margin-bottom: var(--space-6); }
  .back { font-size: 12px; color: var(--color-text-3); display: block; margin-bottom: var(--space-3); transition: color var(--duration) var(--ease); }
  .back:hover { color: var(--color-accent); }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .error-msg { background: var(--color-bg-secondary); border: 0.5px solid rgba(226,75,74,0.3); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-size: 13px; color: #e24b4a; margin-bottom: var(--space-5); }
</style>
