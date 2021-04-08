import React, { Component, createRef } from 'react';

import classes from './DragAndDrop.module.scss';
import File from '../../components/Upload/File';

const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
};

class DragAndDrop extends Component {

    dropRef = createRef();

    constructor(props) {
        super(props);

        this.state = {
            classList: [classes.DropContainer],
            content: 'DRAG YOUR FILE HERE (.png, .jpeg, jpg)',
            contentClassList: [classes.ContentText],
            dataTransferFiles: undefined,
            selectedFileName: undefined
        };

        this.dragCounter = 0;
    }

    componentDidMount() {
        let div = this.dropRef.current;
        div.addEventListener('dragenter', this.dragInHandler);
        div.addEventListener('dragleave', this.dragOutHandler);
        div.addEventListener('dragover', this.dragOverHandler);
        div.addEventListener('drop', this.dropHandler);
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        div.removeEventListener('dragenter', this.dragInHandler);
        div.removeEventListener('dragleave', this.dragOutHandler);
        div.removeEventListener('dragover', this.dragOverHandler);
        div.removeEventListener('drop', this.dropHandler);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.file !== this.props.file && (prevProps.file !== undefined && this.props.file === undefined)) {
            this.resetState();
        }

        return ((prevProps.file !== this.props.file) && (prevProps.file !== undefined && this.props.file === undefined));
    }

    checkMimeType = (file) => {
        return MIME_TYPE_MAP[file];
    }

    resetState = () => {
        this.setState({
            classList: [classes.DropContainer],
            content: 'DRAG YOUR FILE HERE (.png, .jpeg, jpg)',
            contentClassList: [classes.ContentText],
            dataTransferFiles: undefined,
            selectedFileName: undefined
        });
    }

    dragInHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.dragCounter++;

        this.setState((prevState) => {
            return {
                classList: prevState.classList.concat(classes.DropContainerEnter)
            };
        });

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            let isValid = this.checkMimeType(event.dataTransfer.items[0].type);
            if(isValid) {
                let newList = [classes.ContentText, classes.ValidFileType];
                this.setState(prevState => {
                    return {
                        content: 'DROP YOUR FILE HERE',
                        contentClassList: newList
                    }
                });
            }
            else {
                let newList = [classes.ContentText, classes.InvalidFileType];
                this.setState(prevState => {
                    return {
                        content: 'INVALID FILE TYPE!',
                        contentClassList: newList
                    }
                });
            }
        }
    }

    dragOutHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        this.dragCounter--;
        if(this.dragCounter > 0) {
            return;
        }

        this.setState((prevState) => {
            return {
                classList: prevState.classList.filter(c => c !== classes.DropContainerEnter)
            };
        });

        if(this.state.selectedFileName === undefined || this.state.selectedFileName === '') {
            let newList = [classes.ContentText];
            this.setState({
                content: 'DRAG YOUR FILE HERE (.png, .jpeg, jpg)',
                contentClassList: newList
            });
        }
        else {
            let newList = [classes.ContentText, classes.ValidFileType];
            this.setState(prevState => {
                return {
                    classList: [classes.DropContainer, classes.DropContainerEnter],
                    content: `Selected file: ${this.state.selectedFileName}`,
                    contentClassList: newList
                }
            });
        }
    }

    dragOverHandler = (event) => {
        // To prevent the file from opening
        event.preventDefault();
        event.stopPropagation();
    }

    dropHandler = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
            if(this.checkMimeType(event.dataTransfer.items[0].type)) {
                this.props.dropHandle(event.dataTransfer.files[0]);
                this.dragCounter = 0;

                let name = event.dataTransfer.files[0].name;

                this.setState({
                    classList: [classes.DropContainer, classes.DropContainerEnter],
                    dataTransferFiles: event.dataTransfer.files,
                    selectedFileName: name,
                    content: `Selected file: ${name}`
                });
            }
            else {
                if(!this.props.file) {
                    this.props.dropHandle(undefined);
                    this.resetState();
                }
                else {
                    if(this.state.selectedFileName !== undefined || this.state.selectedFileName !== '') {
                        this.setState((prevState) => {
                            let fileName = prevState.selectedFileName;
                            return {
                                classList: [classes.DropContainer, classes.DropContainerEnter],
                                content: `Selected file: ${fileName}`,
                                contentClassList: [classes.ContentText, classes.ValidFileType],
                                dataTransferFiles: prevState.dataTransferFiles,
                                selectedFileName: fileName
                            }
                        });
                    }
                }
            }
        }
    }

    fileSelectHandler = (file) => {
        // Validate the file first
        if(!this.checkMimeType(file.type)) {
            return;
        }

        this.setState({
            classList: [classes.DropContainer, classes.DropContainerEnter],
            selectedFileName: file.name,
            content: `Selected file: ${file.name}`,
            contentClassList: [classes.ContentText, classes.ValidFileType]
        });

        this.props.fileSelect(file);
    }

    render() {
        let pageContentTemplate = <p className={this.state.contentClassList.join(' ')}>{this.state.content}</p>

        return(
            <div className={this.state.classList.join(' ')} ref={this.dropRef}>
                {pageContentTemplate}
                <div className={classes.FileSelect}>
                    <File selectedFile={this.fileSelectHandler} droppedFile={this.state.dataTransferFiles} />
                </div>
            </div>
        );
    }
}

export default DragAndDrop;