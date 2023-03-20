/*
 * @Description: 系统设置-操作日志
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-20 15:51:18
 */
import type { FC } from 'react';
import { Space, Tag } from 'antd'
import { useIntl } from '@umijs/max'
import { PageContainer, ProTable } from '@ant-design/pro-components' // antd 高级组件
import type { ProColumns, RequestData } from '@ant-design/pro-components'
import { TableSearchProps } from './utils/interface'
import { columnScrollX } from '@/utils'
import { getOperationLogList } from '@/services/system/operation-log'
import moment from 'moment'
import { ClockCircleOutlined } from '@ant-design/icons' // antd 图标库

const OperationLog: FC = () => {
	const { formatMessage } = useIntl();
	// 请求方式 Tag Color 隐射
	const tagColorMap = {
		GET: 'green',
		POST: 'orange',
		PUT: 'blue',
		DELETE: 'red'
	}
	/**
	* @description: proTable columns 配置项
	* @return {*}
	* @author: Cyan
	*/
	const columns: ProColumns<API.OPERATIONLOG>[] = [
		{
			title: formatMessage({ id: 'pages.system.user-management.user_name' }),
			dataIndex: 'user_name',
			hideInSearch: true,
			width: 100
		},
		{
			title: formatMessage({ id: 'pages.system.user-management.cn_name' }),
			dataIndex: 'cn_name',
			hideInSearch: true,
			width: 100
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.content' }),
			dataIndex: 'content',
			ellipsis: true,
			width: 100,
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.ip' }),
			dataIndex: 'ip',
			width: 100,
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.path' }),
			dataIndex: 'path',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			render: (_, record) => {
				const url = new URL(record.path)
				return url.pathname
			}
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.api_url' }),
			dataIndex: 'api_url',
			ellipsis: true,
			width: 100,
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.method' }),
			dataIndex: 'method',
			width: 100,
			hideInSearch: true,
			align: 'center',
			render: (_, record) => <Tag color={tagColorMap[record.method]}>{record.method}</Tag>
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.params' }),
			dataIndex: 'params',
			hideInSearch: true,
			ellipsis: true,
			width: 300,
			render: (_, record) => JSON.stringify(record.params)
		},
		{
			title: formatMessage({ id: 'pages.system.operation-log.user_agent' }),
			dataIndex: 'user_agent',
			hideInSearch: true,
			width: 200,
			ellipsis: true,
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
		}
	]
	return (
		<PageContainer header={{ title: null }}>
			<ProTable<API.OPERATIONLOG, TableSearchProps>
				columns={columns}
				request={async (params: TableSearchProps): Promise<RequestData<API.OPERATIONLOG>> => {
					{
						// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
						// 如果需要转化参数可以在这里进行修改
						const response = await getOperationLogList(params).then(res => {
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
				rowKey="log_id"
				pagination={{ pageSize: 10 }}
				scroll={{ x: columnScrollX(columns) }}
			/>
		</PageContainer>
	)
}
export default OperationLog