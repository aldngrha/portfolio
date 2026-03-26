<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte'
  import type { Work } from '$lib/types'
  import { compressToWebP } from '$lib/utils'

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
  let techInput = $state(work.tech_stack?.join(', ') ?? '')
  let tagsInput = $state(work.tags?.join(', ') ?? '')
  let descInput = $state(work.description ?? '')

  // Image previews
  let thumbPreview = $state<string | null>(work.thumbnail_url ?? null)
  let thumbFile = $state<FileList | null>(null)

  // Multiple images preview
  let imagesPreview = $state<{url: string, isNew: boolean}[]>(work.images?.map(img => ({url: img.url, isNew: false})) ?? [])
  let imagesFiles = $state<FileList | null>(null)

  function previewThumb(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) thumbPreview = URL.createObjectURL(file)
  }

  function previewImages(e: Event) {
    const files = (e.target as HTMLInputElement).files
    if (files) {
      // Keep existing images and append new previews
      const newPreviews = Array.from(files).map(file => ({
        url: URL.createObjectURL(file),
        isNew: true
      }))
      imagesPreview = [...imagesPreview, ...newPreviews]
    }
  }

  // Hidden input for existing images to keep
  let existingImages = $derived(imagesPreview.filter(img => !img.isNew).map(img => img.url))

  function removeImage(index: number) {
    imagesPreview = imagesPreview.filter((_, i) => i !== index)
  }
</script>

<form
  method="POST"
  {action}
  enctype="multipart/form-data"
  use:enhance={async ({ formData }) => {
    loading = true

    // Compress thumbnail
    const thumbnail = formData.get('file') as File
    if (thumbnail && thumbnail.size > 0 && thumbnail.type.startsWith('image/')) {
      try {
        const compressed = await compressToWebP(thumbnail, { maxSizeMB: 2 })
        formData.set('file', compressed)
      } catch (err) {
        console.error('Error compressing thumbnail:', err)
      }
    }

    // Compress gallery images
    const images = formData.getAll('images') as File[]
    if (images.length > 0) {
      formData.delete('images')
      for (const image of images) {
        if (image && image.size > 0 && image.type.startsWith('image/')) {
          try {
            const compressed = await compressToWebP(image, { maxSizeMB: 2 })
            formData.append('images', compressed)
          } catch (err) {
            console.error('Error compressing gallery image:', err)
            formData.append('images', image) // fallback to original
          }
        }
      }
    }

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
        <MarkdownEditor name="description" bind:value={descInput} required placeholder="Full description in Markdown" minHeight="300px" />
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

      <div class="field">
        <label class="field-label">Gallery Images</label>
        <div class="images-grid">
          {#each imagesPreview as img, i}
            <div class="image-preview-wrapper">
              <img src={img.url} alt="Gallery preview" class="gallery-preview" />
              <button type="button" class="remove-img-btn" onclick={() => removeImage(i)}>×</button>
            </div>
          {/each}
          <label class="add-image-card">
            <span class="add-image-icon">+</span>
            <input type="file" name="images" multiple accept="image/*" class="hidden-input" bind:files={imagesFiles} onchange={previewImages} />
          </label>
        </div>
        <!-- Hidden inputs for existing images -->
        {#each existingImages as imgUrl}
          <input type="hidden" name="existing_images" value={imgUrl} />
        {/each}
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
          name="file"  accept="image/*"
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

  .images-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: var(--space-3);
    margin-top: var(--space-2);
  }

  .image-preview-wrapper {
    position: relative;
    aspect-ratio: 1;
    border-radius: var(--radius-md);
    overflow: hidden;
    border: 0.5px solid var(--color-border);
  }

  .gallery-preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .remove-img-btn {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0,0,0,0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 14px;
    padding-bottom: 2px;
  }

  .remove-img-btn:hover {
    background: rgba(226,75,74,0.9);
  }

  .add-image-card {
    aspect-ratio: 1;
    background: var(--color-bg-tertiary);
    border: 0.5px dashed var(--color-border-hover);
    border-radius: var(--radius-md);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background var(--duration) var(--ease);
  }

  .add-image-card:hover {
    background: var(--color-bg-secondary);
  }

  .add-image-icon {
    font-size: 24px;
    color: var(--color-text-3);
  }

  .hidden-input {
    display: none;
  }
</style>
