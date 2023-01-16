/*
 * @Description: 个人设置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-12 15:19:34
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-16 10:00:30
 */
import type { FC } from 'react'
import { useState } from 'react'
import { Tabs, Card } from 'antd';
import { useIntl } from '@umijs/max'
import { PageContainer } from '@ant-design/pro-components' // antd 高级组件
import BasicSetting from './components/BasicSetting' // 基本设置
import SecuritySetting from './components/SecuritySetting' // 安全设置
import ChangePassword from './components/ChangePassword' // 修改密码

const PersonalSetting: FC = () => {
  const { formatMessage } = useIntl();
  // 当前激活 tab 面板的 key
  const [activeKey, setActiveKey] = useState<string>('basicSetting')
  //  Tabs 配置项
  const tabsItems = [
    {
      label: formatMessage({ id: 'pages.personal-center.personal-setting.basic-setting' }),
      key: 'basicSetting',
      children: <BasicSetting />
    },
    {
      label: formatMessage({ id: 'pages.personal-center.personal-setting.security-setting' }),
      key: 'securitySetting',
      children: <SecuritySetting setActiveKey={setActiveKey} />
    },
    {
      label: formatMessage({ id: 'pages.personal-center.personal-setting.change-password' }),
      key: 'changePassword',
      children: <ChangePassword />
    }
  ]
  return (
    <PageContainer header={{ title: null }}>
      <Card>
        <Tabs activeKey={activeKey} tabPosition='left' items={tabsItems} onTabClick={(key) => setActiveKey(key)} />
      </Card>
    </PageContainer>
  )
}
export default PersonalSetting