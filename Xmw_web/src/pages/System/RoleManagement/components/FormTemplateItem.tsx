/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 13:51:10
 */
// 引入第三方库
import {
	ProFormDigit,
	ProFormRadio,
	ProFormText,
	ProFormTextArea,
	ProFormTreeSelect,
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { TreeSelect } from 'antd' // antd 组件库
import type { FC } from 'react';

import { APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

import { formatPerfix } from '../utils/config'

const FormTemplateItem: FC<{ menuData: API.MENUMANAGEMENT[] }> = ({ menuData }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 角色名称 */}
			<ProFormText
				name="role_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.role_name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.role_name` })}
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
									formatMessage({ id: `${formatPerfix()}.role_name` })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(
									formatMessage({ id: `${formatPerfix()}.role_name.validator` })))
							}
							return Promise.resolve()
						},
					},
				]}
			/>
			{/* 角色编码 */}
			<ProFormText
				name="role_code"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.role_code` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.role_code` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{
					required: true, message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: `${formatPerfix()}.role_code` }),
				}]}
			/>
			{/* 菜单权限 */}
			<ProFormTreeSelect
				name="menu_permission"
				label={formatMessage({ id: `${formatPerfix()}.menu_permission` })}
				colProps={{ span: 24 }}
				fieldProps={{
					treeData: menuData,
					allowClear: true,
					fieldNames: {
						label: 'zh-CN',
						value: 'menu_id',
					},
					maxTagCount: 10,
					treeCheckable: true,
					showCheckedStrategy: TreeSelect.SHOW_ALL,
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.menu_permission` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.menu_permission` }),
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