<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import type { PageData, ActionData } from './$types'

  let { data, form }: { data: PageData, form?: ActionData } = $props()

  let uploadingAvatar = $state(false)
  let uploadingResume = $state(false)

  // Preview state
  let avatarPreview = $state<string | null>(null)
  const currentAvatar = $derived(avatarPreview ?? data.settings?.avatarUrl ?? null)

  function handleAvatarSelect(e: Event) {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      avatarPreview = URL.createObjectURL(file)
    }
  }
</script>

<svelte:head><title>Settings — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <h1 class="page-title">Settings</h1>
    <p class="page-sub">Manage profile assets and configuration</p>
  </div>

  {#if form?.error}
    <div class="error-msg">{form.error}</div>
  {/if}

  {#if form?.success}
    <div class="success-msg">
      {form.type === 'avatar' ? 'Avatar uploaded successfully!' : 'Resume uploaded successfully!'}
      <br>
      <a href={form.url} target="_blank" class="success-link">{form.url}</a>
    </div>
  {/if}

  <div class="settings-grid">
    <!-- Avatar Settings -->
    <section class="settings-card">
      <div class="card-header">
        <h2 class="card-title">Profile Avatar</h2>
        <p class="card-desc">Upload a new image to use as your profile picture.</p>
      </div>

      <form
        method="POST"
        action="?/uploadAvatar"
        enctype="multipart/form-data"
        use:enhance={() => {
          uploadingAvatar = true
          return async ({ update }) => {
            uploadingAvatar = false
            avatarPreview = null // Reset custom preview so it uses the new load state
            await update()
          }
        }}
        class="upload-form"
      >
        <div class="avatar-preview-area">
          <div class="avatar-circle">
            {#if currentAvatar}
              <img src={currentAvatar} alt="Preview" class="avatar-img" />
            {:else}
              <span class="avatar-placeholder">No Image</span>
            {/if}
          </div>
          <div class="upload-controls">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              class="file-input"
              required
              onchange={handleAvatarSelect}
            />
            <Button type="submit" variant="primary" disabled={uploadingAvatar}>
              {uploadingAvatar ? 'Uploading...' : 'Upload Avatar'}
            </Button>
          </div>
        </div>
      </form>
    </section>

    <!-- Resume Settings -->
    <section class="settings-card">
      <div class="card-header">
        <h2 class="card-title">Resume / CV</h2>
        <p class="card-desc">Upload your latest PDF resume.</p>
      </div>

      <form
        method="POST"
        action="?/uploadResume"
        enctype="multipart/form-data"
        use:enhance={() => {
          uploadingResume = true
          return async ({ update }) => {
            uploadingResume = false
            await update()
          }
        }}
        class="upload-form"
      >
        <div class="resume-upload-area">
          <div class="upload-controls">
            <input
              type="file"
              name="resume"
              accept="application/pdf"
              class="file-input"
              required
            />
            <Button type="submit" variant="primary" disabled={uploadingResume}>
              {uploadingResume ? 'Uploading...' : 'Upload Resume'}
            </Button>
          </div>
          <p class="help-text">Only PDF files are allowed.</p>
        </div>
      </form>
    </section>
  </div>
</div>

<style>
  .page { max-width: 800px; }
  .page-header { margin-bottom: var(--space-8); }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .page-sub { font-size: 13px; color: var(--color-text-3); margin-top: 2px; }

  .error-msg {
    background: var(--color-bg-secondary);
    border: 0.5px solid rgba(226,75,74,0.3);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    font-size: 13px;
    color: #e24b4a;
    margin-bottom: var(--space-6);
  }

  .success-msg {
    background: var(--color-bg-secondary);
    border: 0.5px solid rgba(46, 160, 67, 0.3);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    font-size: 13px;
    color: #2ea043;
    margin-bottom: var(--space-6);
  }

  .success-link {
    display: block;
    margin-top: var(--space-1);
    color: var(--color-accent);
    text-decoration: underline;
    font-size: 11px;
    word-break: break-all;
  }

  .settings-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
  }

  .settings-card {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
  }

  .card-header {
    margin-bottom: var(--space-6);
    padding-bottom: var(--space-4);
    border-bottom: 0.5px solid var(--color-border);
  }

  .card-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
  }

  .card-desc {
    font-size: 13px;
    color: var(--color-text-3);
    margin-top: 2px;
  }

  .upload-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .avatar-preview-area {
    display: flex;
    align-items: center;
    gap: var(--space-6);
  }

  .avatar-circle {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: var(--color-bg-tertiary);
    border: 0.5px dashed var(--color-border-hover);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    flex-shrink: 0;
  }

  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-placeholder {
    font-size: 11px;
    color: var(--color-text-3);
  }

  .upload-controls {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    align-items: flex-start;
  }

  .file-input {
    font-size: 13px;
    color: var(--color-text-2);
    font-family: var(--font-sans);
  }

  .file-input::file-selector-button {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-md);
    border: 0.5px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-text);
    cursor: pointer;
    margin-right: var(--space-3);
    font-family: inherit;
    font-size: 12px;
    transition: background var(--duration) var(--ease);
  }

  .file-input::file-selector-button:hover {
    background: var(--color-bg-tertiary);
  }

  .resume-upload-area {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .help-text {
    font-size: 11px;
    color: var(--color-text-3);
  }
</style>
