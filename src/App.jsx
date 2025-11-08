import {useState, useEffect} from 'react'
import './App.css'

function App() {
  useEffect(() => {
    document.title="Grid Painter"
  }, [])

  const [cursorType, setCursorType] = useState('default')

  const [mode0, setMode0] = useState(true)
  const [mode1, setMode1] = useState(false)
  const [mode2, setMode2] = useState(false)

  return (
    <>
    <div className="layer" style={{cursor: cursorType}}>
      <div className="sidebar">

      </div>
      <div className="grid-container">

      </div>
      <div className="painter-tool">

      </div>
    </div>
    </>
  )
}

export default App
