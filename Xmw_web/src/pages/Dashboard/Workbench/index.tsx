/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-18 17:04:58
 */
import { createFromIconfontCN } from '@ant-design/icons'; // antd 图标
import { CheckCard, PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Avatar, Card, Col, List, Row, Space, Tag, Timeline, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import type { FC } from 'react';

import RenderContent from './components/RenderContent' // 顶部布局
import StatisticChart from './components/StatisticChart' // 指标卡片
import { latestAnnouncement, latestNews, technologyStack } from './utils/config'

const { Paragraph, Text, Title } = Typography;

const Workbench: FC = () => {
  const { initialState } = useModel('@@initialState');
  // 使用 iconfont.cn 资源
  const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
  });

  // 请求项目 commit 日志
  const { data: commitList, loading: commitLoading } = useRequest(
    async () => {
      const response = await fetch('https://api.github.com/repos/baiwumm/Xmw-Admin/commits?page=1&per_page=10')
      if (response.status === 200) {
        const result = await response.json()
        return result
      }
      return []
    },
  )

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
        <Row gutter={16}>
          <Col span={14}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Card title="项目主要技术栈">
                <CheckCard.Group>
                  <Row gutter={16} justify="center">
                    {
                      technologyStack?.map((item) => {
                        return (
                          <Col key={item.value} xs={24} sm={24} md={24} lg={24} xl={12} >
                            <CheckCard
                              title={item.title}
                              description={renderSecondary(item.description)}
                              avatar={<Avatar size="large" icon={<IconFont type={item.avatar} />} />}
                              value={item.value}
                              style={{ width: '100%' }}
                            />
                          </Col>
                        )
                      })
                    }
                  </Row>
                </CheckCard.Group>
              </Card>
              <Card title="最新动态" extra={
                <Tooltip title="访问博客">
                  <a href="https://baiwumm.com/" target='_blank'>
                    <Avatar src='https://cdn.baiwumm.com/blog/avatar.jpg!baiwu' />
                  </a>
                </Tooltip>
              }>
                <List
                  pagination={{ position: 'bottom', align: 'start' }}
                  dataSource={latestNews}
                  renderItem={(item, index) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />
                        }
                        title={<a href={item.link} target='_blank'>{item.title}</a>}
                        description={renderSecondary(item.content, 2)}
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Space>
          </Col>
          <Col span={10}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Card title="最新公告">
                <List
                  itemLayout="horizontal"
                  dataSource={latestAnnouncement}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Tag color={item.color}>{item.type}</Tag>}
                        title={<a href='https://baiwumm.com/' target='_blank'>{renderSecondary(item.title, 1)}</a>}
                      />
                    </List.Item>
                  )}
                />
              </Card>
              <Card title="更新日志" loading={commitLoading}>
                <Timeline
                  items={
                    commitList?.map((item) => {
                      return {
                        children: (
                          <>
                            <Title level={5} style={{ marginBottom: 0 }}>{item.commit.message}</Title>
                            <Text type="secondary">{dayjs(item.commit.author.date).fromNow()}</Text>
                          </>
                        ),
                      }
                    })
                  }
                />
              </Card>
            </Space>
          </Col>
        </Row>
      </Space>
    </PageContainer>
  )
}
export default Workbench