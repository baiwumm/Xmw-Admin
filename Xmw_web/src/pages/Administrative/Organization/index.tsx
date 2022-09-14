/*
 * @Description: 智能行政-组织管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 11:07:23
 */

// 引入第三方库
import { FC } from 'react';
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件

// 引入业务工具类
import TableTemplate from './components/TableTemplate'
import { formatMessage } from '@/utils' // 引入工具类

const Organization: FC = () => {
    return (
        <PageContainer title={formatMessage('pages.administrative.organization')}>
            {/* 表格列表 */}
            <TableTemplate />
        </PageContainer>
    )
}
export default Organization