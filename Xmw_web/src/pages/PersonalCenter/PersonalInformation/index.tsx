/*
 * @Description: 个人信息
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-12 15:19:34
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-17 09:42:01
 */
import { PageContainer, ProCard } from '@ant-design/pro-components' // antd 高级组件
import type { FC } from 'react'

import LeftContent from './components/LeftContent' // 左侧个人信息

const PersonalInformation: FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <ProCard gutter={16} ghost>
        {/* 左侧信息 */}
        <ProCard colSpan={{
          lg: '300px',
          xl: '400px',
        }} >
          <LeftContent />
        </ProCard>
        {/* 右侧信息 */}
        <ProCard />
      </ProCard>
    </PageContainer>
  )
}
export default PersonalInformation