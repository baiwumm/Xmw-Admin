/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 15:24:59
 */
import { PageContainer } from '@ant-design/pro-components';
import type { FC } from 'react';

import RenderContent from './components/RenderContent' // 顶部布局
import StatisticChart from './components/StatisticChart' // 指标卡片

const Workbench: FC = () => {
  return (
    <PageContainer content={<RenderContent />}>
      {/* 指标卡片 */}
      <div style={{ marginTop: '-12px' }} >
        <StatisticChart />
      </div>
    </PageContainer>
  )
}
export default Workbench