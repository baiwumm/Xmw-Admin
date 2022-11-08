/*
 * @Description: 菜单管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-08 18:04:25
 */
// 引入第三方库
import type { FC } from 'react';
import { useRequest } from 'ahooks'
import React, { useState, useRef } from 'react';
import { useIntl, getLocale, useModel } from '@umijs/max'
import { ProTable, TableDropdown } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns, ColumnsState, RequestData } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, ClusterOutlined, createFromIconfontCN, InfoCircleOutlined } from '@ant-design/icons' // antd 图标库
import { Space, Button, Modal, message, Tag, Tooltip } from 'antd' // antd 组件库
import type { LabeledValue } from 'antd/es/select/index';
import moment from 'moment'
import { find } from 'lodash'

// 引入业务组件
import { getMenuList, delMenu } from '@/services/system/menu-management' // 菜单管理接口
import { getInternationalList } from '@/services/system/internationalization' // 国际化接口
import FormTemplate from './FormTemplate'  // 表单组件
import { APP_FLAG_OPTS } from '@/global/enum'
import { MENU_TYPE_TAGS, NAV_THEME_OPTS, LAYOUT_OPTS } from '../utils/enum'
import { renderColumnsStateMap } from '../utils'
import type { TableSearchProps } from '../utils/interface'

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// 初始化状态
	const { initialState } = useModel('@@initialState');
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
	const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(renderColumnsStateMap());
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}
	/**
	 * @description: 删除菜单数据
	 * @param {string} menu_id
	 * @return {*}
	 * @author: Cyan
	 */
	const handlerDelete = async (menu_id: string) => {
		Modal.confirm({
			title: formatMessage({ id: 'global.message.delete.title' }),
			content: formatMessage({ id: 'global.message.delete.content' }),
			onOk: async () => {
				return new Promise<void>(async (resolve, reject): Promise<void> => {
					await delMenu(menu_id).then(res => {
						if (res.code === 200) {
							message.success(res.msg)
							// 刷新表格
							reloadTable()
							resolve()
						}
					})
					reject()
				})

			}
		})

	}

	/**
	 * @description: 渲染操作下拉菜单子项
	 * @param {API} record
	 * @return {*}
	 * @author: Cyan
	 */
	const DropdownMenu = (record: API.MENUMANAGEMENT) => {
		return (
			[
				{
					name: <FormTemplate
						treeData={treeData}
						reloadTable={reloadTable}
						parent_id={parent_id}
						triggerDom={
							<Button
								type="text"
								size="small"
								icon={<ClusterOutlined />}
								block
								onClick={() => set_parent_id(record?.menu_id)}
							>
								{formatMessage({ id: 'menu.system.menu-management.add-child' })}
							</Button>}
						internationalData={internationalData}
					/>,
					key: 'addChild',
				},
				{
					name: <FormTemplate
						treeData={treeData}
						reloadTable={reloadTable}
						formData={currentRecord}
						triggerDom={
							<Button
								type="text"
								size="small"
								icon={<EditOutlined />}
								block
								onClick={() => setCurrentRecord(record)}
							>
								{formatMessage({ id: 'menu.system.menu-management.edit' })}
							</Button>}
						internationalData={internationalData}
					/>,
					key: 'edit',
				},
				{
					name: <Button
						block
						type="text"
						size="small"
						icon={<DeleteOutlined />} onClick={() => handlerDelete(record?.menu_id)} >
						{formatMessage({ id: 'menu.system.menu-management.delete' })}
					</Button>,
					key: 'delete',
				},
			]
		);
	}

	// 渲染 columns 函数
	const renderColumns = (record: API.MENUMANAGEMENT, opts: LabeledValue[], field: string, color = 'cyan'): React.ReactNode => {
		const value = record[field]
		const renderItem = find(opts, { value })
		return <Tag color={color}>{renderItem?.label || '-'}</Tag>
	}
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
	const columns: ProColumns<API.MENUMANAGEMENT>[] = [
		/* 菜单名称 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.name' }),
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
					value: 'id'
				},
				options: internationalData,
				placeholder: formatMessage({ id: 'global.form.placeholder.seleted' })
			},
			render: (_, record) => {
				return record.redirect ?
					<Tag>{formatMessage({ id: 'pages.system.menu-management.redirect' })}</Tag> :
					<Space>
						<Tag icon={<IconFont type={record.icon} style={{ color: initialState?.settings?.colorPrimary, fontSize: '16px' }} />} >{record[getLocale()]}</Tag>
					</Space>
			}
		},
		/* 菜单类型 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.menu_type' }),
			dataIndex: 'menu_type',
			width: 120,
			align: 'center',
			filters: true,
			onFilter: true,
			valueEnum: MENU_TYPE_TAGS,
			render: (_, record) => <Tag color={MENU_TYPE_TAGS[record.menu_type].color}>{MENU_TYPE_TAGS[record.menu_type].text}</Tag>
		},
		/* 路由地址 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.path' }),
			dataIndex: 'path',
			width: 120,
			ellipsis: true,
			hideInSearch: true,
		},
		/* 重定向 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.redirect' }),
			dataIndex: 'redirect',
			ellipsis: true,
			width: 120,
			hideInSearch: true,
		},
		/* 组件路径 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.component' }),
			dataIndex: 'component',
			width: 120,
			ellipsis: true,
			hideInSearch: true,
		},
		/* 权限标识 */
		{
			title: (
				<>
					{formatMessage({ id: 'pages.system.menu-management.permission' })}
					<Tooltip placement="top" title={formatMessage({ id: 'pages.system.menu-management.permission.tooltip' })}>
						<InfoCircleOutlined style={{ marginInlineStart: 10 }} />
					</Tooltip>
				</>
			),
			dataIndex: 'permission',
			ellipsis: true,
			hideInSearch: true,
			width: 250,
			render: text => <Tag color="volcano">{text}</Tag>
		},
		/* 权限控制 */
		{
			title: (
				<>
					{formatMessage({ id: 'pages.system.menu-management.access' })}
					<Tooltip placement="top" title={formatMessage({ id: 'pages.system.menu-management.access.tooltip' })}>
						<InfoCircleOutlined style={{ marginInlineStart: 10 }} />
					</Tooltip>
				</>
			),
			dataIndex: 'access',
			ellipsis: true,
			hideInSearch: true,
			width: 160,
			render: text => <Tag color="geekblue">{text}</Tag>
		},
		/* 状态 */
		{
			title: formatMessage({ id: 'global.status' }),
			dataIndex: 'status',
			width: 100,
			filters: true,
			onFilter: true,
			valueEnum: {
				disable: { text: formatMessage({ id: 'global.status.disable' }), status: 'Default' },
				normal: { text: formatMessage({ id: 'global.status.normal' }), status: 'Processing' },
			},
		},
		/* 排序 */
		{
			title: formatMessage({ id: 'global.table.sort' }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 100,
			render: text => <Tag color="purple">{text}</Tag>
		},
		/* 菜单主题 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.navTheme' }),
			dataIndex: 'navTheme',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, NAV_THEME_OPTS, 'navTheme')
		},
		/* 顶部菜单主题 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.headerTheme' }),
			dataIndex: 'headerTheme',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, NAV_THEME_OPTS, 'headerTheme')
		},
		/* 显示layout布局 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.layout' }),
			dataIndex: 'layout',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, LAYOUT_OPTS, 'layout')
		},
		/* 隐藏子路由 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.hideChildrenInMenu' }),
			dataIndex: 'hideChildrenInMenu',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'hideChildrenInMenu')
		},
		/* 隐藏菜单 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.hideInMenu' }),
			dataIndex: 'hideInMenu',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'hideInMenu')
		},
		/* 显示在面包屑中 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.hideInBreadcrumb' }),
			dataIndex: 'hideInBreadcrumb',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'hideInBreadcrumb')
		},
		/* 显示顶栏 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.headerRender' }),
			dataIndex: 'headerRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'headerRender')
		},
		/* 显示页脚 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.footerRender' }),
			dataIndex: 'footerRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'footerRender')
		},
		/* 显示菜单 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.menuRender' }),
			dataIndex: 'menuRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'menuRender')
		},
		/* 显示菜单顶栏 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.menuHeaderRender' }),
			dataIndex: 'menuHeaderRender',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'menuHeaderRender')
		},
		/* 子项往上提 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.flatMenu' }),
			dataIndex: 'flatMenu',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'flatMenu')
		},
		/* 固定顶栏 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.fixedHeader' }),
			dataIndex: 'fixedHeader',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'fixedHeader')
		},
		/* 固定菜单 */
		{
			title: formatMessage({ id: 'pages.system.menu-management.fixSiderbar' }),
			dataIndex: 'fixSiderbar',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			align: 'center',
			render: (_, record) => renderColumns(record, APP_FLAG_OPTS, 'fixSiderbar')
		},
		/* 创建时间 */
		{
			title: formatMessage({ id: 'global.table.created_time' }),
			dataIndex: 'created_time',
			valueType: 'date',
			hideInSearch: true,
			sorter: true,
			width: 120,
			render: text => (
				<Space>
					<ClockCircleOutlined /><span>{text}</span>
				</Space>
			)
		},
		{
			title: formatMessage({ id: 'global.table.created_time' }),
			dataIndex: 'created_time',
			valueType: 'dateRange',
			hideInTable: true,
			search: {
				transform: (value) => {
					return {
						start_time: moment(value[0]._d).format('YYYY-MM-DD 00:00:00'),
						end_time: moment(value[1]._d).format('YYYY-MM-DD 23:59:59'),
					};
				},
			},
		},
		{
			title: formatMessage({ id: 'global.table.operation' }),
			valueType: 'option',
			width: 120,
			align: 'center',
			fixed: 'right',
			render: (_, record) => [
				<TableDropdown key="actionGroup" menus={DropdownMenu(record)}>
					<Button size="small">
						{formatMessage({ id: 'global.table.operation' })}
						<DownOutlined />
					</Button>
				</TableDropdown>,
			]
		},
	]

	// 获取当前菜单数据
	useRequest(async () => await getInternationalList({ isMenu: true }), {
		onSuccess: (res) => {
			if (res.code === 200) {
				setInternationalData(res.data)
			}
		}
	})

	return (
		<ProTable<API.MENUMANAGEMENT, TableSearchProps>
			actionRef={tableRef}
			columns={columns}
			request={async (params: TableSearchProps): Promise<RequestData<API.MENUMANAGEMENT>> => {
				{
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getMenuList(params).then(res => {
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
			}
			rowKey="menu_id"
			pagination={false}
			columnsState={{
				value: columnsStateMap,
				onChange: setColumnsStateMap,
			}}
			// 工具栏
			toolBarRender={() => [
				<FormTemplate treeData={treeData} reloadTable={reloadTable} internationalData={internationalData} key="FormTemplate" />
			]}
			scroll={{ x: 1500, y: 800 }}
		/>
	)
}
export default TableTemplate