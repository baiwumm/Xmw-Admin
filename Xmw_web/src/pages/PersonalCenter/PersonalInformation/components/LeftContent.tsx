/*
 * @Description: 左侧个人信息
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-17 10:02:38
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-19 14:52:09
 */
import { useModel } from '@umijs/max'
import { Avatar, Col, Divider, Space, Typography } from 'antd'
import { codeToText } from 'element-china-area-data';
import { forEach } from 'lodash-es'
import type { FC } from 'react'

import FigureLabels from '@/components/FigureLabels' // 标签
import { IconFont } from '@/utils/const'
const { Title, Paragraph } = Typography;

const LeftContent: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  const {
    avatar_url,
    cn_name,
    motto,
    role_name,
    org_name,
    jobs_name,
    address,
    tags,
    city,
  } = initialState?.CurrentUser || {}
  // 渲染图标
  const renderIcon = (type: string) => {
    return <IconFont type={type} style={{ fontSize: 18, marginRight: 10, verticalAlign: '-5px' }} />
  }
  // 获取省市区名称
  const getAreaName = () => {
    let result: string = ''
    forEach(city, (code: string) => {
      result += codeToText[code]
    })
    return result
  }
  return (
    <>
      <Space direction="vertical" style={{ display: 'flex', textAlign: 'center' }}>
        <Avatar src={avatar_url} size={120} />
        <Title level={3} style={{ marginBottom: 0 }}>{cn_name}</Title>
        {
          motto ?
            <Paragraph copyable>{motto}</Paragraph> : null
        }
      </Space>
      <Space direction="vertical" style={{ display: 'flex' }}>
        <Col>{renderIcon('icon-role-management')}{role_name}</Col>
        <Col>{renderIcon('icon-jobs-management')}{`${org_name}-${jobs_name}`}</Col>
        <Col>{renderIcon('icon-location')}{getAreaName()}{address}</Col>
      </Space>
      <Divider dashed style={{ margin: '12px 0' }} />
      <div>
        <Col><Title level={4}>标签</Title></Col>
        <FigureLabels value={tags} canCallback />
      </div>
    </>
  )
}

export default LeftContent