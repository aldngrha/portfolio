<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const { lab } = data

  function formatDate(d: string) {
    return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(d))
  }
</script>

<svelte:head>
  <title>{lab.title} — Labs — Aldi Nugraha</title>
  <meta name="description" content={lab.description} />
</svelte:head>

<!-- Breadcrumb -->
<div class="breadcrumb-bar">
  <div class="container breadcrumb-inner">
    <a href="/labs" class="back-link">← back to labs</a>
    <span class="breadcrumb-path">labs / {lab.slug}</span>
  </div>
</div>

<!-- Hero -->
<section class="detail-hero">
  <div class="container hero-inner">
    <div class="hero-main">
      <div class="hero-top">
        <Badge variant="blue">{lab.category}</Badge>
        <Badge variant={lab.status === 'done' ? 'green' : 'amber'}>
          {lab.status === 'done' ? 'Done' : 'In progress'}
        </Badge>
      </div>
      <h1 class="title serif">{lab.title}</h1>
      <p class="desc">{lab.description}</p>
      <div class="tags">
        {#each lab.tags as tag}
          <Badge>{tag}</Badge>
        {/each}
      </div>
    </div>

    <aside class="hero-meta">
      <div class="meta-item">
        <span class="meta-label">Category</span>
        <span class="meta-value">{lab.category}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Status</span>
        <Badge variant={lab.status === 'done' ? 'green' : 'amber'}>
          {lab.status === 'done' ? 'Done' : 'In progress'}
        </Badge>
      </div>
      <div class="meta-item">
        <span class="meta-label">Created</span>
        <span class="meta-value">{formatDate(lab.created_at)}</span>
      </div>
    </aside>
  </div>
</section>

<!-- Links -->
{#if lab.github_url || lab.demo_url}
  <section class="links-section">
    <div class="container links-inner">
      {#if lab.github_url}
        <a href={lab.github_url} target="_blank" rel="noopener noreferrer" class="link-card">
          <span class="link-icon">⌥</span>
          <div>
            <p class="link-label">Source code</p>
            <p class="link-value">↗ GitHub repo</p>
          </div>
        </a>
      {/if}
      {#if lab.demo_url}
        <a href={lab.demo_url} target="_blank" rel="noopener noreferrer" class="link-card">
          <span class="link-icon">◈</span>
          <div>
            <p class="link-label">Live demo</p>
            <p class="link-value">↗ View demo</p>
          </div>
        </a>
      {/if}
    </div>
  </section>
{/if}

<!-- Prev / Next -->
<div class="prev-next">
  <div class="container prev-next-inner">
    <a href="/labs" class="pn-item">
      <span class="pn-label">← Back to labs</span>
    </a>
  </div>
</div>

<style>
  .breadcrumb-bar {
    border-bottom: 0.5px solid var(--color-border);
    padding: var(--space-3) 0;
  }

  .breadcrumb-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .back-link {
    font-size: 12px;
    color: var(--color-accent);
    transition: opacity var(--duration) var(--ease);
  }

  .back-link:hover { opacity: 0.7; }

  .breadcrumb-path {
    font-size: 12px;
    color: var(--color-text-3);
  }

  /* Hero */
  .detail-hero {
    padding: var(--space-10) 0 var(--space-8);
    border-bottom: 0.5px solid var(--color-border);
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: var(--space-10);
    align-items: start;
  }

  .hero-main {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .hero-top {
    display: flex;
    gap: var(--space-2);
  }

  .title {
    font-size: clamp(24px, 4vw, 36px);
    color: var(--color-text);
    line-height: 1.1;
  }

  .desc {
    font-size: 14px;
    color: var(--color-text-2);
    line-height: 1.7;
    max-width: 520px;
  }

  .tags {
    display: flex;
    gap: var(--space-1);
    flex-wrap: wrap;
  }

  .hero-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .meta-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
  }

  .meta-value {
    font-size: 13px;
    color: var(--color-text);
  }

  /* Links */
  .links-section {
    padding: var(--space-8) 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .links-inner {
    display: flex;
    gap: var(--space-4);
    flex-wrap: wrap;
  }

  .link-card {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-5);
    transition: border-color var(--duration) var(--ease);
    min-width: 180px;
  }

  .link-card:hover {
    border-color: var(--color-accent);
  }

  .link-icon {
    font-size: 20px;
  }

  .link-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
    margin-bottom: 3px;
  }

  .link-value {
    font-size: 13px;
    color: var(--color-accent);
  }

  /* Prev/Next */
  .prev-next {
    padding: var(--space-5) 0;
  }

  .prev-next-inner {
    display: flex;
    justify-content: space-between;
  }

  .pn-label {
    font-size: 12px;
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; }
  }
</style>
