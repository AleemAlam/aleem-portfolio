import { useEffect, useState } from 'react'

const TICK_MS = 15_000
const delhiTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Kolkata',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export default function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), TICK_MS)
    return () => clearInterval(id)
  }, [])
  return <time dateTime={now.toISOString()}>Delhi {delhiTime.format(now)} IST</time>
}
