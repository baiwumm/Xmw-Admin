/*
 * @Description: 迷你柱形图
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-08 14:55:20
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 15:00:13
 */
import { TinyColumn } from '@ant-design/charts';
import { FC } from 'react'

const TinyColumnChart: FC = () => {
  const data = [274, 337, 81, 497, 666, 219, 269];
  const config = {
    height: 60,
    autoFit: false,
    data,
  };
  return <TinyColumn {...config} />;
}
export default TinyColumnChart
