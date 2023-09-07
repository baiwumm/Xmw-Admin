/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 17:18:00
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
import { formatPerfix } from '@/utils'
import cascaderOptions from '@/utils/const/pca-code.json' // 省市区级联数据
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { UserInformationProps } from '@/utils/types/system/user-management'

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
				label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.role_id` })}
				colProps={{ span: 12 }}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
					formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.role_id` })}
				options={roleData.map((r) => ({ label: r.role_name, value: r.role_id }))}
				disabled={disabledField}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.role_id` }),
				}]}
			/>
			{/* 所属组织 */}
			<ProFormTreeSelect
				name="org_id"
				label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.org_id` })}
				colProps={{ span: 12 }}
				fieldProps={{
					treeData: organizationData,
					allowClear: true,
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.org_id` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.org_id` }),
				}]}
			/>
			{/* 所属岗位 */}
			<ProFormTreeSelect
				name="jobs_id"
				label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.jobs_id` })}
				colProps={{ span: 12 }}
				fieldProps={{
					treeData: jobsData,
					allowClear: true,
					fieldNames: {
						label: 'jobs_name',
						value: 'jobs_id',
					},
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.jobs_id` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.jobs_id` }),
				}]}
			/>
			{/* 所属城市 */}
			<ProFormCascader
				name="city"
				label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.city` })}
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
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.city` }),
				}]}
			/>
			{/* 详细地址 */}
			<ProFormTextArea
				name="address"
				label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.address` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.address` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
					rows: 4,
				}}
				rules={[{
					required: true, message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.address` }),
				}]}
			/>
			{/* 人物标签 */}
			{
				showLabel ? <Form.Item
					label={formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.tags` })}
					name="tags"
				>
					<FigureLabels />
				</Form.Item> : null
			}
		</>
	)
}
export default UserInformation