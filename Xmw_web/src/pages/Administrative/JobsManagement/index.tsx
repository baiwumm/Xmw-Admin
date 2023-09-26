/*
 * @Description: 智能行政-岗位管理
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-10 18:04:24
 */

import { PageContainer } from '@ant-design/pro-components'
import type { FC } from 'react';

import TableTemplate from './components/TableTemplate'

const JobsManagement: FC = () => {
	return (
		<PageContainer header={{ title: null }}>
			{/* 表格列表 */}
			<TableTemplate />
		</PageContainer>
	)
}
export default JobsManagement