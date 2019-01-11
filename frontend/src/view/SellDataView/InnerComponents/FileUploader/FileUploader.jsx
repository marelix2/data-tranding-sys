import React from 'react';
import { Upload, Button, Icon, message } from 'antd';

const Dragger = Upload.Dragger;

const FileUploader = (props) => {
    const uploadProps = {
        name: 'file',
        multiple: false,
        action: '//jsonplaceholder.typicode.com/posts/',
        accept: '.csv,.txt'
    }
    return (
        <div>
            <Dragger {...uploadProps} onChange={props.onUploadChange}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox" />
                </p>
                <p className="ant-upload-text">Kliknij aby dodać plik</p>
                <p className="ant-upload-hint">Wspierane typy to .csv i .txt</p>
            </Dragger>
        </div>
    );
};

export default FileUploader;