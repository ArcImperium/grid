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
        <div style={{height: '5%'}}></div>
        <button className="mode-button" onClick={() => {setMode0(true); setMode1(false); setMode2(false); setCursorType('default')}}>SELECT</button>
        <button className="mode-button" onClick={() => {setMode0(false); setMode1(true); setMode2(false); setCursorType('crosshair')}}>PAINT</button>
        <button className="mode-button" onClick={() => {setMode0(false); setMode1(false); setMode2(true); setCursorType('pointer')}}>ERASE</button>
        <button className="back">BACK</button>
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
