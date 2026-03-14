<script lang="ts">
  import { page } from '$app/stores'
  import { theme, isDark } from '$lib/stores'
  import { m } from '$lib/i18n'

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
    <a href="/" class="logo">aldi nugraha</a>

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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="5"/>
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
          </svg>
        {:else}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        {/if}
      </button>

      <!-- Mobile menu toggle -->
      <button
        class="icon-btn mobile-menu-btn"
        onclick={toggleMenu}
        aria-label="Toggle menu"
      >
        {#if menuOpen}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        {:else}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M3 12h18M3 6h18M3 18h18"/>
          </svg>
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
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
    letter-spacing: -0.02em;
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
    font-size: 13px;
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
