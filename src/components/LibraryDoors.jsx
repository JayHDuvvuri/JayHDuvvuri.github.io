import { useEffect, useState } from 'react'
import '../styles/entrance.css'

const entranceKey = 'jay-library-entered'

function shouldShowEntrance() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  return sessionStorage.getItem(entranceKey) !== 'true'
}

export default function LibraryDoors() {
  const [visible, setVisible] = useState(shouldShowEntrance)

  useEffect(() => {
    if (!visible) return undefined
    sessionStorage.setItem(entranceKey, 'true')
    const timer = window.setTimeout(() => setVisible(false), 2200)
    return () => window.clearTimeout(timer)
  }, [visible])

  if (!visible) return null

  return (
    <div className="library-entrance">
      <div className="door-frame" aria-hidden="true">
        <div className="library-door door-left"><div className="door-panels" /><span className="brass-handle" /></div>
        <div className="library-door door-right"><div className="door-panels" /><span className="brass-handle" /></div>
      </div>
      <button type="button" className="skip-intro" onClick={() => setVisible(false)}>Skip intro</button>
    </div>
  )
}
