/*
 * @Description: 设置头像
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 15:46:56
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-23 17:03:58
 */
import type { FC } from 'react'
import { useIntl } from '@umijs/max'
import { Form } from 'antd' // antd 组件库
import UploadAvatar from '@/components/UploadAvatar' // 上传头像组件

const SetAvatar: FC = () => {
	const { formatMessage } = useIntl();
	return (
		<>
			<Form.Item
				name="avatar_url"
				rules={[
					{
						required: true, message: formatMessage({ id: 'pages.system.user-management.steps-form.set-avatar' })
					}
				]}
			>
				<UploadAvatar />
			</Form.Item>
		</>
	)
}
export default SetAvatar