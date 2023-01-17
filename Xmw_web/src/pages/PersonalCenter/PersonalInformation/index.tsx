/*
 * @Description: 个人信息
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-12 15:19:34
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 10:06:58
 */
import type { FC } from 'react'
import { PageContainer, ProCard } from '@ant-design/pro-components' // antd 高级组件
import LeftContent from './components/LeftContent' // 左侧个人信息

const PersonalInformation: FC = () => {
  return (
    <PageContainer header={{ title: null }}>
      <ProCard gutter={16} ghost>
        {/* 左侧信息 */}
        <ProCard colSpan={8} >
          <LeftContent />
        </ProCard>
        {/* 右侧信息 */}
        <ProCard colSpan={16} />
      </ProCard>
    </PageContainer>
  )
}
export default PersonalInformation