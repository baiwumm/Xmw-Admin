/*
 * @Description: 菜单管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 17:22:31
 */
// 引入第三方库
import {
	ClockCircleOutlined,
	createFromIconfontCN,
	InfoCircleOutlined,
	PlusOutlined,
} from '@ant-design/icons' // antd 图标库
import {
	ActionType,
	ColumnsState,
	ProColumns,
	ProTable,
	RequestData,
} from '@ant-design/pro-components' // antd 高级组件
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, getLocale, useAccess, useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks'
import { Button, message, Modal, Space, Tag, Tooltip } from 'antd' // antd 组件库
import type { LabeledValue } from 'antd/es/select/index';
import dayjs from 'dayjs'
import { find, get } from 'lodash-es'
import React, { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import { getInternationalList } from '@/services/system/internationalization' // 国际化接口
// 引入业务组件
import { delMenu, getMenuList } from '@/services/system/menu-management' // 菜单管理接口
import { columnScrollX, formatPathName, formatPerfix, renderColumnsStateMap } from '@/utils'
import { FLAG_OPTS } from '@/utils/const'
import { INTERNATION, OPERATION, ROUTES } from '@/utils/enums'
import permissions from '@/utils/permission'
import type { SearchParams } from '@/utils/types/system/menu-management'

import { LAYOUT_OPTS, MENU_CFG, MENU_TYPE_OPTS, NAV_THEME_OPTS } from '../utils/config'
import FormTemplate from './FormTemplate' // 表单组件

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// 权限定义集合
	const access = useAccess();
	// 使用 iconfont.cn 资源
	const IconFont = createFromIconfontCN({
		scriptUrl: process.env.ICONFONT_URL,
	});
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	// 获取树形数据传递给modalForm
	const [treeData, setTreeData] = useState<API.MENUMANAGEMENT[]>([])
	// 获取树形数据传递给modalForm
	const [internationalData, setInternationalData] = useState<API.INTERNATIONALIZATION[]>([])
	// 当前行数据
	const [currentRecord, setCurrentRecord] = useState<API.MENUMANAGEMENT>()
	// 判断是否是添加子级
	const [parent_id, set_parent_id] = useState<string>('')
	// 受控的表格设置栏
	const [columnsStateMap, setColumnsStateMap] =
		useState<Record<string, ColumnsState>>(renderColumnsStateMap(MENU_CFG));
	// 是否显示抽屉表单
	const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}
	/**
	 * @description: 删除菜单数据
	 * @param {string} menu_id
	 * @return {*}
	 * @author: 白雾茫茫丶丶
	 */
	const handlerDelete = (menu_id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
			content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
			onOk: async () => {
				await delMenu(menu_id).then((res) => {
					if (res.code === 200) {
						message.success(res.msg)
						// 刷新表格
						reloadTable()
					}
				})
			},
		})

	}

	// 渲染 columns 函数
	const renderColumns = (
		record: API.MENUMANAGEMENT,
		opts: LabeledValue[],
		field: string,
		color = 'cyan'): React.ReactNode => {
		const value = record[field]
		const renderItem = find(opts, { value })
		return <Tag color={color}>{renderItem?.label || '-'}</Tag>
	}
	/**
* @description: proTable columns 配置项
* @author: 白雾茫茫丶丶
*/
	const columns: ProColumns<API.MENUMANAGEMENT>[] = [
		/* 菜单名称 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.name` }),
			dataIndex: 'xmw_internationalization.zh-CN',
			ellipsis: true,
			hideInSearch: true,
			valueType: 'treeSelect',
			width: 140,
			fixed: 'left',
			fieldProps: {
				allowClear: true,
				fieldNames: {
					label: 'zh-CN',
					value: 'id',
				},
				options: internationalData,
				placeholder: formatMessage({ id: INTERNATION.PLACEHOLDER_SELETED }),
			},
			render: (_, record) => {
				return record.redirect ?
					<Tag>{formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.redirect` })}</Tag> :
					<Space>
						{
							record.icon ?
								<Tag icon={<IconFont type={record.icon} className={PrimaryColor} />}>
									{record[getLocale()]}
								</Tag>
								:
								<Tag>{record[getLocale()]}</Tag>
						}

					</Space>
			},
		},
		/* 菜单类型 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menu_type` }),
			dataIndex: 'menu_type',
			width: 120,
			align: 'center',
			filters: true,
			onFilter: true,
			valueEnum: MENU_TYPE_OPTS,
			render: (_, record) => {
				const menu_type = record.menu_type as keyof typeof MENU_TYPE_OPTS
				return <Tag color={MENU_TYPE_OPTS[menu_type].color}>{MENU_TYPE_OPTS[menu_type].text}</Tag>
			},
		},
		/* 路由地址 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.path` }),
			dataIndex: 'path',
			width: 120,
			ellipsis: true,
			hideInSearch: true,
		},
		/* 重定向 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.redirect` }),
			dataIndex: 'redirect',
			ellipsis: true,
			width: 120,
			hideInSearch: true,
		},
		/* 组件路径 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.component` }),
			dataIndex: 'component',
			width: 120,
			ellipsis: true,
			hideInSearch: true,
		},
		/* 权限标识 */
		{
			title: (
				<>
					{formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.permission` })}
					<Tooltip
						placement="top"
						title={formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.permission.tooltip` })}>
						<InfoCircleOutlined style={{ marginInlineStart: 10 }} />
					</Tooltip>
				</>
			),
			dataIndex: 'permission',
			ellipsis: true,
			hideInSearch: true,
			width: 250,
			render: (text) => <Tag color="volcano">{text}</Tag>,
		},
		/* 状态 */
		{
			title: formatMessage({ id: INTERNATION.STATUS }),
			dataIndex: 'status',
			width: 100,
			filters: true,
			onFilter: true,
			valueEnum: {
				0: { text: formatMessage({ id: INTERNATION.STATUS_DISABLE }), status: 'Default' },
				1: { text: formatMessage({ id: INTERNATION.STATUS_NORMAL }), status: 'Processing' },
			},
		},
		/* 排序 */
		{
			title: formatMessage({ id: INTERNATION.SORT }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 100,
			render: (text) => <Tag color="purple">{text}</Tag>,
		},
		/* 菜单主题 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.navTheme` }),
			dataIndex: 'navTheme',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, NAV_THEME_OPTS, 'navTheme'),
		},
		/* 顶部菜单主题 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.headerTheme` }),
			dataIndex: 'headerTheme',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, NAV_THEME_OPTS, 'headerTheme'),
		},
		/* 显示layout布局 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.layout` }),
			dataIndex: 'layout',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, LAYOUT_OPTS, 'layout'),
		},
		/* 隐藏子路由 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideChildrenInMenu` }),
			dataIndex: 'hideChildrenInMenu',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'hideChildrenInMenu'),
		},
		/* 隐藏菜单 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideInMenu` }),
			dataIndex: 'hideInMenu',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'hideInMenu'),
		},
		/* 显示在面包屑中 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.hideInBreadcrumb` }),
			dataIndex: 'hideInBreadcrumb',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'hideInBreadcrumb'),
		},
		/* 显示顶栏 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.headerRender` }),
			dataIndex: 'headerRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'headerRender'),
		},
		/* 显示页脚 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.footerRender` }),
			dataIndex: 'footerRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'footerRender'),
		},
		/* 显示菜单 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menuRender` }),
			dataIndex: 'menuRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'menuRender'),
		},
		/* 显示菜单顶栏 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.menuHeaderRender` }),
			dataIndex: 'menuHeaderRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'menuHeaderRender'),
		},
		/* 子项往上提 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.flatMenu` }),
			dataIndex: 'flatMenu',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'flatMenu'),
		},
		/* 固定顶栏 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.fixedHeader` }),
			dataIndex: 'fixedHeader',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'fixedHeader'),
		},
		/* 固定菜单 */
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT)}.fixSiderbar` }),
			dataIndex: 'fixSiderbar',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, FLAG_OPTS, 'fixSiderbar'),
		},
		/* 创建时间 */
		{
			title: formatMessage({ id: INTERNATION.CREATED_TIME }),
			dataIndex: 'created_time',
			valueType: 'dateTime',
			hideInSearch: true,
			sorter: true,
			width: 160,
			render: (text) => (
				<Space>
					<ClockCircleOutlined /><span>{text}</span>
				</Space>
			),
		},
		{
			title: formatMessage({ id: INTERNATION.CREATED_TIME }),
			dataIndex: 'created_time',
			valueType: 'dateRange',
			hideInTable: true,
			search: {
				transform: (value) => {
					return {
						start_time: dayjs(value[0]._d).format('YYYY-MM-DD 00:00:00'),
						end_time: dayjs(value[1]._d).format('YYYY-MM-DD 23:59:59'),
					};
				},
			},
		},
		{
			title: formatMessage({ id: INTERNATION.OPERATION }),
			valueType: 'option',
			width: 80,
			align: 'center',
			fixed: 'right',
			render: (_, record) => [
				<DropdownMenu
					formatPerfix={formatPathName(ROUTES.MENUMANAGEMENT)}
					addChildCallback={() => {
						setCurrentRecord(undefined);
						set_parent_id(record?.menu_id);
						setOpenDrawerTrue()
					}}
					editCallback={() => {
						set_parent_id('');
						setCurrentRecord(record);
						setOpenDrawerTrue()
					}}
					deleteCallback={() => handlerDelete(record.menu_id)}
					key="dropdownMenu"
				/>,
			],
		},
	]

	// 获取当前菜单数据
	useRequest(async () => await getInternationalList({ isMenu: true }), {
		onSuccess: (res) => {
			if (res.code === 200) {
				setInternationalData(res.data)
			}
		},
	})

	return (
		<>
			<ProTable<API.MENUMANAGEMENT, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params: SearchParams): Promise<RequestData<API.MENUMANAGEMENT>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getMenuList(params).then((res) => {
						setTreeData(res.data)
						return {
							data: res.data,
							// success 请返回 true，不然 table 会停止解析数据，即使有数据
							success: res.code === 200,
						}
					})
					return Promise.resolve(response)
				}
				}
				rowKey="menu_id"
				pagination={false}
				columnsState={{
					value: columnsStateMap,
					onChange: setColumnsStateMap,
				}}
				// 工具栏
				toolBarRender={() => [
					<Access
						accessible={access.operationPermission(
							get(permissions, `${formatPathName(ROUTES.MENUMANAGEMENT)}.${OPERATION.ADD}`, ''),
						)}
						fallback={null}
						key="plus">
						<Button
							type="primary" onClick={() => {
								set_parent_id('');
								setCurrentRecord(undefined);
								setOpenDrawerTrue()
							}}>
							<PlusOutlined />
							{formatMessage({ id: `${formatPerfix(ROUTES.MENUMANAGEMENT, true)}.${OPERATION.ADD}` })}
						</Button>
					</Access>,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<FormTemplate
				treeData={treeData}
				reloadTable={reloadTable}
				internationalData={internationalData}
				parent_id={parent_id}
				formData={currentRecord}
				open={openDrawer}
				setOpenDrawerFalse={setOpenDrawerFalse}
			/>
		</>
	)
}
export default TableTemplate