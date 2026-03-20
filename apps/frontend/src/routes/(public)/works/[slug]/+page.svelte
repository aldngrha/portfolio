<script lang="ts">
  import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from '@lucide/svelte'
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  import { browser } from '$app/environment'

  let { data }: { data: PageData } = $props()

  const { work } = data
  let activeImage = $state(0)

  function setImage(i: number) {
    activeImage = i
  }

  const currentImage = $derived(work.images[activeImage] ?? null)

  let htmlContent = $state('')

  $effect(() => {
    if (browser && work?.description) {
      const rawHtml = marked.parse(work.description, { async: false }) as string
      htmlContent = DOMPurify.sanitize(rawHtml)
    }
  })
</script>

<svelte:head>
  <title>{work.title} — Aldi Nugraha</title>
  <meta name="description" content={work.tagline} />
</svelte:head>

<!-- ─── Breadcrumb nav ────────────────────────────────────────────────────── -->
<div class="breadcrumb-bar">
  <div class="container breadcrumb-inner">
    <a href="/works" class="back-link"><ArrowLeft size={14} strokeWidth={1.5} /> back to works</a>
    <span class="breadcrumb-path">works / {work.slug}</span>
  </div>
</div>

<!-- ─── Hero ──────────────────────────────────────────────────────────────── -->
<section class="detail-hero">
  <div class="container hero-inner">
    <div class="hero-main">
      <Badge variant="blue">{work.category.replace('_', ' ')}</Badge>
      <h1 class="title serif">{work.title}</h1>
      <p class="desc">{work.description}</p>
      <div class="stack">
        {#each work.tech_stack as tech}
          <Badge>{tech}</Badge>
        {/each}
      </div>
    </div>
    <div class="hero-meta">
      <div class="meta-item">
        <span class="meta-label">Year</span>
        <span class="meta-value">{work.year}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Role</span>
        <span class="meta-value">{work.role}</span>
      </div>
      <div class="meta-item">
        <span class="meta-label">Status</span>
        <Badge variant={work.status === 'live' ? 'green' : work.status === 'wip' ? 'amber' : 'default'}>
          {work.status}
        </Badge>
      </div>
    </div>
  </div>
</section>

<!-- ─── Gallery ───────────────────────────────────────────────────────────── -->
{#if work.images.length > 0}
  <section class="gallery-section">
    <div class="container">
      <p class="section-label">Gallery</p>

      <!-- Hero image -->
      <div class="hero-img">
        {#if currentImage}
          <img src={currentImage.url} alt={currentImage.caption ?? work.title} />
        {:else}
          <div class="img-placeholder"></div>
        {/if}
      </div>

      <!-- Thumbnails -->
      {#if work.images.length > 1}
        <div class="thumbs">
          {#each work.images as img, i}
            <button
              class="thumb"
              class:active={activeImage === i}
              onclick={() => setImage(i)}
              aria-label="View image {i + 1}"
            >
              <img src={img.url} alt={img.caption ?? `Image ${i + 1}`} />
            </button>
          {/each}
        </div>
      {/if}
    </div>
  </section>
{/if}

<!-- ─── Content + Sidebar ────────────────────────────────────────────────────── -->
<section class="content-section">
  <div class="container content-inner">
    <div class="content-main">
      <p class="section-label">About this project</p>
      <div class="prose">
        {#if browser}
          {@html htmlContent}
        {:else}
          <p style="opacity: 0.5">Loading content...</p>
        {/if}
      </div>
    </div>

    <aside class="sidebar">
      {#if work.live_url}
        <div class="sidebar-block">
          <p class="sidebar-label">Live project</p>
          <a href={work.live_url} target="_blank" rel="noopener noreferrer" class="sidebar-link">
            <ExternalLink size={14} strokeWidth={1.5} /> Visit website
          </a>
        </div>
      {/if}
      {#if work.github_url}
        <div class="sidebar-block">
          <p class="sidebar-label">Source code</p>
          <a href={work.github_url} target="_blank" rel="noopener noreferrer" class="sidebar-link">
            <Github size={14} strokeWidth={1.5} /> GitHub repo
          </a>
        </div>
      {/if}
      <div class="sidebar-block">
        <p class="sidebar-label">Tech stack</p>
        <div class="sidebar-tags">
          {#each work.tech_stack as tech}
            <Badge>{tech}</Badge>
          {/each}
        </div>
      </div>
    </aside>
  </div>
</section>

<!-- ─── Prev / Next ───────────────────────────────────────────────────────── -->
<div class="prev-next">
  <div class="container prev-next-inner">
    <a href="/works" class="pn-item">
      <span class="pn-label"><ChevronLeft size={14} strokeWidth={1.5} /> Previous</span>
    </a>
    <a href="/works" class="pn-item pn-right">
      <span class="pn-label">Next <ChevronRight size={14} strokeWidth={1.5} /></span>
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
    font-size: 13px;
    color: var(--color-accent);
    transition: opacity var(--duration) var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .back-link:hover { opacity: 0.7; }

  .breadcrumb-path {
    font-size: 13px;
    color: var(--color-text-3);
  }

  /* Hero */
  .detail-hero {
    padding: var(--space-10) 0 var(--space-8);
    border-bottom: 0.5px solid var(--color-border);
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-10);
    align-items: start;
  }

  .hero-main {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .title {
    font-size: clamp(24px, 4vw, 36px);
    color: var(--color-text);
    line-height: 1.1;
  }

  .title :global(em) { font-style: italic; color: var(--color-accent); }

  .desc {
    font-size: clamp(14px, 1.2vw, 16px);
    color: var(--color-text-2);
    line-height: 1.7;
    max-width: 520px;
  }

  .stack {
    display: flex;
    gap: var(--space-1);
    flex-wrap: wrap;
  }

  .hero-meta {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    min-width: 140px;
  }

  .meta-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .meta-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
  }

  .meta-value {
    font-size: 14px;
    color: var(--color-text);
  }

  /* Gallery */
  .gallery-section {
    padding: var(--space-8) 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .section-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-3);
    margin-bottom: var(--space-4);
  }

  .hero-img {
    width: 100%;
    aspect-ratio: 16 / 7;
    border-radius: var(--radius-xl);
    border: 0.5px solid var(--color-border);
    overflow: hidden;
    margin-bottom: var(--space-3);
  }

  .hero-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 300ms var(--ease);
  }

  .img-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-accent-soft), var(--color-bg-secondary));
  }

  .thumbs {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  .thumb {
    width: 80px;
    height: 54px;
    border-radius: var(--radius-md);
    border: 1.5px solid transparent;
    overflow: hidden;
    transition: border-color var(--duration) var(--ease);
    flex-shrink: 0;
  }

  .thumb img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .thumb.active {
    border-color: var(--color-accent);
  }

  .thumb:hover:not(.active) {
    border-color: var(--color-border-hover);
  }

  /* Content */
  .content-section {
    padding: var(--space-8) 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .content-inner {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: var(--space-12);
  }

  .prose {
    font-size: clamp(14px, 1.2vw, 16px);
    color: var(--color-text-2);
    line-height: 1.75;
  }

  .sidebar {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .sidebar-block {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-4);
  }

  .sidebar-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
    margin-bottom: var(--space-2);
  }

  .sidebar-link {
    font-size: 14px;
    color: var(--color-accent);
    transition: opacity var(--duration) var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .sidebar-link:hover { opacity: 0.7; }

  .sidebar-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  /* Prev/Next */
  .prev-next {
    padding: var(--space-5) 0;
  }

  .prev-next-inner {
    display: flex;
    justify-content: space-between;
  }

  .pn-item {
    display: flex;
    flex-direction: column;
    gap: 3px;
  }

  .pn-right { align-items: flex-end; }

  .pn-label {
    font-size: 13px;
    color: var(--color-accent);
    transition: opacity var(--duration) var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .pn-label:hover { opacity: 0.7; }

  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; }
    .content-inner { grid-template-columns: 1fr; }
  }
</style>
