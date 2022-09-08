/*
 * @Description: 系统设置-用户管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 18:07:52
 */
// 引入第三方库
import { FC } from 'react';
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件

// 引入本地工具类
import TableTemplate from './components/TableTemplate'

import { formatMessage } from '@/utils' // 引入工具类

const UserManagement: FC = () => {
    return (
        <PageContainer title={formatMessage('pages.setting.user-management')}>
            {/* 表格列表 */}
            <TableTemplate />
        </PageContainer>
    )
}
export default UserManagement