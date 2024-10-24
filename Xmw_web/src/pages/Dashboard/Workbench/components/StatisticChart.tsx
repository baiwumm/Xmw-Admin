/*
 * @Description: 指标卡片
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-08 14:50:57
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 09:27:24
 */
import { StatisticCard } from '@ant-design/pro-components';
import { Icon, useModel } from '@umijs/max'
import { useMount, useSetState } from 'ahooks';
import { Col, Divider, Row, Space, type StatisticProps } from 'antd';
import { random } from 'lodash-es';
import { createRef, FC, useEffect } from 'react';
import CountUp from 'react-countup';

import type { ChartRef } from '../type'
import TinyAreaChart from './TinyAreaChart' // 迷你面积图
import TinyColumnChart from './TinyColumnChart' // 迷你柱形图
import TinyProgressChart from './TinyProgressChart' // 迷你进度图

const { Statistic } = StatisticCard;

enum CHARTS {
  SALE = 'sale',
  TINYAREA = 'tinyArea',
  TINYCOLUMN = 'tinyColumn',
  TINYPROGRESS = 'tinyProgress',
}

const StatisticChart: FC = () => {
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 总销售额数据
  const [saleInfo, setSaleInfo] = useSetState({
    total: 0,
    date: 0,
    week: 0,
    complete: 0,
    loading: false,
  })
  // 访问量
  const [visitInfo, setVisitInfo] = useSetState({
    total: 0,
    day: 0,
    loading: false,
  })
  // 支付笔数
  const [payInfo, setPayInfo] = useSetState({
    total: 0,
    conversion: 0,
    loading: false,
  })
  // 客户满意度
  const [customerInfo, setCustomerInfo] = useSetState({
    total: 0,
    date: 0,
    week: 0,
    loading: false,
  })

  // 数字递增动画
  const formatter: StatisticProps['formatter'] = (value) => (
    <CountUp end={value as number} separator="," decimals={2} />
  );

  // 随机渲染环比
  const renderTrend = () => random(0, 1) < 0.5 ? 'up' : 'down';

  // 渲染统计卡片
  const renderStatistic = (title: string, value: number) => (
    <Statistic title={title} value={value} trend={renderTrend()} suffix='%' formatter={formatter} />
  )

  // 初始化总销售额数据
  const initSaleInfo = () => {
    setSaleInfo({
      loading: true,
    })
    setTimeout(() => {
      setSaleInfo({
        total: random(10000000, 100000000, true),
        date: random(1, 100, true).toFixed(2),
        week: random(1, 100, true).toFixed(2),
        complete: random(1, 100, true).toFixed(2),
        loading: false,
      })
    }, 1000)
  }

  // 初始化访问量
  const initVisitInfo = () => {
    setVisitInfo({
      loading: true,
    })
    setTimeout(() => {
      setVisitInfo({
        total: random(100, 10000, true),
        day: random(1, 100, true).toFixed(2),
        loading: false,
      })
    }, 1000)
  }

  // 初始化转化率
  const initPayInfo = () => {
    setPayInfo({
      loading: true,
    })
    setTimeout(() => {
      setPayInfo({
        total: random(100, 10000, true),
        conversion: random(1, 100, true).toFixed(2),
        loading: false,
      })
    }, 1000)
  }

  // 初始化客户满意度
  const initCustomerInfo = () => {
    setCustomerInfo({
      loading: true,
    })
    setTimeout(() => {
      setCustomerInfo({
        total: random(1, 100, true).toFixed(2),
        date: random(1, 100, true).toFixed(2),
        week: random(1, 100, true).toFixed(2),
        loading: false,
      })
    }, 1000)
  }

  // 迷你面积图
  const tinyAreaChartRef = createRef<ChartRef>();
  // 迷你柱状图
  const tinyColumnChartRef = createRef<ChartRef>();
  // 迷你进度
  const tinyProgressChartRef = createRef<ChartRef>();

  // 刷新回调
  const onRefresh = (type: CHARTS) => {
    switch (type) {
      case CHARTS.SALE:
        initSaleInfo();
        break;
      case CHARTS.TINYAREA:
        tinyAreaChartRef.current?.reset();
        initVisitInfo();
        break;
      case CHARTS.TINYCOLUMN:
        tinyColumnChartRef.current?.reset();
        initPayInfo();
        break;
      case CHARTS.TINYPROGRESS:
        tinyProgressChartRef.current?.reset();
        initCustomerInfo();
        break;
    }
  }
  // 渲染刷新按钮
  const renderExtra = (type: CHARTS) => {
    return (
      <div style={{ cursor: 'pointer', opacity: .65 }} onClick={() => onRefresh(type)}>
        <Icon icon='ri:reset-left-line' style={{ fontSize: 16 }} />
      </div>
    )
  }

  const initDataSource = () => {
    initSaleInfo();
    initVisitInfo();
    initPayInfo();
    initCustomerInfo();
  }

  useMount(() => {
    initDataSource();
  })

  useEffect(() => {
    if (initialState.Settings.colorPrimary) {
      initDataSource();
    }
  }, [initialState.Settings.colorPrimary])
  return (
    <Row gutter={[20, 20]}>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6} >
        <StatisticCard
          title="总销售额"
          tooltip="指标说明"
          style={{ height: 200 }}
          extra={renderExtra(CHARTS.SALE)}
          loading={saleInfo.loading}
          statistic={{
            value: saleInfo.total,
            prefix: '¥',
            precision: 2,
            formatter,
            description: (
              <Space>
                {renderStatistic('日同比', saleInfo.date)}
                {renderStatistic('周同比', saleInfo.week)}
              </Space>
            ),
          }}
        >
          <Divider type="horizontal" />
          {renderStatistic('前年同期业绩完成率', saleInfo.complete)}
        </StatisticCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <StatisticCard
          title="访问量"
          tooltip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: visitInfo.total, formatter }}
          loading={visitInfo.loading}
          extra={renderExtra(CHARTS.TINYAREA)}
          chart={<TinyAreaChart colorPrimary={initialState.Settings.colorPrimary} onRef={tinyAreaChartRef} />}
        >
          {renderStatistic('日访问量占比', visitInfo.day)}
        </StatisticCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <StatisticCard
          title="支付笔数"
          tooltip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: payInfo.total, formatter }}
          loading={payInfo.loading}
          extra={renderExtra(CHARTS.TINYCOLUMN)}
          chart={<TinyColumnChart colorPrimary={initialState.Settings.colorPrimary} onRef={tinyColumnChartRef} />}
        >
          {renderStatistic('转化率', payInfo.conversion)}
        </StatisticCard>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6} xxl={6}>
        <StatisticCard
          title="客户满意度"
          tooltip="指标说明"
          style={{ height: 200 }}
          statistic={{ value: customerInfo.total, suffix: '%', formatter }}
          loading={customerInfo.loading}
          extra={renderExtra(CHARTS.TINYPROGRESS)}
          chart={<TinyProgressChart colorPrimary={initialState.Settings.colorPrimary} onRef={tinyProgressChartRef} />}
        >
          <Space>
            {renderStatistic('日同比', customerInfo.date)}
            {renderStatistic('周同比', customerInfo.week)}
          </Space>
        </StatisticCard>
      </Col>
    </Row>
  )
}
export default StatisticChart
