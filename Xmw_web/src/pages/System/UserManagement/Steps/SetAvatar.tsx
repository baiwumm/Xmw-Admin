/*
 * @Description: 设置头像
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 15:46:56
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-30 16:18:24
 */
import { useIntl } from '@umijs/max'
import { Form, Row } from 'antd' // antd 组件库
import type { FC } from 'react'

import UploadImage from '@/components/UploadImage' // 上传头像组件

import { formatPerfix } from '../utils/config'

const SetAvatar: FC = () => {
	const { formatMessage } = useIntl();
	return (
		<Row justify="center" style={{ width: '100%' }}>
			<Form.Item
				name="avatar_url"
				rules={[
					{
						required: true,
						message: formatMessage({ id: `${formatPerfix()}.steps-form.set-avatar.message` }),
					},
				]}
			>
				<UploadImage
					fieldProps={{
						listType: 'picture-circle',
						maxCount: 1,
					}} />
			</Form.Item>
		</Row>
	)
}
export default SetAvatar