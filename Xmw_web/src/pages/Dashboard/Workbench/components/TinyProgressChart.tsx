/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-24 09:11:36
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 09:38:55
 * @Description: 迷你进度图
 */
import { Tiny } from '@ant-design/charts';
import { useMount } from 'ahooks';
import { Spin } from 'antd';
import { random, toNumber } from 'lodash-es';
import { FC, useImperativeHandle, useState } from 'react'

import type { ChartProps } from '../type'

const TinyProgressChart: FC<ChartProps> = ({ onRef, colorPrimary }) => {
  const [progress, setProgress] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setProgress(toNumber(random(0, 1, true).toFixed(1)))
    }, 1000)
  }

  const config = {
    height: 60,
    percent: progress,
    color: ['#E8EFF5', colorPrimary],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${progress * 100}%`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 16,
          fontStyle: 'bold',
        },
      },
    ],
  };

  useMount(() => {
    reset()
  })

  // 用useImperativeHandle暴露一些外部ref能访问的属性
  useImperativeHandle(onRef, () => ({ reset }))
  return (
    <Spin spinning={loading}>
      <Tiny.Progress {...config} />
    </Spin>
  )
}
export default TinyProgressChart