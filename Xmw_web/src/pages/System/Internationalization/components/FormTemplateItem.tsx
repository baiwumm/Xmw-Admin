/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 15:02:39
 */
// 引入第三方库
import { ProFormDigit, ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { TreeSelect } from 'antd' // antd 组件库
import type { FC } from 'react';

import { formatPerfix } from '../utils/config'
import { FormTemplateProps } from '../utils/interface'

const FormTemplateItem: FC<Pick<FormTemplateProps, 'treeData' | 'parent_id'>> = ({ treeData, parent_id }) => {
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
					defaultValue: parent_id || null,
					fieldNames: {
						label: 'name',
						value: 'id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: 'global.form.parent_id' }),
				}}
			/>
			{/* 国际化字段 */}
			<ProFormText
				name="name"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.name` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.name` })}
				fieldProps={{
					showCount: true,
					maxLength: 32,
				}}
				rules={[{
					required: true,
					message: formatMessage({ id: 'global.form.placeholder' }) +
						formatMessage({ id: `${formatPerfix()}.name` }),
				}]}
			/>
			{/* 中文 */}
			<ProFormText
				name="zh-CN"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.zh-CN` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.zh-CN` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 英文 */}
			<ProFormText
				name="en-US"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.en-US` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.en-US` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 日文 */}
			<ProFormText
				name="ja-JP"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.ja-JP` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.ja-JP` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 繁体中文 */}
			<ProFormText
				name="zh-TW"
				colProps={{ span: 24 }}
				label={formatMessage({ id: `${formatPerfix()}.zh-TW` })}
				placeholder={formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.zh-TW` })}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
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
		</>
	)
}
export default FormTemplateItem