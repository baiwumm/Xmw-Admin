/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 10:31:45
 */
// 引入第三方库
import { ProFormDigit, ProFormRadio, ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import type { FC } from 'react';

import { APP_SEX_OPTS, APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

import { formatPerfix } from '../utils/config'

const PersonalInformation: FC<{ disabledField?: boolean }> = ({ disabledField = false }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 用户名称 */}
			<ProFormText
				name="user_name"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.user_name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.user_name` })}
				disabled={disabledField}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[
					{
						required: true,
						message: formatMessage({ id: 'global.form.placeholder' }) +
							formatMessage({ id: `${formatPerfix()}.user_name` }),
						whitespace: true,
					},
					{
						pattern: /^[a-zA-Z0-9_-]{4,16}$/,
						message: formatMessage({ id: `${formatPerfix()}.user_name.rules` }),
					},
				]}
			/>
			{/* 用户工号 */}
			<ProFormText
				name="work_no"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.work_no` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.work_no` })}
				disabled={disabledField}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[
					{
						required: true,
						message: formatMessage({ id: 'global.form.placeholder' }) +
							formatMessage({ id: `${formatPerfix()}.work_no` }),
						whitespace: true,
					},
				]}
			/>
			{/* 中文名 */}
			<ProFormText
				name="cn_name"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.cn_name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.cn_name` })}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: `${formatPerfix()}.cn_name` }),
					whitespace: true,
				}]}
			/>
			{/* 英文 */}
			<ProFormText
				name="en_name"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.en_name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.en_name` })}
				fieldProps={{
					showCount: true,
					maxLength: 20,
				}}
			/>
			{/* 年龄 */}
			<ProFormDigit
				label={formatMessage({ id: `${formatPerfix()}.age` })}
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
				initialValue={'1'}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: `${formatPerfix()}.sex` })}
				options={APP_SEX_OPTS}
			/>
			{/* 手机号码 */}
			<ProFormText
				name="phone"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.phone` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.phone` })}
				fieldProps={{
					showCount: true,
					maxLength: 11,
				}}
				rules={[
					{
						required: true,
						message: formatMessage({ id: 'global.form.placeholder' }) +
							formatMessage({ id: `${formatPerfix()}.phone` }),
						whitespace: true,
					},
					{
						pattern: /^1\d{10}$/,
						message: formatMessage({ id: `${formatPerfix()}.phone.rules` }),
					},
				]}
			/>
			{/* 电子邮箱 */}
			<ProFormText
				name="email"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.email` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.email` })}
				fieldProps={{
					showCount: true,
					maxLength: 50,
				}}
				rules={[{
					type: 'email',
					message: formatMessage({ id: `${formatPerfix()}.email.rules` }),
					whitespace: true,
				}]}
			/>
			{/* 排序 */}
			<ProFormDigit
				label={formatMessage({ id: 'global.table.sort' })}
				name="sort"
				colProps={{ span: 12 }}
				min={1}
				max={99}
				initialValue={1}
				tooltip={formatMessage({ id: 'global.table.sort.tooltip' })}
				fieldProps={{ precision: 0 }}
			/>
			{/* 状态 */}
			<ProFormRadio.Group
				name="status"
				colProps={{ span: 12 }}
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: 'global.status' })}
				options={APP_STATUS_OPTS}
			/>
			{/* 用户名称 */}
			<ProFormText
				name="motto"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.motto` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.motto` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
			/>
		</>
	)
}
export default PersonalInformation