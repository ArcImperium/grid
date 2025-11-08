import {useState} from "react"

function Stage0({stage, setStage})  {
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
    
    return(
        <>
        {(stage >= 0) && (<>
        <div className="grid a"></div>
        <div className="grid b"></div>
        <div className="grid c"></div>
        <div className="grid d"></div>
        </>)}
        </>
    )
}

export default Stage0