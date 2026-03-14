<script lang="ts">
  import '../app.css'
  import Navbar from '$lib/components/layout/Navbar.svelte'
  import Footer from '$lib/components/layout/Footer.svelte'
  import { theme } from '$lib/stores'

  let { children } = $props()

  $effect(() => {
    const t = localStorage.getItem('theme')
    if (t) theme.set(t as 'light' | 'dark')
  })
</script>

<div class="layout">
  <Navbar />
  <main class="main page-enter">
    {@render children()}
  </main>
  <Footer />
</div>

<style>
  .layout {
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
  }

  .main {
    flex: 1;
  }
</style>
