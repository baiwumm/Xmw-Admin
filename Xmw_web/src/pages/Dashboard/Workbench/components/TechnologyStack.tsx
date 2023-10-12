/*
 * @Description: 项目技术栈
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-10-11 09:04:26
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-11 16:45:16
 */
import { CheckCard } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max';
import { Avatar, Card, Col, Row } from 'antd'
import { FC, ReactNode } from 'react'

import { formatPerfix } from '@/utils'
import { IconFont } from '@/utils/const'
import { ROUTES } from '@/utils/enums'

type TechnologyStackProps = {
  renderSecondary: (content: string, row?: number) => ReactNode;
}

const TechnologyStack: FC<TechnologyStackProps> = ({ renderSecondary }) => {
  // 国际化工具
  const { formatMessage } = useIntl();
  /**
 * @description: 项目主要技术栈
 * @author: 白雾茫茫丶
 */
  const technologyStack = [
    {
      title: 'React',
      value: 'React',
      description: '构建 Web 和原生交互界面的库',
      avatar: 'icon-react',
    },
    {
      title: 'Nest',
      value: 'Nest',
      description: 'Nest (NestJS) 是一个用于构建高效、可扩展的 Node.js 服务器端应用程序的开发框架。',
      avatar: 'icon-nest',
    },
    {
      title: 'Ant Design',
      value: 'Antd',
      description: '一套企业级 UI 设计语言和 React 组件库',
      avatar: 'icon-ant-design',
    },
    {
      title: 'Umi',
      value: 'Umi',
      description: 'Umi，中文发音为「乌米」，是可扩展的企业级前端应用框架。',
      avatar: 'icon-umi',
    },
  ]
  return (
    <Card title={formatMessage({ id: formatPerfix(ROUTES.WORKBENCH, 'technology-stack') })}>
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
  )
}
export default TechnologyStack