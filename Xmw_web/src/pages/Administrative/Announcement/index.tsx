/*
 * @Description: 活动公告
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 17:27:04
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-25 17:27:08
 */
import { PageContainer } from '@ant-design/pro-components'
import type { FC } from 'react';

import TableTemplate from './components/TableTemplate'

const Announcement: FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      {/* 表格列表 */}
      <TableTemplate />
    </PageContainer>
  )
}
export default Announcement