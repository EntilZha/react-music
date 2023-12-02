import { useState } from 'react'
import { PolyRhythm } from './PolyRhythm'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Polyrhythms</h1>
      <div className="card">
          <PolyRhythm/>
      </div>
    </>
  )
}

export default App
