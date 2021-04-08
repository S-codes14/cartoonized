import React from 'react';

import classes from './Button.module.scss';

const Button = (props) => {
    let classList = [classes.Button, classes.ButtonMedium, classes.ButtonPrimary];

    switch(props.type) {
        case 'ButtonSmall':
            classList = [classes.Button, classes.ButtonSmall, classes.ButtonPrimary];
            break;
        case 'ButtonMedium':
            classList = [classes.Button, classes.ButtonMedium, classes.ButtonPrimary];
            break;
        default:
            classList = [classes.Button, classes.ButtonMedium, classes.ButtonPrimary];
            break;
    }

    return (
        <button className={classList.join(' ')} onClick={props.clicked}>
            {props.children}
        </button>
    )
}

export default Button;