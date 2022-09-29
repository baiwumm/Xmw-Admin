/*
 * @Description: 系统设置-菜单管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 14:07:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-29 09:42:27
 */
// 引入第三方库
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件

// 引入业务工具类
import TableTemplate from './components/TableTemplate'
import { formatMessage } from '@/utils' // 引入工具类

const MenuMaganement: FC = () => {
    return (
        <PageContainer title={formatMessage('pages.system.menu-management')}>
            {/* 表格列表 */}
            <TableTemplate />
        </PageContainer>
    )
}
export default MenuMaganement