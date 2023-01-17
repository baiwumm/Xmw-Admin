/*
 * @Description: 左侧个人信息
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-17 10:02:38
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 10:48:59
 */
import type { FC } from 'react'
import { useModel } from '@umijs/max'
import { Row, Space, Avatar, Typography, Divider, Col } from 'antd'
import FigureLabels from '@/components/FigureLabels' // 标签

const { Title, Paragraph } = Typography;

const LeftContent: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  return (
    <>
      <Row justify="center">
        <Space direction="vertical" style={{ display: 'flex', textAlign: 'center' }}>
          <Avatar src={initialState?.CurrentUser?.avatar_url} size={120} />
          <Title level={3} style={{ marginBottom: 0 }}>{initialState?.CurrentUser?.cn_name}</Title>
          {
            initialState?.CurrentUser?.motto ?
              <Paragraph copyable>{initialState?.CurrentUser?.motto}</Paragraph> : null
          }
        </Space>
      </Row>
      <Divider dashed style={{ margin: '12px 0' }} />
      <div>
        <Col><Title level={4}>标签</Title></Col>
        <FigureLabels value={initialState?.CurrentUser?.tags} canCallback />
      </div>
    </>
  )
}

export default LeftContent