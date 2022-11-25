/*
 * @Description: 上传头像组件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 14:44:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 10:59:20
 */
import { Upload, Button, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max'
import ImgCrop from 'antd-img-crop';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import type { FC } from 'react';
import { useState,useEffect } from 'react'
import { last, get } from 'lodash'

interface IProps {
	value?: string;
	onChange?: (fileList: UploadFile) => void;
}

const UploadAvatar: FC<IProps> = ({ value, onChange }) => {
	// 多语言函数
	const { formatMessage } = useIntl();
	const [currentAvatar, setCurrentAvatar] = useState<string | undefined>()

	/**
	 * @description: 限制用户上传的图片格式和大小
	 * @param {RcFile} file
	 * @return {*}
	 * @author: Cyan
	 */
	const beforeUpload = (file: RcFile): boolean => {
		// 限制图片类型
		const isFileType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
		if (!isFileType) {
			message.error(formatMessage({ id: 'components.UploadAvatar.file-type' }))
		}
		// 大小限制2MB
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error(formatMessage({ id: 'components.UploadAvatar.file-siz-limit' }));
		}

		return isFileType && isLt2M;
	}

	/**
	 * @description: 上传文件改变时的回调
	 * @return {*}
	 * @author: Cyan
	 */
	const onChangeUpload: UploadProps['onChange'] = ({ fileList }): void => {
		const url = get(last(fileList), 'response.data.url')
		onChange?.(url);
		setCurrentAvatar(url)
	};

	// 拿到表单数据回显
	useEffect(() => {
		if (value) {
			setCurrentAvatar(value)
		}
}, [value])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width:'530px'}}>
			<Avatar size={180} icon={<UserOutlined />} src={currentAvatar} />
				<ImgCrop rotate shape='round' grid>
					<Upload
						maxCount={1}
						action="http://127.0.0.1:3000/v1/upload/single-file-oss"
						showUploadList={false}
						onChange={onChangeUpload}
						beforeUpload={beforeUpload}
					>
						<Button style={{ marginTop: '10px' }}>{formatMessage({ id: 'components.UploadAvatar.title' })}</Button>
					</Upload>
				</ImgCrop>
		</div>
	)
}
export default UploadAvatar