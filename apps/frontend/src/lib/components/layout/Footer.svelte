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
    <div class="footer-left">
      <p class="copy">© {year} Aldi Nugraha</p>
      <span class="separator" aria-hidden="true">•</span>
      <p class="privacy-note">
        Privacy-first: Anonymous (SHA256)
      </p>
    </div>
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

  .footer-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .copy {
    font-size: 13px;
    color: var(--color-text-3);
  }

  .separator {
    color: var(--color-border);
    font-size: 10px;
  }

  .privacy-note {
    font-size: 11px;
    color: var(--color-text-3);
    opacity: 0.8;
    background: var(--color-bg-secondary);
    padding: 2px 8px;
    border-radius: var(--radius-full);
    border: 0.5px solid var(--color-border);
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

  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      height: auto;
      padding: var(--space-6) 0;
      gap: var(--space-4);
    }

    .footer-left {
      flex-direction: column;
      gap: var(--space-1);
      text-align: center;
    }

    .privacy-note {
      background: none;
      border: none;
      padding: 0;
      font-size: 10px;
    }

    .separator {
      display: none;
    }
  }
</style>
