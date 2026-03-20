<script lang="ts">
  import { enhance } from '$app/forms'
  import type { ActionData } from './$types'

  let { form }: { form?: ActionData } = $props()
  let loading = $state(false)
</script>

<svelte:head><title>Login — Admin</title></svelte:head>

<div class="login-wrapper">
  <div class="login-card">
    <div class="login-header">
      <p class="login-brand">aldi nugraha</p>
      <h1 class="login-title">Admin login</h1>
    </div>

    {#if form?.error}
      <div class="error-msg">{form.error}</div>
    {/if}

    <form
      method="POST"
      use:enhance={() => {
        loading = true
        return async ({ update }) => {
          loading = false
          await update()
        }
      }}
      class="login-form"
    >
      <div class="field">
        <label for="email" class="field-label">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="admin@aldinugraha.me"
          required
          class="input"
          autocomplete="email"
        />
      </div>

      <div class="field">
        <label for="password" class="field-label">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          class="input"
          autocomplete="current-password"
        />
      </div>

      <button type="submit" class="submit-btn" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign in →'}
      </button>
    </form>
  </div>
</div>

<style>
  .login-wrapper {
    min-height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg);
    padding: var(--space-6);
  }

  .login-card {
    width: 100%;
    max-width: 360px;
    background: var(--color-surface);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: var(--space-8);
  }

  .login-header { margin-bottom: var(--space-6); }

  .login-brand {
    font-size: 12px;
    color: var(--color-text-3);
    margin-bottom: var(--space-2);
  }

  .login-title {
    font-size: 20px;
    font-weight: 500;
    color: var(--color-text);
  }

  .login-form {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .field { display: flex; flex-direction: column; gap: var(--space-1); }

  .field-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
  }

  .input {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-md);
    padding: var(--space-2) var(--space-3);
    font-size: 13px;
    font-family: var(--font-sans);
    color: var(--color-text);
    outline: none;
    transition: border-color var(--duration) var(--ease);
    width: 100%;
  }

  .input:focus { border-color: var(--color-accent); }

  .submit-btn {
    background: var(--color-accent);
    color: #fff;
    border-radius: var(--radius-full);
    padding: var(--space-3);
    font-size: 13px;
    font-family: var(--font-sans);
    font-weight: 500;
    width: 100%;
    margin-top: var(--space-2);
    transition: background var(--duration) var(--ease);
  }

  .submit-btn:hover { background: var(--color-accent-hover); }
  .submit-btn:disabled { opacity: 0.6; pointer-events: none; }

  .error-msg {
    background: var(--color-bg-secondary);
    border: 0.5px solid rgba(226, 75, 74, 0.3);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    font-size: 13px;
    color: #e24b4a;
    margin-bottom: var(--space-4);
  }
</style>
