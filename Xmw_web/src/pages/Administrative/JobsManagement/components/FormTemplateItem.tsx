/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-25 10:25:42
 */
import { ProFormText, ProFormTreeSelect } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { Form, TreeSelect } from 'antd'
import type { FC } from 'react';

import { ProFormDescribe, ProFormLeader, ProFormParent, ProFormSort } from '@/components/CommonProForm'
import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/administrative/jobs-management'

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData' | 'orgTree'>> = ({ treeData, orgTree }) => {
	const { formatMessage } = useIntl();
	// 获取上下文表单实例
	const form = Form.useFormInstance()
	// 判断是否是添加子级，有 parent_id 并且其它字段没值
	const { parent_id, jobs_name } = form.getFieldsValue(true)
	return (
		<>
			{/* 父级 */}
			<ProFormParent
				fieldProps={{
					treeData,
					disabled: parent_id && !jobs_name,
					treeNodeFilterProp: 'jobs_name',
					fieldNames: {
						label: 'jobs_name',
						value: 'jobs_id',
					},
				}}
			/>
			{/* 岗位名称 */}
			<ProFormText
				name="jobs_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'jobs_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'jobs_name') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[
					{ required: true, message: '' },
					{
						validator: (_, value) => {
							if (!value) {
								return Promise.reject(new Error(formatMessage({ id: INTERNATION.PLACEHOLDER }) +
									formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'jobs_name') })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(formatMessage({
									id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'jobs_name.validator'),
								})))
							}
							return Promise.resolve()
						},
					},
				]}
			/>
			{/* 所属组织 */}
			<ProFormTreeSelect
				name="org_id"
				label={formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'org_name') })}
				colProps={{ span: 24 }}
				fieldProps={{
					treeData: orgTree,
					showSearch: true,
					allowClear: true,
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
					treeNodeFilterProp: 'org_name',
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'org_name') }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: formatPerfix(ROUTES.JOBSMANAGEMENT, 'org_name') }),
				}]}
			/>
			{/* 负责人 */}
			<ProFormLeader />
			{/* 排序 */}
			<ProFormSort />
			{/* 描述 */}
			<ProFormDescribe />
		</>
	)
}
export default FormTemplateItem