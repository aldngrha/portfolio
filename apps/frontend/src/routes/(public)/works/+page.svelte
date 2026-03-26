<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import { ExternalLink, Github } from '@lucide/svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const filters: { label: string; value: string }[] = [
    { label: 'All',         value: 'all' },
    { label: 'Web app',     value: 'web_app' },
    { label: 'Blockchain',  value: 'blockchain' },
    { label: 'Mobile',      value: 'mobile' },
    { label: 'Open source', value: 'open_source' },
  ]

  const activeFilter = $derived(data.category)
  const latestFeatured = $derived(activeFilter === 'all' ? data.works.find((w) => w.featured) : null)
  const gridWorks = $derived(activeFilter === 'all'
    ? data.works.filter((w) => w.id !== latestFeatured?.id)
    : data.works
  )
</script>

<svelte:head>
  <title>Works — Aldi Nugraha</title>
  <meta name="description" content="Projects I've built — from web apps to blockchain experiments." />
</svelte:head>

<!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
<section class="hero">
  <div class="container">
    <h1 class="page-title serif">Selected <em>works</em></h1>
    <p class="page-subtitle">
      Projects I've built — from web apps to blockchain experiments.
      Each one taught me something new.
    </p>
    <div class="filters">
      {#each filters as f}
        <a
          href={f.value === 'all' ? '/works' : `/works?category=${f.value}`}
          class="filter-btn"
          class:active={activeFilter === f.value}
        >
          {f.label}
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ─── Works ─────────────────────────────────────────────────────────────── -->
<div class="container works-container">
  {#if data.works.length === 0}
    <p class="empty">No projects found.</p>
  {:else}
    <!-- Featured Card (Only the latest) -->
    {#if latestFeatured}
      <a href="/works/{latestFeatured.slug}" class="work-card featured">
        <div class="work-thumb">
          {#if latestFeatured.thumbnail_url}
            <img src={latestFeatured.thumbnail_url} alt={latestFeatured.title} />
          {:else}
            <div class="thumb-placeholder"></div>
          {/if}
          <div class="thumb-badges">
            <Badge variant="blue">{latestFeatured.category.replace('_', ' ')}</Badge>
            <Badge variant="green">Featured</Badge>
          </div>
        </div>
        <div class="work-body featured-body">
          <h2 class="work-title serif">{latestFeatured.title}</h2>
          <p class="work-desc">{latestFeatured.tagline}</p>
          <div class="work-stack">
            {#each latestFeatured.tech_stack.slice(0, 4) as tech}
              <Badge>{tech}</Badge>
            {/each}
          </div>
          <div class="work-meta">
            <span class="work-year">{latestFeatured.year}</span>
            {#if latestFeatured.live_url}
              <span class="work-link"><ExternalLink size={12} strokeWidth={1.5} /> Visit</span>
            {/if}
            {#if latestFeatured.github_url}
              <span class="work-link"><Github size={12} strokeWidth={1.5} /> GitHub</span>
            {/if}
          </div>
        </div>
      </a>
    {/if}

    <!-- Grid -->
    <div class="works-grid">
      {#each gridWorks as work}
        <a href="/works/{work.slug}" class="work-card">
          <div class="work-thumb">
            {#if work.thumbnail_url}
              <img src={work.thumbnail_url} alt={work.title} />
            {:else}
              <div class="thumb-placeholder"></div>
            {/if}
            <div class="thumb-badges">
              <Badge variant="blue">{work.category.replace('_', ' ')}</Badge>
              {#if work.featured}
                <Badge variant="green">Featured</Badge>
              {/if}
            </div>
          </div>
          <div class="work-body">
            <h2 class="work-title">{work.title}</h2>
            <p class="work-desc">{work.tagline}</p>
            <div class="work-stack">
              {#each work.tech_stack.slice(0, 3) as tech}
                <Badge>{tech}</Badge>
              {/each}
            </div>
            <div class="work-meta">
              <span class="work-year">{work.year}</span>
              {#if work.live_url}<span class="work-link"><ExternalLink size={12} strokeWidth={1.5} /> Visit</span>{/if}
              {#if work.github_url}<span class="work-link"><Github size={12} strokeWidth={1.5} /> GitHub</span>{/if}
            </div>
          </div>
        </a>
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

  .page-title em {
    font-style: italic;
    color: var(--color-accent);
  }

  .page-subtitle {
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--color-text-2);
    margin-top: var(--space-2);
    max-width: 480px;
    line-height: 1.65;
  }

  .filters {
    display: flex;
    gap: var(--space-2);
    margin-top: var(--space-5);
    flex-wrap: wrap;
  }

  .filter-btn {
    font-size: 13px;
    padding: 5px 14px;
    border-radius: var(--radius-full);
    border: 0.5px solid var(--color-border);
    color: var(--color-text-2);
    background: var(--color-bg-secondary);
    transition: all var(--duration) var(--ease);
  }

  .filter-btn:hover,
  .filter-btn.active {
    background: var(--color-accent);
    color: #fff;
    border-color: var(--color-accent);
  }

  .works-container {
    padding-top: var(--space-8);
    padding-bottom: var(--space-10);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .empty {
    font-size: 15px;
    color: var(--color-text-3);
    text-align: center;
    padding: var(--space-16) 0;
  }

  /* Featured card */
  .work-card.featured {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--color-surface);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition: border-color var(--duration) var(--ease);
  }

  .work-card.featured:hover {
    border-color: var(--color-accent);
  }

  .work-card.featured .work-thumb {
    aspect-ratio: unset;
    min-height: 200px;
  }

  .featured-body {
    padding: var(--space-8) !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: var(--space-3);
  }

  .featured-body .work-title {
    font-size: clamp(18px, 2.5vw, 24px) !important;
  }

  /* Regular card */
  .works-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-4);
  }

  .work-card {
    background: var(--color-surface);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color var(--duration) var(--ease);
    display: block;
  }

  .work-card:hover {
    border-color: var(--color-accent);
  }

  .work-thumb {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--color-bg-secondary);
    position: relative;
    overflow: hidden;
  }

  .work-thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumb-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-accent-soft), var(--color-bg-secondary));
  }

  .thumb-badges {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    gap: var(--space-1);
  }

  .work-body {
    padding: var(--space-4);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .work-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }

  .work-desc {
    font-size: 14px;
    color: var(--color-text-2);
    line-height: 1.55;
  }

  .work-stack {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
  }

  .work-meta {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    margin-top: var(--space-1);
  }

  .work-year {
    font-size: 12px;
    color: var(--color-text-3);
  }

  .work-link {
    font-size: 12px;
    color: var(--color-accent);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  @media (max-width: 768px) {
    .work-card.featured { grid-template-columns: 1fr; }
    .works-grid { grid-template-columns: 1fr; }
  }
</style>
