/*
 * @Description: 系统设置-操作日志
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-22 14:24:45
 */
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { useRequest } from 'ahooks'
import { Tag } from 'antd'
import type { FC } from 'react';

import { columnScrollX, createTimeColumn, createTimeInSearch } from '@/components/TableColumns'
import { getOperationLogList } from '@/services/system/operation-log'
import { formatPerfix, formatResponse, randomTagColor } from '@/utils'
import { ROUTES } from '@/utils/enums'
import type { SearchTimes } from '@/utils/types'

const OperationLog: FC = () => {
	const { formatMessage } = useIntl();

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
	* @description: proTable columns 配置项
	* @author: 白雾茫茫丶
	*/
	const columns: ProColumns<API.OPERATIONLOG>[] = [
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'user_name') }),
			dataIndex: 'user_name',
			hideInSearch: true,
			width: 100,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'cn_name') }),
			dataIndex: 'cn_name',
			hideInSearch: true,
			width: 100,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'content') }),
			dataIndex: 'content',
			ellipsis: true,
			width: 100,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'ip') }),
			dataIndex: 'ip',
			width: 100,
			hideInSearch: true,
			align: 'center',
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'path') }),
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
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'api_url') }),
			dataIndex: 'api_url',
			ellipsis: true,
			width: 100,
			align: 'center',
			hideInSearch: true,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'method') }),
			dataIndex: 'method',
			width: 100,
			hideInSearch: true,
			align: 'center',
			render: (text) => <Tag color={randomTagColor()}>{text}</Tag>,
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'params') }),
			dataIndex: 'params',
			hideInSearch: true,
			ellipsis: true,
			width: 300,
			align: 'center',
			render: (_, record) => JSON.stringify(record.params),
		},
		{
			title: formatMessage({ id: formatPerfix(ROUTES.OPERATIONLOG, 'user_agent') }),
			dataIndex: 'user_agent',
			hideInSearch: true,
			width: 200,
			align: 'center',
			ellipsis: true,
		},
		/* 创建时间 */
		createTimeColumn,
		/* 创建时间-搜索 */
		createTimeInSearch,
	]
	return (
		<PageContainer header={{ title: null }}>
			<ProTable<API.OPERATIONLOG, SearchTimes>
				columns={columns}
				request={async (params: SearchTimes) => fetchOperationLogList(params)}
				rowKey="log_id"
				pagination={{ pageSize: 10 }}
				scroll={{ x: columnScrollX(columns) }}
			/>
		</PageContainer>
	)
}
export default OperationLog