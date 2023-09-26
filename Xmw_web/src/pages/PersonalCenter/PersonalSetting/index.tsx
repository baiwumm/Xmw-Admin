/*
 * @Description: 个人设置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-12 15:19:34
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-21 17:50:27
 */
import { PageContainer } from '@ant-design/pro-components'
import { useIntl } from '@umijs/max'
import { Card, Tabs } from 'antd';
import { FC, useState } from 'react'

import { formatPerfix } from '@/utils'
import { ROUTES } from '@/utils/enums'

import BasicSetting from './components/BasicSetting' // 基本设置
import ChangePassword from './components/ChangePassword' // 修改密码
import SecuritySetting from './components/SecuritySetting' // 安全设置

enum TABSKEY {
  BASIC = 'basic-setting', // 基本设置
  SECURITY = 'security-setting', // 安全设置
  PASSWORD = 'change-password', // 修改密码
}

const PersonalSetting: FC = () => {
  const { formatMessage } = useIntl();
  // 当前激活 tab 面板的 key
  const [activeKey, setActiveKey] = useState<string>(TABSKEY.BASIC)
  //  Tabs 配置项
  const tabsItems = [
    {
      label: formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, TABSKEY.BASIC) }),
      key: TABSKEY.BASIC,
      children: <BasicSetting />,
    },
    {
      label: formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, TABSKEY.SECURITY) }),
      key: TABSKEY.SECURITY,
      children: <SecuritySetting setActiveKey={setActiveKey} />,
    },
    {
      label: formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, TABSKEY.PASSWORD) }),
      key: TABSKEY.PASSWORD,
      children: <ChangePassword />,
    },
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