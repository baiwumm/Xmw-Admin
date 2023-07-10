/*
 * @Description: 岗位管理-表格列表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 14:50:44
 */
// 引入第三方库
import {
	ClockCircleOutlined,
	ClusterOutlined,
	createFromIconfontCN,
	DeleteOutlined,
	DownOutlined,
	EditOutlined,
	PlusOutlined,
} from '@ant-design/icons' // antd 图标库
import { ActionType, ProColumns, ProTable, RequestData, TableDropdown } from '@ant-design/pro-components' // antd 高级组件
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks';
import { Button, message, Modal, Space, Tag } from 'antd' // antd 组件库
import dayjs from 'dayjs'
import React, { FC, useRef, useState } from 'react';

import type { DropdownMenuProps, PageResModel, PaginationProps, ResData } from '@/global/interface'
import { delJobs, getJobsList } from '@/services/administrative/jobs-management' // 岗位管理接口
import { getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
// 引入业务组件
import { getUserList } from '@/services/system/user-management' // 用户管理接口
import { columnScrollX, formatResult } from '@/utils'
import permissions from '@/utils/permission'

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
	// 获取组织树形数据
	const { data: orgTree } = useRequest<API.ORGANIZATION[], ResData[]>(
		async () => formatResult(await getOrganizationList()),
	);
	// 获取用户列表
	const { data: userList } = useRequest<PageResModel<API.USERMANAGEMENT>, PaginationProps[]>(
		async (params) => formatResult(await getUserList(params)), {
		defaultParams: [{ current: 1, pageSize: 9999 }],
	});
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	// 获取树形数据传递给drawerForm
	const [treeData, setTreeData] = useState<API.JOBSMANAGEMENT[]>([])
	// 当前行数据
	const [currentRecord, setCurrentRecord] = useState<API.JOBSMANAGEMENT>()
	// 判断是否是添加子级
	const [parent_id, set_parent_id] = useState<string>('')
	// 是否显示抽屉表单
	const [openDrawer, { setTrue: setOpenDrawerTrue, setFalse: setOpenDrawerFalse }] = useBoolean(false)
	// 跟随主题色变化
	const PrimaryColor = useEmotionCss(({ token }) => {
		return { color: token.colorPrimary };
	});
	// 手动触发刷新表格
	function reloadTable() {
		tableRef?.current?.reload()
	}

	/**
	 * @description: 删除岗位数据
	 * @param {string} jobs_id
	 * @return {*}
	 * @author: Cyan
	 */
	const handlerDelete = (jobs_id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: 'global.message.delete.title' }),
			content: formatMessage({ id: 'global.message.delete.content' }),
			onOk: async () => {
				await delJobs(jobs_id).then((res) => {
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
	const DropdownMenu = (record: API.JOBSMANAGEMENT): DropdownMenuProps[] => {
		return (
			[
				{
					name:
						<Access
							accessible={access.operationPermission(permissions.jobsManagement.addChild)}
							fallback={null}>
							<Button
								type="text"
								size="small"
								icon={<ClusterOutlined />}
								block
								onClick={() => {
									setCurrentRecord(undefined); set_parent_id(record.jobs_id); setOpenDrawerTrue()
								}}
							>
								{formatMessage({ id: `${formatPerfix(true)}.add-child` })}
							</Button>
						</Access>,
					key: 'addChild',
				},
				{
					name:
						<Access
							accessible={access.operationPermission(permissions.jobsManagement.edit)}
							fallback={null}>
							<Button
								type="text"
								size="small"
								icon={<EditOutlined />}
								block
								onClick={() => { set_parent_id(''); setCurrentRecord(record); setOpenDrawerTrue() }}
							>
								{formatMessage({ id: `${formatPerfix(true)}.edit` })}
							</Button>
						</Access>,
					key: 'edit',
				},
				{
					name: <Access
						accessible={access.operationPermission(permissions.jobsManagement.delete)}
						fallback={null}>
						<Button
							block
							type="text"
							size="small"
							icon={<DeleteOutlined />} onClick={() => handlerDelete(record.jobs_id)} >
							{formatMessage({ id: `${formatPerfix(true)}.delete` })}
						</Button>
					</Access>,
					key: 'delete',
				},
			]
		);
	}

	/**
* @description: proTable columns 配置项
* @return {*}
* @author: Cyan
*/
	const columns: ProColumns<API.JOBSMANAGEMENT>[] = [
		{
			title: formatMessage({ id: `${formatPerfix()}.jobs_name` }),
			dataIndex: 'jobs_name',
			ellipsis: true,
			width: 120,
			render: (text) => (
				<Space>
					<IconFont type="icon-jobs-management" style={{ fontSize: '16px' }} className={PrimaryColor} />
					<span>{text}</span>
				</Space>
			),
		},
		{
			title: formatMessage({ id: `${formatPerfix()}.org_name` }),
			dataIndex: 'org_id',
			ellipsis: true,
			valueType: 'treeSelect',
			fieldProps: {
				allowClear: true,
				fieldNames: {
					label: 'org_name',
					value: 'org_id',
				},
				options: orgTree,
				placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }),
			},
			width: 120,
			render: (_, record) => <Tag className={PrimaryColor}>{record.org_name}</Tag>,
		},
		{
			title: formatMessage({ id: 'global.table.sort' }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			sorter: true,
			render: (text) => <Tag color="purple">{text}</Tag>,
		},
		{
			title: formatMessage({ id: 'global.table.created_time' }),
			dataIndex: 'created_time',
			valueType: 'date',
			sorter: true,
			hideInSearch: true,
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
			title: formatMessage({ id: 'global.table.describe' }),
			dataIndex: 'describe',
			ellipsis: true,
			width: 140,
			hideInSearch: true,
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
				</TableDropdown>,
			],
		},
	]

	return (
		<>
			<ProTable<API.JOBSMANAGEMENT, TableSearchProps>
				actionRef={tableRef}
				columns={columns}
				request={async (params: TableSearchProps): Promise<RequestData<API.JOBSMANAGEMENT>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getJobsList(params).then((res) => {
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
				rowKey="jobs_id"
				pagination={false}
				// 工具栏
				toolBarRender={() => [
					<Access
						accessible={access.operationPermission(permissions.jobsManagement.add)}
						fallback={null}
						key="plus">
						<Button
							type="primary"
							onClick={() => { set_parent_id(''); setCurrentRecord(undefined); setOpenDrawerTrue() }}>
							<PlusOutlined />
							{formatMessage({ id: `${formatPerfix(true)}.add` })}
						</Button>
					</Access>,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<FormTemplate
				treeData={treeData}
				reloadTable={reloadTable}
				orgTree={orgTree || []}
				parent_id={parent_id}
				formData={currentRecord}
				userList={userList?.list || []}
				open={openDrawer}
				setOpenDrawerFalse={setOpenDrawerFalse}
			/>
		</>
	)
}
export default TableTemplate