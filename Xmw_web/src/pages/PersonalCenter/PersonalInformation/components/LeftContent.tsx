/*
 * @Description: 左侧个人信息
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-17 10:02:38
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 14:25:44
 */
import { createFromIconfontCN } from '@ant-design/icons' // antd 图标库
import { useModel } from '@umijs/max'
import { Avatar, Col, Divider, Space, Typography } from 'antd'
import type { FC } from 'react'

import FigureLabels from '@/components/FigureLabels' // 标签
import cascaderOptions from '@/utils/pca-code.json' // 省市区级联数据

const { Title, Paragraph } = Typography;

type AreaProps = {
  code: string;
  name: string;
  children?: {
    code: string;
    name: string;
  }[]
}



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
  // 使用 iconfont.cn 资源
  const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
  });

  // 渲染图标
  const renderIcon = (type: string) => {
    return <IconFont type={type} style={{ fontSize: 18, marginRight: 10, verticalAlign: '-5px' }} />
  }

  // 获取省市区名称
  const getAreaName = () => {
    let index = 0
    let result: string = ''
    function loopArea(tree: AreaProps[]) {
      tree.forEach((node) => {
        if (node.code === city?.[index] && index < city.length) {
          index++
          result += node.name
          if (node.children) {
            loopArea(node.children)
          }
        }
      })
    }
    loopArea(cascaderOptions)
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