/*
 * @Description: 角色管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-07 14:10:22
 */
// 引入第三方库
import type { FC } from 'react';
import { useState, useRef } from 'react';
import { useBoolean } from 'ahooks';
import { useIntl, useModel, useRequest, useAccess, Access } from '@umijs/max'
import { ProTable, TableDropdown } from '@ant-design/pro-components' // antd 高级组件
import type { ActionType, ProColumns, RequestData } from '@ant-design/pro-components'
import { ClockCircleOutlined, EditOutlined, DeleteOutlined, DownOutlined, createFromIconfontCN } from '@ant-design/icons' // antd 图标库
import { Tag, Space, Button, Modal, message, Switch, Popconfirm } from 'antd' // antd 组件库
import moment from 'moment'

// 引入业务组件
import { getRoleList, delRole, setRoleStatus } from '@/services/system/role-management' // 角色管理接口
import { getMenuList } from '@/services/system/menu-management' // 菜单管理接口
import { columnScrollX } from '@/utils'
import permissions from '@/utils/permission'
import FormTemplate from './FormTemplate'  // 表单组件
import type { TableSearchProps, RoleStatusProps } from '../utils/interface'

const TableTemplate: FC = () => {
	const { formatMessage } = useIntl();
	// 初始化状态
	const { initialState } = useModel('@@initialState');
	// 权限定义集合
	const access = useAccess();
	// 使用 iconfont.cn 资源
	const IconFont = createFromIconfontCN({
		scriptUrl: process.env.ICONFONT_URL,
	});
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	// 当前行数据
	const [currentRecord, setCurrentRecord] = useState<API.ROLEMANAGEMENT>()
	// 获取树形数据传递给modalForm
	const [menuData, setMenuData] = useState<API.MENUMANAGEMENT[]>([])
	const [roleLoading, { setTrue: setRoleLoadingTrue, setFalse: setRoleLoadingFalse }] = useBoolean(false);
	const [roleId, setRoleId] = useState<string>('')
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

	/**
	 * @description: 删除角色数据
	 * @param {string} role_id
	 * @return {*}
	 * @author: Cyan
	 */
	const handlerDelete = async (role_id: string): Promise<void> => {
		Modal.confirm({
			title: formatMessage({ id: 'global.message.delete.title' }),
			content: formatMessage({ id: 'global.message.delete.content' }),
			onOk: async () => {
				return new Promise<void>(async (resolve, reject): Promise<void> => {
					await delRole(role_id).then(res => {
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
	const DropdownMenu = (record: API.ROLEMANAGEMENT) => {
		return (
			[
				{
					name: <Access accessible={access.operationPermission(permissions.roleManagement.edit)} fallback={null}>
						<FormTemplate
							reloadTable={reloadTable}
							formData={currentRecord}
							menuData={menuData}
							triggerDom={
								<Button
									type="text"
									size="small"
									icon={<EditOutlined />}
									block
									onClick={() => setCurrentRecord(record)}
								>
									{formatMessage({ id: 'menu.system.role-management.edit' })}
								</Button>}
						/>
					</Access>,
					key: 'edit',
				},
				{
					name: <Access accessible={access.operationPermission(permissions.roleManagement.delete)} fallback={null}>
						<Button
							block
							type="text"
							size="small"
							icon={<DeleteOutlined />} onClick={() => handlerDelete(record?.role_id)} >
							{formatMessage({ id: 'menu.system.role-management.delete' })}
						</Button>
					</Access>,
					key: 'delete',
				},
			]
		);
	}

	// 设置角色状态
	const changeRoleStatus = async ({ role_id, status }: RoleStatusProps) => {
		await setRoleStatus({ role_id, status: status === 0 ? 1 : 0 }).then(result => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setRoleLoadingFalse()
		})
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.ROLEMANAGEMENT) => (
		<Popconfirm
			title="确认执行此操作吗?"
			open={roleId === record.role_id && roleLoading}
			onConfirm={() => changeRoleStatus(record)}
			onCancel={() => setRoleLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: 'global.status.normal' })}
				unCheckedChildren={formatMessage({ id: 'global.status.disable' })}
				checked={record.status === 1}
				loading={roleId === record.role_id && roleLoading}
				onChange={() => { setRoleLoadingTrue(); setRoleId(record.role_id) }}
			/>
		</Popconfirm>
	);
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
	const columns: ProColumns<API.ROLEMANAGEMENT>[] = [
		{
			title: formatMessage({ id: 'pages.system.role-management.role_name' }),
			dataIndex: 'role_name',
			ellipsis: true,
			width: 140,
			render: text => <Space>
				<Tag
					icon={<IconFont type="icon-role-management" style={{ color: initialState?.Settings?.colorPrimary, fontSize: '16px' }} />} >
					{text}
				</Tag>
			</Space>
		},
		{
			title: formatMessage({ id: 'pages.system.role-management.role_code' }),
			dataIndex: 'role_code',
			width: 140,
			ellipsis: true,
		},
		/* 状态 */
		{
			title: formatMessage({ id: 'global.status' }),
			dataIndex: 'status',
			filters: true,
			onFilter: true,
			width: 100,
			valueEnum: {
				0: { text: formatMessage({ id: 'global.status.disable' }), status: 'Default' },
				1: { text: formatMessage({ id: 'global.status.normal' }), status: 'Processing' },
			},
			render: (_, record) => renderRoleStatus(record)
		},
		{
			title: formatMessage({ id: 'global.table.sort' }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 80,
			render: text => <Tag color="purple">{text}</Tag>
		},
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
			title: formatMessage({ id: 'global.table.describe' }),
			dataIndex: 'describe',
			ellipsis: true,
			width: 100,
			hideInSearch: true
		},
		{
			title: formatMessage({ id: 'global.table.operation' }),
			valueType: 'option',
			width: 80,
			align: 'center',
			key: 'option',
			render: (_, record) => [
				<TableDropdown key="actionGroup" menus={DropdownMenu(record)}>
					<Button size="small">
						{formatMessage({ id: 'global.table.operation' })}
						<DownOutlined />
					</Button>
				</TableDropdown>
			]
		},
	]

	// 获取当前菜单数据
	useRequest(async () => await getMenuList({ isPremission: true }), {
		onSuccess: (result) => {
			setMenuData(result)
		}
	})

	return (
		<ProTable<API.ROLEMANAGEMENT, TableSearchProps>
			actionRef={tableRef}
			columns={columns}
			request={async (params: TableSearchProps): Promise<RequestData<API.ROLEMANAGEMENT>> => {
				{
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getRoleList(params).then(res => {
						return {
							data: res.data.list,
							// success 请返回 true，不然 table 会停止解析数据，即使有数据
							success: res.code === 200,
							total: res.data.total
						}
					})
					return Promise.resolve(response)
				}
			}
			}
			rowKey="role_id"
			pagination={{
				pageSize: 5,
			}}
			// 工具栏
			toolBarRender={() => [
				<FormTemplate reloadTable={reloadTable} menuData={menuData} key="FormTemplate" />
			]}
			scroll={{ x: columnScrollX(columns) }}
		/>
	)
}
export default TableTemplate