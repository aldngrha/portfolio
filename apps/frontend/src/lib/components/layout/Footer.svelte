<script lang="ts">
  const year = new Date().getFullYear()

  const socials = [
    { label: 'GitHub',   href: 'https://github.com/aldngrha' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/aldngrha' },
    { label: 'Twitter',  href: 'https://twitter.com/aldngrha' },
  ]
</script>

<footer class="footer">
  <div class="container footer-inner">
    <p class="copy">© {year} Aldi Nugraha</p>
    <nav class="footer-links">
      {#each socials as s}
        <a href={s.href} target="_blank" rel="noopener noreferrer" class="footer-link">
          {s.label}
        </a>
      {/each}
    </nav>
  </div>
</footer>

<style>
  .footer {
    border-top: 0.5px solid var(--color-border);
    margin-top: auto;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 56px;
  }

  .copy {
    font-size: 12px;
    color: var(--color-text-3);
  }

  .footer-links {
    display: flex;
    gap: var(--space-4);
  }

  .footer-link {
    font-size: 12px;
    color: var(--color-text-3);
    transition: color var(--duration) var(--ease);
  }

  .footer-link:hover {
    color: var(--color-text);
  }
</style>
