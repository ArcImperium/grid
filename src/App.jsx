import {useState, useEffect, useRef} from 'react'
import './App.css'
import Stage0 from './Stage0.jsx'
import Save from './Save.jsx'

function App() {
  useEffect(() => {
    document.title="Grid Painter"
  }, [])

  const [cursorType, setCursorType] = useState('default')

  const [mode0, setMode0] = useState(true)
  const [mode1, setMode1] = useState(false)
  const [mode2, setMode2] = useState(false)

  const [stage, setStage] = useState(0)
  const [stageRegion, setStageRegion] = useState(null)

  const [color, setColor] = useState("#000000")
  const [prevColor, setPrevColor] = useState("#000000")
  const [size, setSize] = useState(2)

  const fullCanvasRef = useRef(null)

  const [showPopup, setShowPopup] = useState(false)
  const [preview, setPreview] = useState(null)

  function setEraser() {
    setPrevColor(color)
    setColor("#ffffff")
  }
  function setPaint() {
    setColor(prevColor)
  }

  function handleClick1(region) {
    if (stage === 0) {
      setStage(1)
      setStageRegion(region)
    }
    else if (stage === 1) {
      setStage(2)
      setStageRegion(prev => prev + region)
    }
  }

  function handleBack() {
    if (stage === 2) {
      setStage(1)
      setStageRegion(prev => prev[0])
    }
    else if (stage === 1) {
      setStage(0)
      setStageRegion(null)
    }
  }

  function handlePreview() {
    const canvas = fullCanvasRef.current
    if (!canvas) {return}
    const image = canvas.toDataURL("image/png")
    setPreview(image)
  }
  function handleDownload() {
    const canvas = fullCanvasRef.current 
    if (!canvas) {return}
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = "grid_painting.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
    {showPopup && (<Save handleDownload={handleDownload} setShowPopup={setShowPopup} preview={preview}/>)}
    <div className="layer" style={{cursor: cursorType}}>
      <div className="sidebar">
        <div style={{height: '5%'}}></div>
        {!mode0 && (<button className="mode-button" onClick={() => {setMode0(true); setMode1(false); setMode2(false); setCursorType('default'); setPaint()}}>SELECT</button>)}
        {mode0 && (<button className="mode-button not">SELECT</button>)}
        {!mode1 && (<button className="mode-button" onClick={() => {setMode0(false); setMode1(true); setMode2(false); setCursorType('crosshair'); setPaint()}}>PAINT</button>)}
        {mode1 && (<button className="mode-button not">PAINT</button>)}
        {!mode2 && (<button className="mode-button" onClick={() => {setMode0(false); setMode1(false); setMode2(true); setCursorType('pointer'); setEraser()}}>ERASE</button>)}
        {mode2 && (<button className="mode-button not">ERASE</button>)}
        {mode0 && (<button className="mode-button" onClick={() => {setShowPopup(true); handlePreview()}}>SAVE</button>)}
        {!mode0 && (<button className="mode-button not">SAVE</button>)}
        {((stage > 0) && mode0) && (<button className="mode-button" onClick={() => {handleBack()}}>BACK</button>)}
        {((stage === 0) || !mode0) && (<button className="mode-button not">BACK</button>)}
      </div>
      <div className="grid-container">
        <Stage0 stage={stage} stageRegion={stageRegion} color={color} size={size} mode0={mode0} handleClick1={handleClick1} fullCanvasRef={fullCanvasRef}/>
      </div>
      <div className="painter-tool">
        {mode0 && (<input type="color" value={color} onChange={(e) => {setColor(e.target.value); setPrevColor(e.target.value)}} className="color-picker"/>)}
        {!mode0 && (<div className="color-picker-fake" style={{backgroundColor: color}}></div>)}
        <input type="range" min="1" max="20" step="1" value={size} onChange={(e) => {if (mode0) {setSize(e.target.value)}}} className="size-picker"/>
        <h2 className="size">SIZE: {size}</h2>
      </div>
    </div>
    </>
  )
}

export default App
