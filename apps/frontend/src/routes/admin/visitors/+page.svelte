<script lang="ts">
  import { adminApi } from '$lib/api/client'
  import type { Visitor } from '$lib/types'
  import type { PageData } from './$types'
  import { onMount } from 'svelte'

  let { data }: { data: PageData } = $props()

  let visitors = $state<Visitor[]>(data.visitors)
  let page = $state(1)
  let loading = $state(false)
  let hasMore = $derived(visitors.length < data.total)

  let observerElement = $state<HTMLElement | null>(null)

  async function loadMore() {
    if (loading || !hasMore) return

    loading = true
    try {
      const nextPage = page + 1
      const response = await adminApi.visitors.list(data.token, nextPage, 10)

      if (response.data.length > 0) {
        visitors = [...visitors, ...response.data]
        page = nextPage
      }
    } catch (err) {
      console.error('Failed to load more visitors:', err)
    } finally {
      loading = false
    }
  }

  onMount(() => {
    if (!observerElement) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        loadMore()
      }
    }, { threshold: 0.1 })

    observer.observe(observerElement)
    return () => observer.disconnect()
  })

  function formatUA(ua: string | null) {
    if (!ua) return 'Unknown'

    const lowerUA = ua.toLowerCase()

    // 1. Bots
    if (lowerUA.includes('bot')) return '🤖 Bot'
    if (lowerUA.includes('python') || lowerUA.includes('go-http-client') || lowerUA.includes('curl')) return '⚙️ Script/CLI'

    // 2. Device Type Detection
    let device = '💻 Desktop'
    if (lowerUA.includes('mobile') || lowerUA.includes('android') || lowerUA.includes('iphone') || lowerUA.includes('ipad')) {
      device = '📱 Mobile'
    }

    // 3. Browser/OS Details
    let details = 'Other'
    if (ua.includes('iPhone')) details = 'iPhone'
    else if (ua.includes('Android')) details = 'Android'
    else if (ua.includes('Edg/')) details = 'Edge'
    else if (ua.includes('Chrome')) details = 'Chrome'
    else if (ua.includes('Firefox')) details = 'Firefox'
    else if (ua.includes('Safari')) details = 'Safari'
    else details = ua.split(' ')[0]

    return `${device} (${details})`
  }</script>

<svelte:head><title>Visitor Logs — Admin</title></svelte:head>

<div class="visitor-page">
  <header class="header">
    <div class="header-content">
      <h1 class="title">Visitor Logs</h1>
      <p class="subtitle">Detailed history of all site visits</p>
    </div>
    <div class="badge">Total: {data.total}</div>
  </header>

  <div class="table-wrapper">
    <table class="visitor-table">
      <thead>
        <tr>
          <th>Time</th>
          <th>Path</th>
          <th>IP Hash</th>
          <th>Device</th>
          <th>Referer</th>
        </tr>
      </thead>
      <tbody>
        {#each visitors as v}
          <tr>
            <td class="time">{new Date(v.created_at).toLocaleString()}</td>
            <td><span class="path-badge">{v.path}</span></td>
            <td class="mono">{v.ip_hash.substring(0, 12)}...</td>
            <td class="ua" title={v.user_agent}>{formatUA(v.user_agent)}</td>
            <td class="referer" title={v.referer ?? ''}>
              {v.referer ? new URL(v.referer).hostname : 'Direct'}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>

    {#if loading}
      <div class="loading-state">
        <span class="spinner"></span> Loading more...
      </div>
    {/if}

    <div bind:this={observerElement} class="scroll-trigger"></div>

    {#if !hasMore && visitors.length > 0}
      <div class="end-state">You've reached the end of the logs.</div>
    {/if}
  </div>
</div>

<style>
  .visitor-page { max-width: 100%; padding-bottom: var(--space-20); }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: var(--space-8);
  }

  .title { font-size: 24px; font-weight: 500; color: var(--color-text); }
  .subtitle { font-size: 13px; color: var(--color-text-3); margin-top: 4px; }

  .badge {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-full);
    color: var(--color-text-2);
  }

  .table-wrapper {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    overflow: hidden;
  }

  .visitor-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    text-align: left;
  }

  .visitor-table th {
    background: var(--color-surface);
    padding: var(--space-3) var(--space-4);
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-text-3);
    border-bottom: 0.5px solid var(--color-border);
  }

  .visitor-table td {
    padding: var(--space-3) var(--space-4);
    border-bottom: 0.5px solid var(--color-border);
    color: var(--color-text-2);
    vertical-align: middle;
  }

  .time { white-space: nowrap; color: var(--color-text-3); }

  .path-badge {
    font-size: 11px;
    font-family: var(--font-mono);
    background: var(--color-surface);
    padding: 2px 6px;
    border-radius: 4px;
    border: 0.5px solid var(--color-border);
  }

  .mono { font-family: var(--font-mono); font-size: 11px; color: var(--color-text-3); }

  .ua, .referer { color: var(--color-text-3); }

  .loading-state, .end-state {
    padding: var(--space-6);
    text-align: center;
    font-size: 13px;
    color: var(--color-text-3);
  }

  .scroll-trigger { height: 10px; }

  .spinner {
    display: inline-block;
    width: 12px;
    height: 12px;
    border: 2px solid var(--color-border);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin { to { transform: rotate(360deg); } }
</style>
