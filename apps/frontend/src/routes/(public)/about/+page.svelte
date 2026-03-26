<script lang="ts">
  import Badge from '$lib/components/ui/Badge.svelte'
  import Button from '$lib/components/ui/Button.svelte'
  import { MapPin, Download, Gamepad2, Dumbbell, BookOpen, Brain } from '@lucide/svelte'
  import type { PageData } from './$types'

  let { data }: { data: PageData } = $props()
  const settings = $derived(data.settings)

  const experience = [
    {
      company: 'PT Sumber Kurnia Alam',
      role: 'Software Engineer & Sustainability Support',
      period: 'Aug 2025 – Present',
      current: true,
      desc: 'Building full-stack systems for traceability and certification across SKA\'s coffee supply chain. Supporting compliance with 4C and EUDR global standards.',
    },
    {
      company: 'Web3 Platform',
      role: 'Frontend Engineer',
      period: 'Feb – Apr 2025',
      current: false,
      desc: 'Developed high-performance frontend interfaces for a Web3 decentralized application, focusing on secure blockchain interactions, modular architecture, and seamless user experience.',
    },
    {
      company: 'CV Newus Technology',
      role: 'Lead Frontend Engineer',
      period: 'Mar 2024 – Apr 2025',
      current: false,
      desc: 'Led frontend development across web and mobile platforms. Delivered internal and client-facing apps used by 5+ departments, including government-sector dashboards.',
    },
    {
      company: 'Self-Employed',
      role: 'Software Engineer (Freelance)',
      period: 'Feb 2022 – Present',
      current: false,
      desc: 'Designed and developed web and mobile apps for various clients across healthcare, GIS, public services, and e-commerce.',
    },
  ]

  const skills = [
    {
      label: 'Frontend',
      items: ['SvelteKit', 'React', 'Next.js', 'React Native', 'TypeScript', 'TailwindCSS'],
    },
    {
      label: 'Backend & DB',
      items: ['Go', 'NestJS', 'Node.js', 'Laravel', 'PostgreSQL', 'MySQL', 'Docker'],
    },
    {
      label: 'Blockchain',
      items: ['Solana', 'Web3.js', 'Solidity', 'dApp'],
      blue: true,
    },
  ]

  const hobbies = [
    { icon: Gamepad2,  name: 'Gaming',   desc: 'Various genres' },
    { icon: Dumbbell,  name: 'Gym',      desc: 'Staying active' },
    { icon: BookOpen,  name: 'Reading',  desc: 'Tech & fiction' },
    { icon: Brain,     name: 'Learning', desc: 'Always curious' },
  ]
</script>

<svelte:head>
  <title>About — Aldi Nugraha</title>
  <meta name="description" content="Software engineer from Bandar Lampung with 3+ years of experience building web and mobile applications." />
</svelte:head>

<!-- ─── Hero ─────────────────────────────────────────────────────────────────── -->
<section class="hero">
  <div class="container hero-inner">
    <div class="hero-left">
      <div aria-hidden="true">
        <img class="avatar" src={settings.avatarUrl} alt="Aldi Nugraha" />
      </div>
      <div>
        <h1 class="name serif">Aldi Nugraha</h1>
        <p class="title">Software Engineer</p>
        <p class="location"><MapPin size={12} strokeWidth={1.5} /> Bandar Lampung, Indonesia</p>
        <p class="status">
          <span class="dot" aria-hidden="true"></span>
          Currently at PT Sumber Kurnia Alam — open to new opportunities
        </p>
      </div>
    </div>
    <Button
      href={settings.resumeUrl}
      variant="secondary"
      size="sm"
      target="_blank"
      rel="noopener noreferrer"
    >
      <Download size={14} strokeWidth={1.5} /> Download resume
    </Button>  </div>
</section>

<!-- ─── Bio ───────────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container bio">
    <p>
      I'm a software engineer from Bandar Lampung with 3+ years of experience building
      web and mobile applications across public services, healthcare, GIS, and e-commerce.
      I care about clean code, good UX, and shipping things that actually work.
    </p>
    <p>
      Lately I've been deep in the blockchain world — I worked on a Solana-based dApp
      and I'm actively exploring smart contracts and on-chain systems. Always looking
      for interesting problems to solve.
    </p>
  </div>
</section>

<!-- ─── Experience ────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <p class="section-label">Work experience</p>
    <ul class="exp-list">
      {#each experience as exp}
        <li class="exp-item">
          <div class="exp-main">
            <div class="exp-top">
              <span class="exp-company">{exp.company}</span>
              {#if exp.current}
                <Badge variant="green">Current</Badge>
              {/if}
            </div>
            <p class="exp-role">{exp.role}</p>
            <p class="exp-desc">{exp.desc}</p>
          </div>
          <span class="exp-period">{exp.period}</span>
        </li>
      {/each}
    </ul>
  </div>
</section>

<!-- ─── Education ─────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <p class="section-label">Education</p>
    <div class="edu-item">
      <div>
        <p class="edu-school">Universitas Teknokrat Indonesia</p>
        <p class="edu-degree">Bachelor of Informatics — GPA 3.48</p>
        <p class="edu-note">Final project: Marketplace system for hair barrier services (MERN Stack)</p>
      </div>
      <span class="exp-period">2018 – 2023</span>
    </div>
  </div>
</section>

<!-- ─── Skills ────────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <p class="section-label">Skills & tools</p>
    <div class="skills-grid">
      {#each skills as group}
        <div>
          <p class="skills-group-label">{group.label}</p>
          <div class="skills-tags">
            {#each group.items as item}
              <Badge variant={group.blue ? 'blue' : 'default'}>{item}</Badge>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ─── Languages ─────────────────────────────────────────────────────────── -->
<section class="section">
  <div class="container">
    <p class="section-label">Languages</p>
    <div class="lang-list">
      <Badge>🇮🇩 Indonesian — Native</Badge>
      <Badge>🇬🇧 English — Conversational</Badge>
    </div>
  </div>
</section>

<!-- ─── Hobbies ────────────────────────────────────────────────────────────── -->
<section class="section" style="border-bottom: none">
  <div class="container">
    <p class="section-label">Hobbies & interests</p>
    <div class="hobbies-grid">
      {#each hobbies as h}
        <div class="hobby-card">
          <span class="hobby-icon" aria-hidden="true"><h.icon size={22} strokeWidth={1.5} /></span>
          <p class="hobby-name">{h.name}</p>
          <p class="hobby-desc">{h.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .hero {
    border-bottom: 0.5px solid var(--color-border);
    padding: var(--space-10) 0 var(--space-8);
  }

  .hero-inner {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--space-6);
  }

  .hero-left {
    display: flex;
    gap: var(--space-5);
    align-items: flex-start;
  }

  .avatar {
    width: 56px;
    border-radius: 50%;
    background: var(--color-accent-soft);
    border: 1.5px solid var(--color-accent-border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
    color: var(--color-accent-hover);
    flex-shrink: 0;
    object-fit: cover;
    display: block;
  }

  .name {
    font-size: clamp(22px, 3vw, 28px);
    color: var(--color-text);
  }

  .title {
    font-size: clamp(13px, 1.1vw, 15px);
    color: var(--color-accent);
    margin-top: 2px;
  }

  .location {
    font-size: 13px;
    color: var(--color-text-3);
    margin-top: var(--space-1);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: 13px;
    color: var(--color-text-2);
    margin-top: var(--space-2);
  }

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--color-green);
    flex-shrink: 0;
  }

  /* Sections */
  .section {
    padding: var(--space-8) 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .section-label {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-text-3);
    margin-bottom: var(--space-4);
  }

  /* Bio */
  .bio {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    max-width: 600px;
  }

  .bio p {
    font-size: clamp(14px, 1.2vw, 16px);
    color: var(--color-text-2);
    line-height: 1.75;
  }

  /* Experience */
  .exp-list {
    display: flex;
    flex-direction: column;
  }

  .exp-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-6);
    align-items: start;
    padding: var(--space-5) 0;
    border-bottom: 0.5px solid var(--color-border);
  }

  .exp-item:last-child {
    border-bottom: none;
  }

  .exp-top {
    display: flex;
    align-items: center;
    gap: var(--space-2);
  }

  .exp-company {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
  }

  .exp-role {
    font-size: 13px;
    color: var(--color-accent);
    margin-top: 3px;
  }

  .exp-desc {
    font-size: 14px;
    color: var(--color-text-2);
    margin-top: var(--space-2);
    line-height: 1.6;
    max-width: 460px;
  }

  .exp-period {
    font-size: 12px;
    color: var(--color-text-3);
    white-space: nowrap;
    text-align: right;
  }

  /* Education */
  .edu-item {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--space-6);
    align-items: start;
    padding: var(--space-4) 0;
  }

  .edu-school {
    font-size: 15px;
    font-weight: 500;
    color: var(--color-text);
  }

  .edu-degree {
    font-size: 14px;
    color: var(--color-text-2);
    margin-top: 3px;
  }

  .edu-note {
    font-size: 12px;
    color: var(--color-text-3);
    margin-top: var(--space-1);
  }

  /* Skills */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-5);
  }

  .skills-group-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-text-3);
    margin-bottom: var(--space-2);
  }

  .skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-1);
  }

  /* Languages */
  .lang-list {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }

  /* Hobbies */
  .hobbies-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
  }

  .hobby-card {
    background: var(--color-bg-secondary);
    border: 0.5px solid var(--color-border);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-3);
    text-align: center;
  }

  .hobby-icon {
    font-size: 22px;
    display: block;
    margin-bottom: var(--space-2);
  }

  .hobby-name {
    font-size: 14px;
    font-weight: 500;
    color: var(--color-text);
  }

  .hobby-desc {
    font-size: 12px;
    color: var(--color-text-3);
    margin-top: 2px;
  }

  @media (max-width: 768px) {
    .hero-inner { flex-direction: column; }
    .skills-grid { grid-template-columns: 1fr 1fr; }
    .hobbies-grid { grid-template-columns: repeat(2, 1fr); }
    .exp-item { grid-template-columns: 1fr; }
    .edu-item { grid-template-columns: 1fr; }
  }
</style>
