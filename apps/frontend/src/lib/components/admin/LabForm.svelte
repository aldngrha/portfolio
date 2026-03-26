<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import MarkdownEditor from '$lib/components/ui/MarkdownEditor.svelte'
  import type { Lab } from '$lib/types'
  import { compressToWebP } from '$lib/utils'

  let {
    lab = {},
    action,
    loading = $bindable(false),
  }: {
    lab?: Partial<Lab>
    action: string
    loading?: boolean
  } = $props()

  // Tech stack + tags managed as comma-separated strings
  let tagsInput = $state(lab.tags?.join(', ') ?? '')
  let descInput = $state(lab.description ?? '')

  // Multiple images preview
  let imagesPreview = $state<{url: string, isNew: boolean}[]>(lab.images?.map(img => ({url: img.url, isNew: false})) ?? [])
  let imagesFiles = $state<FileList | null>(null)

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
  class="lab-form"
>
  <div class="form-grid">
    <!-- Left: Main fields -->
    <div class="form-main">
      <div class="field">
        <label class="field-label" for="title">Title *</label>
        <input id="title" name="title" type="text" class="input" value={lab.title ?? ''} required placeholder="Experiment name" />
      </div>

      <div class="field">
        <label class="field-label" for="description">Description *</label>
        <MarkdownEditor name="description" bind:value={descInput} required placeholder="What is this experiment about?" minHeight="300px" />
      </div>
      <div class="field-row">
        <div class="field">
          <label class="field-label" for="category">Category *</label>
          <select id="category" name="category" class="input" required>
            {#each ['blockchain', 'web', 'cli', 'other'] as cat}
              <option value={cat} selected={lab.category === cat}>{cat}</option>
            {/each}
          </select>
        </div>
        <div class="field">
          <label class="field-label" for="status">Status *</label>
          <select id="status" name="status" class="input" required>
            <option value="wip" selected={lab.status === 'wip'}>In progress</option>
            <option value="done" selected={lab.status === 'done'}>Done</option>
            <option value="abandoned" selected={lab.status === 'abandoned'}>Abandoned</option>
          </select>
        </div>
        <div class="field">
          <label class="field-label" for="sort_order">Sort order</label>
          <input id="sort_order" name="sort_order" type="number" class="input" value={lab.sort_order ?? 0} min="0" />
        </div>
      </div>

      <div class="field-row">
        <div class="field">
          <label class="field-label" for="github_url">GitHub URL</label>
          <input id="github_url" name="github_url" type="url" class="input" value={lab.github_url ?? ''} placeholder="https://github.com/..." />
        </div>
        <div class="field">
          <label class="field-label" for="demo_url">Demo URL</label>
          <input id="demo_url" name="demo_url" type="url" class="input" value={lab.demo_url ?? ''} placeholder="https://..." />
        </div>
      </div>

      <div class="field">
        <label class="field-label" for="tags">Tags (comma-separated)</label>
        <input id="tags" name="tags" type="text" class="input" bind:value={tagsInput} placeholder="go, blockchain, cli" />
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

    <!-- Right: Sidebar fields (Empty for now, just actions) -->
    <div class="form-sidebar">
      <div class="sidebar-card">
        <div class="form-actions">
            <Button href="/admin/labs" variant="ghost">Cancel</Button>
            <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Save lab'}
            </Button>
        </div>
      </div>
    </div>
  </div>
</form>

<style>
  .lab-form { width: 100%; }

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

  .form-actions {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
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
