<script lang="ts">
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  import { browser } from '$app/environment'

  let {
    value = $bindable(''),
    name = '',
    placeholder = 'Write in Markdown...',
    required = false,
    minHeight = '400px',
  }: {
    value?: string
    name?: string
    placeholder?: string
    required?: boolean
    minHeight?: string
  } = $props()

  let activeTab: 'write' | 'preview' = $state('write')
  const previewHtml = $derived.by(() => {
    if (activeTab === 'write' || !value) return ''
    const rawHtml = marked.parse(value, { async: false }) as string
    return browser ? DOMPurify.sanitize(rawHtml) : rawHtml
  })
</script>

<div class="editor-wrapper">
  <div class="editor-tabs">
    <button
      type="button"
      class="tab-btn"
      class:active={activeTab === 'write'}
      onclick={() => (activeTab = 'write')}
    >
      Write
    </button>
    <button
      type="button"
      class="tab-btn"
      class:active={activeTab === 'preview'}
      onclick={() => (activeTab = 'preview')}
    >
      Preview
    </button>
  </div>

  {#if activeTab === 'write'}
    <textarea
      {name}
      class="input editor"
      bind:value
      {placeholder}
      {required}
      style:min-height={minHeight}
    ></textarea>
  {:else}
    <div class="preview prose" style:min-height={minHeight}>
      {#if value}
        {@html previewHtml}
      {:else}
        <p style="color: var(--color-text-3); font-style: italic">Nothing to preview yet.</p>
      {/if}
    </div>
  {/if}
</div>

<style>
  .editor-wrapper {
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .editor-tabs {
    display: flex;
    border-bottom: 0.5px solid var(--color-border);
    background: var(--color-bg-secondary);
  }

  .tab-btn {
    font-size: 12px;
    padding: var(--space-2) var(--space-5);
    color: var(--color-text-3);
    border-right: 0.5px solid var(--color-border);
    transition: all var(--duration) var(--ease);
    background: transparent;
    border-top: none;
    border-bottom: none;
    border-left: none;
    cursor: pointer;
  }

  .tab-btn.active {
    color: var(--color-text);
    background: var(--color-surface);
  }

  .tab-btn:hover:not(.active) {
    color: var(--color-text-2);
  }

  .editor {
    border: none;
    border-radius: 0;
    font-family: var(--font-mono);
    font-size: 13px;
    line-height: 1.7;
    resize: vertical;
    background: var(--color-surface);
    padding: var(--space-4);
    color: var(--color-text);
    width: 100%;
    outline: none;
  }

  .editor:focus {
    border-color: transparent;
  }

  .preview {
    padding: var(--space-5);
    font-size: 14px;
    line-height: 1.8;
    color: var(--color-text-2);
    background: var(--color-surface);
    overflow-y: auto;
  }

  /* Basic Prose Styling for Preview */
  .preview :global(h1),
  .preview :global(h2),
  .preview :global(h3),
  .preview :global(h4) {
    font-family: var(--font-serif);
    color: var(--color-text);
    margin-top: var(--space-6);
    margin-bottom: var(--space-3);
  }

  .preview :global(h1) { font-size: 24px; }
  .preview :global(h2) { font-size: 20px; }
  .preview :global(h3) { font-size: 18px; }

  .preview :global(p) {
    margin-bottom: var(--space-4);
  }

  .preview :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
  }

  .preview :global(code) {
    font-family: var(--font-mono);
    font-size: 12px;
    background: var(--color-bg-secondary);
    padding: 2px 5px;
    border-radius: var(--radius-sm);
  }

  .preview :global(pre) {
    background: var(--color-bg-secondary);
    padding: var(--space-4);
    border-radius: var(--radius-md);
    overflow-x: auto;
    margin: var(--space-4) 0;
  }

  .preview :global(pre code) {
    background: transparent;
    padding: 0;
  }

  .preview :global(ul), .preview :global(ol) {
    padding-left: var(--space-6);
    margin-bottom: var(--space-4);
  }

  .preview :global(li) {
    margin-bottom: var(--space-1);
  }

  .preview :global(blockquote) {
    border-left: 3px solid var(--color-accent);
    padding-left: var(--space-4);
    margin-left: 0;
    color: var(--color-text-3);
    font-style: italic;
  }

  .preview :global(img) {
    max-width: 100%;
    border-radius: var(--radius-md);
    margin: var(--space-4) 0;
  }
</style>
