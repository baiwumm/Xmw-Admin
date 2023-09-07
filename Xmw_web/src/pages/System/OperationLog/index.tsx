/*
 * @Description: 系统设置-操作日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 16:25:38
 */
import { ClockCircleOutlined } from '@ant-design/icons' // antd 图标库
import { PageContainer, ProColumns, ProTable, RequestData } from '@ant-design/pro-components' // antd 高级组件
import { useIntl } from '@umijs/max'
import { Space, Tag } from 'antd'
import dayjs from 'dayjs'
import type { FC } from 'react';

import { getOperationLogList } from '@/services/system/operation-log'
import { columnScrollX, formatPerfix } from '@/utils'
import { INTERNATION, ROUTES } from '@/utils/enums'
import type { SearchParams } from '@/utils/types/system/operation-log'

const OperationLog: FC = () => {
	const { formatMessage } = useIntl();
	// 请求方式 Tag Color 隐射
	const tagColorMap = {
		GET: 'green',
		POST: 'orange',
		PUT: 'blue',
		DELETE: 'red',
	}
	/**
	* @description: proTable columns 配置项
	* @author: 白雾茫茫丶丶
	*/
	const columns: ProColumns<API.OPERATIONLOG>[] = [
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.user_name` }),
			dataIndex: 'user_name',
			hideInSearch: true,
			width: 100,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.USERMANAGEMENT)}.cn_name` }),
			dataIndex: 'cn_name',
			hideInSearch: true,
			width: 100,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.content` }),
			dataIndex: 'content',
			ellipsis: true,
			width: 100,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.ip` }),
			dataIndex: 'ip',
			width: 100,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.path` }),
			dataIndex: 'path',
			hideInSearch: true,
			ellipsis: true,
			width: 100,
			align: 'center',
			render: (_, record) => {
				const url = new URL(record.path)
				return url.pathname
			},
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.api_url` }),
			dataIndex: 'api_url',
			ellipsis: true,
			width: 100,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.method` }),
			dataIndex: 'method',
			width: 100,
			hideInSearch: true,
			align: 'center',
			render: (_, record) => <Tag color={tagColorMap[record.method]}>{record.method}</Tag>,
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.params` }),
			dataIndex: 'params',
			hideInSearch: true,
			ellipsis: true,
			width: 300,
			align: 'center',
			render: (_, record) => JSON.stringify(record.params),
		},
		{
			title: formatMessage({ id: `${formatPerfix(ROUTES.OPERATIONLOG)}.user_agent` }),
			dataIndex: 'user_agent',
			hideInSearch: true,
			width: 200,
			align: 'center',
			ellipsis: true,
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
	]
	return (
		<PageContainer header={{ title: null }}>
			<ProTable<API.OPERATIONLOG, SearchParams>
				columns={columns}
				request={async (params: SearchParams): Promise<RequestData<API.OPERATIONLOG>> => {
					// 这里需要返回一个 Promise,在返回之前你可以进行数据转化
					// 如果需要转化参数可以在这里进行修改
					const response = await getOperationLogList(params).then((res) => {
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
				rowKey="log_id"
				pagination={{ pageSize: 10 }}
				scroll={{ x: columnScrollX(columns) }}
			/>
		</PageContainer>
	)
}
export default OperationLog