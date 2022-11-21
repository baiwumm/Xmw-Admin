/*
 * @Description: 上传头像组件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 14:44:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-21 16:58:36
 */
import { Upload, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { FC } from 'react';
import { useState } from 'react';

interface IProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
}

const UploadAvatar: FC<IProps> = ({ }) => {
	const [fileList, setFileList] = useState<UploadFile[]>([]);

	const onChangeUpload: UploadProps['onChange'] = ({ fileList: newFileList }) => {
		console.log(11111)
		console.log('newFileList',newFileList)
		// setFileList(newFileList);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
			<Avatar size={128} icon={<UserOutlined />} />
			<ImgCrop rotate shape='round' grid>
				<Upload
					action="http://127.0.0.1:3000/v1/upload/single-file-oss"
					showUploadList={false}
					onChange={onChangeUpload}
				>
					<Button style={{ marginTop: '10px' }}>上传头像</Button>
				</Upload>
			</ImgCrop>
		</div>
	)
}
export default UploadAvatar