/*
 * @Description: 系统设置-用户管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 10:36:10
 */
// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件

// 引入本地工具类
import TableTemplate from './components/TableTemplate'

const UserManagement: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <PageContainer title={formatMessage({ id: 'pages.system.user-management' })}>
            {/* 表格列表 */}
            <TableTemplate />
        </PageContainer>
    )
}
export default UserManagement