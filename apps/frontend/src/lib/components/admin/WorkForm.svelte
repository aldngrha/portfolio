<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import type { Work } from '$lib/types'

  let {
    work = {},
    action,
    loading = $bindable(false),
  }: {
    work?: Partial<Work>
    action: string
    loading?: boolean
  } = $props()

  // Tech stack + tags managed as comma-separated strings
  let techInput = work.tech_stack?.join(', ') ?? ''
  let tagsInput = work.tags?.join(', ') ?? ''

  // Image previews
  let thumbPreview: string | null = work.thumbnail_url ?? null
  let thumbFile: FileList | null = null

  function previewThumb(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) thumbPreview = URL.createObjectURL(file)
  }
</script>

<form
  method="POST"
  {action}
  enctype="multipart/form-data"
  use:enhance={() => {
    loading = true
    return async ({ update }) => {
      loading = false
      await update()
    }
  }}
  class="work-form"
>
  <div class="form-grid">
    <!-- Left: Main fields -->
    <div class="form-main">
      <div class="field">
        <label class="field-label" for="title">Title *</label>
        <input id="title" name="title" type="text" class="input" value={work.title ?? ''} required placeholder="Project name" />
      </div>

      <div class="field">
        <label class="field-label" for="tagline">Tagline *</label>
        <input id="tagline" name="tagline" type="text" class="input" value={work.tagline ?? ''} required placeholder="One-line description" />
      </div>

      <div class="field">
        <label class="field-label" for="description">Description *</label>
        <textarea id="description" name="description" class="input textarea" required placeholder="Full description (supports HTML)">{work.description ?? ''}</textarea>
      </div>

      <div class="field-row">
        <div class="field">
          <label class="field-label" for="category">Category *</label>
          <select id="category" name="category" class="input" required>
            {#each ['web_app', 'blockchain', 'mobile', 'open_source', 'other'] as cat}
              <option value={cat} selected={work.category === cat}>{cat.replace('_', ' ')}</option>
            {/each}
          </select>
        </div>
        <div class="field">
          <label class="field-label" for="status">Status *</label>
          <select id="status" name="status" class="input" required>
            {#each ['live', 'wip', 'archived'] as s}
              <option value={s} selected={work.status === s}>{s}</option>
            {/each}
          </select>
        </div>
        <div class="field">
          <label class="field-label" for="year">Year *</label>
          <input id="year" name="year" type="number" class="input" value={work.year ?? new Date().getFullYear()} required min="2000" max="2099" />
        </div>
      </div>

      <div class="field">
        <label class="field-label" for="role">Role</label>
        <input id="role" name="role" type="text" class="input" value={work.role ?? ''} placeholder="e.g. Full-stack Developer" />
      </div>

      <div class="field-row">
        <div class="field">
          <label class="field-label" for="live_url">Live URL</label>
          <input id="live_url" name="live_url" type="url" class="input" value={work.live_url ?? ''} placeholder="https://..." />
        </div>
        <div class="field">
          <label class="field-label" for="github_url">GitHub URL</label>
          <input id="github_url" name="github_url" type="url" class="input" value={work.github_url ?? ''} placeholder="https://github.com/..." />
        </div>
      </div>

      <div class="field">
        <label class="field-label" for="tech_stack">Tech stack (comma-separated)</label>
        <input id="tech_stack" name="tech_stack" type="text" class="input" bind:value={techInput} placeholder="SvelteKit, Go, PostgreSQL" />
      </div>

      <div class="field">
        <label class="field-label" for="tags">Tags (comma-separated)</label>
        <input id="tags" name="tags" type="text" class="input" bind:value={tagsInput} placeholder="web, fullstack, open-source" />
      </div>
    </div>

    <!-- Right: Sidebar fields -->
    <div class="form-sidebar">
      <div class="sidebar-card">
        <p class="card-title">Thumbnail</p>
        {#if thumbPreview}
          <img src={thumbPreview} alt="Thumbnail preview" class="thumb-preview" />
        {:else}
          <div class="thumb-placeholder">No image</div>
        {/if}
        <input
          type="file"
          name="thumbnail"
          accept="image/*"
          class="file-input"
          bind:files={thumbFile}
          onchange={previewThumb}
        />
      </div>

      <div class="sidebar-card">
        <p class="card-title">Options</p>
        <label class="checkbox-label">
          <input type="checkbox" name="featured" checked={work.featured ?? false} />
          <span>Featured project</span>
        </label>
        <div class="field" style="margin-top: var(--space-3)">
          <label class="field-label" for="sort_order">Sort order</label>
          <input id="sort_order" name="sort_order" type="number" class="input" value={work.sort_order ?? 0} min="0" />
        </div>
      </div>

      <div class="form-actions">
        <Button href="/admin/works" variant="ghost">Cancel</Button>
        <Button type="submit" variant="primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save work'}
        </Button>
      </div>
    </div>
  </div>
</form>

<style>
  .work-form { width: 100%; }

  .form-grid {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: var(--space-6);
    align-items: start;
  }

  .form-main, .form-sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .field { display: flex; flex-direction: column; gap: var(--space-1); }

  .field-row {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }

  .field-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-3);
  }

  .input {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    font-size: 13px;
    font-family: var(--font-sans);
    color: var(--color-text);
    outline: none;
    transition: border-color var(--duration) var(--ease);
    width: 100%;
  }

  .input:focus { border-color: var(--color-accent); }

  .textarea { height: 180px; resize: vertical; line-height: 1.6; }

  select.input { cursor: pointer; }

  .sidebar-card {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .card-title {
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--color-text-3);
  }

  .thumb-preview {
    width: 100%;
    aspect-ratio: 16/9;
    object-fit: cover;
    border-radius: var(--radius-md);
    border: 0.5px solid var(--color-border);
  }

  .thumb-placeholder {
    width: 100%;
    aspect-ratio: 16/9;
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-md);
    border: 0.5px dashed var(--color-border-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: var(--color-text-3);
  }

  .file-input {
    font-size: 12px;
    color: var(--color-text-2);
    width: 100%;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 13px;
    color: var(--color-text-2);
    cursor: pointer;
  }

  .form-actions {
    display: flex;
    gap: var(--space-2);
    justify-content: flex-end;
  }
</style>
