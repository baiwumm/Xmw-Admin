/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-26 16:20:24
 */
import {
	ProFormCascader,
	ProFormSelect,
	ProFormTextArea,
	ProFormTreeSelect,
} from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Form, TreeSelect } from 'antd'
import { regionData } from 'element-china-area-data'
import { get, map } from 'lodash-es'
import type { FC } from 'react';

import FigureLabels from '@/components/FigureLabels'
import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { getRoleList } from '@/services/system/role-management' // 角色管理接口
import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { UserInformationProps } from '@/utils/types/system/user-management'

const UserInformation: FC<UserInformationProps> = ({
	showLabel = true,
	disabledField = false,
}) => {
	const { formatMessage } = useIntl();

	/**
	 * @description: 获取角色列表
	 * @author: 白雾茫茫丶
	 */
	const { data: roleList } = useRequest(async (params) => get(await getRoleList(params), 'data.list', []), {
		defaultParams: [{ current: 1, pageSize: 9999 }],
	})

	/**
	 * @description: 获取岗位列表
	 * @author: 白雾茫茫丶
	 */
	const { data: jobsTree } = useRequest(async () => get(await getJobsList(), 'data', []))

	/**
	 * @description: 获取组织列表
	 * @author: 白雾茫茫丶
	 */
	const { data: orgTree } = useRequest(async () => get(await getOrganizationList(), 'data', []))

	return (
		<>
			{/* 所属角色 */}
			<ProFormSelect
				name="role_id"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') })}
				colProps={{ span: 12 }}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') })}
				options={map(roleList, (r: API.ROLEMANAGEMENT) => ({ label: r.role_name, value: r.role_id }))}
				disabled={disabledField}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'role_id') }),
				}]}
			/>
			{/* 所属组织 */}
			<ProFormTreeSelect
				name="org_id"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'org_id') })}
				colProps={{ span: 12 }}
				fieldProps={{
					treeData: orgTree,
					allowClear: true,
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'org_id') }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'org_id') }),
				}]}
			/>
			{/* 所属岗位 */}
			<ProFormTreeSelect
				name="jobs_id"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'jobs_id') })}
				colProps={{ span: 12 }}
				fieldProps={{
					treeData: jobsTree,
					allowClear: true,
					fieldNames: {
						label: 'jobs_name',
						value: 'jobs_id',
					},
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'jobs_id') }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'jobs_id') }),
				}]}
			/>
			{/* 所属城市 */}
			<ProFormCascader
				name="city"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'city') })}
				colProps={{ span: 12 }}
				fieldProps={{
					options: regionData,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'city') }),
				}]}
			/>
			{/* 详细地址 */}
			<ProFormTextArea
				name="address"
				label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'address') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'address') })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
					rows: 4,
				}}
				rules={[{ required: true }]}
			/>
			{/* 人物标签 */}
			{
				showLabel ? <Form.Item
					label={formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'tags') })}
					name="tags"
				>
					<FigureLabels />
				</Form.Item> : null
			}
		</>
	)
}
export default UserInformation