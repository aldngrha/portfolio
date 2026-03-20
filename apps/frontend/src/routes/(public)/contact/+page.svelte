<script lang="ts">
  import { enhance } from '$app/forms'
  import Button from '$lib/components/ui/Button.svelte'
  import { Github, Linkedin, Twitter, Send } from '@lucide/svelte'
  import type { ActionData } from './$types'

  let { form }: { form?: ActionData } = $props()

  const socials = [
    { label: 'GitHub',    href: 'https://github.com/aldngrha', icon: Github },
    { label: 'LinkedIn',  href: 'https://linkedin.com/in/aldngrha', icon: Linkedin },
    { label: 'Twitter/X', href: 'https://twitter.com/aldngrha', icon: Twitter },
  ]

  let loading = $state(false)
</script>

<svelte:head>
  <title>Contact — Aldi Nugraha</title>
  <meta name="description" content="Get in touch. Open to freelance, full-time, and interesting side projects." />
</svelte:head>

<section class="hero">
  <div class="container">
    <h1 class="page-title serif">Let's work <em>together.</em></h1>
    <p class="page-subtitle">Got a project in mind? Or just want to say hi — my inbox is open.</p>
  </div>
</section>

<div class="container contact-layout">
  <!-- Left: Info -->
  <aside class="contact-info">
    <div class="info-block">
      <p class="info-label">Email</p>
      <a href="mailto:aldi.nugrahatk@gmail.com" class="info-value accent">
        aldi.nugrahatk@gmail.com
      </a>
      <p class="info-note">Usually reply within 24 hours</p>
    </div>

    <div class="info-block">
      <p class="info-label">Location</p>
      <p class="info-value">Bandar Lampung, Indonesia 🇮🇩</p>
      <p class="info-note">Open to remote work worldwide</p>
    </div>

    <div class="info-block">
      <p class="info-label">Availability</p>
      <div class="availability">
        <span class="dot" aria-hidden="true"></span>
        <span class="info-value">Open to opportunities</span>
      </div>
    </div>

    <div class="socials-block">
      <p class="info-label">Elsewhere</p>
      <ul class="socials">
        {#each socials as s}
          <li>
            <a href={s.href} target="_blank" rel="noopener noreferrer" class="social-link">
              <s.icon size={14} strokeWidth={1.5} /> {s.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </aside>

  <!-- Right: Form -->
  <div class="form-wrapper">
    <p class="form-heading section-label">Send a message</p>

    {#if form?.success}
      <div class="success-msg">
        <span>✓</span> Message sent! I'll get back to you within 24 hours.
      </div>
    {:else}
      <form
        method="POST"
        use:enhance={() => {
          loading = true
          return async ({ update }) => {
            loading = false
            await update()
          }
        }}
        class="form"
      >
        {#if form?.error}
          <div class="error-msg">{form.error}</div>
        {/if}

        <div class="form-row">
          <div class="field">
            <label for="name" class="field-label">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={form?.name ?? ''}
              required
              class="input"
            />
          </div>
          <div class="field">
            <label for="email" class="field-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form?.email ?? ''}
              required
              class="input"
            />
          </div>
        </div>

        <div class="field">
          <label for="subject" class="field-label">Subject</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="What's this about?"
            value={form?.subject ?? ''}
            required
            class="input"
          />
        </div>

        <div class="field">
          <label for="message" class="field-label">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project, idea, or just say hi..."
            required
            class="input textarea"
          >{form?.message ?? ''}</textarea>
        </div>

        <Button type="submit" variant="primary" disabled={loading}>
          {#if loading}
            Sending...
          {:else}
            <Send size={14} strokeWidth={1.5} /> Send message
          {/if}
        </Button>

        <p class="form-note">I'll get back to you within 24 hours.</p>
      </form>
    {/if}
  </div>
</div>

<style>
  .hero {
    padding: var(--space-10) 0 var(--space-8);
    border-bottom: 0.5px solid var(--color-border);
  }

  .page-title {
    font-size: clamp(26px, 4vw, 36px);
    color: var(--color-text);
  }

  .page-title em { font-style: italic; color: var(--color-accent); }

  .page-subtitle {
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--color-text-2);
    margin-top: var(--space-2);
    line-height: 1.65;
  }

  .contact-layout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 0;
    padding-top: 0;
    padding-bottom: var(--space-16);
    border-bottom: 0.5px solid var(--color-border);
  }

  /* Info */
  .contact-info {
    padding: var(--space-8) var(--space-8) var(--space-8) 0;
    border-right: 0.5px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
  }

  .info-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
    margin-bottom: var(--space-1);
  }

  .info-value {
    font-size: 14px;
    color: var(--color-text);
  }

  .info-value.accent {
    color: var(--color-accent);
  }

  .info-note {
    font-size: 12px;
    color: var(--color-text-3);
    margin-top: 3px;
  }

  .availability {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-green);
    flex-shrink: 0;
  }

  .socials { display: flex; flex-direction: column; gap: var(--space-2); margin-top: var(--space-2); }

  .social-link {
    font-size: 13px;
    color: var(--color-text-2);
    transition: color var(--duration) var(--ease);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .social-link:hover { color: var(--color-accent); }

  /* Form */
  .form-wrapper {
    padding: var(--space-8) 0 var(--space-8) var(--space-8);
  }

  .section-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-3);
    margin-bottom: var(--space-5);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 520px;
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-4);
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .field-label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
  }

  .input {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    font-size: 14px;
    font-family: var(--font-sans);
    color: var(--color-text);
    transition: border-color var(--duration) var(--ease);
    outline: none;
    width: 100%;
  }

  .input:focus { border-color: var(--color-accent); }

  .textarea {
    height: 120px;
    resize: vertical;
    line-height: 1.6;
  }

  .form-note {
    font-size: 12px;
    color: var(--color-text-3);
    text-align: center;
  }

  .success-msg {
    background: var(--color-green-soft);
    border: 0.5px solid rgba(29, 158, 117, 0.3);
    border-radius: var(--radius-lg);
    padding: var(--space-5);
    font-size: 14px;
    color: var(--color-green);
    max-width: 520px;
  }

  .error-msg {
    background: var(--color-bg-secondary);
    border: 0.5px solid rgba(226, 75, 74, 0.3);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    font-size: 14px;
    color: #e24b4a;
  }

  @media (max-width: 768px) {
    .contact-layout { grid-template-columns: 1fr; }
    .contact-info { border-right: none; border-bottom: 0.5px solid var(--color-border); padding: var(--space-8) 0; }
    .form-wrapper { padding: var(--space-8) 0 0; }
    .form-row { grid-template-columns: 1fr; }
  }
</style>
