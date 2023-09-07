/*
 * @Description: 迷你面积图
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-08 14:55:20
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 15:00:13
 */
import { TinyArea } from '@ant-design/charts';
import { FC } from 'react'

const TinyAreaChart: FC = () => {
  const data = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];
  const config = {
    height: 60,
    autoFit: false,
    data,
    smooth: true,
    areaStyle: {
      fill: '#d6e3fd',
    },
  };
  return <TinyArea {...config} />;
}
export default TinyAreaChart
