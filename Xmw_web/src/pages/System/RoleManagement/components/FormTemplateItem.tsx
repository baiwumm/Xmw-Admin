/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 18:02:19
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

import { formatPerfix } from '@/utils'
import { STATUS_OPTS } from '@/utils/const'
import { INTERNATION, ROUTES, STATUS } from '@/utils/enums'

const FormTemplateItem: FC<{ menuData: API.MENUMANAGEMENT[] }> = ({ menuData }) => {
	const { formatMessage } = useIntl();
	return (
		<>
			{/* 角色名称 */}
			<ProFormText
				name="role_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_name` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_name` })}
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
									formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_name` })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(
									formatMessage({
										id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_name.validator`,
									})))
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_code` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_code` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{
					required: true, message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_code` }),
				}]}
			/>
			{/* 菜单权限 */}
			<ProFormTreeSelect
				name="menu_permission"
				label={formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.menu_permission` })}
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
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.menu_permission` }),
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.menu_permission` }),
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
			{/* 状态 */}
			<ProFormRadio.Group
				name="status"
				colProps={{ span: 8 }}
				initialValue={STATUS.NORMAL}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: INTERNATION.STATUS })}
				options={STATUS_OPTS}
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