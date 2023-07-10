/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 10:13:08
 */
// 引入第三方库
import {
	ProFormDigit,
	ProFormRadio,
	ProFormSelect,
	ProFormText,
	ProFormTextArea,
	ProFormTreeSelect,
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { TreeSelect } from 'antd' // antd 组件库
import { keys } from 'lodash-es'
import type { FC } from 'react';

import { APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

// 引入配置项
import { formatPerfix, ORG_TYPE_OPTS } from '../utils/config' // 组织类型配置项
import type { FormTemplateItemProps } from '../utils/interface'

const FormTemplateItem: FC<FormTemplateItemProps> = ({ treeData, parent_id, userList }) => {
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
						label: 'org_name',
						value: 'org_id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: 'global.form.parent_id' }),
				}}
			/>
			{/* 组织名称 */}
			<ProFormText
				name="org_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.org_name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.org_name` })}
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
									formatMessage({ id: `${formatPerfix()}.org_name` })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(formatMessage(
									{ id: `${formatPerfix()}.org_name.validator` })))
							}
							return Promise.resolve()
						},
					},
				]}
			/>
			{/* 组织编码 */}
			<ProFormText
				name="org_code"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.org_code` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.org_code` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: `${formatPerfix()}.org_code` }),
				}]}
			/>
			{/* 组织类型 */}
			<ProFormRadio.Group
				name="org_type"
				colProps={{ span: 14 }}
				label={formatMessage({ id: `${formatPerfix()}.org_type` })}
				radioType="button"
				initialValue={'company'}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={keys(ORG_TYPE_OPTS).map((type: string) => ({
					value: type,
					label: ORG_TYPE_OPTS[type as keyof typeof ORG_TYPE_OPTS].text,
				}))}
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
			{/* 状态 */}
			<ProFormRadio.Group
				name="status"
				colProps={{ span: 8 }}
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: 'global.status' })}
				options={APP_STATUS_OPTS}
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
					required: true, message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: 'global.table.describe' }),
				}]}
			/>
		</>
	)
}
export default FormTemplateItem