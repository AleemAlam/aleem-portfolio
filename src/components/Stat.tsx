import { useEffect, useRef } from 'react'

// "$300M+" → ["$", "300", "M+"]. Values that don't fit (e.g. "1/60") render static.
const NUMERIC = /^(\D*)(\d+(?:\.\d+)?)(\D*)$/
const DURATION_MS = 1100

type StatProps = { value: string; label: string; detail?: string }

export default function Stat({ value, label, detail }: StatProps) {
  const counter = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = counter.current
    const match = value.match(NUMERIC)
    if (!el || !match || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const [, prefix, digits, suffix] = match
    const target = Number(digits)
    const decimals = digits.split('.')[1]?.length ?? 0
    const render = (n: number) => (el.textContent = prefix + n.toFixed(decimals) + suffix)
    let frame = 0

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const p = Math.min((now - start) / DURATION_MS, 1)
          render(target * (1 - (1 - p) ** 4))
          if (p < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.35 },
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = value
    }
  }, [value])

  return (
    <div className="stat-card">
      <p className="stat-value">
        <span className="sr-only">{value}</span>
        <span ref={counter} aria-hidden="true">
          {value}
        </span>
      </p>
      <p className="stat-label">{label}</p>
      {detail && <p className="stat-detail">{detail}</p>}
    </div>
  )
}
