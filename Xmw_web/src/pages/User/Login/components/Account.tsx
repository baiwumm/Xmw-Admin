/*
 * @Description: 账户密码登录
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:46:29
 */
import { LockOutlined, UserOutlined } from '@ant-design/icons'; // antd 图标
import { ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks';
import { Col, Form, Input, Row, Spin } from 'antd'
import type { FC } from 'react'

import { getCaptcha } from '@/services/logic/login' // 获取图形验证码
import { formatResult } from '@/utils'

import { formatPerfix } from '../utils/config'

const Account: FC = () => {
	const { formatMessage } = useIntl();
	// 获取图形验证码
	const { loading, run: getVerifyCode, data: verifyCode } = useRequest(
		async () => formatResult(await getCaptcha()));
	return (
		<>
			<ProFormText
				name="user_name"
				fieldProps={{
					size: 'large',
					prefix: <UserOutlined className={'prefixIcon'} />,
				}}
				placeholder={formatMessage({ id: `${formatPerfix}.type.account.user_name.placeholder` })}
				rules={[
					{
						required: true,
						message: formatMessage({ id: `${formatPerfix}.type.account.user_name.required` }),
					},
				]}
			/>
			<ProFormText.Password
				name="password"
				fieldProps={{
					size: 'large',
					prefix: <LockOutlined className={'prefixIcon'} />,
					visibilityToggle: false,
				}}
				placeholder={formatMessage({ id: `${formatPerfix}.type.account.password.placeholder` })}
				rules={[
					{
						required: true,
						message: formatMessage({ id: `${formatPerfix}.type.account.password.required` }),
					},
				]}
			/>
			<Form.Item>
				<Row gutter={8}>
					<Col span={14}>
						<Form.Item
							name="verifyCode"
							noStyle
							rules={[{
								required: true,
								message: formatMessage({ id: 'global.form.placeholder' }) +
									formatMessage({ id: `${formatPerfix}.type.mobile.captcha` }),
							}]}
						>
							<Input
								size="large"
								placeholder={
									formatMessage({ id: 'global.form.placeholder' }) +
									formatMessage({ id: `${formatPerfix}.type.mobile.captcha` })}
							/>
						</Form.Item>
					</Col>
					<Col span={10}>
						<Spin spinning={loading}>
							<div
								dangerouslySetInnerHTML={{ __html: verifyCode || '' }}
								style={{ width: '100%', cursor: 'pointer' }}
								onClick={() => getVerifyCode()}
							/>
						</Spin>
					</Col>
				</Row>
			</Form.Item>
		</>
	)
}
export default Account