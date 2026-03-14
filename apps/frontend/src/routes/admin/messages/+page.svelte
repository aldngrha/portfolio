<script lang="ts">
  import { enhance } from '$app/forms'
  import type { PageData } from './$types'
  import type { ContactMessage } from '$lib/types'

  let { data }: { data: PageData } = $props()

  let selected: ContactMessage | null = null

  function formatDate(d: string) {
    return new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(d))
  }

  const unread = $derived(data.messages.filter((m) => !m.read).length)
</script>

<svelte:head><title>Messages — Admin</title></svelte:head>

<div class="page">
  <div class="page-header">
    <div>
      <h1 class="page-title">Messages</h1>
      <p class="page-sub">{data.total} total · {unread} unread</p>
    </div>
  </div>

  {#if data.messages.length === 0}
    <div class="empty"><p>No messages yet.</p></div>
  {:else}
    <div class="messages-layout">
      <!-- List -->
      <ul class="messages-list">
        {#each data.messages as msg}
          <li>
            <button
              class="msg-item"
              class:active={selected?.id === msg.id}
              class:unread={!msg.read}
              onclick={() => (selected = msg)}
            >
              <div class="msg-top">
                <span class="msg-name">{msg.name}</span>
                <span class="msg-date">{formatDate(msg.created_at)}</span>
              </div>
              <div class="msg-subject">{msg.subject}</div>
              <div class="msg-preview">{msg.message.slice(0, 80)}…</div>
            </button>
          </li>
        {/each}
      </ul>

      <!-- Detail -->
      <div class="msg-detail">
        {#if selected}
          <div class="detail-header">
            <div>
              <p class="detail-name">{selected.name}</p>
              <p class="detail-email">{selected.email}</p>
            </div>
            <div class="detail-actions">
              {#if !selected.read}
                <form method="POST" action="?/markRead" use:enhance>
                  <input type="hidden" name="id" value={selected.id} />
                  <button type="submit" class="action-link">Mark read</button>
                </form>
              {/if}
              <form method="POST" action="?/delete" use:enhance={() => {
                return async ({ update }) => { selected = null; await update() }
              }}>
                <input type="hidden" name="id" value={selected.id} />
                <button type="submit" class="action-link danger">Delete</button>
              </form>
            </div>
          </div>
          <p class="detail-subject">{selected.subject}</p>
          <p class="detail-date">{formatDate(selected.created_at)}</p>
          <div class="detail-body">{selected.message}</div>
          <a href="mailto:{selected.email}?subject=Re: {selected.subject}" class="reply-btn">
            Reply via email →
          </a>
        {:else}
          <div class="detail-empty">Select a message to read</div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .page { max-width: 900px; }
  .page-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: var(--space-6); }
  .page-title { font-size: 20px; font-weight: 500; color: var(--color-text); }
  .page-sub { font-size: 12px; color: var(--color-text-3); margin-top: 2px; }

  .empty { text-align: center; padding: var(--space-16) 0; }
  .empty p { font-size: 14px; color: var(--color-text-3); }

  .messages-layout { display: grid; grid-template-columns: 320px 1fr; gap: 0; border: 0.5px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; }

  .messages-list { border-right: 0.5px solid var(--color-border); overflow-y: auto; max-height: 600px; }

  .msg-item { width: 100%; text-align: left; padding: var(--space-4); border-bottom: 0.5px solid var(--color-border); cursor: pointer; transition: background var(--duration) var(--ease); }
  .msg-item:hover { background: var(--color-bg-secondary); }
  .msg-item.active { background: var(--color-accent-soft); }
  .msg-item.unread .msg-name { font-weight: 600; }
  .msg-item.unread::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--color-accent); margin-right: var(--space-2); vertical-align: middle; }

  .msg-top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px; }
  .msg-name { font-size: 13px; color: var(--color-text); }
  .msg-date { font-size: 10px; color: var(--color-text-3); }
  .msg-subject { font-size: 12px; font-weight: 500; color: var(--color-text-2); margin-bottom: 2px; }
  .msg-preview { font-size: 11px; color: var(--color-text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

  .msg-detail { padding: var(--space-6); }

  .detail-empty { display: flex; align-items: center; justify-content: center; height: 200px; font-size: 13px; color: var(--color-text-3); }

  .detail-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: var(--space-4); }
  .detail-name { font-size: 16px; font-weight: 500; color: var(--color-text); }
  .detail-email { font-size: 12px; color: var(--color-accent); margin-top: 2px; }
  .detail-actions { display: flex; gap: var(--space-3); }
  .action-link { font-size: 12px; color: var(--color-accent); }
  .action-link.danger { color: #e24b4a; }

  .detail-subject { font-size: 15px; font-weight: 500; color: var(--color-text); margin-bottom: var(--space-1); }
  .detail-date { font-size: 11px; color: var(--color-text-3); margin-bottom: var(--space-5); }
  .detail-body { font-size: 14px; color: var(--color-text-2); line-height: 1.75; white-space: pre-wrap; margin-bottom: var(--space-6); }

  .reply-btn { font-size: 13px; color: var(--color-accent); padding: var(--space-2) var(--space-5); border: 0.5px solid var(--color-accent-border); border-radius: var(--radius-full); display: inline-block; transition: background var(--duration) var(--ease); }
  .reply-btn:hover { background: var(--color-accent-soft); }

  @media (max-width: 768px) {
    .messages-layout { grid-template-columns: 1fr; }
    .messages-list { max-height: 300px; border-right: none; border-bottom: 0.5px solid var(--color-border); }
  }
</style>
