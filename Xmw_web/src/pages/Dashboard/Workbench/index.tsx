/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-11 10:05:08
 */
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Col, Row, Space, Typography } from 'antd'
import { FC } from 'react';

import BlogLogs from './components/BlogLogs' // 博客日志
import GitCommitLog from './components/GitCommitLog' // Git 更新日志
import LatestAnnouncement from './components/LatestAnnouncement' // 最新公告
import RenderContent from './components/RenderContent' // 顶部布局
import StatisticChart from './components/StatisticChart' // 指标卡片
import TechnologyStack from './components/TechnologyStack' // 主要技术栈
const { Paragraph, Text } = Typography;

const Workbench: FC = () => {
  // 全局状态
  const { initialState } = useModel('@@initialState');

  // 渲染副标题
  const renderSecondary = (content: string, rows = 1) => {
    return (
      <Paragraph ellipsis={{
        rows,
        tooltip: {
          title: content,
          color: initialState?.Settings?.colorPrimary || 'blue',
        },
      }} style={{ marginBottom: 0 }}>
        <Text type="secondary">{content}</Text>
      </Paragraph>
    )
  }
  return (
    <PageContainer content={<RenderContent />}>
      <Space direction="vertical" size="middle" style={{ display: 'flex', marginTop: 16 }}>
        {/* 指标卡片 */}
        <div style={{ marginTop: '-12px' }} >
          <StatisticChart />
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={24} md={24} lg={14} xl={14} xxl={14}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 主要技术栈 */}
              <TechnologyStack renderSecondary={renderSecondary} />
              {/* 博客日志 */}
              <BlogLogs renderSecondary={renderSecondary} />
            </Space>
          </Col>
          <Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              {/* 最新公告 */}
              <LatestAnnouncement />
              {/* Git 更新日志 */}
              <GitCommitLog />
            </Space>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  )
}
export default Workbench