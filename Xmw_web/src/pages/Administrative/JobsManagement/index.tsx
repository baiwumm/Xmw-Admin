/*
 * @Description: 智能行政-岗位管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-08 15:41:37
 */

// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件

// 引入业务工具类
import TableTemplate from './components/TableTemplate'

const JobsManagement: FC = () => {
	const { formatMessage } = useIntl();
	return (
		<PageContainer title={formatMessage({ id: 'pages.administrative.jobs-management' })}>
			{/* 表格列表 */}
			<TableTemplate />
		</PageContainer>
	)
}
export default JobsManagement