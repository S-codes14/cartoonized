import React from 'react';

import classes from './ShowCase.module.scss';
import Spinner from '../UI/Spinner/Spinner';

const ShowCase = (props) => {

    let pageContent = null;
    if(props.loading) {
        pageContent = <Spinner strokeWidth={3}></Spinner>
    }
    else {
        if(props.uploadedImage && props.cartoonizedImage) {
            pageContent = (
                <section className={classes.ImageContainer}>
                    <img src={props.uploadedImage || ""} alt="Uploaded_image" className={classes.Image} />
                    <img src={props.cartoonizedImage || ""} alt="Cartoonized_image" className={classes.Image} />
                </section>
            );
        }
        else {
            pageContent = (
                <section className={classes.ImageContainer}>
                    <p style={{textAlign: "center"}}>Drag and drop / Select the image you want to cartoonize!</p>
                </section>
            );
        }
    }

    return (
        <>
            {pageContent}
        </>
    )
}

export default ShowCase;
