import React, { useRef } from 'react';

import classes from './File.module.scss';
import Button from '../UI/Button/Button';

const File = (props) => {

    const fileInput = useRef();

    const onFileSelected = (event) => {
        props.selectedFile(event.target.files[0]);
    }

    if(props.droppedFile) {
        fileInput.current.files = props.droppedFile;
    }

    const openFilePicker = (e) => {
        e.preventDefault();
        fileInput.current.click();
    }

    return (
        <>
            <input type="file" name="image" id="image" onChange={onFileSelected} ref={fileInput} className={classes.Input}></input>
            <Button clicked={openFilePicker} type="ButtonSmall">Select Image</Button>
        </>
    )
}

export default File;