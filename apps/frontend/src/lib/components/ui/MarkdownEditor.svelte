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
    background: var(--color-surface);
    overflow-y: auto;
  }
</style>
