import {useState, useRef, useEffect} from "react"

function Stage0({stage, stageRegion, color, size, mode0, handleClick1, fullCanvasRef})  {
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
            fctx.fillRect(0, 0, fullCanvas.width, fullCanvas.height)
            fullCanvasRef.current = fullCanvas
        }

        const ctx = canvas.getContext("2d")
        ctx.imageSmoothingEnabled = false
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

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        let sx = 0, sy = 0, sw = fw, sh = fh

        if (stage === 1 && stageRegion) {
            sw = fw / 2
            sh = fh / 2
            if (stageRegion === "b") {sx = sw}
            if (stageRegion === "c") {sy = sh}
            if (stageRegion === "d") {sx = sw; sy = sh}
        }
        if (stage === 2 && stageRegion) {
            const parent = stageRegion[0]
            const sub = stageRegion[1]

            let px = 0, py = 0

            if (parent === "b") {px = fw / 2}
            if (parent === "c") {py = fh / 2}
            if (parent === "d") {px = fw / 2; py = fh / 2}

            const halfW = fw / 2
            const halfH = fh / 2
            const qW = halfW / 2
            const qH = halfH / 2
            sx = px
            sy = py

            if (sub === "b") {sx += qW}
            if (sub === "c") {sy += qH}
            if (sub === "d") {sx += qW; sy += qH}

            sw = qW
            sh = qH
        }

        ctx.drawImage(fCanvas, sx, sy, sw, sh, 0, 0, w, h)
    }, [stage, stageRegion])

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
        if (!drawing || mode0) {return}

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

        const fCanvas = fullCanvasRef.current
        const fw = fCanvas.width 
        const fh = fCanvas.height 

        let sx = 0, sy = 0, sw = fw, sh = fh 

        if ((stage === 1) && stageRegion) {
            sw = fw / 2
            sh = fh / 2

            if (stageRegion === "b") {sx = sw}
            if (stageRegion === "c") {sy = sh}
            if (stageRegion === "d") {sx = sw; sy = sh}
        }
        if ((stage === 2) && stageRegion) {
            const parent = stageRegion[0]
            const sub = stageRegion[1]

            let px = 0, py = 0
            if (parent === "b") {px = fw / 2}
            if (parent === "c") {py = fh / 2}
            if (parent === "d") {px = fw / 2; py = fh / 2}

            const halfW = fw / 2
            const halfH = fh / 2
            const qW = halfW / 2
            const qH = halfH / 2

            sx = px
            sy = py

            if (sub === "b") {sx += qW}
            if (sub === "c") {sy += qH}
            if (sub === "d") {sx += qW; sy += qH}

            sw = qW
            sh = qH 
        }

        const regionScaleX = sw / canvas.width 
        const regionScaleY = sh / canvas.height 

        const fX = x * regionScaleX + sx
        const fY = y * regionScaleY + sy
        const lastX = lastPos.current.x * regionScaleX + sx 
        const lastY = lastPos.current.y * regionScaleY + sy

        const fctx = fCanvas.getContext("2d")
        fctx.imageSmoothingEnabled = false
        fctx.beginPath()
        fctx.moveTo(lastX, lastY)
        fctx.lineTo(fX, fY)
        fctx.strokeStyle = color
        const scaleFactor = (regionScaleX + regionScaleY) / 2
        fctx.lineWidth = size * scaleFactor
        fctx.lineCap = "round"
        fctx.stroke()
        fctx.closePath()

        lastPos.current = {x, y}
    }
    
    return(
        <>
        {((stage < 2) && mode0) && (<>
        <div className="grid a" onClick={() => {handleClick1("a")}}></div>
        <div className="grid b" onClick={() => {handleClick1("b")}}></div>
        <div className="grid c" onClick={() => {handleClick1("c")}}></div>
        <div className="grid d" onClick={() => {handleClick1("d")}}></div>
        </>)}
        <canvas className="canvas" ref={canvasRef} onMouseMove={handleDraw} onMouseDown={handleMouseActive} onMouseUp={handleMouseInactive} onMouseLeave={handleMouseInactive}/>
        </>
    )
}

export default Stage0