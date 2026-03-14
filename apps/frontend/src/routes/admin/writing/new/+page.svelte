<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import type { ActionData } from './$types'

  let { form }: { form?: ActionData } = $props()

  let loading = false
  let content = ''
  let activeTab: 'write' | 'preview' = 'write'
  let tagsInput = ''
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
    <div class="editor-wrapper">
      <div class="editor-tabs">
        <button
          type="button"
          class="tab-btn"
          class:active={activeTab === 'write'}
          onclick={() => (activeTab = 'write')}
        >Write</button>
        <button
          type="button"
          class="tab-btn"
          class:active={activeTab === 'preview'}
          onclick={() => (activeTab = 'preview')}
        >Preview</button>
      </div>

      {#if activeTab === 'write'}
        <textarea
          name="content"
          class="input editor"
          bind:value={content}
          placeholder="Write your post in Markdown..."
          required
        ></textarea>
      {:else}
        <div class="preview prose">
          {#if content}
            {@html content}
          {:else}
            <p style="color: var(--color-text-3); font-style: italic">Nothing to preview yet.</p>
          {/if}
        </div>
      {/if}
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
  .page { max-width: 800px; }
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

  .editor-wrapper { border: 0.5px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; }

  .editor-tabs { display: flex; border-bottom: 0.5px solid var(--color-border); background: var(--color-bg-secondary); }

  .tab-btn { font-size: 12px; padding: var(--space-2) var(--space-5); color: var(--color-text-3); border-right: 0.5px solid var(--color-border); transition: all var(--duration) var(--ease); }
  .tab-btn.active { color: var(--color-text); background: var(--color-surface); }
  .tab-btn:hover:not(.active) { color: var(--color-text-2); }

  .editor { border: none; border-radius: 0; min-height: 400px; font-family: var(--font-mono); font-size: 13px; line-height: 1.7; resize: vertical; background: var(--color-surface); }
  .editor:focus { border-color: transparent; }

  .preview { padding: var(--space-5); min-height: 400px; font-size: 14px; line-height: 1.8; color: var(--color-text-2); background: var(--color-surface); }
  .preview :global(h2) { font-family: var(--font-serif); font-size: 20px; color: var(--color-text); margin: var(--space-6) 0 var(--space-3); }
  .preview :global(p) { margin-bottom: var(--space-4); }
  .preview :global(code) { font-family: var(--font-mono); font-size: 12px; background: var(--color-bg-secondary); padding: 2px 5px; border-radius: var(--radius-sm); }
  .preview :global(pre) { background: var(--color-bg-secondary); padding: var(--space-4); border-radius: var(--radius-md); overflow-x: auto; margin: var(--space-4) 0; }

  .bottom-row { display: flex; align-items: flex-end; gap: var(--space-4); flex-wrap: wrap; }

  .checkbox-label { display: flex; align-items: center; gap: var(--space-2); font-size: 13px; color: var(--color-text-2); cursor: pointer; white-space: nowrap; padding-bottom: 2px; }

  .form-actions { display: flex; gap: var(--space-2); margin-left: auto; }
  .error-msg { background: var(--color-bg-secondary); border: 0.5px solid rgba(226,75,74,0.3); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-size: 13px; color: #e24b4a; margin-bottom: var(--space-5); }
</style>
