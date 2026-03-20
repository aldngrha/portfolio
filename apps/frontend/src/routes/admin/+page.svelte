<script lang="ts">
  import type { PageData } from './$types'
  let { data }: { data: PageData } = $props()
</script>

<svelte:head><title>Dashboard — Admin</title></svelte:head>

<div class="dashboard">
  <div class="dash-header">
    <h1 class="dash-title">Dashboard</h1>
    <p class="dash-sub">Welcome back, Aldi.</p>
  </div>

  <div class="stats-grid">
    <div class="stat-card">
      <p class="stat-label">Works</p>
      <p class="stat-value">{data.stats.works}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Labs</p>
      <p class="stat-value">{data.stats.labs}</p>
    </div>
    <div class="stat-card">
      <p class="stat-label">Posts</p>
      <p class="stat-value">{data.stats.posts}</p>
    </div>
    <div class="stat-card highlight">
      <p class="stat-label">Unread messages</p>
      <p class="stat-value">{data.stats.unread_messages}</p>
    </div>
  </div>

  <div class="quick-links">
    <p class="section-label">Quick actions</p>
    <div class="links-grid">
      <a href="/admin/works/new" class="quick-link">+ New work</a>
      <a href="/admin/labs/new" class="quick-link">+ New lab</a>
      <a href="/admin/writing/new" class="quick-link">+ New post</a>
      <a href="/admin/messages" class="quick-link">View messages</a>
    </div>
  </div>
</div>

<style>
  .dashboard { max-width: 100vw; }

  .dash-header { margin-bottom: var(--space-8); }
  .dash-title { font-size: 22px; font-weight: 500; color: var(--color-text); }
  .dash-sub { font-size: 13px; color: var(--color-text-3); margin-top: var(--space-1); }

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
    margin-bottom: var(--space-8);
  }

  .stat-card {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
  }

  .stat-card.highlight {
    border-color: var(--color-accent-border);
    background: var(--color-accent-soft);
  }

  .stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
    margin-bottom: var(--space-2);
  }

  .stat-value {
    font-size: 28px;
    font-weight: 500;
    color: var(--color-text);
  }

  .stat-card.highlight .stat-value { color: var(--color-accent); }

  .section-label {
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-3);
    margin-bottom: var(--space-3);
  }

  .links-grid {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
  }

  .quick-link {
    font-size: 13px;
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-full);
    border: 0.5px solid var(--color-border);
    color: var(--color-text-2);
    background: var(--color-surface);
    transition: all var(--duration) var(--ease);
  }

  .quick-link:hover {
    border-color: var(--color-accent);
    color: var(--color-accent);
  }
</style>
