/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-04 13:56:27
 */
// 引入第三方库
import { ProFormDigit, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { TreeSelect } from 'antd' // antd 组件库
import type { FC } from 'react';

import { formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'
import { FormTemplateProps } from '@/utils/types/system/internationalization'

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData' | 'parent_id'>> = ({ treeData, parent_id }) => {
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
					defaultValue: parent_id || null,
					fieldNames: {
						label: 'name',
						value: 'id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: INTERNATION.PARENT_ID }),
				}}
			/>
			{/* 国际化字段 */}
			<ProFormText
				name="name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.name` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.name` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
						formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.name` }),
				}]}
			/>
			{/* 中文 */}
			<ProFormText
				name="zh-CN"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.zh-CN` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.zh-CN` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 英文 */}
			<ProFormText
				name="en-US"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.en-US` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.en-US` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 日文 */}
			<ProFormText
				name="ja-JP"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.ja-JP` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.ja-JP` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 繁体中文 */}
			<ProFormText
				name="zh-TW"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.zh-TW` })}
				placeholder={formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.INTERNATIONALIZATION)}.zh-TW` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
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
		</>
	)
}
export default FormTemplateItem