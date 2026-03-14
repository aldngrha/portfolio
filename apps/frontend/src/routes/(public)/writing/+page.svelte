<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(dateStr))
  }
</script>

<svelte:head>
  <title>Writing — Aldi Nugraha</title>
  <meta name="description" content="Things I write about — software, blockchain, and the occasional random thought." />
</svelte:head>

<section class="hero">
  <div class="container">
    <h1 class="page-title serif">Writing & <em>thoughts</em></h1>
    <p class="page-subtitle">Things I write about — software, blockchain, and the occasional random thought.</p>
  </div>
</section>

<div class="container posts-container">
  {#if data.posts.length === 0}
    <p class="empty">No posts yet. Check back soon.</p>
  {:else}
    <ul class="posts-list">
      {#each data.posts as post}
        <li>
          <a href="/writing/{post.slug}" class="post-item">
            <div class="post-left">
              <Badge variant="blue">{post.category}</Badge>
              <h2 class="post-title serif">{post.title}</h2>
              <p class="post-excerpt">{post.excerpt}</p>
            </div>
            <div class="post-meta">
              <span class="post-date">{post.published_at ? formatDate(post.published_at) : 'Draft'}</span>
              <span class="post-read">{post.read_time} min read</span>
            </div>
          </a>
        </li>
      {/each}
    </ul>
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

  .posts-container {
    padding: var(--space-2) var(--space-6) var(--space-10);
  }

  .empty {
    font-size: 14px;
    color: var(--color-text-3);
    text-align: center;
    padding: var(--space-16) 0;
  }

  .posts-list {
    display: flex;
    flex-direction: column;
  }

  .post-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-6);
    align-items: start;
    padding: var(--space-6) 0;
    border-bottom: 0.5px solid var(--color-border);
    transition: opacity var(--duration) var(--ease);
  }

  .post-item:last-child { border-bottom: none; }
  .post-item:hover { opacity: 0.7; }

  .post-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .post-title {
    font-size: clamp(16px, 2vw, 19px);
    color: var(--color-text);
    line-height: 1.3;
  }

  .post-excerpt {
    font-size: 13px;
    color: var(--color-text-2);
    line-height: 1.65;
    max-width: 520px;
  }

  .post-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 3px;
    flex-shrink: 0;
  }

  .post-date, .post-read {
    font-size: 11px;
    color: var(--color-text-3);
    white-space: nowrap;
  }

  @media (max-width: 640px) {
    .post-item { grid-template-columns: 1fr; }
    .post-meta { align-items: flex-start; flex-direction: row; gap: var(--space-3); }
  }
</style>
