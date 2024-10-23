/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-23 15:46:49
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-23 16:01:36
 * @Description: 饼图
 */
import { Pie, type PieConfig } from '@ant-design/charts';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { random } from 'lodash-es';
import { FC, useImperativeHandle, useState } from 'react';

import type { ChartProps, DataType } from '../type'

const PieChart: FC<ChartProps> = ({ onRef }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    const result: DataType[] = [];
    for (let i = 5; i > 0; i--) {
      result.push({
        date: `分类${i}`,
        value: random(1000, 10000),
      })
    }
    setTimeout(() => {
      setLoading(false);
      setData(result)
    }, 1000)
  }

  const config: PieConfig = {
    data,
    angleField: 'value',
    colorField: 'date',
    radius: 0.8,
    label: {
      text: (d) => `${d.date}：${d.value}`,
      position: 'spider',
    },
    legend: {
      color: {
        title: false,
        position: 'bottom',
        rowPadding: 5,
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
      <Pie {...config} />
    </Spin>
  )
}
export default PieChart;