/*
 * @Description: Dashboard-工作台
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-26 17:55:25
 */
// 引入第三方库
import { useIntl } from '@umijs/max'
import { Badge, Col, Row, Card, Typography, Space } from 'antd'; // antd 组件
import type { FC } from 'react';
import { map, keys } from 'lodash-es'
import { dependencies, devDependencies } from '../../../../package.json';
import { PageContainer, StatisticCard, ProCard } from '@ant-design/pro-components';

const { Text } = Typography;
const { Divider } = ProCard;

const Workbench: FC = () => {
  const { formatMessage } = useIntl();
  // 渲染顶部左侧
  const renderContent = () => {
    return (
      <Row>

      </Row>
    )
  }
  // 渲染顶部右侧
  const renderExtraContent = () => {
    return (
      <ProCard.Group>
        <ProCard>
          <StatisticCard statistic={{ title: '项目数', value: 56 }} />
        </ProCard>
        <Divider />
        <ProCard>
          <StatisticCard statistic={{ title: '团队内排名', value: 5, suffix: '/ 24' }} />
        </ProCard>
        <Divider />
        <ProCard>
          <StatisticCard statistic={{ title: '项目访问', value: 2325 }} />
        </ProCard>
      </ProCard.Group>
    )
  }
  // 渲染依赖布局
  const renderDependenciesLayout = (dataSource: Record<string, string>, title: string) => {
    return (
      <Card title={formatMessage({ id: `pages.dashboard.work-bench.${title}` })}>
        <Row gutter={[12, 10]}>
          {
            map(keys(dataSource), (key: string) => (
              <Col xs={24} sm={12} md={12} lg={8} xl={6}>
                <Badge.Ribbon text={dataSource[key]} >
                  <Card><Text strong ellipsis={{ tooltip: dataSource[key] }} style={{ width: '100%' }}>{key}</Text></Card>
                </Badge.Ribbon>
              </Col>
            ))
          }
        </Row>
      </Card>
    )
  }
  return (
    // <Button type="primary">{formatMessage({ id: 'pages.dashboard.work-bench' })}</Button>
    <PageContainer content={<div>111</div>} extraContent={renderExtraContent()}>
      <Space direction="vertical" size="small" style={{ display: 'flex' }}>
        {/* 生产环境依赖 */}
        {renderDependenciesLayout(dependencies, 'dependencies')}
        {/* 开发环境依赖 */}
        {renderDependenciesLayout(devDependencies, 'devDependencies')}
      </Space>
    </PageContainer>
  )
}
export default Workbench