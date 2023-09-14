/*
 * @Description: 角色管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 17:57:34
 */
// 引入第三方库
import { ClockCircleOutlined, createFromIconfontCN, PlusOutlined } from '@ant-design/icons' // antd 图标库
import { ActionType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components' // antd 高级组件
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, useAccess, useIntl, useRequest } from '@umijs/max'
import { useBoolean } from 'ahooks';
import { Button, message, Modal, Popconfirm, Space, Switch, Tag } from 'antd' // antd 组件库
import dayjs from 'dayjs'
import { get } from 'lodash-es'
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import { getMenuList } from '@/services/system/menu-management' // 菜单管理接口
import { delRole, getRoleList, setRoleStatus } from '@/services/system/role-management' // 角色管理接口
import { columnScrollX, formatPathName, formatPerfix } from '@/utils'
import { randomTagColor } from '@/utils/const'
import { INTERNATION, OPERATION, REQUEST_CODE, ROUTES, STATUS } from '@/utils/enums'
import permissions from '@/utils/permission'
import type { RoleStatusParams, SearchParams } from '@/utils/types/system/role-management'

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
	// 当前行数据
	const [currentRecord, setCurrentRecord] = useState<API.ROLEMANAGEMENT>()
	// 获取树形数据传递给modalForm
	const [menuData, setMenuData] = useState<API.MENUMANAGEMENT[]>([])
	const [roleLoading, { setTrue: setRoleLoadingTrue, setFalse: setRoleLoadingFalse }] = useBoolean(false);
	const [roleId, setRoleId] = useState<string>('')
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
	 * @description: 删除角色数据
	 * @param {string} role_id
	 * @author: 白雾茫茫丶
	 */
	const handlerDelete = (role_id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
			content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
			onOk: async () => {
				await delRole(role_id).then((res) => {
					if (res.code === REQUEST_CODE.SUCCESS) {
						message.success(res.msg)
						// 刷新表格
						reloadTable()
					}
				})
			},
		})
	}

	// 设置角色状态
	const changeRoleStatus = async ({ role_id, status }: RoleStatusParams) => {
		await setRoleStatus({
			role_id,
			status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
		}).then((result) => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setRoleLoadingFalse()
		})
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.ROLEMANAGEMENT) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={roleId === record.role_id && roleLoading}
			onConfirm={() => changeRoleStatus(record)}
			onCancel={() => setRoleLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === STATUS.NORMAL}
				loading={roleId === record.role_id && roleLoading}
				onChange={() => { setRoleLoadingTrue(); setRoleId(record.role_id) }}
			/>
		</Popconfirm>
	);
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: 白雾茫茫丶
*/
	const columns: ProColumns<API.ROLEMANAGEMENT>[] = [
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_name` }),
			dataIndex: 'role_name',
			ellipsis: true,
			width: 160,
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-role-management" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT)}.role_code` }),
			dataIndex: 'role_code',
			width: 140,
			ellipsis: true,
		},
		/* 状态 */
		{
			title: formatMessage({ id: INTERNATION.STATUS }),
			dataIndex: 'status',
			filters: true,
			onFilter: true,
			width: 100,
			valueEnum: {
				[STATUS.DISABLE]: { text: formatMessage({ id: INTERNATION.STATUS_DISABLE }), status: 'Default' },
				[STATUS.NORMAL]: { text: formatMessage({ id: INTERNATION.STATUS_NORMAL }), status: 'Processing' },
			},
			render: (_, record) => renderRoleStatus(record),
		},
		{
			title: formatMessage({ id: INTERNATION.SORT }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 80,
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
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
			title: formatMessage({ id: INTERNATION.DESCRIBE }),
			dataIndex: 'describe',
			ellipsis: true,
			width: 100,
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: INTERNATION.OPERATION }),
			valueType: 'option',
			width: 80,
			align: 'center',
			key: 'option',
			render: (_, record) => [
				<DropdownMenu
					formatPerfix={formatPathName(ROUTES.ROLEMANAGEMENT)}
					editCallback={() => {
						setCurrentRecord(record);
						setOpenDrawerTrue()
					}}
					deleteCallback={() => handlerDelete(record.role_id)}
					key="dropdownMenu"
				/>,
			],
		},
	]

	// 获取当前菜单数据
	useRequest(async () => await getMenuList({ isPremission: true }), {
		onSuccess: (result) => {
			setMenuData(result)
		},
	})

	return (
		<>
			<ProTable<API.ROLEMANAGEMENT, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params: SearchParams): Promise<RequestData<API.ROLEMANAGEMENT>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getRoleList(params).then((res) => {
						return {
							data: get(res, 'data.list', []),
							// success 请返回 true，不然 table 会停止解析数据，即使有数据
							success: res.code === REQUEST_CODE.SUCCESS,
							total: get(res, 'data.total', 0),
						}
					})
					return Promise.resolve(response)
				}
				}
				rowKey="role_id"
				pagination={{
					pageSize: 5,
				}}
				// 工具栏
				toolBarRender={() => [
					<Access
						accessible={access.operationPermission(
							get(permissions, `${formatPathName(ROUTES.ROLEMANAGEMENT)}.${OPERATION.ADD}`, ''),
						)}
						fallback={null}
						key="plus"
					>
						<Button type="primary" onClick={() => { setCurrentRecord(undefined); setOpenDrawerTrue() }}>
							<PlusOutlined />
							{formatMessage({ id: `${formatPerfix(ROUTES.ROLEMANAGEMENT, true)}.${OPERATION.ADD}` })}
						</Button>
					</Access>,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<FormTemplate
				reloadTable={reloadTable}
				menuData={menuData}
				formData={currentRecord}
				open={openDrawer}
				setOpenDrawerFalse={setOpenDrawerFalse}
			/>
		</>
	)
}
export default TableTemplate