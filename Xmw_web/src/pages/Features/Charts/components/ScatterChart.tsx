/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-23 16:22:48
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-23 16:34:12
 * @Description: 散点图
 */
import { Scatter, type ScatterConfig } from '@ant-design/charts';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { random } from 'lodash-es';
import React, { FC, useImperativeHandle, useState } from 'react';

import type { ChartProps } from '../type'

type DataType = {
  type: '访问量' | '搜索量',
  visitor: number,
  search: number;
  size: number;
}
const ScatterChart: FC<ChartProps> = ({ onRef }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    const result: DataType[] = [];
    for (let i = 100; i > 0; i--) {
      result.push({
        type: random(0, 1) < 0.5 ? '访问量' : '搜索量',
        visitor: random(100, 1000),
        search: random(100, 1000),
        size: random(100, 1000),
      })
    }
    setTimeout(() => {
      setLoading(false);
      setData(result)
    }, 1000)
  }

  const config: ScatterConfig = {
    data,
    xField: 'visitor',
    yField: 'search',
    colorField: 'type',
    sizeField: 'size',
    legend: {
      color: {
        layout: {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        },
      },
    },
  };

  useMount(() => {
    reset()
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))

  return (
    <Spin spinning={loading}>
      <Scatter {...config} />
    </Spin>
  );
}
export default ScatterChart;