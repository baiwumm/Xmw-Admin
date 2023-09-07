/*
 * @Description: 进度图
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-08 15:18:37
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 15:22:04
 */

import { Bullet } from '@ant-design/charts';
import { FC } from 'react'

const BulletChart: FC = () => {
  const data = [
    {
      title: '客户满意度',
      ranges: [40, 70, 100],
      measures: [80],
      target: 85,
    },
  ];
  const config = {
    height: 60,
    data,
    measureField: 'measures',
    rangeField: 'ranges',
    targetField: 'target',
    xField: 'title',
    color: {
      range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
      measure: '#5B8FF9',
      target: '#39a3f4',
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    label: {
      target: true,
    },
    // 自定义 legend
    legend: {
      custom: true,
      position: 'bottom',
      items: [
        {
          value: '差',
          name: '差',
          marker: {
            symbol: 'square',
            style: {
              fill: '#FFbcb8',
              r: 5,
            },
          },
        },
        {
          value: '良',
          name: '良',
          marker: {
            symbol: 'square',
            style: {
              fill: '#FFe0b0',
              r: 5,
            },
          },
        },
        {
          value: '优',
          name: '优',
          marker: {
            symbol: 'square',
            style: {
              fill: '#bfeec8',
              r: 5,
            },
          },
        },
        {
          value: '实际值',
          name: '实际值',
          marker: {
            symbol: 'square',
            style: {
              fill: '#5B8FF9',
              r: 5,
            },
          },
        },
        {
          value: '目标值',
          name: '目标值',
          marker: {
            symbol: 'line',
            style: {
              stroke: '#39a3f4',
              r: 5,
            },
          },
        },
      ],
    },
  };
  return <Bullet {...config} />
}
export default BulletChart
