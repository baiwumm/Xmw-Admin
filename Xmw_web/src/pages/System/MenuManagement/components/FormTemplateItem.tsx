/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 14:48:11
 */
// 引入第三方库
import {
	ProFormDependency,
	ProFormDigit,
	ProFormRadio,
	ProFormText,
	ProFormTreeSelect,
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max';
import { Divider, TreeSelect, Typography } from 'antd'; // antd 组件库
import { keys } from 'lodash-es';
import type { FC } from 'react';

import { APP_STATUS_OPTS } from '@/global/enum'; // 状态枚举

import { formatPerfix, MENU_TYPE_OPTS } from '../utils/config';
import type { FormItemProps } from '../utils/interface';
import MenuFormRender from './MenuFormRender';

const { Title } = Typography;

const FormTemplateItem: FC<FormItemProps> = ({ treeData, parent_id, internationalData }) => {
	const { formatMessage } = useIntl();
	// 是按钮就显示
	const isMenuRender = (
		<>
			{/* 组件路径 */}
			<ProFormText
				name="component"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.component` })}
				placeholder={
					formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.component` })
				}
				fieldProps={{
					showCount: true,
					maxLength: 200,
				}}
			/>
			{/* 重定向 */}
			<ProFormText
				name="redirect"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.redirect` })}
				placeholder={
					formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.redirect` })
				}
				fieldProps={{
					showCount: true,
					maxLength: 100,
				}}
			/>
		</>
	);
	// 不是按钮就隐藏这些选项
	const unButtonRender = (
		<>
			{/* 路由地址 */}
			<ProFormText
				name="path"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.path` })}
				placeholder={
					formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.path` })
				}
				fieldProps={{
					showCount: true,
					maxLength: 100,
				}}
				rules={[
					{
						required: true,
						message:
							formatMessage({ id: 'global.form.placeholder' }) +
							formatMessage({ id: `${formatPerfix()}.path` }),
					},
				]}
			/>
			{/* 图标 */}
			<ProFormText
				name="icon"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.icon` })}
				placeholder={
					formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.icon` })
				}
				tooltip={formatMessage({ id: `${formatPerfix()}.icon.tooltip` })}
				fieldProps={{
					showCount: true,
					maxLength: 50,
				}}
			/>
		</>
	);
	return (
		<>
			{/* 组织类型 */}
			<ProFormRadio.Group
				name="menu_type"
				colProps={{ span: 10 }}
				label={formatMessage({ id: `${formatPerfix()}.menu_type` })}
				radioType="button"
				initialValue={'dir'}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				options={keys(MENU_TYPE_OPTS).map((type: string) => ({
					value: type,
					label: MENU_TYPE_OPTS[type as keyof typeof MENU_TYPE_OPTS].text,
				}))}
			/>
			{/* 父级 */}
			<ProFormTreeSelect
				name="parent_id"
				label={formatMessage({ id: 'global.form.parent_id' })}
				colProps={{ span: 14 }}
				tooltip={formatMessage({ id: 'global.form.parent_id.tooltip' })}
				fieldProps={{
					treeData,
					allowClear: true,
					disabled: !!parent_id,
					defaultValue: parent_id || null,
					fieldNames: {
						label: 'zh-CN',
						value: 'menu_id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder:
						formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: 'global.form.parent_id' }),
				}}
			/>
			<Divider orientation="left" style={{ marginTop: 0, marginBottom: '24px' }}>
				<Title level={4} style={{ marginBottom: '-14px' }}>
					基本信息
				</Title>
			</Divider>
			{/* 路由名称 */}
			<ProFormTreeSelect
				name="name"
				label={formatMessage({ id: `${formatPerfix()}.name` })}
				colProps={{ span: 12 }}
				tooltip={formatMessage({ id: `${formatPerfix()}.name.tooltip` })}
				fieldProps={{
					treeData: internationalData,
					fieldNames: {
						label: 'zh-CN',
						value: 'id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder:
						formatMessage({ id: 'global.form.placeholder.seleted' }) +
						formatMessage({ id: `${formatPerfix()}.name` }),
				}}
				rules={[
					{
						required: true,
						message:
							formatMessage({ id: 'global.form.placeholder.seleted' }) +
							formatMessage({ id: `${formatPerfix()}.name` }),
					},
				]}
			/>
			<ProFormDependency name={['menu_type']}>
				{({ menu_type }) => {
					return menu_type === 'menu' ? isMenuRender : null;
				}}
			</ProFormDependency>
			<ProFormDependency name={['menu_type']}>
				{({ menu_type }) => {
					return menu_type !== 'button' ? unButtonRender : null;
				}}
			</ProFormDependency>

			{/* 权限标识 */}
			<ProFormText
				name="permission"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix()}.permission` })}
				placeholder={
					formatMessage({ id: 'global.form.placeholder' }) +
					formatMessage({ id: `${formatPerfix()}.permission` })
				}
				tooltip={formatMessage({ id: `${formatPerfix()}.permission.tooltip` })}
				fieldProps={{
					showCount: true,
					maxLength: 100,
				}}
			/>
			{/* 排序 */}
			<ProFormDigit
				label={formatMessage({ id: 'global.table.sort' })}
				name="sort"
				colProps={{ span: 8 }}
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
			<ProFormDependency name={['menu_type']}>
				{({ menu_type }) => {
					return menu_type === 'menu' ? <MenuFormRender /> : null;
				}}
			</ProFormDependency>
		</>
	);
};
export default FormTemplateItem;
