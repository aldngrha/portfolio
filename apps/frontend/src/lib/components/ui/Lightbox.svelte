<script lang="ts">
  import { X, ChevronLeft, ChevronRight } from '@lucide/svelte'
  import { fade, fly } from 'svelte/transition'
  import { onMount } from 'svelte'

  interface Image {
    url: string
    caption?: string | null
  }

  let {
    images,
    index = 0,
    onclose
  }: {
    images: Image[],
    index: number,
    onclose: () => void
  } = $props()

  let currentIndex = $state(index)
  let direction = $state(1) // 1 untuk next, -1 untuk prev
  const currentImage = $derived(images[currentIndex])

  $effect(() => {
    currentIndex = index
  })

  function next() {
    direction = 1
    currentIndex = (currentIndex + 1) % images.length
  }

  function prev() {
    direction = -1
    currentIndex = (currentIndex - 1 + images.length) % images.length
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') onclose()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  function portal(node: HTMLElement) {
    document.body.appendChild(node)
    return {
      destroy() {
        if (node.parentNode) node.parentNode.removeChild(node)
      }
    }
  }

  onMount(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeydown)
    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeydown)
    }
  })
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="lightbox-overlay"
  use:portal
  transition:fade={{ duration: 250 }}
  onclick={onclose}
>
  <div class="lightbox-content" onclick={e => e.stopPropagation()}>

    <header class="top-bar">
      <button class="close-btn" onclick={onclose} aria-label="Close">
        <X size={28} />
      </button>
    </header>

    <main class="viewport">
      {#if images.length > 1}
        <button class="nav-btn prev" onclick={prev} aria-label="Previous">
          <ChevronLeft size={48} strokeWidth={1} />
        </button>
        <button class="nav-btn next" onclick={next} aria-label="Next">
          <ChevronRight size={48} strokeWidth={1} />
        </button>
      {/if}

      <div class="image-stage">
        {#key currentIndex}
          <div
            class="image-wrapper"
            in:fly={{ x: 40 * direction, opacity: 0, duration: 400 }}
            out:fade={{ duration: 200 }}
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption ?? 'Gallery image'}
            />
          </div>
        {/key}
      </div>
    </main>

    <footer class="bottom-bar">
      {#if currentImage.caption}
        <p class="caption" transition:fade={{ duration: 200 }}>{currentImage.caption}</p>
      {/if}

      {#if images.length > 1}
        <div class="counter">
          {currentIndex + 1} <span>/</span> {images.length}
        </div>
      {/if}
    </footer>

  </div>
</div>

<style>
  .lightbox-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100dvh; /* Kunci tinggi pake Dynamic Viewport Height */
    background: rgba(0, 0, 0, 0.98);
    backdrop-filter: blur(25px);
    z-index: 999999;
    display: flex;
    flex-direction: column;
    cursor: zoom-out;
    overscroll-behavior: none; /* Mencegah bounce scroll di iOS */
  }

  .lightbox-content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: default;
    overflow: hidden;
  }

  .top-bar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 var(--space-8);
    flex-shrink: 0;
    z-index: 20;
  }

  .viewport {
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 0;
  }

  .image-stage {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .image-wrapper {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 100px;
  }

  .image-wrapper img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    box-shadow: 0 40px 150px rgba(0, 0, 0, 0.9);
    user-select: none;
  }

  .bottom-bar {
    height: auto;
    min-height: 160px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: var(--space-5);
    padding: var(--space-4) var(--space-8) calc(var(--space-10) + env(safe-area-inset-bottom));
    flex-shrink: 0;
    z-index: 20;
  }

  .caption {
    color: white;
    font-size: 15px;
    text-align: center;
    max-width: 700px;
    line-height: 1.6;
    margin: 0;
    opacity: 0.9;
  }

  .counter {
    color: rgba(255, 255, 255, 0.5);
    font-size: 12px;
    font-family: var(--font-mono);
    letter-spacing: 0.3em;
    background: rgba(255, 255, 255, 0.06);
    padding: 6px 16px;
    border-radius: var(--radius-full);
  }

  .close-btn {
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s var(--ease);
  }

  .close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: rotate(90deg);
  }

  .nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: white;
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 30;
    transition: all 0.3s var(--ease);
    opacity: 0.4;
  }

  .nav-btn:hover {
    opacity: 1;
    background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
  }

  .nav-btn.prev { left: 0; }
  .nav-btn.next { right: 0; }

  @media (max-width: 768px) {
    .image-wrapper { padding: 0 var(--space-4); }
    .bottom-bar { min-height: 140px; padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom)); }
    .nav-btn { width: 60px; }
    .caption { font-size: 14px; }
  }
</style>
