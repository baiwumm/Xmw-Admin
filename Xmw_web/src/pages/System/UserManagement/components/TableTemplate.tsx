/*
 * @Description: 用户管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-14 17:00:47
 */
// 引入第三方库
import {
	ClockCircleOutlined,
	createFromIconfontCN,
	ManOutlined,
	PlusOutlined,
	UnlockOutlined,
	UserOutlined,
	WomanOutlined,
} from '@ant-design/icons' // antd 图标库
import { ActionType, ColumnsState, ProColumns, ProTable, RequestData } from '@ant-design/pro-components'
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks'
import { Button, message, Modal, Popconfirm, Space, Switch, Tag } from 'antd' // antd 组件库
import dayjs from 'dayjs'
import { get } from 'lodash-es'
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import { getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
import { getRoleList } from '@/services/system/role-management' // 角色管理接口
// 引入业务组件
import { delUser, getUserList, setUserStatus } from '@/services/system/user-management' // 用户管理接口
import { columnScrollX, formatPathName, formatPerfix, renderColumnsStateMap } from '@/utils'
import { randomTagColor } from '@/utils/const'
import { INTERNATION, OPERATION, REQUEST_CODE, ROUTES, SEX, STATUS } from '@/utils/enums'
import permissions from '@/utils/permission'
import type { SearchParams } from '@/utils/types/system/user-management'

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
	const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>(renderColumnsStateMap([
		'en_name',
		'sort',
		'age',
		'email',
	]));
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
	 * @author: 白雾茫茫丶
	 */
	const handlerDelete = (user_id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
			content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
			onOk: async () => {
				await delUser(user_id).then((res) => {
					if (res.code === REQUEST_CODE.SUCCESS) {
						message.success(res.msg)
						// 刷新表格
						reloadTable()
					}
				})
			},
		})

	}

	// 设置用户状态
	const changeUserStatus = async ({ user_id, status }: API.USERMANAGEMENT) => {
		await setUserStatus({
			user_id,
			status: status === STATUS.DISABLE ? STATUS.NORMAL : STATUS.DISABLE,
		}).then((result) => {
			message.success(result.msg)
			reloadTable()
		}).finally(() => {
			setUserLoadingFalse()
		})
	}

	// 渲染设置角色状态
	const renderRoleStatus = (record: API.USERMANAGEMENT) => (
		<Popconfirm
			title={formatMessage({ id: INTERNATION.POPCONFIRM_TITLE })}
			open={userId === record.user_id && userLoading}
			onConfirm={() => changeUserStatus(record)}
			onCancel={() => setUserLoadingFalse()}
			key="popconfirm"
		><Switch
				checkedChildren={formatMessage({ id: INTERNATION.STATUS_NORMAL })}
				unCheckedChildren={formatMessage({ id: INTERNATION.STATUS_DISABLE })}
				checked={record.status === STATUS.NORMAL}
				loading={userId === record.user_id && userLoading}
				onChange={() => { setUserLoadingTrue(); setUserId(record.user_id) }}
			/>
		</Popconfirm>
	);
	/**
* @description: proTable columns 配置项
* @return {*}
* @author: 白雾茫茫丶
*/
	const columns: ProColumns<API.USERMANAGEMENT>[] = [
		{
			dataIndex: 'index',
			valueType: 'indexBorder',
			width: 48,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.user_name` }),
			dataIndex: 'user_name',
			ellipsis: true,
			width: 100,
			align: 'center',
			render: (text) => <Space>
				<Tag
					icon={<UserOutlined className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.cn_name` }),
			dataIndex: 'cn_name',
			hideInSearch: true,
			ellipsis: true,
			align: 'center',
			width: 80,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.en_name` }),
			dataIndex: 'en_name',
			hideInSearch: true,
			ellipsis: true,
			align: 'center',
			width: 80,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.avatar_url` }),
			dataIndex: 'avatar_url',
			key: 'avatar_url',
			valueType: 'image',
			width: 80,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.sex` }),
			dataIndex: 'sex',
			ellipsis: true,
			align: 'center',
			width: 60,
			filters: true,
			onFilter: true,
			valueEnum: {
				[SEX.FEMALE]: {
					text: formatMessage({
						id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.sex.female`,
					}), status: 'Default',
				},
				[SEX.MALE]: {
					text: formatMessage({
						id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.sex.male`,
					}), status: 'Processing',
				},
				[SEX.PRIVACY]: {
					text: formatMessage({
						id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.sex.secret`,
					}), status: 'Processing',
				},
			},
			render: (_, record) => {
				const colors: Record<string, string> = { 0: '#ff45cb', 1: '#0091ff' }
				const styles = { fontSize: 20 }
				return {
					[SEX.FEMALE]: <WomanOutlined style={{ color: colors[record.sex], ...styles }} />,
					[SEX.MALE]: <ManOutlined style={{ color: colors[record.sex], ...styles }} />,
					[SEX.PRIVACY]: <UnlockOutlined style={styles} className={PrimaryColor} />,
				}[record.sex]
			},
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.work_no` }),
			dataIndex: 'work_no',
			hideInSearch: true,
			ellipsis: true,
			align: 'center',
			width: 80,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.role_id` }),
			dataIndex: 'role_name',
			hideInSearch: true,
			ellipsis: true,
			width: 120,
			align: 'center',
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-role-management" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.org_id` }),
			dataIndex: 'org_name',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			align: 'center',
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-organization" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.jobs_id` }),
			dataIndex: 'jobs_name',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			align: 'center',
			render: (text) => <Space>
				<Tag
					icon={<IconFont type="icon-jobs-management" className={PrimaryColor} />} >
					{text}
				</Tag>
			</Space>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.age` }),
			dataIndex: 'age',
			hideInSearch: true,
			ellipsis: true,
			align: 'center',
			width: 60,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.phone` }),
			dataIndex: 'phone',
			hideInSearch: true,
			width: 100,
			ellipsis: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.email` }),
			dataIndex: 'email',
			hideInSearch: true,
			ellipsis: true,
			width: 120,
			align: 'center',
		},
		/* 状态 */
		{
			title: formatMessage({ id: INTERNATION.STATUS }),
			dataIndex: 'status',
			filters: true,
			onFilter: true,
			align: 'center',
			valueEnum: {
				[STATUS.DISABLE]: { text: formatMessage({ id: INTERNATION.STATUS_DISABLE }), status: 'Default' },
				[STATUS.NORMAL]: { text: formatMessage({ id: INTERNATION.STATUS_NORMAL }), status: 'Processing' },
			},
			width: 80,
			render: (_, record) => renderRoleStatus(record),
		},
		{
			title: formatMessage({ id: INTERNATION.SORT }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			sorter: true,
			width: 80,
			align: 'center',
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
		{
			title: formatMessage({ id: INTERNATION.CREATED_TIME }),
			dataIndex: 'created_time',
			valueType: 'dateTime',
			hideInSearch: true,
			sorter: true,
			width: 160,
			align: 'center',
			render: (text) => (
				<Space size="small">
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
			key: 'option',
			fixed: 'right',
			render: (_, record) => <DropdownMenu
				formatPerfix={formatPathName(ROUTES.USERMANAGEMENT)}
				editCallback={() => {
					setCurrentRecord(record);
					setModalVisibleTrue()
				}}
				deleteCallback={() => handlerDelete(record.user_id)}
				key="dropdownMenu"
			/>,
		},
	]

	/**
	 * @description: 获取角色列表
	 * @author: 白雾茫茫丶
	 */
	useRequest(async (params) => await getRoleList(params), {
		defaultParams: [{ current: 1, pageSize: 9999 }],
		onSuccess: (res) => {
			if (res.code === REQUEST_CODE.SUCCESS) {
				setRoleData(res.data.list)
			}
		},
	})


	/**
	 * @description: 获取岗位列表
	 * @author: 白雾茫茫丶
	 */
	useRequest(async () => await getJobsList(), {
		onSuccess: (res) => {
			if (res.code === REQUEST_CODE.SUCCESS) {
				setJobsData(res.data)
			}
		},
	})

	/**
	 * @description: 获取组织列表
	 * @author: 白雾茫茫丶
	 */
	useRequest(async () => await getOrganizationList(), {
		onSuccess: (res) => {
			if (res.code === REQUEST_CODE.SUCCESS) {
				setOrganizationData(res.data)
			}
		},
	})

	return (
		<>
			<ProTable<API.USERMANAGEMENT, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params: SearchParams): Promise<RequestData<API.USERMANAGEMENT>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getUserList(params).then((res) => {
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
						accessible={access.operationPermission(
							get(permissions, `${formatPathName(ROUTES.USERMANAGEMENT)}.${OPERATION.ADD}`, ''))}
						fallback={null}
						key="add"
					>
						<Button type="primary" onClick={() => { setModalVisibleTrue(); setCurrentRecord(undefined) }}>
							<PlusOutlined />
							{formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT, true)}.${OPERATION.ADD}` })}
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