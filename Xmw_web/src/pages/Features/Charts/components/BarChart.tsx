/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-23 10:08:06
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-23 10:52:29
 * @Description: 柱状图
 */
import { Column } from '@ant-design/charts';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { random } from 'lodash-es';
import { FC, useImperativeHandle, useState } from 'react';

import type { ChartProps, DataType } from '../type'

const BarChart: FC<ChartProps> = ({ onRef }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    const result: DataType[] = [];
    for (let i = 10; i >= 0; i--) {
      result.push({
        date: dayjs().subtract(i, 'month').format('YYYY-MM'),
        value: random(1, 100),
      })
    }
    setTimeout(() => {
      setLoading(false);
      setData(result)
    }, 1000)
  }

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    label: {
      text: (d: DataType) => `${d.value.toFixed(1)}%`,
      textBaseline: 'bottom',
    },

    style: {
      // 圆角样式
      radiusTopLeft: 10,
      radiusTopRight: 10,
    },
  };

  useMount(() => {
    reset()
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))
  return (
    <Spin spinning={loading}>
      <Column {...config} />
    </Spin>
  );
}
export default BarChart;