import {useState, useRef, useEffect} from "react"

function Stage0({stage, color, size, mode0, zoom, handleClick, fullCanvasRef})  {
    const canvasRef = useRef()
    const [drawing, setDrawing] = useState(false)
    const lastPos = useRef({x: 0, y: 0})

    useEffect(() => {
        const canvas = canvasRef.current 
        const w = canvas.width 
        const h = canvas.height 

        if (!fullCanvasRef.current) {
            const fullCanvas = document.createElement("canvas")
            fullCanvas.width = w
            fullCanvas.height = h
            const fctx = fullCanvas.getContext("2d")
            fctx.fillStyle = "#ffffff"
            fctx.fillRect(0, 0, w, h)
            fullCanvasRef.current = fullCanvas
        }

        const ctx = canvas.getContext("2d")
        ctx.drawImage(fullCanvasRef.current, 0, 0, w, h, 0, 0, w, h)
    }, [])

    useEffect(() => {
        if (!canvasRef.current || !fullCanvasRef.current) {return}
        const canvas = canvasRef.current 
        const ctx = canvas.getContext("2d")
        const w = canvas.width 
        const h = canvas.height 

        const fCanvas = fullCanvasRef.current
        const fw = fCanvas.width 
        const fh = fCanvas.height 

        ctx.clearRect(0, 0, w, h)

        if (!zoom) {
            ctx.drawImage(fCanvas, 0, 0, fw, fh, 0, 0, w, h)
            return
        }

        let sx = 0, sy = 0, sw = fw / 2, sh = fh / 2
        if (zoom === "b") {sx = fw / 2}
        if (zoom === "c") {sy = fh / 2}
        if (zoom === "d") {sx = fw / 2; sy = fh / 2}

        ctx.drawImage(fCanvas, sx, sy, sw, sh, 0, 0, w, h)
    }, [zoom])

    function handleMouseActive(e) {
        if (mode0) {return}

        const rect = canvasRef.current.getBoundingClientRect()
        const canvas = canvasRef.current

        const scaleX = canvas.width / rect.width 
        const scaleY = canvas.height / rect.height
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        lastPos.current = {x, y}
        setDrawing(true) 
    }

    function handleMouseInactive() {
        if (mode0) {return}
        
        setDrawing(false)
    }

    function handleDraw(e) {
        if (!drawing) {return}
        if (mode0) {return}

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        const rect = canvas.getBoundingClientRect()

        const scaleX = canvas.width / rect.width 
        const scaleY = canvas.height / rect.height
        const x = (e.clientX - rect.left) * scaleX
        const y = (e.clientY - rect.top) * scaleY

        ctx.beginPath()
        ctx.moveTo(lastPos.current.x, lastPos.current.y)
        ctx.lineTo(x, y)
        ctx.strokeStyle = color
        ctx.lineWidth = size
        ctx.lineCap = "round"
        ctx.stroke()
        ctx.closePath()

        const fctx = fullCanvasRef.current.getContext("2d")
        fctx.beginPath()
        fctx.moveTo(lastPos.current.x, lastPos.current.y)
        fctx.lineTo(x, y)
        fctx.strokeStyle = color
        fctx.lineWidth = size
        fctx.lineCap = "round"
        fctx.stroke()
        fctx.closePath()

        lastPos.current = {x, y}
    }
    
    return(
        <>
        {((stage >= 0) && mode0) && (<>
        <div className="grid a" onClick={() => {handleClick("a")}}></div>
        <div className="grid b" onClick={() => {handleClick("b")}}></div>
        <div className="grid c" onClick={() => {handleClick("c")}}></div>
        <div className="grid d" onClick={() => {handleClick("d")}}></div>
        </>)}
        <canvas className="canvas" ref={canvasRef} onMouseMove={handleDraw} onMouseDown={handleMouseActive} onMouseUp={handleMouseInactive} onMouseLeave={handleMouseInactive}/>
        </>
    )
}

export default Stage0