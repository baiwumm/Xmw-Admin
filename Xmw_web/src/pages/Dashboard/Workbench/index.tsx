/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 11:18:42
 */
import { CheckCard, PageContainer } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max';
import { useRequest } from 'ahooks'
import { Avatar, Card, Col, List, Row, Space, Tag, Timeline, Tooltip, Typography } from 'antd'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import { get } from 'lodash-es'
import { createRef, FC } from 'react';

import AnnouncementDetail from '@/pages/Administrative/Announcement/components/AnnouncementDetail'
import { getAnnouncementList } from '@/services/administrative/announcement'
import { formatPerfix, isSuccess, randomTagColor } from '@/utils'
import { AnnouncementTypeEnum, IconFont } from '@/utils/const'
import { ROUTES } from '@/utils/enums'
import type { AnnouncementDetailRefsProps } from '@/utils/types/administrative/announcement'

import RenderContent from './components/RenderContent' // 顶部布局
import StatisticChart from './components/StatisticChart' // 指标卡片
import { latestNews, technologyStack } from './utils/config'
const { Paragraph, Text, Title, Link } = Typography;

const Workbench: FC = () => {
  // 国际化工具
  const { formatMessage } = useIntl();
  // dayjs 相对时间
  dayjs.extend(relativeTime);
  // 全局状态
  const { initialState } = useModel('@@initialState');
  // 公告详情
  const announcementDetailRefs = createRef<AnnouncementDetailRefsProps>();

  /**
 * @description: 请求项目 commit 日志
 * @author: 白雾茫茫丶
 */
  const { data: commitList, loading: commitLoading } = useRequest(
    async () => {
      const response = await fetch('https://api.github.com/repos/baiwumm/Xmw-Admin/commits?page=1&per_page=10')
      if (isSuccess(response.status)) {
        const result = await response.json()
        return result
      }
      return []
    })

  /**
 * @description: 获取活动公告列表
 * @author: 白雾茫茫丶
 */
  const { data: announcementList, loading: announcementListLoading } = useRequest(
    async (params) => get(await getAnnouncementList(params), 'data.list', []), {
    defaultParams: [{ current: 1, pageSize: 5 }],
  })

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
              <Card title="最新动态">
                <List
                  pagination={{ position: 'bottom', align: 'start' }}
                  dataSource={latestNews}
                  renderItem={(item) => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={
                          <Tooltip title="访问博客">
                            <a href="https://baiwumm.com/" target='_blank'>
                              <Avatar src='https://cdn.baiwumm.com/blog/avatar.jpg!baiwu' />
                            </a>
                          </Tooltip>
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
              <Card title="最新公告" loading={announcementListLoading} bodyStyle={{ padding: '5px 24px' }}>
                <List
                  itemLayout="horizontal"
                  dataSource={announcementList}
                  renderItem={(record: API.ANNOUNCEMENT) => (
                    <List.Item actions={[<Tag color={randomTagColor()} key="type">{
                      formatMessage({
                        id: formatPerfix(ROUTES.ANNOUNCEMENT, `type.${AnnouncementTypeEnum[record.type]}`),
                      })
                    }</Tag>]}>
                      <List.Item.Meta
                        avatar={<Avatar src={record.avatar_url} />}
                        title={<a onClick={() => {
                          announcementDetailRefs?.current?.setCurrentRecord(record);
                          announcementDetailRefs?.current?.setOpenDrawerTrue();
                        }}>{record.title}</a>}
                        description={record.cn_name}
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
                            <Link href={item.html_url} target="_blank">
                              <Title level={5} style={{ marginBottom: 0 }}>
                                {item.commit.message}
                              </Title>
                            </Link>
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
      {/* 公告详情 */}
      <AnnouncementDetail onRef={announcementDetailRefs} />
    </PageContainer>
  )
}
export default Workbench