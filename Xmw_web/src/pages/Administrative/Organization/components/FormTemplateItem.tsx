/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-25 11:18:36
 */
import { ProFormSegmented, ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { mapValues } from 'lodash-es'
import type { FC } from 'react';

import { ProFormDescribe, ProFormLeader, ProFormParent, ProFormSort, ProFormStatus } from '@/components/CommonProForm'
import UploadImage from '@/components/UploadImage'
import { formatPerfix } from '@/utils'
import { OrgTypeEnum } from '@/utils/const'
import { INTERNATION, ORG_TYPE, ROUTES } from '@/utils/enums'
import type { FormTemplateProps } from '@/utils/types/administrative/organization'

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData'>> = ({ treeData }) => {
	const { formatMessage } = useIntl();
	// 获取上下文表单实例
	const form = Form.useFormInstance()
	// 监听组织 logo 字段
	const org_logo = Form.useWatch('org_logo', form)
	// 判断是否是添加子级，有 parent_id 并且其它字段没值
	const { parent_id, org_name } = form.getFieldsValue(true)
	return (
		<>
			{/* 父级 */}
			<ProFormParent
				fieldProps={{
					treeData,
					disabled: parent_id && !org_name,
					treeNodeFilterProp: 'org_name',
					fieldNames: {
						label: 'org_name',
						value: 'org_id',
					},
				}}
			/>
			{/* 组织名称 */}
			<ProFormText
				name="org_name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_name') })}
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
									formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_name') })))
							} else if (value.length < 2) {
								return Promise.reject(new Error(formatMessage(
									{ id: formatPerfix(ROUTES.ORGANIZATION, 'org_name.validator') })))
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
				label={formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_code') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_code') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{ required: true }]}
			/>
			{/* 组织类型 */}
			<ProFormSegmented
				colProps={{ span: 10 }}
				name="org_type"
				label={formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_type') })}
				initialValue={ORG_TYPE.GROUP}
				valueEnum={mapValues(OrgTypeEnum, (item: string) =>
					formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, `org_type.${item}`) }))}
				rules={[{ required: true }]}
			/>
			{/* 负责人 */}
			<ProFormLeader />
			{/* logo */}
			<UploadImage
				name="org_logo"
				label={formatMessage({ id: formatPerfix(ROUTES.ORGANIZATION, 'org_logo') })}
				colProps={{ span: 24 }}
				max={1}
				fieldProps={{
					listType: 'picture-card',
				}}
				value={org_logo}
			/>
			{/* 状态 */}
			<ProFormStatus />
			{/* 排序 */}
			<ProFormSort />
			{/* 描述 */}
			<ProFormDescribe />
		</>
	)
}
export default FormTemplateItem