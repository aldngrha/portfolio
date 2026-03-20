<script lang="ts">
  import { page } from '$app/stores'
  import Button from '$lib/components/ui/Button.svelte'
</script>

<svelte:head>
  <title>{$page.status} — Aldi Nugraha</title>
</svelte:head>

<div class="error-page">
  <div class="error-inner">
    <p class="error-code">{$page.status}</p>
    <h1 class="error-title serif">
      {$page.status === 404 ? 'Page not found.' : 'Something went wrong.'}
    </h1>
    <p class="error-desc">
      {$page.error?.message ?? ($page.status === 404 ? "The page you're looking for doesn't exist." : 'An unexpected error occurred.')}
    </p>
    <Button href="/" variant="secondary">← Back to home</Button>
  </div>
</div>

<style>
  .error-page {
    min-height: 60dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-8);
  }

  .error-inner {
    text-align: center;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-4);
  }

  .error-code {
    font-size: 72px;
    font-weight: 500;
    color: var(--color-accent);
    line-height: 1;
    letter-spacing: -0.04em;
  }

  .error-title {
    font-size: clamp(22px, 3vw, 30px);
    color: var(--color-text);
  }

  .error-desc {
    font-size: 14px;
    color: var(--color-text-2);
    line-height: 1.65;
  }
</style>
