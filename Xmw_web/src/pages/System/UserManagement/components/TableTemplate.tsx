/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:11:05
 */
// 引入第三方库
import {
	ClockCircleOutlined,
	createFromIconfontCN,
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	ManOutlined,
	PlusOutlined,
	UnlockOutlined,
	UserOutlined,
	WomanOutlined,
} from '@ant-design/icons' // antd 图标库
import { ActionType, ColumnsState, ProColumns, ProTable, RequestData, TableDropdown } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks'
import { Button, message, Modal, Popconfirm, Space, Switch, Tag } from 'antd' // antd 组件库
import dayjs from 'dayjs'
import { FC, useRef, useState } from 'react';

import type { DropdownMenuProps, PageResModel, ResponseModel } from '@/global/interface'
import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { getRoleList } from '@/services/system/role-management' // 角色管理接口
// 引入业务组件
import { delUser, getUserList, setUserStatus } from '@/services/system/user-management' // 用户管理接口
import { columnScrollX } from '@/utils'
import permissions from '@/utils/permission'

import { renderColumnsStateMap } from '../utils'
import { formatPerfix } from '../utils/config'
import type { TableSearchProps } from '../utils/interface'
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
	const [currentRecord, setCurrentRecord] = useState<API.USERMANAGEMENT>()
	// 获取角色数据传递给modalForm
	const [roleData, setRoleData] = useState<API.ROLEMANAGEMENT[]>([])
	// 获取岗位数据传递给modalForm
	const [jobsData, setJobsData] = useState<API.JOBSMANAGEMENT[]>([])
	// 获取组织数据传递给modalForm
	const [organizationData, setOrganizationData] = useState<API.ORGANIZATION[]>([])
	// 设置用户状态
	const [userLoading, { setTrue: setUserLoadingTrue, setFalse: setUserLoadingFalse }] = useBoolean(false);
	const [userId, setUserId] = useState<string>('')
	// Modal 框显隐
	const [modalVisible, { setTrue: setModalVisibleTrue, setFalse: setModalVisibleFalse }] = useBoolean(false);
	// 受控的表格设置栏
	const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(renderColumnsStateMap());
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary, fontSize: 16 };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

	/**
	 * @description: 删除用户数据
	 * @param {string} user_id
	 * @return {*}
	 * @author: Cyan
	 */
	const handlerDelete = (user_id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: 'global.message.delete.title' }),
			content: formatMessage({ id: 'global.message.delete.content' }),
			onOk: async () => {
				await delUser(user_id).then((res) => {
					if (res.code === 200) {
						message.success(res.msg)
						// 刷新表格
						reloadTable()
					}
				})
			},
		})

	}

	/**
	 * @description: 渲染操作下拉菜单子项
	 * @param {API} record
	 * @return {*}
	 * @author: Cyan
	 */
	const DropdownMenu = (record: API.USERMANAGEMENT): DropdownMenuProps[] => {
		return (
			[
				{
					name:
						<Access
							accessible={access.operationPermission(permissions.userManagement.edit)}
							fallback={null}
						>
							<Button
								type="text"
								size="small"
								icon={<EditOutlined />} block
								onClick={() => { setCurrentRecord(record); setModalVisibleTrue() }}
							>
								{formatMessage({ id: `${formatPerfix(true)}.edit` })}
							</Button>
						</Access>,
					key: 'edit',
				},
				{
					name:
						<Access
							accessible={access.operationPermission(permissions.userManagement.delete)}
							fallback={null}
						>
							<Button
								block
								type="text"
								size="small"
								icon={<DeleteOutlined />} onClick={() => handlerDelete(record.user_id)} >
								{formatMessage({ id: `${formatPerfix(true)}.delete` })}
							</Button>
						</Access>,
					key: 'delete',
				},
			]
		);
	}

	// 设置用户状态
	const changeUserStatus = async ({ user_id, status }: API.USERMANAGEMENT) => {
		await setUserStatus({ user_id, status: status === 0 ? 1 : 0 }).then((result) => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setUserLoadingFalse()
		})
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.USERMANAGEMENT) => (
		<Popconfirm
			title="确认执行此操作吗?"
			open={userId === record.user_id && userLoading}
			onConfirm={() => changeUserStatus(record)}
			onCancel={() => setUserLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: 'global.status.normal' })}
				unCheckedChildren={formatMessage({ id: 'global.status.disable' })}
				checked={record.status === 1}
				loading={userId === record.user_id && userLoading}
				onChange={() => { setUserLoadingTrue(); setUserId(record.user_id) }}
			/>
		</Popconfirm>
	);
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
	const columns: ProColumns<API.USERMANAGEMENT>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.user_name` }),
			dataIndex: 'user_name',
			ellipsis: true,
			width: 100,
			render: (text) => <Space>
				<Tag
					icon={<UserOutlined className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.cn_name` }),
			dataIndex: 'cn_name',
			hideInSearch: true,
			ellipsis: true,
			width: 80,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.en_name` }),
			dataIndex: 'en_name',
			hideInSearch: true,
			ellipsis: true,
			width: 80,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.avatar_url` }),
			dataIndex: 'avatar_url',
			key: 'avatar_url',
			valueType: 'image',
			width: 80,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.sex` }),
			dataIndex: 'sex',
			ellipsis: true,
			align: 'center',
			width: 60,
			filters: true,
			onFilter: true,
			valueEnum: {
				0: { text: formatMessage({ id: `${formatPerfix()}.sex.female` }), status: 'Default' },
				1: { text: formatMessage({ id: `${formatPerfix()}.sex.male` }), status: 'Processing' },
				2: { text: formatMessage({ id: `${formatPerfix()}.sex.secret` }), status: 'Processing' },
			},
			render: (_, record) => {
				const colors: Record<string, string> = { 0: '#ff45cb', 1: '#0091ff' }
				const styles = { fontSize: 20 }
				return {
					0: <WomanOutlined style={{ color: colors[record.sex], ...styles }} />,
					1: <ManOutlined style={{ color: colors[record.sex], ...styles }} />,
					2: <UnlockOutlined style={styles} className={PrimaryColor} />,
				}[record.sex]
			},
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.work_no` }),
			dataIndex: 'work_no',
			hideInSearch: true,
			ellipsis: true,
			width: 80,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.role_id` }),
			dataIndex: 'role_name',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-role-management" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.org_id` }),
			dataIndex: 'org_name',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-organization" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.jobs_id` }),
			dataIndex: 'jobs_name',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-jobs-management" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.age` }),
			dataIndex: 'age',
			hideInSearch: true,
			ellipsis: true,
			width: 60,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.phone` }),
			dataIndex: 'phone',
			hideInSearch: true,
			width: 100,
			ellipsis: true,
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.email` }),
			dataIndex: 'email',
			hideInSearch: true,
			ellipsis: true,
			width: 120,
		},
		/* 状态 */
		{
			title: formatMessage({ id: 'global.status' }),
			dataIndex: 'status',
			filters: true,
			onFilter: true,
			valueEnum: {
				0: { text: formatMessage({ id: 'global.status.disable' }), status: 'Default' },
				1: { text: formatMessage({ id: 'global.status.normal' }), status: 'Processing' },
			},
			width: 80,
			render: (_, record) => renderRoleStatus(record),
		},
		{
			title: formatMessage({ id: 'global.table.sort' }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 80,
			render: (text) => <Tag color="purple">{text}</Tag>,
		},
		{
			title: formatMessage({ id: 'global.table.created_time' }),
			dataIndex: 'created_time',
			valueType: 'date',
			hideInSearch: true,
			sorter: true,
			width: 120,
			render: (text) => (
				<Space>
					<ClockCircleOutlined /><span>{text}</span>
				</Space>
			),
		},
		{
			title: formatMessage({ id: 'global.table.created_time' }),
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
			title: formatMessage({ id: 'global.table.operation' }),
			valueType: 'option',
			width: 80,
			align: 'center',
			key: 'option',
			fixed: 'right',
			render: (_, record) => [
				<TableDropdown key="actionGroup" menus={DropdownMenu(record)}>
					<Button size="small">
						{formatMessage({ id: 'global.table.operation' })}
						<DownOutlined />
					</Button>
				</TableDropdown>,
			],
		},
	]

	/**
	 * @description: 获取角色列表
	 * @return {*}
	 * @author: Cyan
	 */
	useRequest(async (params) => await getRoleList(params), {
		defaultParams: [{ current: 1, pageSize: 9999 }],
		onSuccess: (res: ResponseModel<PageResModel<API.ROLEMANAGEMENT>>) => {
			if (res.code === 200) {
				setRoleData(res.data.list)
			}
		},
	})


	/**
	 * @description: 获取岗位列表
	 * @return {*}
	 * @author: Cyan
	 */
	useRequest(async () => await getJobsList(), {
		onSuccess: (res: ResponseModel<API.JOBSMANAGEMENT[]>) => {
			if (res.code === 200) {
				setJobsData(res.data)
			}
		},
	})

	/**
	 * @description: 获取组织列表
	 * @return {*}
	 * @author: Cyan
	 */
	useRequest(async () => await getOrganizationList(), {
		onSuccess: (res: ResponseModel<API.ORGANIZATION[]>) => {
			if (res.code === 200) {
				setOrganizationData(res.data)
			}
		},
	})

	return (
		<>
			<ProTable<API.USERMANAGEMENT, TableSearchProps>
				actionRef={tableRef}
				columns={columns}
				request={async (params: TableSearchProps): Promise<RequestData<API.USERMANAGEMENT>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getUserList(params).then((res) => {
						return {
							data: res.data.list,
							// success 请返回 true，不然 table 会停止解析数据，即使有数据
							success: res.code === 200,
							total: res.data.total,
						}
					})
					return Promise.resolve(response)
				}
				}
				rowKey="user_id"
				pagination={{
					pageSize: 5,
				}}
				columnsState={{
					value: columnsStateMap,
					onChange: setColumnsStateMap,
				}}
				// 工具栏
				toolBarRender={() => [
					<Access
						accessible={access.operationPermission(permissions.userManagement.add)}
						fallback={null}
						key="add"
					>
						<Button type="primary" onClick={() => { setModalVisibleTrue(); setCurrentRecord(undefined) }}>
							<PlusOutlined />
							{formatMessage({ id: 'menu.system.user-management.add' })}
						</Button>
					</Access>,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 分步表单 */}
			{
				modalVisible ? <FormTemplate
					reloadTable={reloadTable}
					roleData={roleData}
					formData={currentRecord}
					jobsData={jobsData}
					organizationData={organizationData}
					modalVisible={modalVisible}
					setModalVisibleFalse={setModalVisibleFalse}
					key="FormTemplate" /> : null
			}

		</>
	)
}
export default TableTemplate