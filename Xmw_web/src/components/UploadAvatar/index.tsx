/*
 * @Description: 上传头像组件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 14:44:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 15:23:24
 */
import type { FC } from 'react'
import { useState } from 'react';
import { useBoolean } from 'ahooks';
import { Upload, Modal } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop'; // 图片裁剪插件
import { PlusOutlined } from '@ant-design/icons';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

type IProps = {
    onChange?: (value: string) => void;
}

const UploadAvatar: FC<IProps> = ({ onChange }) => {
    // 是否显示图片预览功能
    const [previewOpen, { setTrue: setPreviewOpenTrue, setFalse: setPreviewOpenFalse }] = useBoolean(false);
    // 图片预览地址
    const [previewImage, setPreviewImage] = useState('');
    // 图片预览标题
    const [previewTitle, setPreviewTitle] = useState('');
    // 上传文件列表
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // 表单收集字段
    const triggerChange = (changedValue: string) => {
        onChange?.(changedValue);
    };
    // 点击图片预览时触发
    const handlePreview = async (file: UploadFile) => {
        console.log(file)
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpenTrue();
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };


    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        console.log(newFileList)
        setFileList(newFileList);
    }


    // 上传头像按钮，只能上传一张图片
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    return (
        <>
            <ImgCrop rotate>
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </ImgCrop>
            {/* 图片放大预览 */}
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpenFalse()}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </>
    )
}
export default UploadAvatar