<script lang="ts">
  import { page } from '$app/stores'
  import { theme, isDark } from '$lib/stores'
  import { Sun, Moon, X, Menu } from '@lucide/svelte'
  import Logo from '$lib/components/icon/Logo.svelte';

  const navItems = [
    { label: 'home',    href: '/' },
    { label: 'about',   href: '/about' },
    { label: 'works',   href: '/works' },
    { label: 'labs',    href: '/labs' },
    { label: 'writing', href: '/writing' },
    { label: 'contact', href: '/contact' },
  ]

  let menuOpen = $state(false)

  function toggleMenu() {
    menuOpen = !menuOpen
  }

  const currentPath = $derived($page.url.pathname)
</script>

<header class="nav-wrapper">
  <nav class="nav container">
    <a href="/" class="logo">
      <Logo />
      <span>aldi nugraha</span>
    </a>

    <!-- Desktop links -->
    <ul class="nav-links">
      {#each navItems as item}
        <li>
          <a
            href={item.href}
            class="nav-link"
            class:active={currentPath === item.href || (item.href !== '/' && currentPath.startsWith(item.href))}
          >
            {item.label}
          </a>
        </li>
      {/each}
    </ul>

    <!-- Actions -->
    <div class="nav-actions">
      <!-- Theme toggle -->
      <button
        class="icon-btn"
        onclick={() => theme.toggle()}
        aria-label="Toggle theme"
        title="Toggle theme"
      >
        {#if $isDark}
          <Sun size={16} strokeWidth={1.5} />
        {:else}
          <Moon size={16} strokeWidth={1.5} />
        {/if}
      </button>

      <!-- Mobile menu toggle -->
      <button
        class="icon-btn mobile-menu-btn"
        onclick={toggleMenu}
        aria-label="Toggle menu"
      >
        {#if menuOpen}
          <X size={16} strokeWidth={1.5} />
        {:else}
          <Menu size={16} strokeWidth={1.5} />
        {/if}
      </button>
    </div>
  </nav>

  <!-- Mobile menu -->
  {#if menuOpen}
    <div class="mobile-menu">
      <ul>
        {#each navItems as item}
          <li>
            <a
              href={item.href}
              class="mobile-link"
              class:active={currentPath === item.href}
              onclick={() => (menuOpen = false)}
            >
              {item.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  {/if}
</header>

<style>
  .nav-wrapper {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--color-bg);
    border-bottom: 0.5px solid var(--color-border);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }

  .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 15px;
      font-weight: 500;
      color: var(--color-text);
      transition: opacity var(--duration) var(--ease);
    }

  .logo:hover {
    opacity: 0.7;
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: var(--space-1);
  }

  .nav-link {
    font-size: 14px;
    color: var(--color-text-3);
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-full);
    transition: color var(--duration) var(--ease), background var(--duration) var(--ease);
  }

  .nav-link:hover {
    color: var(--color-text);
    background: var(--color-bg-secondary);
  }

  .nav-link.active {
    color: var(--color-accent);
  }

  .nav-actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md);
    color: var(--color-text-3);
    transition: color var(--duration) var(--ease), background var(--duration) var(--ease);
  }

  .icon-btn:hover {
    color: var(--color-text);
    background: var(--color-bg-secondary);
  }

  .mobile-menu-btn {
    display: none;
  }

  .mobile-menu {
    border-top: 0.5px solid var(--color-border);
    padding: var(--space-4) var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .mobile-link {
    display: block;
    font-size: 15px;
    color: var(--color-text-2);
    padding: var(--space-3) 0;
    border-bottom: 0.5px solid var(--color-border);
    transition: color var(--duration) var(--ease);
  }

  .mobile-link:last-child {
    border-bottom: none;
  }

  .mobile-link.active {
    color: var(--color-accent);
  }

  @media (max-width: 768px) {
    .nav-links {
      display: none;
    }

    .mobile-menu-btn {
      display: flex;
    }
  }
</style>
