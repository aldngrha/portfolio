<script lang="ts">
  import { goto } from '$app/navigation'
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const filters = [
    { label: 'All',        value: 'all' },
    { label: 'Blockchain', value: 'blockchain' },
    { label: 'Web',        value: 'web' },
    { label: 'CLI',        value: 'cli' },
    { label: 'Other',      value: 'other' },
  ]

  function setFilter(value: string) {
    if (value === 'all') goto('/labs')
    else goto(`/labs?category=${value}`)
  }
</script>

<svelte:head>
  <title>Labs — Aldi Nugraha</title>
  <meta name="description" content="Side projects, experiments, and things I built just to see if I could." />
</svelte:head>

<section class="hero">
  <div class="container">
    <h1 class="page-title serif">Labs & <em>experiments</em></h1>
    <p class="page-subtitle">Side projects, experiments, and things I built just to see if I could.</p>
    <div class="filters">
      {#each filters as f}
        <button
          class="filter-btn"
          class:active={data.category === f.value}
          onclick={() => setFilter(f.value)}
        >
          {f.label}
        </button>
      {/each}
    </div>
  </div>
</section>

<div class="container labs-container">
  {#if data.labs.length === 0}
    <p class="empty">No experiments found.</p>
  {:else}
    <div class="labs-grid">
      {#each data.labs as lab}
        <div class="lab-card">
          <div class="lab-top">
            <div class="lab-icon">⚗</div>
            <Badge variant={lab.status === 'done' ? 'green' : 'amber'}>
              {lab.status === 'done' ? 'Done' : 'In progress'}
            </Badge>
          </div>
          <h2 class="lab-title">{lab.title}</h2>
          <p class="lab-desc">{lab.description}</p>
          <div class="lab-footer">
            <div class="lab-tags">
              {#each lab.tags.slice(0, 3) as tag}
                <Badge>{tag}</Badge>
              {/each}
            </div>
            <div class="lab-links">
              {#if lab.github_url}
                <a href={lab.github_url} target="_blank" rel="noopener noreferrer" class="lab-link">↗ GitHub</a>
              {/if}
              {#if lab.demo_url}
                <a href={lab.demo_url} target="_blank" rel="noopener noreferrer" class="lab-link">↗ Demo</a>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .hero {
    padding: var(--space-10) 0 var(--space-8);
    border-bottom: 0.5px solid var(--color-border);
  }

  .page-title {
    font-size: clamp(26px, 4vw, 36px);
    color: var(--color-text);
  }

  .page-title em { font-style: italic; color: var(--color-accent); }

  .page-subtitle {
    font-size: 13px;
    color: var(--color-text-2);
    margin-top: var(--space-2);
    max-width: 440px;
    line-height: 1.65;
  }

  .filters {
    display: flex;
    gap: var(--space-2);
    margin-top: var(--space-5);
    flex-wrap: wrap;
  }

  .filter-btn {
    font-size: 12px;
    padding: 5px 14px;
    border-radius: var(--radius-full);
    border: 0.5px solid var(--color-border);
    color: var(--color-text-2);
    background: var(--color-bg-secondary);
    transition: all var(--duration) var(--ease);
  }

  .filter-btn:hover, .filter-btn.active {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }

  .labs-container {
    padding: var(--space-8) var(--space-6) var(--space-10);
  }

  .empty {
    font-size: 14px;
    color: var(--color-text-3);
    text-align: center;
    padding: var(--space-16) 0;
  }

  .labs-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .lab-card {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    transition: border-color var(--duration) var(--ease);
  }

  .lab-card:hover {
    border-color: var(--color-accent);
  }

  .lab-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lab-icon { font-size: 20px; }

  .lab-title {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
  }

  .lab-desc {
    font-size: 12px;
    color: var(--color-text-2);
    line-height: 1.6;
  }

  .lab-footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
  }

  .lab-tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .lab-links {
    display: flex;
    gap: var(--space-3);
    flex-shrink: 0;
  }

  .lab-link {
    font-size: 11px;
    color: var(--color-accent);
    transition: opacity var(--duration) var(--ease);
  }

  .lab-link:hover { opacity: 0.7; }

  @media (max-width: 768px) {
    .labs-grid { grid-template-columns: 1fr; }
  }
</style>
