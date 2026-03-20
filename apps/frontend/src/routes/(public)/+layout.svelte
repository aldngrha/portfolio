<script lang="ts">
  import Navbar from '$lib/components/layout/Navbar.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'
  import type { Snippet } from 'svelte'

  let { children }: { children?: Snippet } = $props()
</script>

<div class="layout">
  <Navbar />
  <main class="main page-enter">
    {@render children?.()}
  </main>
  <Footer />
</div>

<style>
  .layout {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }
  .main { flex: 1; }
</style>
