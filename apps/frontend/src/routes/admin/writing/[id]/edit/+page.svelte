<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte'
  import type { PageData, ActionData } from './$types'

  let { data, form }: { data: PageData; form?: ActionData } = $props()

  let loading = $state(false)
  let deleting = $state(false)
  let confirmDelete = $state(false)

  let content = $state('')
  let tagsInput = $state('')

  $effect(() => {
    content = data.post.content
    tagsInput = data.post.tags?.join(', ') ?? ''
  })
</script>

<svelte:head><title>Edit — {data.post.title} — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <a href="/admin/writing" class="back">← Writing</a>
    <div class="header-row">
      <h1 class="page-title">Edit post</h1>
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
    class="post-form"
  >
    <div class="meta-fields">
      <div class="field field-title">
        <label class="field-label" for="title">Title *</label>
        <input id="title" name="title" type="text" class="input input-title" required value={data.post.title} />
      </div>
      <div class="field">
        <label class="field-label" for="category">Category</label>
        <input id="category" name="category" type="text" class="input" value={data.post.category} />
      </div>
    </div>

    <div class="field">
      <label class="field-label" for="excerpt">Excerpt *</label>
      <textarea id="excerpt" name="excerpt" class="input textarea-sm" required>{data.post.excerpt}</textarea>
    </div>

    <div class="field">
      <label class="field-label" for="content">Content *</label>
      <MarkdownEditor name="content" bind:value={content} required />
    </div>

    <div class="bottom-row">
      <div class="field" style="flex: 1">
        <label class="field-label" for="tags">Tags</label>
        <input id="tags" name="tags" type="text" class="input" bind:value={tagsInput} />
      </div>
      <label class="checkbox-label">
        <input type="checkbox" name="published" checked={data.post.published} />
        <span>Published</span>
      </label>
      <div class="form-actions">
        <Button href="/admin/writing" variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save post'}
        </Button>
      </div>
    </div>
  </form>
</div>

{#if confirmDelete}
  <div class="modal-backdrop">
    <div class="modal">
      <h2 class="modal-title">Delete this post?</h2>
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
  .page { max-width: 100vw; }
  .page-header { margin-bottom: var(--space-6); }
  .back { font-size: 12px; color: var(--color-text-3); display: block; margin-bottom: var(--space-3); transition: color var(--duration) var(--ease); }
  .back:hover { color: var(--color-accent); }
  .header-row { display: flex; align-items: center; justify-content: space-between; }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .delete-btn { font-size: 12px; color: #e24b4a; }
  .post-form { display: flex; flex-direction: column; gap: var(--space-4); }
  .meta-fields { display: grid; grid-template-columns: 1fr 200px; gap: var(--space-4); }
  .field { display: flex; flex-direction: column; gap: var(--space-1); }
  .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color-text-3); }
  .input { background: var(--color-bg-secondary); border: 0.5px solid var(--color-border); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); font-size: 13px; font-family: var(--font-sans); color: var(--color-text); outline: none; transition: border-color var(--duration) var(--ease); width: 100%; }
  .input:focus { border-color: var(--color-accent); }
  .input-title { font-size: 16px; }
  .textarea-sm { height: 70px; resize: vertical; line-height: 1.6; }
  .bottom-row { display: flex; align-items: flex-end; gap: var(--space-4); flex-wrap: wrap; }
  .checkbox-label { display: flex; align-items: center; gap: var(--space-2); font-size: 13px; color: var(--color-text-2); cursor: pointer; white-space: nowrap; padding-bottom: 2px; }
  .form-actions { display: flex; gap: var(--space-2); margin-left: auto; }
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
