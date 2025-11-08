import {useState, useRef} from "react"

function Stage0({stage, setStage, color, size, mode0})  {
    const canvasRef = useRef()
    const [drawing, setDrawing] = useState(false)
    const lastPos = useRef({x: 0, y: 0})

    function getStage() {
        if (stage === 0) {
            
        }
        else if (stage === -1) {

        }
        else if (stage === 1) {

        }
        else if (stage === 2) {

        }
    }

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

        lastPos.current = {x, y}
    }
    
    return(
        <>
        {(stage >= 0) && (<>
        <div className="grid a"></div>
        <div className="grid b"></div>
        <div className="grid c"></div>
        <div className="grid d"></div>
        </>)}
        <canvas className="canvas" ref={canvasRef} onMouseMove={handleDraw} onMouseDown={handleMouseActive} onMouseUp={handleMouseInactive} onMouseLeave={handleMouseInactive}/>
        </>
    )
}

export default Stage0