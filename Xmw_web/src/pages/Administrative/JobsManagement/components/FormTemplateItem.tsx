/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:48:20
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

import { formatPerfix } from '../utils/config'
import type { FormTemplateItemProps } from '../utils/interface' // 公共 interface

const FormTemplateItem: FC<FormTemplateItemProps> = ({ treeData, parent_id, orgTree, userList }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 父级 */}
			<ProFormTreeSelect
				name="parent_id"
				label={formatMessage({ id: 'global.form.parent_id' })}
				colProps={{ span: 24 }}
				tooltip={formatMessage({ id: 'global.form.parent_id.tooltip' })}
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
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: 'global.form.parent_id' }),
				}}
			/>
			{/* 岗位名称 */}
			<ProFormText
				name="jobs_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.jobs_name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.jobs_name` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[
					{ required: true, message: '' },
					{
						validator: (_, value) => {
							if (!value) {
								return Promise.reject(new Error(formatMessage({ id: 'global.form.placeholder' }) +
									formatMessage({ id: `${formatPerfix()}.jobs_name` })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(formatMessage({
									id: `${formatPerfix()}.jobs_name.validator`,
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
				label={formatMessage({ id: `${formatPerfix()}.org_name` })}
				colProps={{ span: 24 }}
				request={async () => orgTree}
				fieldProps={{
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.org_name` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.org_name` }),
				}]}
			/>
			{/* 负责人 */}
			<ProFormSelect
				name="leader"
				label={formatMessage({ id: 'global.form.leader' })}
				colProps={{ span: 24 }}
				placeholder={formatMessage({ id: 'global.form.placeholder.seleted' }) +
					formatMessage({ id: 'global.form.leader' })}
				options={userList.map((u) => ({ label: u.cn_name, value: u.user_id }))}
				rules={[{
					required: true, message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: 'global.form.leader' }),
				}]}
			/>
			{/* 排序 */}
			<ProFormDigit
				label={formatMessage({ id: 'global.table.sort' })}
				name="sort"
				colProps={{ span: 24 }}
				min={1}
				max={99}
				initialValue={1}
				tooltip={formatMessage({ id: 'global.table.sort.tooltip' })}
				fieldProps={{ precision: 0 }}
			/>
			{/* 描述 */}
			<ProFormTextArea
				name="describe"
				label={formatMessage({ id: 'global.table.describe' })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: 'global.table.describe' })}
				colProps={{ span: 24 }}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: 'global.table.describe' }),
				}]}
			/>
		</>
	)
}
export default FormTemplateItem