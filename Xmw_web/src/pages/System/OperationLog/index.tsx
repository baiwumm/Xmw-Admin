/*
 * @Description: 系统设置-操作日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-29 15:09:53
 */
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { Access, Icon, useAccess, useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { App, Avatar, Button, Popconfirm, Space, Table, Tag } from 'antd'
import { compact, get, isEmpty, map, uniq, values } from 'lodash-es';
import { FC, useRef, useState } from 'react';

import { columnScrollX, createTimeColumn, createTimeInSearch, operationColumn } from '@/components/TableColumns'
import { delLogs, getOperationLogList } from '@/services/system/operation-log'
import { getUserList } from '@/services/system/user-management'; // 用户管理接口
import {
	BroswerIconMap,
	formatPathName,
	formatPerfix,
	formatResponse,
	isSuccess,
	OsIconMap,
	randomTagColor,
} from '@/utils'
import { OPERATION, REQUEST_METHODS, ROUTES } from '@/utils/enums'
import permissions from '@/utils/permission';
import type { SearchTimes } from '@/utils/types'

const OperationLog: FC = () => {
	const { formatMessage } = useIntl();
	// 权限定义集合
	const access = useAccess();
	// hooks 调用
	const { message } = App.useApp();
	// 获取表格实例
	const tableRef = useRef<ActionType>();
	// 删除当前的数据 id
	const [currentId, setCurrentId] = useState<string>('');
	// 多选框选中的行
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

	/**
	 * @description: 获取操作日志列表
	 * @author: 白雾茫茫丶
	 */
	const { runAsync: fetchOperationLogList } = useRequest(
		async (params) => formatResponse(await getOperationLogList(params)), {
		manual: true,
	},
	)

	/**
	 * @description: 删除日志接口
	 * @author: 白雾茫茫丶
	 */
	const { run: fetchDelLogs, loading: delLogsLoading } = useRequest(delLogs, {
		manual: true,
		onSuccess: ({ code, msg }) => {
			if (isSuccess(code)) {
				message.success(msg);
				setSelectedRowKeys([]);
				// 刷新表格
				tableRef?.current?.reload();
			}
		},
	},
	)

	/**
	 * @description: 删除确认回调
	 * @author: 白雾茫茫丶
	 */
	const handleDelLogs = (log_id: string) => {
		setCurrentId(log_id);
		// 删除日志
		fetchDelLogs({ ids: [log_id] });
	}

	/**
	* @description: proTable columns 配置项
	* @author: 白雾茫茫丶
	*/
	const columns: ProColumns<API.OPERATIONLOG>[] = [
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'user') }),
			dataIndex: 'user_id',
			valueType: 'select',
			request: async () => {
				const userList = get(await getUserList({ pageSize: 999, current: 1 }), 'data.list', []);
				return map(userList, (v: API.USERMANAGEMENT) => ({
					label: (
						<Space>
							<Avatar src={v.avatar_url} />
							{v.cn_name}
						</Space>
					),
					value: v.user_id,
				}))
			},
			align: 'center',
			render: (_, record) => (
				<Space>
					<Avatar src={record.userInfo.avatar_url} />
					{record.userInfo.cn_name}
				</Space>
			),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'api_url') }),
			dataIndex: 'api_url',
			ellipsis: true,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'method') }),
			dataIndex: 'method',
			width: 100,
			valueType: 'select',
			request: async () => map(values(REQUEST_METHODS), (v: REQUEST_METHODS) => ({ label: v, value: v })),
			align: 'center',
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'os') }),
			dataIndex: 'os',
			hideInSearch: true,
			align: 'center',
			ellipsis: true,
			render: (text, record) => (
				<Space>
					{OsIconMap(record.os) ? (
						<Icon icon={OsIconMap(record.os)} style={{ fontSize: 16, display: 'flex' }} />
					) : null}
					{text}
				</Space>
			),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'browser') }),
			dataIndex: 'browser',
			hideInSearch: true,
			align: 'center',
			ellipsis: true,
			render: (text, record) => (
				<Space>
					{BroswerIconMap(record.browser) ? (
						<Icon icon={BroswerIconMap(record.browser)} style={{ fontSize: 16, display: 'flex' }} />
					) : null}
					{text}
				</Space>
			),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'location') }),
			dataIndex: 'location',
			hideInSearch: true,
			align: 'center',
			ellipsis: true,
			render: (_, record) => {
				const location = [record.province, record.city];
				return compact(location).length ? (
					<Space size={2}>
						<Icon icon='ri:map-pin-line' style={{ fontSize: 16, display: 'flex' }} />
						{compact(location).length ? uniq(location).join('-') : '--'}
					</Space>
				) : '--'
			},
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'ip') }),
			dataIndex: 'ip',
			width: 140,
			hideInSearch: true,
			align: 'center',
		},
		/* 创建时间 */
		createTimeColumn,
		/* 创建时间-搜索 */
		createTimeInSearch,
		{
			...operationColumn,
			render: (_, record) => (
				<Access
					accessible={access.operationPermission(
						get(permissions, `${formatPathName(ROUTES.OPERATIONLOG)}.${OPERATION.DELETE}`, ''),
					)}
					fallback='--'
				>
					<Popconfirm
						title="确认删除吗？"
						open={currentId === record.log_id}
						onConfirm={() => handleDelLogs(record.log_id)}
						okButtonProps={{ loading: delLogsLoading }}
						onCancel={() => setCurrentId('')}
					>
						<Button
							color="danger"
							variant="outlined"
							size='small'
							icon={<Icon icon='ri:delete-bin-line' />}
							onClick={() => setCurrentId(record.log_id)}
						>
							{formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'delete', true) })}
						</Button>
					</Popconfirm>
				</Access>
			),
		},
	]
	return (
		<PageContainer header={{ title: null }}>
			<ProTable<API.OPERATIONLOG, SearchTimes>
				headerTitle={formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, '', true) })}
				actionRef={tableRef}
				columns={columns}
				request={async (params: SearchTimes) => fetchOperationLogList(params)}
				rowKey="log_id"
				pagination={{ pageSize: 10 }}
				scroll={{ x: columnScrollX(columns) }}
				expandable={{
					expandedRowRender: (record) => (
						<pre>{JSON.stringify(record.params, null, 2)}</pre>
					),
					rowExpandable: (record) => !isEmpty(record.params),
				}}
				rowSelection={{
					selections: [
						Table.SELECTION_ALL,
						Table.SELECTION_INVERT,
						Table.SELECTION_NONE,
						{
							key: 'odd',
							text: '选择单行',
							onSelect: (changeableRowKeys) => {
								let newSelectedRowKeys = [];
								newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 === 0);
								setSelectedRowKeys(newSelectedRowKeys);
							},
						},
						{
							key: 'even',
							text: '选择双行',
							onSelect: (changeableRowKeys) => {
								let newSelectedRowKeys = [];
								newSelectedRowKeys = changeableRowKeys.filter((_, index) => index % 2 !== 0);
								setSelectedRowKeys(newSelectedRowKeys);
							},
						},
					],
					selectedRowKeys,
					onChange: (newSelectedRowKeys: React.Key[]) => {
						setSelectedRowKeys(newSelectedRowKeys);
					},
				}}
				tableAlertRender={({ selectedRowKeys, _, onCleanSelected }) => {
					return (
						<span>
							已选 {selectedRowKeys.length} 项
							<a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
								取消选择
							</a>
						</span>
					);
				}}
				tableAlertOptionRender={() => {
					return (
						<Access
							accessible={access.operationPermission(
								get(permissions, `${formatPathName(ROUTES.OPERATIONLOG)}.${OPERATION.BATCHDELETE}`, ''),
							)}
							fallback={null}
						>
							<Button
								color="danger"
								variant="outlined"
								size='small'
								icon={<Icon icon='ri:delete-bin-line' />}
								onClick={() => fetchDelLogs({ ids: selectedRowKeys as string[] })}
								loading={delLogsLoading}
							>
								{formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'batch-delete', true) })}
							</Button>
						</Access>
					);
				}}
			/>
		</PageContainer>
	)
}
export default OperationLog