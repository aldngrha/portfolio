<script lang="ts">
  import { enhance } from '$app/forms'
  import WorkForm from '$lib/components/admin/WorkForm.svelte'
  import type { PageData, ActionData } from './$types'

  let { data, form }: { data: PageData; form?: ActionData } = $props()
  let loading = $state(false)
  let deleting = $state(false)
  let confirmDelete = $state(false)
</script>

<svelte:head><title>Edit {data.work.title} — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <a href="/admin/works" class="back">← Works</a>
    <div class="header-row">
      <h1 class="page-title">Edit work</h1>
      <button class="delete-btn" onclick={() => (confirmDelete = true)}>Delete</button>
    </div>
  </div>

  {#if form?.error}
    <div class="error-msg">{form.error}</div>
  {/if}

  <WorkForm work={data.work} action="?/save" bind:loading />
</div>

<!-- Delete confirm modal -->
{#if confirmDelete}
  <div class="modal-backdrop">
    <div class="modal">
      <h2 class="modal-title">Delete "{data.work.title}"?</h2>
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
  .delete-btn { font-size: 12px; color: #e24b4a; transition: opacity var(--duration) var(--ease); }
  .delete-btn:hover { opacity: 0.7; }
  .error-msg { background: var(--color-bg-secondary); border: 0.5px solid rgba(226,75,74,0.3); border-radius: var(--radius-md); padding: var(--space-3) var(--space-4); font-size: 13px; color: #e24b4a; margin-bottom: var(--space-5); }

  /* Modal */
  .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 999; }
  .modal { background: var(--color-surface); border: 0.5px solid var(--color-border); border-radius: var(--radius-xl); padding: var(--space-8); max-width: 360px; width: 100%; }
  .modal-title { font-size: 16px; font-weight: 500; color: var(--color-text); margin-bottom: var(--space-2); }
  .modal-desc { font-size: 13px; color: var(--color-text-3); }
  .modal-actions { display: flex; gap: var(--space-3); justify-content: flex-end; margin-top: var(--space-6); }
  .modal-cancel { font-size: 13px; color: var(--color-text-2); padding: var(--space-2) var(--space-4); border: 0.5px solid var(--color-border); border-radius: var(--radius-full); }
  .modal-delete { font-size: 13px; color: #fff; background: #e24b4a; padding: var(--space-2) var(--space-4); border-radius: var(--radius-full); }
  .modal-delete:disabled { opacity: 0.6; }
</style>
