/*
 * @Description: 手机号码登录
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 16:17:27
 */
import { MobileOutlined } from '@ant-design/icons'; // antd 图标
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { message } from 'antd' // antd 组件
import type { FC } from 'react'

import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'

const Mobile: FC = () => {
	const { formatMessage } = useIntl();
	return (
		<>
			<ProFormText
				fieldProps={{
					size: 'large',
					prefix: <MobileOutlined className={'prefixIcon'} />,
				}}
				name="phone"
				placeholder={formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.phone` })}
				rules={[
					{
						required: true,
						message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
							formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.phone` }),
					},
					{
						pattern: /^1\d{10}$/,
						message: formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.phone.rules` }),
					},
				]}
			/>
			<ProFormCaptcha
				fieldProps={{
					size: 'large',
				}}
				captchaProps={{
					size: 'large',
				}}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.captcha` })}
				captchaTextRender={(timing, count) => {
					if (timing) {
						return `${count} ${formatMessage({
							id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.captcha.obtain`
						}) +
							formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.captcha` })}`;
					}
					return formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.captcha.obtain` }) +
						formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.captcha` });
				}}
				name="captcha"
				rules={[
					{
						required: true,
						message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
							formatMessage({ id: `${formatPerfix(ROUTES.LOGIN)}.type.mobile.captcha` }),
					},
				]}
				onGetCaptcha={async () => {
					message.success('获取验证码成功！验证码为：1234');
				}}
			/>
		</>
	)
}
export default Mobile