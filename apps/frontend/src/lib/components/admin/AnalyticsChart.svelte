<script lang="ts">
  import type { DailyStat } from '$lib/types'

  let { stats }: { stats: DailyStat[] } = $props()

  const padding = { top: 20, right: 35, bottom: 30, left: 45 }
  const height = 240
  let width = $state(0) // Start at 0 to avoid initial flicker

  // Ensure we have data even if empty
  const safeStats = $derived(stats && stats.length > 1 ? stats : [
    { date: new Date(Date.now() - 86400000).toISOString(), hits: 0, unique: 0 },
    { date: new Date().toISOString(), hits: 0, unique: 0 }
  ])

  // Computed values
  const maxHits = $derived(Math.max(...safeStats.map(s => s.hits), 10))

  const points = $derived(safeStats.map((s, i) => {
    const usableWidth = Math.max(width, 100) - padding.left - padding.right
    const x = padding.left + (i / (safeStats.length - 1)) * usableWidth
    const y = height - padding.bottom - (s.hits / maxHits) * (height - padding.top - padding.bottom)
    return { x, y, ...s }
  }))

  const uniquePoints = $derived(safeStats.map((s, i) => {
    const usableWidth = Math.max(width, 100) - padding.left - padding.right
    const x = padding.left + (i / (safeStats.length - 1)) * usableWidth
    const y = height - padding.bottom - (s.unique / maxHits) * (height - padding.top - padding.bottom)
    return { x, y }
  }))

  // Generate SVG path for line
  function generatePath(pts: {x: number, y: number}[]) {
    if (pts.length === 0) return ''
    return pts.reduce((acc, p, i) =>
      i === 0 ? `M ${p.x},${p.y}` : `${acc} L ${p.x},${p.y}`, ''
    )
  }

  // Generate smooth area path
  const areaPath = $derived(`${generatePath(points)} L ${width - padding.right},${height - padding.bottom} L ${padding.left},${height - padding.bottom} Z`)
  const linePath = $derived(generatePath(points))
  const uniqueLinePath = $derived(generatePath(uniquePoints))

  // Helpers
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { weekday: 'short' })
  }
</script>

<div class="chart-container" bind:clientWidth={width}>
  <div class="chart-header">
    <div class="legend">
      <div class="legend-item">
        <span class="dot hits"></span>
        <span>Total Hits</span>
      </div>
      <div class="legend-item">
        <span class="dot unique"></span>
        <span>Unique</span>
      </div>
    </div>
  </div>

  {#if width > 0}
    <svg width="100%" {height} viewBox="0 0 {width} {height}">
      <!-- Gradients -->
      <defs>
        <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="var(--color-accent)" stop-opacity="0.15" />
          <stop offset="100%" stop-color="var(--color-accent)" stop-opacity="0" />
        </linearGradient>
      </defs>

      <!-- Grid lines (Y axis) -->
      {#each Array(5) as _, i}
        {@const y = padding.top + (i / 4) * (height - padding.top - padding.bottom)}
        {@const val = Math.round(maxHits - (i / 4) * maxHits)}
        <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} class="grid-line" />
        <text x={padding.left - 10} y={y + 4} class="axis-text y-axis">{val}</text>
      {/each}

      <!-- Area under curve -->
      <path d={areaPath} fill="url(#areaGradient)" />

      <!-- Line (Total Hits) -->
      <path d={linePath} fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-linejoin="round" />

      <!-- Line (Unique Visitors) -->
      <path d={uniqueLinePath} fill="none" stroke="var(--color-text-3)" stroke-width="1.5" stroke-dasharray="4 2" stroke-linejoin="round" />

      <!-- Points and labels (X axis) -->
      {#each points as p, i}
        <text x={p.x} y={height - 5} class="axis-text x-axis" text-anchor="middle">
          {formatDate(p.date)}
        </text>

        <!-- Interactive points -->
        <circle cx={p.x} cy={p.y} r="3" fill="var(--color-accent)" class="point" />
        <circle cx={p.x} cy={uniquePoints[i].y} r="2.5" fill="var(--color-text-3)" class="point" />
      {/each}
    </svg>
  {/if}
</div>

<style>
  .chart-container {
    width: 100%;
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    margin-bottom: var(--space-8);
    overflow: hidden;
    box-sizing: border-box;
  }

  .chart-header {
    display: flex;
    justify-content: flex-end;
    margin-bottom: var(--space-4);
  }

  .legend {
    display: flex;
    gap: var(--space-4);
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    color: var(--color-text-3);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .dot.hits { background: var(--color-accent); }
  .dot.unique { background: var(--color-text-3); border: 1px dashed var(--color-text-3); background: none; }

  svg {
    display: block;
  }

  .grid-line {
    stroke: var(--color-border);
    stroke-width: 0.5;
    stroke-dasharray: 2 2;
  }

  .axis-text {
    font-size: 10px;
    fill: var(--color-text-3);
    font-family: var(--font-mono);
    pointer-events: none;
  }

  .y-axis { text-anchor: end; }

  .point {
    transition: r 0.2s ease;
  }

  .point:hover {
    r: 5;
  }
</style>
