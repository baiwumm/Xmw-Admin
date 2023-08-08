/*
 * @Description: 顶部布局
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-08-08 14:47:00
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 15:01:35
 */
import { useModel } from '@umijs/max'
import { Avatar, Card, Col, Row, Space, Statistic, Typography } from 'antd'; // antd 组件
import { FC } from 'react'

import { timeFix, welcomeWords } from '@/utils'

const { Title, Text } = Typography;

const RenderContent: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  return (
    <Card>
      <Row justify="space-between" align="middle">
        <Col>
          <Row gutter={15} align="middle">
            <Col>
              <Avatar src={initialState?.CurrentUser?.avatar_url} size={80} />
            </Col>
            <Col>
              <Title level={4}>{`${timeFix()}，${initialState?.CurrentUser?.cn_name}，${welcomeWords()}`}</Title>
              <Text type="secondary">今日多云转晴，20℃ - 25℃！</Text>
            </Col>
          </Row>
        </Col>
        <Col>
          <Space size="large">
            <Statistic title="项目数" value={86} />
            <Statistic title="团队内排名" value={56} suffix="/ 100" />
            <Statistic title="项目访问" value={7647} />
          </Space>
        </Col>
      </Row>
    </Card>
  )
}
export default RenderContent