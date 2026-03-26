<script lang="ts">
  import { ArrowLeft, Github, ExternalLink } from '@lucide/svelte'
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  import { browser } from '$app/environment'

  let { data }: { data: PageData } = $props()
  const { lab } = data

  let activeImage = $state(0)
  const currentImage = $derived(lab.images?.[activeImage] ?? null)

  function formatDate(d: string) {
    return new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date(d))
  }

  const htmlDescription = $derived.by(() => {
    if (!lab?.description) return ''
    const rawHtml = marked.parse(lab.description, { async: false }) as string
    return browser ? DOMPurify.sanitize(rawHtml) : rawHtml
  })
</script>

<svelte:head>
  <title>{lab.title} — Labs — Aldi Nugraha</title>
  <meta name="description" content={lab.title} />
</svelte:head>

<div class="breadcrumb-bar">
  <div class="container breadcrumb-inner">
    <a href="/labs" class="back-link"><ArrowLeft size={14} strokeWidth={1.5} /> back to labs</a>
    <span class="breadcrumb-path">labs / {lab.slug}</span>
  </div>
</div>

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
      <div class="prose">
        {@html htmlDescription}
      </div>
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

{#if lab.images && lab.images.length > 0}
  <section class="gallery-section">
    <div class="container">
      <p class="section-label">Gallery</p>
      <div class="hero-img">
        {#if currentImage}
          <img src={currentImage.url} alt={currentImage.caption ?? lab.title} />
        {:else}
          <div class="img-placeholder"></div>
        {/if}
      </div>
      {#if lab.images.length > 1}
        <div class="thumbs">
          {#each lab.images as img, i}
            <button
              class="thumb"
              class:active={activeImage === i}
              onclick={() => (activeImage = i)}
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

{#if lab.github_url || lab.demo_url}
  <section class="links-section">
    <div class="container links-inner">
      {#if lab.github_url}
        <a href={lab.github_url} target="_blank" rel="noopener noreferrer" class="link-card">
          <Github size={20} strokeWidth={1.5} />
          <div>
            <p class="link-label">Source code</p>
            <p class="link-value">GitHub repo</p>
          </div>
        </a>
      {/if}
      {#if lab.demo_url}
        <a href={lab.demo_url} target="_blank" rel="noopener noreferrer" class="link-card">
          <ExternalLink size={20} strokeWidth={1.5} />
          <div>
            <p class="link-label">Live demo</p>
            <p class="link-value">View demo</p>
          </div>
        </a>
      {/if}
    </div>
  </section>
{/if}

<div class="prev-next">
  <div class="container">
    <a href="/labs" class="pn-label"><ArrowLeft size={14} strokeWidth={1.5} /> Back to labs</a>
  </div>
</div>

<style>
  .breadcrumb-bar { border-bottom: 0.5px solid var(--color-border); padding: var(--space-3) 0; }
  .breadcrumb-inner { display: flex; align-items: center; justify-content: space-between; }
  .back-link { font-size: 13px; color: var(--color-accent); display: inline-flex; align-items: center; gap: 4px; transition: opacity var(--duration) var(--ease); }
  .back-link:hover { opacity: 0.7; }
  .breadcrumb-path { font-size: 13px; color: var(--color-text-3); }

  .detail-hero { padding: var(--space-10) 0 var(--space-8); border-bottom: 0.5px solid var(--color-border); }
  .hero-inner { display: grid; grid-template-columns: 1fr 200px; gap: var(--space-10); align-items: start; }
  .hero-main { display: flex; flex-direction: column; gap: var(--space-3); }
  .hero-top { display: flex; gap: var(--space-2); }
  .title { font-size: clamp(24px, 4vw, 36px); color: var(--color-text); line-height: 1.1; }
  .desc { font-size: clamp(14px, 1.2vw, 16px); color: var(--color-text-2); line-height: 1.7; max-width: 520px; }
  .tags { display: flex; gap: var(--space-1); flex-wrap: wrap; }
  .hero-meta { display: flex; flex-direction: column; gap: var(--space-4); }
  .meta-item { display: flex; flex-direction: column; gap: 3px; }
  .meta-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-3); }
  .meta-value { font-size: 14px; color: var(--color-text); }

  .gallery-section { padding: var(--space-8) 0; border-bottom: 0.5px solid var(--color-border); }
  .section-label { font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-3); margin-bottom: var(--space-4); }
  .hero-img { width: 100%; aspect-ratio: 16/7; border-radius: var(--radius-xl); border: 0.5px solid var(--color-border); overflow: hidden; margin-bottom: var(--space-3); }
  .hero-img img { width: 100%; height: 100%; object-fit: cover; }
  .img-placeholder { width: 100%; height: 100%; background: linear-gradient(135deg, var(--color-accent-soft), var(--color-bg-secondary)); }
  .thumbs { display: flex; gap: var(--space-2); flex-wrap: wrap; }
  .thumb { width: 80px; height: 54px; border-radius: var(--radius-md); border: 1.5px solid transparent; overflow: hidden; transition: border-color var(--duration) var(--ease); flex-shrink: 0; }
  .thumb img { width: 100%; height: 100%; object-fit: cover; }
  .thumb.active { border-color: var(--color-accent); }
  .thumb:hover:not(.active) { border-color: var(--color-border-hover); }

  .links-section { padding: var(--space-8) 0; border-bottom: 0.5px solid var(--color-border); }
  .links-inner { display: flex; gap: var(--space-4); flex-wrap: wrap; }
  .link-card { display: flex; align-items: center; gap: var(--space-3); background: var(--color-bg-secondary); border: 0.5px solid var(--color-border); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); transition: border-color var(--duration) var(--ease); min-width: 180px; color: var(--color-text); }
  .link-card:hover { border-color: var(--color-accent); }
  .link-label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: var(--color-text-3); margin-bottom: 3px; }
  .link-value { font-size: 14px; color: var(--color-accent); }

  .prev-next { padding: var(--space-5) 0; }
  .pn-label { font-size: 13px; color: var(--color-accent); display: inline-flex; align-items: center; gap: 4px; }

  @media (max-width: 768px) { .hero-inner { grid-template-columns: 1fr; } }
</style>
