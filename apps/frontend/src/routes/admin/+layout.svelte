<script lang="ts">
  import { page } from '$app/stores'
  import { goto } from '$app/navigation'
  import { auth } from '$lib/stores'
  import { LayoutDashboard, Briefcase, FlaskConical, PenLine, Mail, Settings, ExternalLink, LogOut } from '@lucide/svelte'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()

  const navItems = [
    { label: 'Dashboard', href: '/admin',           icon: LayoutDashboard },
    { label: 'Works',     href: '/admin/works',      icon: Briefcase },
    { label: 'Labs',      href: '/admin/labs',       icon: FlaskConical },
    { label: 'Writing',   href: '/admin/writing',    icon: PenLine },
    { label: 'Messages',  href: '/admin/messages',   icon: Mail },
    { label: 'Settings',  href: '/admin/settings',   icon: Settings },
  ]

  function logout() {
    auth.logout()
    goto('/login')
  }

  const currentPath = $derived($page.url.pathname)
</script>

<div class="admin-layout">
  <aside class="sidebar">
    <div class="sidebar-top">
      <a href="/" class="brand">
        <span class="brand-name">aldi nugraha</span>
        <span class="brand-tag">CMS</span>
      </a>
    </div>

    <nav class="sidebar-nav">
      {#each navItems as item}
        <a
          href={item.href}
          class="nav-item"
          class:active={currentPath === item.href || (item.href !== '/admin' && currentPath.startsWith(item.href))}
        >
          <span class="nav-icon"><svelte:component this={item.icon} size={15} strokeWidth={1.5} /></span>
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>

    <div class="sidebar-footer">
      <a href="/" target="_blank" class="view-site">
        <ExternalLink size={13} strokeWidth={1.5} /> View site
      </a>
      <button class="logout-btn" onclick={logout}>
        <LogOut size={13} strokeWidth={1.5} /> Logout
      </button>
    </div>
  </aside>

  <main class="admin-main">
    {@render children?.()}
  </main>
</div>

<style>
  :global(body) {
    background: var(--color-bg);
  }

  .admin-layout {
    display: grid;
    grid-template-columns: 220px 1fr;
    min-height: 100dvh;
  }

  .sidebar {
    border-right: 0.5px solid var(--color-border);
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    height: 100dvh;
    overflow-y: auto;
    background: var(--color-bg);
  }

  .sidebar-top {
    padding: var(--space-5);
    border-bottom: 0.5px solid var(--color-border);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    text-decoration: none;
  }

  .brand-name {
    font-size: 13px;
    font-weight: 500;
    color: var(--color-text);
  }

  .brand-tag {
    font-size: 10px;
    color: var(--color-accent-hover);
    background: var(--color-accent-soft);
    border: 0.5px solid var(--color-accent-border);
    padding: 1px 6px;
    border-radius: var(--radius-full);
  }

  .sidebar-nav {
    flex: 1;
    padding: var(--space-3);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .nav-item {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: 13px;
    color: var(--color-text-2);
    text-decoration: none;
    transition: all var(--duration) var(--ease);
  }

  .nav-item:hover {
    background: var(--color-bg-secondary);
    color: var(--color-text);
  }

  .nav-item.active {
    background: var(--color-accent-soft);
    color: var(--color-accent);
  }

  .nav-icon {
    display: flex;
    align-items: center;
    width: 18px;
    flex-shrink: 0;
  }

  .sidebar-footer {
    padding: var(--space-4) var(--space-5);
    border-top: 0.5px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .view-site {
    font-size: 12px;
    color: var(--color-text-3);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: color var(--duration) var(--ease);
  }

  .view-site:hover { color: var(--color-accent); }

  .logout-btn {
    font-size: 12px;
    color: var(--color-text-3);
    text-align: left;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    transition: color var(--duration) var(--ease);
  }

  .logout-btn:hover { color: #e24b4a; }

  .admin-main {
    overflow-y: auto;
    padding: var(--space-8);
    background: var(--color-bg);
  }
</style>
