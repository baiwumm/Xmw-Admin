/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 16:41:15
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

import { formatPerfix } from '@/utils'
import { STATUS_OPTS } from '@/utils/const'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { FormItemProps } from '@/utils/types/system/menu-management';

import { MENU_TYPE_OPTS } from '../utils/config';
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.component` })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.component` })
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.redirect` })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.redirect` })
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.path` })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.path` })
				}
				fieldProps={{
					showCount: true,
					maxLength: 100,
				}}
				rules={[
					{
						required: true,
						message:
							formatMessage({ id: INTERNATION.PLACEHOLDER }) +
							formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.path` }),
					},
				]}
			/>
			{/* 图标 */}
			<ProFormText
				name="icon"
				colProps={{ span: 12 }}
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.icon` })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.icon` })
				}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.icon.tooltip` })}
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menu_type` })}
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
				label={formatMessage({ id: INTERNATION.PARENT_ID })}
				colProps={{ span: 14 }}
				tooltip={formatMessage({ id: INTERNATION.PARENT_ID_TIP })}
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
						formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: INTERNATION.PARENT_ID }),
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.name` })}
				colProps={{ span: 12 }}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.name.tooltip` })}
				fieldProps={{
					treeData: internationalData,
					fieldNames: {
						label: 'zh-CN',
						value: 'id',
					},
					treeDefaultExpandAll: true,
					showCheckedStrategy: TreeSelect.SHOW_PARENT,
					placeholder:
						formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
						formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.name` }),
				}}
				rules={[
					{
						required: true,
						message:
							formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }) +
							formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.name` }),
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
				label={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.permission` })}
				placeholder={
					formatMessage({ id: INTERNATION.PLACEHOLDER }) +
					formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.permission` })
				}
				tooltip={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.permission.tooltip` })}
				fieldProps={{
					showCount: true,
					maxLength: 100,
				}}
			/>
			{/* 排序 */}
			<ProFormDigit
				label={formatMessage({ id: INTERNATION.SORT })}
				name="sort"
				colProps={{ span: 8 }}
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
				initialValue={1}
				fieldProps={{
					buttonStyle: 'solid',
				}}
				label={formatMessage({ id: INTERNATION.STATUS })}
				options={STATUS_OPTS}
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
