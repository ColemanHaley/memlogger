import { useState } from 'react';
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const PicturesWall = () => {
    const [prevVis, prevVisSet] = useState(false)
    const [prevImage, prevImageSet] = useState('')
    const [prevTitle, prevTitleSet] = useState('')
    const [fileList, fileListSet] = useState([
           
                    {
                                uid: '-1',
                                name: 'image.png',
                                status: 'done',
                                url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                              }
    ])
    const handleCancel = () => prevVisSet(false)
    const handlePrev = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        prevImageSet(file.url || file.preview)
        prevVisSet(true)
        prevTitleSet(file.name || file.url.substring(file.url.lastIndexOf('/') +1))

    }
    const handleChange = ( { fileList } ) => { fileListSet(fileList) }

    const uploadButton = (
        <div>
            <PlusOutlined/>
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    console.log(fileList);
    return (
        <>
            <Upload
                action="http://localhost:5000/api/upload"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePrev}
                onChange={handleChange}
            >
                {uploadButton}
            </Upload>
            <Modal
                visible={prevVis}
                title={prevTitle}
                footer={null}
                onCancel={handleCancel}
            >
                <img alt={prevTitle} style={{ width: '100%' }} src={prevImage} />
            </Modal>
        </>
    )
}


export default function Logger() {
    return <PicturesWall/>;

}
