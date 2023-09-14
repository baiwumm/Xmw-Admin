/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 09:24:27
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
import { Form, TreeSelect } from 'antd' // antd 组件库
import { keys } from 'lodash-es'
import type { FC } from 'react';

import UploadImage from '@/components/UploadImage'
import { formatPerfix } from '@/utils'
import { ORG_TYPE_OPTS, STATUS_OPTS } from '@/utils/const'
import { INTERNATION, ORG_TYPE, ROUTES, STATUS } from '@/utils/enums'
import type { FormTemplateItemProps } from '@/utils/types/administrative/organization'

const FormTemplateItem: FC<FormTemplateItemProps> = ({ treeData, parent_id, userList }) => {
	const { formatMessage } = useIntl();
	// 获取上下文表单实例
	const form = Form.useFormInstance()
	const org_logo = Form.useWatch('org_logo', form)
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
						label: 'org_name',
						value: 'org_id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: INTERNATION.PARENT_ID }),
				}}
			/>
			{/* 组织名称 */}
			<ProFormText
				name="org_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_name` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_name` })}
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
									formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_name` })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(formatMessage(
									{ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_name.validator` })))
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_code` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_code` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_code` }),
				}]}
			/>
			{/* 组织类型 */}
			<ProFormRadio.Group
				name="org_type"
				colProps={{ span: 14 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_type` })}
				radioType="button"
				initialValue={ORG_TYPE.GROUP}
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
			{/* logo */}
			<UploadImage
				name="org_logo"
				label={formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_logo` })}
				colProps={{ span: 24 }}
				max={1}
				fieldProps={{
					listType: 'picture-card',
				}}
				value={org_logo}
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
					required: true, message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: INTERNATION.DESCRIBE }),
				}]}
			/>
		</>
	)
}
export default FormTemplateItem