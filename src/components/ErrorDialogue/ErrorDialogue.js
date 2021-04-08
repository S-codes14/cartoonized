import React from 'react';
import ReactDOM from 'react-dom';

import classes from './ErrorDialogue.module.scss';
import Backdrop from '../UI/Backdrop/Backdrop';

const ErrorDialogue = (props) => {

    return (
        ReactDOM.createPortal(
            props.show ? (<div className={classes.ErrorDialogueContainer}>
                <Backdrop show={props.show} />
                <div className={classes.ErrorDialogue}>
                    <p>{props.errorMessage || "Something went wrong"}</p>
                    <div className={classes.ErrorDialogueCallToAction}>
                        <button onClick={props.closed}>Close</button>
                    </div>
                </div>
            </div>) : null,
            document.getElementById('error-root')
        )
    );
}  

export default ErrorDialogue;