/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 10:34:16
 */
// 引入第三方库
import {
	ProFormCascader,
	ProFormSelect,
	ProFormTextArea,
	ProFormTreeSelect,
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { Form, TreeSelect } from 'antd' // antd 组件库
import type { FC } from 'react';

import FigureLabels from '@/components/FigureLabels'
import cascaderOptions from '@/utils/pca-code.json' // 省市区级联数据

import { formatPerfix } from '../utils/config'
import type { UserInformationProps } from '../utils/interface'

const UserInformation: FC<UserInformationProps> = ({
	roleData,
	jobsData,
	organizationData,
	showLabel = true,
	disabledField = false,
}) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 所属角色 */}
			<ProFormSelect
				name="role_id"
				label={formatMessage({ id: `${formatPerfix()}.role_id` })}
				colProps={{ span: 12 }}
				placeholder={formatMessage({ id: 'global.form.placeholder.seleted' }) +
					formatMessage({ id: `${formatPerfix()}.role_id` })}
				options={roleData.map((r) => ({ label: r.role_name, value: r.role_id }))}
				disabled={disabledField}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.role_id` }),
				}]}
			/>
			{/* 所属组织 */}
			<ProFormTreeSelect
				name="org_id"
				label={formatMessage({ id: `${formatPerfix()}.org_id` })}
				colProps={{ span: 12 }}
				fieldProps={{
					treeData: organizationData,
					allowClear: true,
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.org_id` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.org_id` }),
				}]}
			/>
			{/* 所属岗位 */}
			<ProFormTreeSelect
				name="jobs_id"
				label={formatMessage({ id: `${formatPerfix()}.jobs_id` })}
				colProps={{ span: 12 }}
				fieldProps={{
					treeData: jobsData,
					allowClear: true,
					fieldNames: {
						label: 'jobs_name',
						value: 'jobs_id',
					},
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.jobs_id` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.jobs_id` }),
				}]}
			/>
			{/* 所属城市 */}
			<ProFormCascader
				name="city"
				label={formatMessage({ id: `${formatPerfix()}.city` })}
				colProps={{ span: 12 }}
				fieldProps={{
					options: cascaderOptions,
					fieldNames: {
						label: 'name',
						value: 'code',
					},
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.city` }),
				}]}
			/>
			{/* 详细地址 */}
			<ProFormTextArea
				name="address"
				label={formatMessage({ id: `${formatPerfix()}.address` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.address` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
					rows: 4,
				}}
				rules={[{
					required: true, message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: `${formatPerfix()}.address` }),
				}]}
			/>
			{/* 人物标签 */}
			{
				showLabel ? <Form.Item
					label={formatMessage({ id: `${formatPerfix()}.tags` })}
					name="tags"
				>
					<FigureLabels />
				</Form.Item> : null
			}
		</>
	)
}
export default UserInformation