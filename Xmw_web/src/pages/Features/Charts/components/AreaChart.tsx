/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-22 14:06:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-23 15:49:39
 * @Description: 面积图
 */
import { Area, type AreaConfig } from '@ant-design/charts';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { random } from 'lodash-es';
import React, { FC, useImperativeHandle, useState } from 'react';

import type { ChartProps, DataType } from '../type'
const AreaChart: FC<ChartProps> = ({ onRef }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    const result: DataType[] = [];
    for (let i = 10; i > 0; i--) {
      result.push({
        date: dayjs().subtract(i, 'month').format('YYYY-MM'),
        value: random(1000, 10000),
      })
    }
    setTimeout(() => {
      setLoading(false);
      setData(result)
    }, 1000)
  }

  const config: AreaConfig = {
    data,
    xField: 'date',
    yField: 'value',
    shapeField: 'smooth',
  };

  useMount(() => {
    reset()
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))

  return (
    <Spin spinning={loading}>
      <Area {...config} />
    </Spin>
  );
}
export default AreaChart;
