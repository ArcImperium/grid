import './Save.css'

function Save({setShowPopup, handleDownload, preview}) {
    return(
        <>
        <div className="save-background"></div>
        <div className="save-container">
            <img src={preview} className="preview"/>
            <h1 className="confirm">DO YOU WANT TO<br/>DOWNLOAD<br/>YOUR PAINTING?</h1>
            <button className="download" onClick={() => {handleDownload()}}>CONFIRM</button>
            <button className="exit" onClick={() => {setShowPopup(false)}}>X</button>
        </div>
        </>
    )
}

export default Save