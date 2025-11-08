import {useState, useEffect} from 'react'
import './App.css'
import Stage0 from './Stage0.jsx'

function App() {
  useEffect(() => {
    document.title="Grid Painter"
  }, [])

  const [cursorType, setCursorType] = useState('default')

  const [mode0, setMode0] = useState(true)
  const [mode1, setMode1] = useState(false)
  const [mode2, setMode2] = useState(false)

  const [stage, setStage] = useState(0)

  const [color, setColor] = useState("#000000")
  const [prevColor, setPrevColor] = useState("#000000")
  const [size, setSize] = useState(2)

  function setEraser() {
    setPrevColor(color)
    setColor("#ffffff")
  }
  function setPaint() {
    setColor(prevColor)
  }

  return (
    <>
    <div className="layer" style={{cursor: cursorType}}>
      <div className="sidebar">
        <div style={{height: '5%'}}></div>
        {!mode0 && (<button className="mode-button" onClick={() => {setMode0(true); setMode1(false); setMode2(false); setCursorType('default')}}>SELECT</button>)}
        {mode0 && (<button className="mode-button not">SELECT</button>)}
        {!mode1 && (<button className="mode-button" onClick={() => {setMode0(false); setMode1(true); setMode2(false); setCursorType('crosshair'); setPaint()}}>PAINT</button>)}
        {mode1 && (<button className="mode-button not">PAINT</button>)}
        {!mode2 && (<button className="mode-button" onClick={() => {setMode0(false); setMode1(false); setMode2(true); setCursorType('pointer'); setEraser()}}>ERASE</button>)}
        {mode2 && (<button className="mode-button not">ERASE</button>)}
        {((stage < 2) && mode0) && (<button className="back">BACK</button>)}
        {((stage === 2) || !mode0) && (<button className="back not">BACK</button>)}

      </div>
      <div className="grid-container">
        <Stage0 stage={stage} setStage={setStage} color={color} size={size} mode0={mode0}/>
      </div>
      <div className="painter-tool">
        <input type="color" value={color} onChange={(e) => {if (mode0) {setColor(e.target.value); setPrevColor(e.target.value)}}} className="color-picker"/>
        <input type="range" min="1" max="20" step="1" value={size} onChange={(e) => {if (mode0) {setSize(e.target.value)}}} className="size-picker"/>
        <h2 className="size">Size: {size}</h2>
      </div>
    </div>
    </>
  )
}

export default App
