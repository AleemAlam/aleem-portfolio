import { Suspense, useEffect, useState } from 'react'
import Clock from './components/Clock'
import Scene from './components/Scene'
import Stat from './components/Stat'
import {
  education,
  featuredSystems,
  jobs,
  pillars,
  profile,
  skills,
  stats,
  ticker,
} from './data/resume'

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'systems', label: 'Projects' },
  { id: 'work', label: 'Experience' },
  { id: 'toolkit', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
]

function CopyButton({ text, label, display }: { text: string; label: string; display?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`copy-chip ${copied ? 'is-copied' : ''}`}
      aria-label={`Copy ${label}: ${text}`}
      title={`Click to copy ${label}`}
    >
      <span className="copy-chip-label">{label}</span>
      <span className="copy-chip-value">{display ?? text}</span>
      <span className="copy-chip-status">{copied ? '✓ Copied' : 'Copy'}</span>
    </button>
  )
}

function Topbar({
  isNight,
  onToggleNight,
}: {
  isNight: boolean
  onToggleNight: () => void
}) {
  return (
    <header className="topbar">
      <div className="topbar-inner wrap">
        <a className="brand" href="#top" aria-label="Aleem Alam, back to top">
          <span className="brand-cube" aria-hidden="true">
            <img src="/aleem-3d-cutout.png" alt="" className="brand-avatar" />
          </span>
          <span className="brand-text">
            <strong>Aleem Alam</strong>
            <span>Web3 · AI Agents · Full-Stack</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          <ul>
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="topbar-actions">
          <div className="topbar-clock" aria-label="Current time in Delhi">
            <span className="status-dot" aria-hidden="true" />
            <Clock />
          </div>

          <button
            type="button"
            onClick={onToggleNight}
            className="mode-toggle-btn"
            aria-label={isNight ? 'Switch to Warm Day Studio' : 'Switch to Night Studio'}
            title="Toggle Day / Night 3D Studio Lighting"
          >
            <span>{isNight ? '☀️ Day Studio' : '🌙 Night Studio'}</span>
          </button>

          <a className="btn btn-primary btn-sm" href="#contact">
            Get in Touch
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero({
  isNight,
  onToggleNight,
}: {
  isNight: boolean
  onToggleNight: () => void
}) {
  const [avatarMode, setAvatarMode] = useState<'3d' | 'photo'>('3d')

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-grid">
        {/* Left Column: David Heckhoff-style Bold Typography + 3D Clay Avatar Badge + Clear Content */}
        <div className="hero-content">
          <div className="hero-identity-row">
            <div className="avatar-showcase-pill">
              <div className="avatar-thumb-frame">
                <img
                  src={avatarMode === '3d' ? '/aleem-3d-cutout.png' : profile.avatar}
                  alt="Aleem Alam"
                  className="avatar-thumb-img"
                />
              </div>
              <div className="avatar-pill-meta">
                <span className="availability-inline">
                  <span className="pulse-dot" /> Open to Senior / Lead Roles
                </span>
                <div className="avatar-switch-btns" role="group" aria-label="Switch avatar view">
                  <button
                    type="button"
                    onClick={() => setAvatarMode('3d')}
                    className={avatarMode === '3d' ? 'active' : ''}
                  >
                    3D Avatar
                  </button>
                  <button
                    type="button"
                    onClick={() => setAvatarMode('photo')}
                    className={avatarMode === 'photo' ? 'active' : ''}
                  >
                    Real Photo
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-headline-block">
            <h1 id="hero-title" className="hero-name-giant">
              Aleem
              <br />
              Alam
            </h1>
            <div className="tilted-sticker-row">
              <span className="tilted-sticker sticker-navy">SENIOR FULL-STACK ENGINEER</span>
              <span className="tilted-sticker sticker-violet">AI AGENTS &amp; WEB3 · $300M+</span>
            </div>
          </div>

          <p className="hero-summary">
            Lead Engineer on{' '}
            <a href="https://polkasafe.xyz" target="_blank" rel="noreferrer" className="inline-link">
              Polkasafe
            </a>{' '}
            (multisig platform securing <strong>$300M+</strong>) and Senior Engineer on{' '}
            <a href="https://polkassembly.io" target="_blank" rel="noreferrer" className="inline-link">
              Polkassembly
            </a>
            . Building production <strong>AI agent systems</strong> end to end — lightweight intent routing (
            <strong>1/60th cost</strong>), tool calling, and LLM-as-judge evals (<strong>4.55/5</strong>).
          </p>

          <div className="hero-cta-row">
            <a className="btn btn-primary btn-lg" href="#systems">
              Explore Flagship Work ↓
            </a>
            <a className="btn btn-secondary btn-lg" href={profile.resume} target="_blank" rel="noreferrer">
              Résumé PDF ↗
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a className="btn btn-ghost btn-lg" href={profile.twitter} target="_blank" rel="noreferrer">
              @AleemAlam4 ↗
            </a>
          </div>

          <div className="hero-quick-bar">
            <CopyButton text={profile.email} label="Email" />
            <CopyButton text={profile.phone} label="Phone" />
          </div>
        </div>

        {/* Right Column: Interactive 3D Isometric Developer Studio (Three.js / React Three Fiber) */}
        <div className="hero-studio-col">
          <div className="studio-stage-card">
            <Suspense
              fallback={
                <div className="studio-fallback">
                  <img src="/aleem-3d-cutout.png" alt="Aleem 3D Avatar" className="studio-fallback-img" />
                  <p>Loading 3D Isometric Studio…</p>
                </div>
              }
            >
              <Scene
                isNight={isNight}
                onToggleNight={onToggleNight}
                onSelectSection={scrollToSection}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  )
}

function Ticker() {
  const items = [...ticker, ...ticker]
  return (
    <div className="ticker-band" aria-hidden="true">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            {t}
            <i className="ticker-sep">●</i>
          </span>
        ))}
      </div>
    </div>
  )
}

function AboutAndPillarsSection() {
  const [showPhoto, setShowPhoto] = useState(false)

  return (
    <section id="about" className="section wrap" aria-labelledby="about-title">
      <div className="section-header">
        <div>
          <span className="sticker-tag">01 // ABOUT &amp; EXPERTISE</span>
          <h2 id="about-title" className="section-heading">
            5+ Years Shipping High-Stakes Web3 &amp; Autonomous AI
          </h2>
        </div>
        <p className="section-sub">
          Combining production frontend/full-stack leadership with an MSc in Applied Data Analytics &amp; AI.
        </p>
      </div>

      {/* Featured Character + Bio Card */}
      <div className="about-hero-card">
        <div className="about-avatar-stage">
          <div className="about-avatar-frame">
            <img
              src={showPhoto ? profile.avatar : '/aleem-3d.jpg'}
              alt="Aleem Alam — 3D Clay Avatar and Real Portrait"
              className="about-avatar-img"
            />
          </div>
          <div className="about-avatar-toggle">
            <button
              type="button"
              onClick={() => setShowPhoto(false)}
              className={`clay-pill ${!showPhoto ? 'active' : ''}`}
            >
              ✨ 3D Clay Avatar
            </button>
            <button
              type="button"
              onClick={() => setShowPhoto(true)}
              className={`clay-pill ${showPhoto ? 'active' : ''}`}
            >
              📷 Real Portrait
            </button>
          </div>
        </div>

        <div className="about-bio-content">
          <div className="about-bio-badges">
            <span className="clay-badge badge-amber">Founding / Lead Engineer @ Polka Labs</span>
            <span className="clay-badge badge-violet">MSc Applied AI · Vistula University</span>
          </div>
          <h3>Engineering systems where accuracy, security, and latency matter.</h3>
          <p>{profile.summary}</p>
          <div className="about-quick-facts">
            <div>
              <span>Base</span>
              <strong>{profile.location}</strong>
            </div>
            <div>
              <span>Flagship Web3</span>
              <strong>Polkasafe ($300M+ TVL) &amp; Polkassembly</strong>
            </div>
            <div>
              <span>Flagship AI</span>
              <strong>Elvz AI (4.55/5 Eval · 1/60th Cost)</strong>
            </div>
          </div>
        </div>
      </div>

      <div className="pillars-grid">
        {pillars.map((pillar) => (
          <article key={pillar.id} className="pillar-card">
            <div className="pillar-top">
              <span className="pillar-index">{pillar.index}</span>
              <span className="pillar-subtitle">{pillar.subtitle}</span>
            </div>
            <h3 className="pillar-title">{pillar.title}</h3>
            <p className="pillar-desc">{pillar.description}</p>
            <ul className="pillar-list">
              {pillar.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <div className="tag-row">
              {pillar.tags.map((t) => (
                <span key={t} className="tag-chip">
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function ElvzArchitecturePreview() {
  return (
    <div className="sys-preview elvz-preview" aria-label="Elvz AI Architecture & Eval Benchmark">
      <div className="preview-topbar">
        <span className="preview-title">
          <span className="live-dot" /> elvz-agent-orchestrator // production pipeline
        </span>
        <span className="preview-badge">Eval Quality: 4.55 / 5.0</span>
      </div>

      <div className="agent-flow-grid">
        <div className="flow-node">
          <span className="node-step">01 · Ingestion</span>
          <strong>Brand &amp; Voice Input</strong>
          <p>Website crawler, social accounts &amp; Telegram voice notes</p>
        </div>

        <div className="flow-node flow-node-accent">
          <span className="node-step">02 · Intent Router</span>
          <strong>Lightweight Classifier</strong>
          <p>86% vs 87% Gemini accuracy · 3–8× faster · 1/60th cost</p>
        </div>

        <div className="flow-node">
          <span className="node-step">03 · Tool-Calling Agents</span>
          <strong>Durable Background Jobs</strong>
          <p>Checkpoints, retries &amp; async image/video media pipelines</p>
        </div>

        <div className="flow-node">
          <span className="node-step">04 · Multi-Platform Publish</span>
          <strong>Official Social APIs</strong>
          <p>Autonomous scheduling to Meta, LinkedIn, TikTok &amp; YouTube</p>
        </div>
      </div>

      <div className="eval-benchmark-bar">
        <div className="eval-bar-labels">
          <span>LLM-as-Judge Eval Harness Progression</span>
          <strong>Baseline 3.60 → Production 4.55 / 5 (+26.4%)</strong>
        </div>
        <div className="eval-track">
          <div className="eval-fill-baseline" style={{ width: '72%' }} />
          <div className="eval-fill-upgraded" style={{ width: '91%' }} />
        </div>
      </div>
    </div>
  )
}

function PolkasafeVaultPreview() {
  return (
    <div className="sys-preview vault-preview" aria-label="Polkasafe Multisig Treasury Interface Preview">
      <div className="preview-topbar">
        <span className="preview-title">
          <span className="live-dot" /> polkasafe.xyz · treasurease.xyz
        </span>
        <span className="preview-badge">safe-global + polkadot.js</span>
      </div>

      <div className="vault-balance-box">
        <div>
          <span className="vault-caption">TOTAL TREASURY ASSETS SECURED</span>
          <p className="vault-amount">$300,000,000+</p>
        </div>
        <div className="chain-badges">
          <span>Polkadot</span>
          <span>Kusama</span>
          <span>Ethereum</span>
          <span>Polygon</span>
        </div>
      </div>

      <div className="vault-tx-card">
        <div className="vault-tx-head">
          <span>Multisig Call #1048 · Treasury Execution</span>
          <span className="tx-status">3 / 4 Signers Approved</span>
        </div>
        <div className="signer-pills">
          <span className="signer signed">✓ Signer 01 (Polkadot.js)</span>
          <span className="signer signed">✓ Signer 02 (Ledger)</span>
          <span className="signer signed">✓ Signer 03 (Safe)</span>
          <span className="signer pending">⏳ Signer 04 (Awaiting)</span>
        </div>
      </div>
    </div>
  )
}

function PolkassemblyGovPreview() {
  return (
    <div className="sys-preview gov-preview" aria-label="Polkassembly OpenGov Referendum Preview">
      <div className="preview-topbar">
        <span className="preview-title">
          <span className="live-dot" /> polkassembly.io // subsquid-indexer
        </span>
        <span className="preview-badge">Real-Time On-Chain Sync</span>
      </div>

      <div className="gov-proposal-box">
        <div className="gov-prop-meta">
          <span className="gov-track-pill">OpenGov · Treasurer Track</span>
          <span className="gov-status-pill">Deciding · Passing</span>
        </div>
        <p className="gov-prop-title">Proposal Discovery, Conviction Voting &amp; On-Chain Identity Flows</p>
        <div className="gov-vote-bar">
          <div className="vote-aye" style={{ width: '78%' }} />
          <div className="vote-nay" style={{ width: '22%' }} />
        </div>
        <div className="gov-vote-legend">
          <span>▲ Aye: 78.4% (Conviction 4x)</span>
          <span>▼ Nay: 21.6%</span>
        </div>
      </div>

      <div className="ecosystem-strip">
        <span>Also shipped at Polka Labs:</span>
        <strong>Townhall</strong>
        <strong>blobscriptions.xyz</strong>
      </div>
    </div>
  )
}

function FeaturedSystemsSection() {
  return (
    <section id="systems" className="section wrap" aria-labelledby="systems-title">
      <div className="section-header">
        <div>
          <span className="sticker-tag">02 // FEATURED PROJECTS &amp; SYSTEMS</span>
          <h2 id="systems-title" className="section-heading">
            Flagship Production Work
          </h2>
        </div>
        <p className="section-sub">
          From multi-agent AI platforms with custom evaluation harnesses to decentralized multisig treasuries securing
          over $300M+.
        </p>
      </div>

      <div className="systems-stack">
        {featuredSystems.map((sys) => (
          <article key={sys.id} id={`system-${sys.slug}`} className="system-card">
            <div className="system-card-info">
              <div className="system-meta-row">
                <span className="system-badge">{sys.badge}</span>
                <span className="system-period">
                  {sys.role} · {sys.period}
                </span>
              </div>

              <h3 className="system-name">{sys.name}</h3>
              <p className="system-headline">{sys.headline}</p>
              <p className="system-desc">{sys.description}</p>

              <div className="system-metrics-grid">
                {sys.metrics.map((m) => (
                  <div key={m.label} className="sys-metric">
                    <strong>{m.value}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>

              <ul className="system-points">
                {sys.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>

              <div className="system-footer">
                <div className="tag-row">
                  {sys.stack.map((s) => (
                    <span key={s} className="tag-chip">
                      {s}
                    </span>
                  ))}
                </div>

                {sys.links.length > 0 && (
                  <div className="system-links">
                    {sys.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className={`btn ${link.primary ? 'btn-primary' : 'btn-secondary'} btn-sm`}
                      >
                        {link.label} ↗
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="system-card-visual">
              {sys.id === 'elvz-ai' && <ElvzArchitecturePreview />}
              {sys.id === 'polkasafe' && <PolkasafeVaultPreview />}
              {sys.id === 'polkassembly' && <PolkassemblyGovPreview />}
            </div>
          </article>
        ))}
      </div>

      <div className="research-banner">
        <div className="research-banner-left">
          <span className="sticker-tag">AI RESEARCH PUBLICATION · VISTULA UNIVERSITY</span>
          <h3>Enhancing Small Language Models with Controllers: Efficient &amp; Constrained Token Generation</h3>
          <p>
            Co-authored research exploring controller-guided token generation for Small Language Models (SLMs) on
            structured tasks—directly informing my production work on lightweight classifiers and cost-efficient agent
            routing.
          </p>
        </div>
        <div className="research-banner-right">
          <div className="research-stat">
            <strong>MSc Engineering</strong>
            <span>Applied Data Analytics &amp; AI (2024–2025)</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkSection() {
  return (
    <section id="work" className="section wrap" aria-labelledby="work-title">
      <div className="section-header">
        <div>
          <span className="sticker-tag">03 // WORK EXPERIENCE</span>
          <h2 id="work-title" className="section-heading">
            Career Timeline
          </h2>
        </div>
        <p className="section-sub">
          {jobs.length} organizations across Web3 infrastructure, B2B fintech/HRMS SaaS, customer onboarding, and
          engineering mentorship.
        </p>
      </div>

      <ol className="timeline">
        {jobs.map((job, idx) => (
          <li key={job.company} id={`job-${job.company.toLowerCase().replace(/\s+/g, '-')}`} className="timeline-item">
            <div className="timeline-marker" aria-hidden="true">
              <span>{String(jobs.length - idx).padStart(2, '0')}</span>
            </div>

            <div className="timeline-card">
              <div className="timeline-head">
                <div>
                  <div className="timeline-company-row">
                    <h3 className="timeline-company">{job.company}</h3>
                    {job.badge && <span className="company-badge">{job.badge}</span>}
                  </div>
                  <p className="timeline-blurb">{job.blurb}</p>
                </div>
                <div className="timeline-meta">
                  <span className="timeline-period">{job.period}</span>
                  <span className="timeline-loc">{job.location}</span>
                </div>
              </div>

              <div className="timeline-roles">
                {job.roles.map((role) => (
                  <article key={role.title} className="role-block">
                    <div className="role-header">
                      <h4>{role.title}</h4>
                      <div className="role-links">
                        {role.link && (
                          <a href={role.link.href} target="_blank" rel="noreferrer" className="role-link-chip">
                            {role.link.label} ↗
                          </a>
                        )}
                        {role.secondaryLink && (
                          <a
                            href={role.secondaryLink.href}
                            target="_blank"
                            rel="noreferrer"
                            className="role-link-chip"
                          >
                            {role.secondaryLink.label} ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <ul className="role-points">
                      {role.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

function ToolkitSection() {
  const [activeGroup, setActiveGroup] = useState<string>('All')
  const filteredSkills = activeGroup === 'All' ? skills : skills.filter((s) => s.group === activeGroup)

  return (
    <section id="toolkit" className="section wrap" aria-labelledby="toolkit-title">
      <div className="section-header">
        <div>
          <span className="sticker-tag">04 // TECHNICAL TOOLKIT &amp; EDUCATION</span>
          <h2 id="toolkit-title" className="section-heading">
            Stack, Architecture &amp; Credentials
          </h2>
        </div>

        <div className="filter-pills" role="tablist" aria-label="Filter skills by category">
          {['All', ...skills.map((s) => s.group)].map((group) => (
            <button
              key={group}
              type="button"
              role="tab"
              aria-selected={activeGroup === group}
              onClick={() => setActiveGroup(group)}
              className={`filter-pill ${activeGroup === group ? 'active' : ''}`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      <div className="skills-bento">
        {filteredSkills.map((s) => (
          <div key={s.group} className="skill-group-card">
            <div className="skill-group-head">
              <h3>{s.group}</h3>
              <span>{s.items.length} tools</span>
            </div>
            <ul className="skill-chips">
              {s.items.map((item) => (
                <li key={item} className="skill-chip">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div id="education" className="education-block">
        <h3 className="sub-heading">Education &amp; Academic Credentials</h3>
        <div className="education-grid">
          {education.map((e) => (
            <article key={e.degree} className="edu-card">
              <span className="edu-period">{e.period}</span>
              <h4 className="edu-degree">{e.degree}</h4>
              <p className="edu-school">{e.school}</p>
              {e.highlight && <p className="edu-highlight">{e.highlight}</p>}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section id="contact" className="section wrap" aria-labelledby="contact-title">
      <div className="contact-card">
        <div className="contact-grid">
          <div className="contact-left">
            <span className="tilted-sticker sticker-navy">05 // SAY HELLO</span>
            <h2 id="contact-title" className="contact-heading">
              Let’s build high-leverage AI &amp; Web3 products together.
            </h2>
            <p className="contact-sub">
              Whether you need someone to lead frontend architecture on a mission-critical protocol or build autonomous
              AI agents with measurable eval quality and cost control—reach out directly.
            </p>

            <div className="contact-cta-group">
              <a className="btn btn-primary btn-lg" href={`mailto:${profile.email}`}>
                Email {profile.email} →
              </a>
              <a className="btn btn-secondary btn-lg" href={profile.resume} target="_blank" rel="noreferrer">
                Download Résumé PDF ↗
              </a>
            </div>
          </div>

          <div className="contact-right">
            <div className="contact-channels">
              <div className="channel-row">
                <div>
                  <span className="channel-label">Direct Email</span>
                  <a href={`mailto:${profile.email}`} className="channel-val">
                    {profile.email}
                  </a>
                </div>
                <CopyButton text={profile.email} label="Email" display="Copy" />
              </div>

              <div className="channel-row">
                <div>
                  <span className="channel-label">Phone / WhatsApp</span>
                  <a href={`tel:${profile.phone.replace(/\s+/g, '')}`} className="channel-val">
                    {profile.phone}
                  </a>
                </div>
                <CopyButton text={profile.phone} label="Phone" display="Copy" />
              </div>

              <div className="channel-row">
                <div>
                  <span className="channel-label">GitHub</span>
                  <a href={profile.github} target="_blank" rel="noreferrer" className="channel-val">
                    github.com/AleemAlam ↗
                  </a>
                </div>
                <span className="channel-tag">86+ Repos</span>
              </div>

              <div className="channel-row">
                <div>
                  <span className="channel-label">X / Twitter</span>
                  <a href={profile.twitter} target="_blank" rel="noreferrer" className="channel-val">
                    @AleemAlam4 ↗
                  </a>
                </div>
                <span className="channel-tag">DM Open</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  const [isNight, setIsNight] = useState(false)

  useEffect(() => {
    document.documentElement.setAttribute('data-studio', isNight ? 'night' : 'day')
  }, [isNight])

  return (
    <div className={`app-shell ${isNight ? 'studio-night' : 'studio-day'}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Topbar isNight={isNight} onToggleNight={() => setIsNight((v) => !v)} />
      <main id="main">
        <Hero isNight={isNight} onToggleNight={() => setIsNight((v) => !v)} />
        <section className="stats-section wrap" aria-label="Key impact metrics">
          <div className="stats-grid">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} detail={s.detail} />
            ))}
          </div>
        </section>
        <Ticker />
        <AboutAndPillarsSection />
        <FeaturedSystemsSection />
        <WorkSection />
        <ToolkitSection />
        <ContactSection />
      </main>
      <footer className="footer wrap">
        <div className="footer-inner">
          <p>
            © {new Date().getFullYear()} <strong>{profile.name}</strong> · Senior Full-Stack Engineer · Built with React
            Three Fiber &amp; Three.js
          </p>
          <div className="footer-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.twitter} target="_blank" rel="noreferrer">
              X / Twitter
            </a>
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.resume} target="_blank" rel="noreferrer">
              Résumé PDF
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
