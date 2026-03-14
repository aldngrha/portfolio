<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import type { ActionData } from './$types'
  import type { Lab } from '$lib/types'

  let { form }: { form?: ActionData } = $props()

  let loading = false
  let tagsInput = ''
</script>

<svelte:head><title>New Lab — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <a href="/admin/labs" class="back">← Labs</a>
    <h1 class="page-title">New lab</h1>
  </div>

  {#if form?.error}
    <div class="error-msg">{form.error}</div>
  {/if}

  <form method="POST" use:enhance={() => { loading = true; return async ({ update }) => { loading = false; await update() } }} class="lab-form">
    <div class="field">
      <label class="field-label" for="title">Title *</label>
      <input id="title" name="title" type="text" class="input" required placeholder="Experiment name" />
    </div>
    <div class="field">
      <label class="field-label" for="description">Description *</label>
      <textarea id="description" name="description" class="input textarea" required placeholder="What is this experiment about?"></textarea>
    </div>
    <div class="field-row">
      <div class="field">
        <label class="field-label" for="category">Category</label>
        <select id="category" name="category" class="input">
          {#each ['blockchain', 'web', 'cli', 'other'] as cat}
            <option value={cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="status">Status</label>
        <select id="status" name="status" class="input">
          <option value="wip">In progress</option>
          <option value="done">Done</option>
          <option value="abandoned">Abandoned</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="sort_order">Sort order</label>
        <input id="sort_order" name="sort_order" type="number" class="input" value="0" min="0" />
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label class="field-label" for="github_url">GitHub URL</label>
        <input id="github_url" name="github_url" type="url" class="input" placeholder="https://github.com/..." />
      </div>
      <div class="field">
        <label class="field-label" for="demo_url">Demo URL</label>
        <input id="demo_url" name="demo_url" type="url" class="input" placeholder="https://..." />
      </div>
    </div>
    <div class="field">
      <label class="field-label" for="tags">Tags (comma-separated)</label>
      <input id="tags" name="tags" type="text" class="input" bind:value={tagsInput} placeholder="go, blockchain, cli" />
    </div>
    <div class="form-actions">
      <Button href="/admin/labs" variant="ghost">Cancel</Button>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Saving...' : 'Save lab'}
      </Button>
    </div>
  </form>
</div>

<style>
  .page { max-width: 600px; }
  .page-header { margin-bottom: var(--space-6); }
  .back { font-size: 12px; color: var(--color-text-3); display: block; margin-bottom: var(--space-3); transition: color var(--duration) var(--ease); }
  .back:hover { color: var(--color-accent); }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .lab-form { display: flex; flex-direction: column; gap: var(--space-4); }
  .field { display: flex; flex-direction: column; gap: var(--space-1); }
  .field-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
  .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-3); }
  .input { background: var(--color-bg-secondary); border: 0.5px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: 13px; font-family: var(--font-sans); color: var(--color-text); outline: none; transition: border-color var(--duration) var(--ease); width: 100%; }
  .input:focus { border-color: var(--color-accent); }
  .textarea { height: 120px; resize: vertical; line-height: 1.6; }
  .form-actions { display: flex; gap: var(--space-2); justify-content: flex-end; margin-top: var(--space-2); }
  .error-msg { background: var(--color-bg-secondary); border: 0.5px solid rgba(226,75,74,0.3); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-size: 13px; color: #e24b4a; margin-bottom: var(--space-5); }
</style>
