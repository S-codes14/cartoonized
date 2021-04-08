import React, { useState } from 'react';

import classes from './App.module.scss';
import ShowCase from './components/ShowCase/ShowCase';
import FileUpload from './components/FileUpload/FileUpload';
import ErrorDialogue from './components/ErrorDialogue/ErrorDialogue';
// import DragAndDrop from './components/DragAndDrop/DragAndDrop';

const App = () => {
  // const [file, setFile] = useState(undefined);
  const [handleError, setHandleError] = useState({
    show: false,
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(undefined);
  const [showcase, setShowcase] = useState("");
  
  // const onSelectFile = (input_file) => {
  //   setFile(input_file);
  // }

  // const onFormSubmitted = (event) => {
  //   event.preventDefault();

  //   const config = {
  //     headers: {
  //       'content-type': 'multipart/form-data'
  //     }
  //   };

  //   const formData = new FormData();
  //   formData.append('file', file);

  //   axios.post(BACKEND_URL + '/file-upload', formData, config).then(response => {
  //     return response.data;
  //   }).then(data => {
  //     setUploadedImage(BACKEND_URL + data.path);
  //     setShowcase(BACKEND_URL + data.cartoon_path);
  //     setFile(undefined);
  //   }).catch(error => console.log(error));
  // }

  const onErrorOccuredHandler = (message) => {
    setHandleError({
      show: true,
      message: message
    });
  }

  const cartoonizeImageHandler = (uploadedImage, cartoonizedImage) => {
    setUploadedImage(uploadedImage);
    setShowcase(cartoonizedImage);
  }

  const closeErrorDialogueHandler = () => {
    setHandleError({
      show: false,
      message: ""
    });
  }

  return (
    <>
      <ErrorDialogue show={handleError.show} errorMessage={handleError.message} closed={closeErrorDialogueHandler}></ErrorDialogue>
      <main className={classes.App}>
        <header className={classes.AppHeader}>
          <h1>Cartoonized</h1>
        </header>
        <ShowCase uploadedImage={uploadedImage} cartoonizedImage={showcase} loading={isLoading} />

        <FileUpload cartoonizeImage={cartoonizeImageHandler} loading={(isLoading) => setIsLoading(isLoading)} error={onErrorOccuredHandler} />
        {/* <form onSubmit={onFormSubmitted}>
          <h2>File Upload</h2>
          <DragAndDrop dropHandle={onSelectFile} file={file} fileSelect={onSelectFile} />
          <button>Upload</button>
        </form> */}
      </main>
    </>
  );
}

export default App;