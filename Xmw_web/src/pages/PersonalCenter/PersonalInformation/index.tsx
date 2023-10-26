/*
 * @Description: 个人信息
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-12 15:19:34
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-26 16:26:13
 */
import { PageContainer, ProCard } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import type { FC } from 'react'

import { formatPerfix } from '@/utils'
import { ROUTES } from '@/utils/enums'

import LeftContent from './components/LeftContent' // 左侧个人信息
import ProjectRecommend from './components/ProjectRecommend' // 项目推荐

const PersonalInformation: FC = () => {
  const { formatMessage } = useIntl();
  return (
    <PageContainer header={{ title: null }}>
      <ProCard gutter={16} ghost wrap>
        {/* 左侧信息 */}
        <ProCard colSpan={{ xs: 24, sm: 24, md: 24, lg: 8, xl: 8 }} >
          <LeftContent />
        </ProCard>
        {/* 右侧信息 */}
        <ProCard
          colSpan={{ xs: 24, sm: 24, md: 24, lg: 16, xl: 16 }}
          tabs={{
            items: [
              {
                key: 'project-recommend',
                label: formatMessage({ id: formatPerfix(ROUTES.PERSONALINFOMATION, 'project-recommend') }),
                children: <ProjectRecommend />,
              },
            ],
          }}
        />
      </ProCard>
    </PageContainer>
  )
}
export default PersonalInformation