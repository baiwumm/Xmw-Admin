/*
 * @Description: 全局组件 loading 配置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-24 09:05:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 10:25:36
 */
import { Spin } from 'antd'
import { FC } from 'react'

const ComponentLoading: FC = () => {
  return (
    <div style={{ textAlign: 'center', padding: '30px 0 18px', overflow: 'hidden' }}>
      <Spin />
    </div>
  )
}
export default ComponentLoading