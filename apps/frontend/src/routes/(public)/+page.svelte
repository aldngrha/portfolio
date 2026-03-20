<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import Button from '$lib/components/ui/Button.svelte'
  import { FlaskConical, ArrowRight } from '@lucide/svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()

  const { works, labs, posts } = data
</script>

<svelte:head>
  <title>Aldi Nugraha — Software Engineer</title>
  <meta name="description" content="Software engineer based in Indonesia. Building software, exploring the chain." />
</svelte:head>

<!-- ─── Hero ─────────────────────────────────────────────────────────────── -->
<section class="hero">
  <div class="container hero-inner">
    <div aria-hidden="true">
      <img class="avatar" src="https://lh3.googleusercontent.com/a/ACg8ocICvuHzhHQjZ_24PcQxwZyxK109oqVr7UPpumM0mwZhIPWBT0QTwg=s576-c-no" alt="Aldi Nugraha" />
    </div>
    <div class="hero-text">
      <h1 class="name">Aldi Nugraha</h1>
      <p class="title">Software Engineer</p>
      <p class="tagline">Building software, exploring the chain.</p>
      <p class="desc">
        I build things for the web — and lately, for the blockchain.
        Based in Indonesia, open to collaborate.
      </p>
    </div>
  </div>
</section>

<!-- ─── Selected Works ────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Selected works</span>
      <a href="/works" class="section-link">View all <ArrowRight size={12} strokeWidth={1.5} /></a>
    </div>
    <div class="works-grid">
      {#each works as work}
        <a href="/works/{work.slug}" class="work-card">
          <div class="work-thumb">
            {#if work.thumbnail_url}
              <img src={work.thumbnail_url} alt={work.title} />
            {:else}
              <div class="work-thumb-placeholder"></div>
            {/if}
            <div class="work-thumb-tag">
              <Badge variant="blue">{work.category.replace('_', ' ')}</Badge>
            </div>
          </div>
          <div class="work-body">
            <h3 class="work-title">{work.title}</h3>
            <p class="work-desc">{work.tagline}</p>
            <div class="work-stack">
              {#each work.tech_stack.slice(0, 3) as tech}
                <Badge>{tech}</Badge>
              {/each}
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ─── Labs ──────────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Labs & experiments</span>
      <a href="/labs" class="section-link">View all <ArrowRight size={12} strokeWidth={1.5} /></a>
    </div>
    <div class="labs-grid">
      {#each labs as lab}
        <a href="/labs/{lab.slug}" class="lab-card">   <!-- ganti div → a, tambah href -->
           <div class="lab-top">
             <div class="lab-icon"><FlaskConical size={18} strokeWidth={1.5} /></div>
             <Badge variant={lab.status === 'done' ? 'green' : 'amber'}>
               {lab.status === 'done' ? 'Done' : 'In progress'}
             </Badge>
           </div>
           <h3 class="lab-title">{lab.title}</h3>
           <p class="lab-desc">{lab.description}</p>
           <div class="lab-tags">
             {#each lab.tags.slice(0, 3) as tag}
               <Badge>{tag}</Badge>
             {/each}
           </div>
         </a>
      {/each}
    </div>
  </div>
</section>

<!-- ─── Writing ───────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <div class="section-header">
      <span class="section-label">Writing</span>
      <a href="/writing" class="section-link">View all <ArrowRight size={12} strokeWidth={1.5} /></a>
    </div>
    <div class="posts-list">
      {#each posts as post}
        <a href="/writing/{post.slug}" class="post-item">
          <div class="post-left">
            <Badge variant="blue">{post.category}</Badge>
            <p class="post-title serif">{post.title}</p>
          </div>
          <div class="post-meta">
            <span class="post-date">
              {post.published_at
                ? new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(post.published_at))
                : 'Draft'}
            </span>
            <span class="post-read">{post.read_time} min</span>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- ─── CTA ───────────────────────────────────────────────────────────────── -->
<section class="cta">
  <div class="container cta-inner">
    <h2 class="cta-title serif">Let's build something <em>together.</em></h2>
    <p class="cta-desc">Open to freelance, full-time, and interesting side projects.</p>
    <Button href="/contact" variant="primary">Get in touch</Button>
  </div>
</section>

<style>
  /* Hero */
  .hero {
    border-bottom: 0.5px solid var(--color-border);
    padding: var(--space-12) 0;
  }

  .hero-inner {
    display: flex;
    align-items: center;
    gap: var(--space-8);
  }

  .avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--color-accent-soft);
    border: 1.5px solid var(--color-accent-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-accent-hover);
    flex-shrink: 0;
  }

  .name {
    font-family: var(--font-serif);
    font-size: clamp(24px, 4vw, 32px);
    color: var(--color-text);
  }

  .title {
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--color-accent);
    margin-top: 2px;
  }

  .tagline {
    font-size: clamp(15px, 1.3vw, 17px);
    font-weight: 500;
    color: var(--color-text);
    margin-top: var(--space-3);
  }

  .desc {
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--color-text-2);
    margin-top: var(--space-2);
    max-width: 400px;
    line-height: 1.65;
  }

  /* Sections */
  .section {
    padding: var(--space-10) 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: var(--space-5);
  }

  .section-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-3);
  }

  .section-link {
    font-size: 13px;
    color: var(--color-accent);
    transition: opacity var(--duration) var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  .section-link:hover {
    opacity: 0.7;
  }

  /* Works */
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

  .work-thumb-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--color-accent-soft), var(--color-bg-secondary));
  }

  .work-thumb-tag {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .work-body {
    padding: var(--space-4);
  }

  .work-title {
    font-size: 16px;
    font-weight: 500;
    color: var(--color-text);
  }

  .work-desc {
    font-size: 14px;
    color: var(--color-text-2);
    margin-top: var(--space-1);
    line-height: 1.5;
  }

  .work-stack {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: var(--space-3);
  }

  /* Labs */
  .labs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }

  .lab-card {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4);
    transition: border-color var(--duration) var(--ease);
      text-decoration: none;  /* tambah ini */
    }

  .lab-card:hover {
    border-color: var(--color-accent);  /* tambah ini */
  }

  .lab-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--space-3);
  }

  .lab-icon {
    font-size: 18px;
    color: var(--color-accent);
  }

  .lab-title {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
  }

  .lab-desc {
    font-size: 14px;
    color: var(--color-text-2);
    margin-top: var(--space-1);
    line-height: 1.5;
  }

  .lab-tags {
    display: flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: var(--space-3);
  }

  /* Posts */
  .posts-list {
    display: flex;
    flex-direction: column;
  }

  .post-item {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-4);
    padding: var(--space-4) 0;
    border-bottom: 0.5px solid var(--color-border);
    transition: opacity var(--duration) var(--ease);
  }

  .post-item:last-child {
    border-bottom: none;
  }

  .post-item:hover {
    opacity: 0.7;
  }

  .post-left {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .post-title {
    font-size: clamp(15px, 1.3vw, 18px);
    color: var(--color-text);
    line-height: 1.35;
  }

  .post-meta {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 2px;
    flex-shrink: 0;
  }

  .post-date,
  .post-read {
    font-size: 12px;
    color: var(--color-text-3);
    white-space: nowrap;
  }

  /* CTA */
  .cta {
    padding: var(--space-16) 0;
  }

  .cta-inner {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
  }

  .cta-title {
    font-family: var(--font-serif);
    font-size: clamp(24px, 4vw, 36px);
    color: var(--color-text);
  }

  .cta-title em {
    font-style: italic;
    color: var(--color-accent);
  }

  .cta-desc {
    font-size: 15px;
    color: var(--color-text-2);
  }

  @media (max-width: 768px) {
    .works-grid {
      grid-template-columns: 1fr;
    }

    .labs-grid {
      grid-template-columns: 1fr 1fr;
    }

    .hero-inner {
      gap: var(--space-5);
    }
  }

  @media (max-width: 480px) {
    .labs-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
