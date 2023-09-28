/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-25 11:19:33
 */
import { ProFormText } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { Form } from 'antd'
import { keys, map } from 'lodash-es'
import type { FC } from 'react';

import { ProFormParent, ProFormSort } from '@/components/CommonProForm'
import { formatPerfix } from '@/utils'
import { INTERNATION, LANGS, ROUTES } from '@/utils/enums'
import type { EnumKeys } from '@/utils/types'
import type { FormTemplateProps } from '@/utils/types/system/internationalization'

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData'>> = ({ treeData }) => {
	const { formatMessage } = useIntl();
	// 获取上下文表单实例
	const form = Form.useFormInstance()
	// 判断是否是添加子级，有 parent_id 并且其它字段没值
	const { parent_id, name } = form.getFieldsValue(true)
	return (
		<>
			{/* 父级 */}
			<ProFormParent
				fieldProps={{
					treeData,
					disabled: parent_id && !name,
					treeNodeFilterProp: 'name',
					fieldNames: {
						label: 'name',
						value: 'id',
					},
				}} />
			{/* 国际化字段 */}
			<ProFormText
				name="name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, 'name') })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, 'name') })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{ required: true }]}
			/>
			{/* 语言类型 */}
			{map(keys(LANGS), (key: EnumKeys<typeof LANGS>) => (
				<ProFormText
					key={key}
					name={LANGS[key]}
					colProps={{ span: 24 }}
					label={formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, LANGS[key]) })}
					placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: formatPerfix(ROUTES.INTERNATIONALIZATION, LANGS[key]) })}
					fieldProps={{
						showCount: true,
						maxLength: 200,
					}}
				/>
			))}
			{/* 排序 */}
			<ProFormSort />
		</>
	)
}
export default FormTemplateItem