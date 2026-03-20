<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte'
  import type { ActionData } from './$types'

  let { form }: { form?: ActionData } = $props()

  let loading = $state(false)
  let content = $state('')
  let tagsInput = $state('')
</script>

<svelte:head><title>New Post — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <a href="/admin/writing" class="back">← Writing</a>
    <h1 class="page-title">New post</h1>
  </div>

  {#if form?.error}
    <div class="error-msg">{form.error}</div>
  {/if}

  <form
    method="POST"
    action="?/create"
    use:enhance={() => { loading = true; return async ({ update }) => { loading = false; await update() } }}
    class="post-form"
  >
    <!-- Title + meta -->
    <div class="meta-fields">
      <div class="field field-title">
        <label class="field-label" for="title">Title *</label>
        <input id="title" name="title" type="text" class="input input-title" required placeholder="Post title" />
      </div>
      <div class="field">
        <label class="field-label" for="category">Category</label>
        <input id="category" name="category" type="text" class="input" placeholder="blockchain, frontend, devops..." />
      </div>
    </div>

    <div class="field">
      <label class="field-label" for="excerpt">Excerpt *</label>
      <textarea id="excerpt" name="excerpt" class="input textarea-sm" required placeholder="Short description shown in listing..."></textarea>
    </div>

    <!-- Editor -->
    <div class="field">
      <label class="field-label" for="content">Content *</label>
      <MarkdownEditor name="content" bind:value={content} required />
    </div>

    <!-- Tags + options + actions -->
    <div class="bottom-row">
      <div class="field" style="flex: 1">
        <label class="field-label" for="tags">Tags (comma-separated)</label>
        <input id="tags" name="tags" type="text" class="input" bind:value={tagsInput} placeholder="go, blockchain, tutorial" />
      </div>
      <label class="checkbox-label">
        <input type="checkbox" name="published" />
        <span>Publish immediately</span>
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

<style>
  .page { max-width: 100vw; }
  .page-header { margin-bottom: var(--space-6); }
  .back { font-size: 12px; color: var(--color-text-3); display: block; margin-bottom: var(--space-3); transition: color var(--duration) var(--ease); }
  .back:hover { color: var(--color-accent); }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }

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
</style>
