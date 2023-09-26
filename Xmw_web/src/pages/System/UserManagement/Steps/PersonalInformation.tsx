/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-25 09:59:35
 */
import { ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import type { FC } from 'react';

import { ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import { formatPerfix } from '@/utils'
import { SEX_OPTS } from '@/utils/const'
import { INTERNATION, ROUTES, SEX } from '@/utils/enums'

const PersonalInformation: FC<{ disabledField?: boolean }> = ({ disabledField = false }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 用户名称 */}
			<ProFormText
				name="user_name"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'user_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'user_name') })}
				disabled={disabledField}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[
					{ required: true, whitespace: true },
					{
						pattern: /^[a-zA-Z0-9_-]{4,16}$/,
						message: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'user_name.rules') }),
					},
				]}
			/>
			{/* 用户工号 */}
			<ProFormText
				name="work_no"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'work_no') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'work_no') })}
				disabled={disabledField}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[{ required: true, whitespace: true }]}
			/>
			{/* 中文名 */}
			<ProFormText
				name="cn_name"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'cn_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'cn_name') })}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[{ required: true, whitespace: true }]}
			/>
			{/* 英文 */}
			<ProFormText
				name="en_name"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'en_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'en_name') })}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
			/>
			{/* 年龄 */}
			<ProFormDigit
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'age') })}
				name="age"
				colProps={{ span: 12 }}
				min={1}
				max={120}
				initialValue={18}
				fieldProps={{ precision: 0 }}
			/>
			{/* 性别 */}
			<ProFormRadio.Group
				name="sex"
				colProps={{ span: 12 }}
				initialValue={SEX.MALE}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'sex') })}
				options={SEX_OPTS}
			/>
			{/* 手机号码 */}
			<ProFormText
				name="phone"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone') })}
				fieldProps={{
					showCount: true,
					maxLength: 11,
				}}
				rules={[
					{ required: true, whitespace: true },
					{
						pattern: /^1\d{10}$/,
						message: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'phone.rules') }),
					},
				]}
			/>
			{/* 电子邮箱 */}
			<ProFormText
				name="email"
				colProps={{ span: 12 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'email') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'email') })}
				fieldProps={{
					showCount: true,
					maxLength: 50,
				}}
				rules={[{
					type: 'email',
					message: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'email.rules') }),
					whitespace: true,
				}]}
			/>
			{/* 排序 */}
			<ProFormSort colProps={{ span: 12 }} />
			{/* 状态 */}
			<ProFormStatus colProps={{ span: 12 }} />
			{/* 用户名称 */}
			<ProFormText
				name="motto"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'motto') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'motto') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
			/>
		</>
	)
}
export default PersonalInformation