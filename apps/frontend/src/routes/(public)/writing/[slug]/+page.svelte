<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const { post } = data

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateStr))
  }
</script>

<svelte:head>
  <title>{post.title} — Aldi Nugraha</title>
  <meta name="description" content={post.excerpt} />
</svelte:head>

<article class="article">
  <div class="container article-inner">
    <!-- Back -->
    <a href="/writing" class="back-link">← back to writing</a>

    <!-- Header -->
    <header class="article-header">
      <Badge variant="blue">{post.category}</Badge>
      <h1 class="article-title serif">{post.title}</h1>
      <div class="article-meta">
        <span>{post.published_at ? formatDate(post.published_at) : 'Draft'}</span>
        <span class="dot-sep" aria-hidden="true">·</span>
        <span>{post.read_time} min read</span>
      </div>
    </header>

    <!-- Content -->
    <div class="prose">
      {@html post.content}
    </div>

    <!-- Tags -->
    {#if post.tags.length > 0}
      <div class="article-tags">
        {#each post.tags as tag}
          <Badge>{tag}</Badge>
        {/each}
      </div>
    {/if}
  </div>
</article>

<style>
  .article {
    padding: var(--space-8) 0 var(--space-16);
  }

  .article-inner {
    max-width: 680px;
  }

  .back-link {
    font-size: 12px;
    color: var(--color-accent);
    display: inline-block;
    margin-bottom: var(--space-8);
    transition: opacity var(--duration) var(--ease);
  }

  .back-link:hover { opacity: 0.7; }

  .article-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    margin-bottom: var(--space-10);
    padding-bottom: var(--space-8);
    border-bottom: 0.5px solid var(--color-border);
  }

  .article-title {
    font-size: clamp(26px, 4vw, 38px);
    color: var(--color-text);
    line-height: 1.1;
  }

  .article-meta {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 12px;
    color: var(--color-text-3);
  }

  .dot-sep { color: var(--color-border-hover); }

  /* Prose styles */
  .prose {
    font-size: 15px;
    line-height: 1.8;
    color: var(--color-text-2);
  }

  .prose :global(h2) {
    font-family: var(--font-serif);
    font-size: 22px;
    color: var(--color-text);
    margin: var(--space-10) 0 var(--space-4);
  }

  .prose :global(h3) {
    font-size: 17px;
    font-weight: 500;
    color: var(--color-text);
    margin: var(--space-8) 0 var(--space-3);
  }

  .prose :global(p) {
    margin-bottom: var(--space-5);
  }

  .prose :global(a) {
    color: var(--color-accent);
    text-decoration: underline;
    text-decoration-color: var(--color-accent-border);
    text-underline-offset: 3px;
  }

  .prose :global(code) {
    font-family: var(--font-mono);
    font-size: 13px;
    background: var(--color-bg-secondary);
    padding: 2px 6px;
    border-radius: var(--radius-sm);
    border: 0.5px solid var(--color-border);
  }

  .prose :global(pre) {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    overflow-x: auto;
    margin: var(--space-5) 0;
  }

  .prose :global(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 13px;
  }

  .prose :global(blockquote) {
    border-left: 2px solid var(--color-accent);
    padding-left: var(--space-5);
    color: var(--color-text-3);
    font-style: italic;
    margin: var(--space-6) 0;
  }

  .prose :global(ul), .prose :global(ol) {
    padding-left: var(--space-6);
    margin-bottom: var(--space-5);
    list-style: revert;
  }

  .prose :global(li) {
    margin-bottom: var(--space-2);
  }

  .article-tags {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-top: var(--space-10);
    padding-top: var(--space-8);
    border-top: 0.5px solid var(--color-border);
  }
</style>
