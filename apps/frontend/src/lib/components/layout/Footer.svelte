<script lang="ts">
  import { Github, Linkedin, Instagram } from '@lucide/svelte'

  const year = new Date().getFullYear()

  const socials = [
    { label: 'GitHub',   href: 'https://github.com/aldngrha', icon: Github },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/aldngrha', icon: Linkedin },
    { label: 'Instagram',  href: 'https://instagram.com/aldngrha', icon: Instagram },
  ]
</script>

<footer class="footer">
  <div class="container footer-inner">
    <p class="copy">© {year} Aldi Nugraha</p>
    <nav class="footer-links">
      {#each socials as s}
        <a href={s.href} target="_blank" rel="noopener noreferrer" class="footer-link">
          <s.icon size={14} strokeWidth={1.5} />
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
    font-size: 13px;
    color: var(--color-text-3);
  }

  .footer-links {
    display: flex;
    gap: var(--space-4);
  }

  .footer-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    color: var(--color-text-3);
    transition: color var(--duration) var(--ease);
  }

  .footer-link:hover {
    color: var(--color-text);
  }
</style>
