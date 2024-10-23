/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-22 13:57:42
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-23 16:29:27
 * @Description: 图表
 */
import { PageContainer } from '@ant-design/pro-components'
import { Icon, useIntl } from '@umijs/max'
import { Card, Col, Row } from 'antd';
import React, { createRef, FC } from 'react';

import { formatPerfix } from '@/utils';
import { ROUTES } from '@/utils/enums'

import AreaChart from './components/AreaChart'; // 面积图
import BarChart from './components/BarChart'; // 柱状图
import PieChart from './components/PieChart'; // 饼图
import ScatterChart from './components/ScatterChart'; // 散点图
import type { ChartRef } from './type'

enum CHARTS {
  AREA = 'area',
  BAR = 'bar',
  PIE = 'pie',
  SCATTER = 'scatter',
}

const Charts: FC = () => {
  const { formatMessage } = useIntl(); // 国际化工具

  // 国际化
  const renderMessage = (field: string) => formatMessage({ id: formatPerfix(ROUTES.CHARTS, field) });

  // 面积图
  const areaChartRef = createRef<ChartRef>();
  // 柱状图
  const barChartRef = createRef<ChartRef>();
  // 饼图
  const pieChartRef = createRef<ChartRef>();
  // 散点图
  const scatterChartRef = createRef<ChartRef>();

  // 刷新回调
  const onRefresh = (type: CHARTS) => {
    switch (type) {
      case CHARTS.AREA:
        areaChartRef.current?.reset();
        break;
      case CHARTS.BAR:
        barChartRef.current?.reset();
        break;
      case CHARTS.PIE:
        pieChartRef.current?.reset();
        break;
      case CHARTS.SCATTER:
        scatterChartRef.current?.reset();
        break;
    }
  };

  // 渲染刷新按钮
  const renderExtra = (type: CHARTS) => {
    return (
      <div style={{ cursor: 'pointer', opacity: .65 }} onClick={() => onRefresh(type)}>
        <Icon icon='ri:reset-left-line' style={{ fontSize: 16 }} />
      </div>
    )
  }
  return (
    <PageContainer header={{ title: null }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card bordered={false} title={renderMessage(CHARTS.AREA)} extra={renderExtra(CHARTS.AREA)}>
            <AreaChart onRef={areaChartRef} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card bordered={false} title={renderMessage(CHARTS.BAR)} extra={renderExtra(CHARTS.BAR)}>
            <BarChart onRef={barChartRef} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card bordered={false} title={renderMessage(CHARTS.PIE)} extra={renderExtra(CHARTS.PIE)}>
            <PieChart onRef={pieChartRef} />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card bordered={false} title={renderMessage(CHARTS.SCATTER)} extra={renderExtra(CHARTS.SCATTER)}>
            <ScatterChart onRef={scatterChartRef} />
          </Card>
        </Col>
      </Row>
    </PageContainer>
  )
}
export default Charts;