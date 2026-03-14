<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import type { PageData, ActionData } from './$types'

  let { data }: { data: PageData } = $props()
  let { form }: { form?: ActionData } = $props()

  let loading = false
  let deleting = false
  let confirmDelete = false
  let tagsInput = data.lab.tags?.join(', ') ?? ''
</script>

<svelte:head><title>Edit {data.lab.title} — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <a href="/admin/labs" class="back">← Labs</a>
    <div class="header-row">
      <h1 class="page-title">Edit lab</h1>
      <button class="delete-btn" onclick={() => (confirmDelete = true)}>Delete</button>
    </div>
  </div>

  {#if form?.error}
    <div class="error-msg">{form.error}</div>
  {/if}

  <form
    method="POST"
    action="?/save"
    use:enhance={() => { loading = true; return async ({ update }) => { loading = false; await update() } }}
    class="lab-form"
  >
    <div class="field">
      <label class="field-label" for="title">Title *</label>
      <input id="title" name="title" type="text" class="input" value={data.lab.title} required />
    </div>
    <div class="field">
      <label class="field-label" for="description">Description *</label>
      <textarea id="description" name="description" class="input textarea" required>{data.lab.description}</textarea>
    </div>
    <div class="field-row">
      <div class="field">
        <label class="field-label" for="category">Category</label>
        <select id="category" name="category" class="input">
          {#each ['blockchain', 'web', 'cli', 'other'] as cat}
            <option value={cat} selected={data.lab.category === cat}>{cat}</option>
          {/each}
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="status">Status</label>
        <select id="status" name="status" class="input">
          <option value="wip" selected={data.lab.status === 'wip'}>In progress</option>
          <option value="done" selected={data.lab.status === 'done'}>Done</option>
          <option value="abandoned" selected={data.lab.status === 'abandoned'}>Abandoned</option>
        </select>
      </div>
      <div class="field">
        <label class="field-label" for="sort_order">Sort order</label>
        <input id="sort_order" name="sort_order" type="number" class="input" value={data.lab.sort_order} min="0" />
      </div>
    </div>
    <div class="field-row">
      <div class="field">
        <label class="field-label" for="github_url">GitHub URL</label>
        <input id="github_url" name="github_url" type="url" class="input" value={data.lab.github_url ?? ''} />
      </div>
      <div class="field">
        <label class="field-label" for="demo_url">Demo URL</label>
        <input id="demo_url" name="demo_url" type="url" class="input" value={data.lab.demo_url ?? ''} />
      </div>
    </div>
    <div class="field">
      <label class="field-label" for="tags">Tags (comma-separated)</label>
      <input id="tags" name="tags" type="text" class="input" bind:value={tagsInput} />
    </div>
    <div class="form-actions">
      <Button href="/admin/labs" variant="ghost">Cancel</Button>
      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? 'Saving...' : 'Save lab'}
      </Button>
    </div>
  </form>
</div>

{#if confirmDelete}
  <div class="modal-backdrop">
    <div class="modal">
      <h2 class="modal-title">Delete "{data.lab.title}"?</h2>
      <p class="modal-desc">This action cannot be undone.</p>
      <div class="modal-actions">
        <button class="modal-cancel" onclick={() => (confirmDelete = false)}>Cancel</button>
        <form method="POST" action="?/delete" use:enhance={() => {
          deleting = true
          return async ({ update }) => { deleting = false; await update() }
        }}>
          <button type="submit" class="modal-delete" disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  .page { max-width: 600px; }
  .page-header { margin-bottom: var(--space-6); }
  .back { font-size: 12px; color: var(--color-text-3); display: block; margin-bottom: var(--space-3); transition: color var(--duration) var(--ease); }
  .back:hover { color: var(--color-accent); }
  .header-row { display: flex; align-items: center; justify-content: space-between; }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .delete-btn { font-size: 12px; color: #e24b4a; }
  .delete-btn:hover { opacity: 0.7; }
  .lab-form { display: flex; flex-direction: column; gap: var(--space-4); }
  .field { display: flex; flex-direction: column; gap: var(--space-1); }
  .field-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-3); }
  .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-3); }
  .input { background: var(--color-bg-secondary); border: 0.5px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: 13px; font-family: var(--font-sans); color: var(--color-text); outline: none; transition: border-color var(--duration) var(--ease); width: 100%; }
  .input:focus { border-color: var(--color-accent); }
  .textarea { height: 120px; resize: vertical; line-height: 1.6; }
  .form-actions { display: flex; gap: var(--space-2); justify-content: flex-end; }
  .error-msg { background: var(--color-bg-secondary); border: 0.5px solid rgba(226,75,74,0.3); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-size: 13px; color: #e24b4a; margin-bottom: var(--space-5); }
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 999; }
  .modal { background: var(--color-surface); border: 0.5px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-8); max-width: 360px; width: 100%; }
  .modal-title { font-size: 16px; font-weight: 500; color: var(--color-text); margin-bottom: var(--space-2); }
  .modal-desc { font-size: 13px; color: var(--color-text-3); }
  .modal-actions { display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-6); }
  .modal-cancel { font-size: 13px; color: var(--color-text-2); padding: var(--space-2) var(--space-4); border: 0.5px solid var(--color-border); border-radius: var(--radius-full); }
  .modal-delete { font-size: 13px; color: #fff; background: #e24b4a; padding: var(--space-2) var(--space-4); border-radius: var(--radius-full); }
  .modal-delete:disabled { opacity: 0.6; }
</style>
