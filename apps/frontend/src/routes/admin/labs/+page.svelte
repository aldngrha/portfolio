<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<svelte:head><title>Labs — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <div>
      <h1 class="page-title">Labs</h1>
      <p class="page-sub">{data.total} experiment{data.total !== 1 ? 's' : ''}</p>
    </div>
    <a href="/admin/labs/new" class="btn-primary">+ New lab</a>
  </div>

  {#if data.labs.length === 0}
    <div class="empty">
      <p>No labs yet.</p>
      <a href="/admin/labs/new" class="empty-link">Create your first experiment →</a>
    </div>
  {:else}
    <table class="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Status</th>
          <th>Tags</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each data.labs as lab}
          <tr>
            <td>
              <div class="cell-title">{lab.title}</div>
              <div class="cell-sub">{lab.slug}</div>
            </td>
            <td><Badge variant="blue">{lab.category}</Badge></td>
            <td>
              <Badge variant={lab.status === 'done' ? 'green' : 'amber'}>
                {lab.status === 'done' ? 'Done' : 'In progress'}
              </Badge>
            </td>
            <td class="cell-muted">{lab.tags.slice(0, 2).join(', ')}</td>
            <td class="cell-actions">
              <a href="/admin/labs/{lab.id}/edit" class="action-link">Edit</a>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}
</div>

<style>
  .page { max-width: 100vw; }
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-6); }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .page-sub { font-size: 12px; color: var(--color-text-3); margin-top: 2px; }
  .btn-primary { font-size: 13px; padding: var(--space-2) var(--space-5); background: var(--color-accent); color: #fff; border-radius: var(--radius-full); transition: background var(--duration) var(--ease); }
  .btn-primary:hover { background: var(--color-accent-hover); }
  .empty { text-align: center; padding: var(--space-16) 0; display: flex; flex-direction: column; align-items: center; gap: var(--space-3); }
  .empty p { font-size: 14px; color: var(--color-text-3); }
  .empty-link { font-size: 13px; color: var(--color-accent); }
  .table { width: 100%; border-collapse: collapse; font-size: 13px; }
  .table th { text-align: left; font-size: 11px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-3); padding: var(--space-3) var(--space-4); border-bottom: 0.5px solid var(--color-border); }
  .table td { padding: var(--space-3) var(--space-4); border-bottom: 0.5px solid var(--color-border); color: var(--color-text); vertical-align: middle; }
  .table tr:last-child td { border-bottom: none; }
  .table tr:hover td { background: var(--color-bg-secondary); }
  .cell-title { font-weight: 500; }
  .cell-sub { font-size: 11px; color: var(--color-text-3); margin-top: 2px; }
  .cell-muted { color: var(--color-text-3); }
  .cell-actions { display: flex; gap: var(--space-3); justify-content: flex-end; }
  .action-link { font-size: 12px; color: var(--color-accent); }
  .action-link:hover { opacity: 0.7; }
</style>
