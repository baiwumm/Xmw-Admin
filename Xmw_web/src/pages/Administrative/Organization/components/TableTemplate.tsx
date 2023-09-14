/*
 * @Description: 组织管理-表格列表
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-13 18:22:00
 */
// 引入第三方库
import { ClockCircleOutlined, createFromIconfontCN, PlusOutlined } from '@ant-design/icons' // antd 图标库
import { ActionType, ProColumns, ProTable, RequestData } from '@ant-design/pro-components' // antd 高级组件
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Access, useAccess, useIntl } from '@umijs/max'
import { useBoolean, useRequest } from 'ahooks';
import { Button, message, Modal, Space, Tag } from 'antd' // antd 组件库
import dayjs from 'dayjs'
import { get } from 'lodash-es'
import { FC, useRef, useState } from 'react';

import DropdownMenu from '@/components/DropdownMenu' // 表格操作下拉菜单
import { delOrganization, getOrganizationList } from '@/services/administrative/organization' // 组织管理接口
// 引入业务组件
import { getUserList } from '@/services/system/user-management' // 用户管理接口
import { columnScrollX, formatPathName, formatPerfix } from '@/utils'
import { ORG_TYPE_OPTS, randomTagColor } from '@/utils/const'
import { INTERNATION, OPERATION, REQUEST_CODE, ROUTES, STATUS } from '@/utils/enums'
import permissions from '@/utils/permission'
import { PageResponse, PaginationParams } from '@/utils/types'
import type { OrgTypes, SearchParams } from '@/utils/types/administrative/organization'

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
	// 获取树形数据传递给drawerForm
	const [treeData, setTreeData] = useState<API.ORGANIZATION[]>([])
	// 当前行数据
	const [currentRecord, setCurrentRecord] = useState<API.ORGANIZATION>()
	// 判断是否是添加子级
	const [parent_id, set_parent_id] = useState<string>('')
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
	// 获取用户列表
	const { data: userList } = useRequest<PageResponse<API.USERMANAGEMENT>, PaginationParams[]>(
		async (params) => get(await getUserList(params), 'data', []), {
		defaultParams: [{ current: 1, pageSize: 9999 }],
	});
	// 删除列表
	const handlerDelete = (org_id: string): void => {
		Modal.confirm({
			title: formatMessage({ id: INTERNATION.DELETE_TITLE }),
			content: formatMessage({ id: INTERNATION.DELETE_CONTENT }),
			onOk: async () => {
				await delOrganization(org_id).then((res) => {
					if (res.code === REQUEST_CODE.SUCCESS) {
						message.success(res.msg)
						// 刷新表格
						reloadTable()
					}
				})
			},
		})
	}

	/**
* @description: proTable columns 配置项
* @author: 白雾茫茫丶
*/
	const columns: ProColumns<API.ORGANIZATION>[] = [
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_name` }),
			dataIndex: 'org_name',
			ellipsis: true,
			width: 140,
			render: (text) => (
				<Space>
					<IconFont type="icon-organization" className={PrimaryColor} />
					<span>{text}</span>
				</Space>
			),
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_code` }),
			dataIndex: 'org_code',
			ellipsis: true,
			width: 120,
			align: 'center',
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_logo` }),
			dataIndex: 'org_logo',
			valueType: {
				type: 'image',
				width: 60,
			},
			align: 'center',
			hideInSearch: true,
			width: 120,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION)}.org_type` }),
			dataIndex: 'org_type',
			filters: true,
			onFilter: true,
			width: 100,
			align: 'center',
			valueEnum: ORG_TYPE_OPTS,
			render: (_, record) => {
				const org_type: OrgTypes = record.org_type
				return <Tag
					color={ORG_TYPE_OPTS[org_type].color}>
					{ORG_TYPE_OPTS[org_type].text}
				</Tag>
			},
		},
		{
			title: formatMessage({ id: INTERNATION.STATUS }),
			dataIndex: 'status',
			width: 100,
			filters: true,
			onFilter: true,
			align: 'center',
			valueEnum: {
				[STATUS.DISABLE]: { text: formatMessage({ id: INTERNATION.STATUS_DISABLE }), status: 'Default' },
				[STATUS.NORMAL]: { text: formatMessage({ id: INTERNATION.STATUS_NORMAL }), status: 'Processing' },
			},
		},
		{
			title: formatMessage({ id: INTERNATION.SORT }),
			dataIndex: 'sort',
			ellipsis: true,
			hideInSearch: true,
			width: 100,
			sorter: true,
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
			width: 140,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: INTERNATION.OPERATION }),
			valueType: 'option',
			width: 80,
			align: 'center',
			key: 'option',
			fixed: 'right',
			render: (_, record) =>
				[
					<DropdownMenu
						formatPerfix={formatPathName(ROUTES.ORGANIZATION)}
						addChildCallback={() => {
							setCurrentRecord(undefined);
							set_parent_id(record.org_id);
							setOpenDrawerTrue()
						}
						}
						editCallback={() => {
							set_parent_id('');
							setCurrentRecord(record);
							setOpenDrawerTrue()
						}}
						deleteCallback={() => handlerDelete(record.org_id)}
						key="dropdownMenu"
					/>,
				],
		},
	]

	return (
		<>
			<ProTable<API.ORGANIZATION, SearchParams>
				actionRef={tableRef}
				columns={columns}
				request={async (params: SearchParams): Promise<RequestData<API.ORGANIZATION>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getOrganizationList(params).then((res) => {
						const data = get(res, 'data', [])
						setTreeData(data)
						return {
							data,
							// success 请返回 true，不然 table 会停止解析数据，即使有数据
							success: res.code === REQUEST_CODE.SUCCESS,
						}
					})
					return Promise.resolve(response)
				}
				}
				rowKey="org_id"
				pagination={false}
				// 工具栏
				toolBarRender={() => [
					<Access
						accessible={
							access.operationPermission(
								get(permissions, `${formatPathName(ROUTES.ORGANIZATION)}.${OPERATION.ADD}`, ''),
							)}
						fallback={null}
						key="plus">
						<Button
							type="primary"
							onClick={() => { set_parent_id(''); setCurrentRecord(undefined); setOpenDrawerTrue() }}>
							<PlusOutlined />
							{formatMessage({ id: `${formatPerfix(ROUTES.ORGANIZATION, true)}.${OPERATION.ADD}` })}
						</Button>
					</Access>,
				]}
				scroll={{ x: columnScrollX(columns) }}
			/>
			{/* 抽屉表单 */}
			<FormTemplate
				treeData={treeData}
				reloadTable={reloadTable}
				formData={currentRecord}
				userList={userList?.list || []}
				parent_id={parent_id}
				open={openDrawer}
				setOpenDrawerFalse={setOpenDrawerFalse}
			/>
		</>
	)
}
export default TableTemplate