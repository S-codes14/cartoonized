import React, { useState } from 'react';
import axios from 'axios';

import classes from './FileUpload.module.scss';
import Button from '../UI/Button/Button';
import DragAndDrop from '../../containers/DragAndDrop/DragAndDrop';

// const BACKEND_URL = "http://berkaysenkoylu.pythonanywhere.com";
const BACKEND_URL = "https://nameless-river-41426.herokuapp.com";

const FileUpload = (props) => {
    const [file, setFile] = useState(undefined);

    const onSelectFile = (input_file) => {
        setFile(input_file);
    }

    const onFormSubmitted = (event) => {
        event.preventDefault();

        const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };

          props.loading(true);
      
          const formData = new FormData();
          formData.append('file', file);

          axios.post(BACKEND_URL + '/file-upload', formData, config).then(response => {
            return response.data;
          }).then(data => {
            if(data.status !== 201) {
                props.loading(false);
                
                // console.log("Show error message");
                // console.log(data.status);
                // TODO
                props.error(data.message);

                return;
            }
            props.cartoonizeImage(BACKEND_URL + data.path, BACKEND_URL + data.cartoon_path);

            props.loading(false);
            setFile(undefined);
          }).catch(error => console.log(error));
    }

    return (
        <section className={classes.FileUpload}>
            <header className={classes.FileUploadHeader}>
                <h2>File Upload</h2>
            </header>
            
            <form onSubmit={onFormSubmitted} className={classes.Form}>
                <DragAndDrop dropHandle={onSelectFile} file={file} fileSelect={onSelectFile} />
                <Button>Cartoonize</Button>
            </form>
        </section>
    )
}

export default FileUpload;