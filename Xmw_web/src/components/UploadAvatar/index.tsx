/*
 * @Description: 上传头像组件
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-09 14:44:15
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-01 10:56:36
 */
import { UserOutlined } from '@ant-design/icons';
import { useIntl } from '@umijs/max'
import { Avatar, Button, message, Upload } from 'antd';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import ImgCrop from 'antd-img-crop';
import { get, last } from 'lodash-es'
import { FC, useEffect, useState } from 'react'

import { LOCAL_STORAGE } from '@/utils/enums'
import { getLocalStorageItem } from '@/utils'

interface IProps {
	value?: string;
	onChange?: (fileList: UploadFile) => void;
}

const UploadAvatar: FC<IProps> = ({ value, onChange }) => {
	// 多语言函数
	const { formatMessage } = useIntl();
	// 统一国际化前缀
	const formatPerfix: string = 'components.UploadAvatar'
	const [currentAvatar, setCurrentAvatar] = useState<string | undefined>()
	// 获取 Token
	const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN)

	/**
	 * @description: 限制用户上传的图片格式和大小
	 * @param {RcFile} file
	 * @return {*}
	 * @author: 白雾茫茫丶丶
	 */
	const beforeUpload = (file: RcFile): boolean => {
		// 限制图片类型
		const isFileType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
		if (!isFileType) {
			message.error(formatMessage({ id: `${formatPerfix}.file-type` }))
		}
		// 大小限制2MB
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error(formatMessage({ id: `${formatPerfix}.file-siz-limit` }));
		}

		return isFileType && isLt2M;
	}

	/**
	 * @description: 上传文件改变时的回调
	 * @return {*}
	 * @author: 白雾茫茫丶丶
	 */
	const onChangeUpload: UploadProps['onChange'] = ({ fileList }): void => {
		const path = get(last(fileList), 'response.data.path')
		onChange?.(path);
		setCurrentAvatar(path)
	};

	// 拿到表单数据回显
	useEffect(() => {
		if (value) {
			setCurrentAvatar(value)
		}
	}, [value])

	return (
		<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Avatar size={180} icon={<UserOutlined />} src={currentAvatar} />
			<ImgCrop rotationSlider cropShape='round' showGrid>
				<Upload
					maxCount={1}
					action='/api/upload/single-file'
					showUploadList={false}
					onChange={onChangeUpload}
					beforeUpload={beforeUpload}
					headers={{ Authorization: `Bearer ${ACCESS_TOKEN}` }}
				>
					<Button style={{ marginTop: '10px' }}>{formatMessage({ id: `${formatPerfix}.title` })}</Button>
				</Upload>
			</ImgCrop>
		</div>
	)
}
export default UploadAvatar