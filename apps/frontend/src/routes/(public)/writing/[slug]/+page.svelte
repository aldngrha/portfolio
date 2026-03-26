<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import { ArrowLeft } from '@lucide/svelte'
  import type { PageData } from './$types'
  import { marked } from 'marked'
  import DOMPurify from 'dompurify'
  import { browser } from '$app/environment'

  let { data }: { data: PageData } = $props()
  const { post } = data

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat('en', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(dateStr))
  }

  // Handle markdown parsing
  const htmlContent = $derived.by(() => {
    if (!post?.content) return ''
    const rawHtml = marked.parse(post.content, { async: false }) as string
    return browser ? DOMPurify.sanitize(rawHtml) : rawHtml
  })
</script>

<svelte:head>
  <title>{post.title} — Aldi Nugraha</title>
  <meta name="description" content={post.excerpt} />
</svelte:head>

<article class="article">
  <div class="container">
    <!-- Back -->
    <a href="/writing" class="back-link"><ArrowLeft size={14} strokeWidth={1.5} /> back to writing</a>

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
      {@html htmlContent}
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

  .back-link {
    font-size: 13px;
    color: var(--color-accent);
    display: inline-flex;
    align-items: center;
    gap: 4px;
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
    font-size: 13px;
    color: var(--color-text-3);
  }

  .dot-sep { color: var(--color-border-hover); }

  .article-tags {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
    margin-top: var(--space-10);
    padding-top: var(--space-8);
    border-top: 0.5px solid var(--color-border);
  }
</style>
