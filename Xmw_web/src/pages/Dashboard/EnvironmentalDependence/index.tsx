/*
 * @Description: 环境依赖
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-08 09:20:45
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-11 16:50:50
 */
import { PageContainer } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { Badge, Card, Col, Row, Space, Typography } from 'antd'
import { keys, map } from 'lodash-es'
import { FC } from 'react'

import { formatPerfix } from '@/utils'
import { ROUTES } from '@/utils/enums'

import pckJson from '../../../../package.json';

const { Text } = Typography;

const EnvironmentalDependence: FC = () => {
  const { formatMessage } = useIntl();
  // 渲染依赖布局
  const renderDependenciesLayout = (dataSource: Record<string, string>, title: string) => {
    return (
      <Card title={formatMessage({ id: `${formatPerfix(ROUTES.DEPENDENCE)}.${title}` })}>
        <Row gutter={[12, 10]}>
          {
            map(keys(dataSource), (key: string) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6} key={key}>
                <Badge.Ribbon text={dataSource[key]} >
                  <Card>
                    <Text strong ellipsis={{ tooltip: key }} style={{ width: '100%' }}>{key}</Text>
                  </Card>
                </Badge.Ribbon>
              </Col>
            ))
          }
        </Row>
      </Card>
    )
  }
  return (
    <PageContainer>
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        {/* 生产环境依赖 */}
        {renderDependenciesLayout(pckJson.dependencies, 'dependencies')}
        {/* 开发环境依赖 */}
        {renderDependenciesLayout(pckJson.devDependencies, 'devDependencies')}
      </Space>
    </PageContainer>
  )
}
export default EnvironmentalDependence
