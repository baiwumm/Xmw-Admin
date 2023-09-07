/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 15:47:10
 */
// 引入第三方库
import {
	ProFormDigit,
	ProFormSelect,
	ProFormText,
	ProFormTextArea,
	ProFormTreeSelect,
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { TreeSelect } from 'antd' // antd 组件库
import type { FC } from 'react';

import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { FormTemplateItemProps } from '@/utils/types/administrative/jobs-management' // 公共 interface

const FormTemplateItem: FC<FormTemplateItemProps> = ({ treeData, parent_id, orgTree, userList }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 父级 */}
			<ProFormTreeSelect
				name="parent_id"
				label={formatMessage({ id: INTERNATION.PARENT_ID })}
				colProps={{ span: 24 }}
				tooltip={formatMessage({ id: INTERNATION.PARENT_ID_TIP })}
				fieldProps={{
					treeData,
					allowClear: true,
					disabled: !!parent_id,
					defaultValue: parent_id || undefined,
					fieldNames: {
						label: 'jobs_name',
						value: 'jobs_id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: INTERNATION.PARENT_ID }),
				}}
			/>
			{/* 岗位名称 */}
			<ProFormText
				name="jobs_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.jobs_name` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.jobs_name` })}
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
									formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.jobs_name` })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(formatMessage({
									id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.jobs_name.validator`,
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.org_name` })}
				colProps={{ span: 24 }}
				request={async () => orgTree}
				fieldProps={{
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.org_name` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.JOBSMANAGEMENT)}.org_name` }),
				}]}
			/>
			{/* 负责人 */}
			<ProFormSelect
				name="leader"
				label={formatMessage({ id: INTERNATION.LEADER })}
				colProps={{ span: 24 }}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
					formatMessage({ id: INTERNATION.LEADER })}
				options={userList.map((u) => ({ label: u.cn_name, value: u.user_id }))}
				rules={[{
					required: true, message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: INTERNATION.LEADER }),
				}]}
			/>
			{/* 排序 */}
			<ProFormDigit
				label={formatMessage({ id: INTERNATION.SORT })}
				name="sort"
				colProps={{ span: 24 }}
				min={1}
				max={99}
				initialValue={1}
				tooltip={formatMessage({ id: INTERNATION.SORT_TIP })}
				fieldProps={{ precision: 0 }}
			/>
			{/* 描述 */}
			<ProFormTextArea
				name="describe"
				label={formatMessage({ id: INTERNATION.DESCRIBE })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: INTERNATION.DESCRIBE })}
				colProps={{ span: 24 }}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: INTERNATION.DESCRIBE }),
				}]}
			/>
		</>
	)
}
export default FormTemplateItem