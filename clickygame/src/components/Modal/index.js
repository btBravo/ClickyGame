import React from 'react';
import "./Modal.css";


function WinnerModalMessage() {
    return(
        <div>
            <h1>You Won!</h1>
            <h2>Great job! The force is strong with this one!</h2>
        </div>
      )
}

function LoserModalMessage() {
    return(
        <div>
            <h1>You Lost!</h1>
            <h2>Better train that brain before you go insane!</h2>
        </div>
      )
}

function Modal(props) {
    const visible = props.visible;
    const isWinner = props.isWinner;
    let message;

    if (!visible) {
        return null;
    }

    if (isWinner) {
        message = <WinnerModalMessage />;
    } else {
        message = <LoserModalMessage />
    }

    function refreshPage() {
        window.location.reload();
    }

    return(
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={refreshPage}>&times;</span>
                {message}
                <button className="button" onClick={refreshPage}>Restart Game</button>
            </div>
        </div>
    )
    
}

export default Modal;