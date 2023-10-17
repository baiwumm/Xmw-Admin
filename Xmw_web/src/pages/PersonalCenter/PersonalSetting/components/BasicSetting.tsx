/*
 * @Description: 基本设置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-13 09:26:44
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:11:12
 */
import { ProForm } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import { App, Divider, Row } from 'antd'
import { FC } from 'react'

import PersonalInformation from '@/pages/System/UserManagement/Steps/PersonalInformation' // 个人信息
import SetAvatar from '@/pages/System/UserManagement/Steps/SetAvatar' // 设置用户头像
import UserInformation from '@/pages/System/UserManagement/Steps/UserInformation' // 用户信息
import { updateUser } from '@/services/system/user-management' // 用户管理接口
import { formatPerfix, isSuccess } from '@/utils'
import { ROUTES } from '@/utils/enums'

const BasicSetting: FC = () => {
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');

  /**
 * @description: 更新用户信息
 * @author: 白雾茫茫丶
 */
  const { run: runUpdateUser } = useRequest(updateUser, {
    manual: true,
    onSuccess: async ({ code, msg }, params) => {
      if (isSuccess(code)) {
        message.success(msg)
        // 更新全局状态
        if (initialState?.CurrentUser) {
          setInitialState({ ...initialState, CurrentUser: { ...initialState.CurrentUser, ...params[0] } })
        }
      }
    },
  },
  )
  return (
    <ProForm<API.USERMANAGEMENT | undefined>
      grid
      request={async () => initialState?.CurrentUser}
      onFinish={
        async (values) => {
          const user_id = initialState?.CurrentUser?.user_id
          if (values && user_id) {
            runUpdateUser({ ...values, user_id })
          }
        }
      }
    >
      <Divider orientation="left">
        {formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.set-avatar') })}
      </Divider>
      <Row justify="center" style={{ width: '100%' }}>
        <SetAvatar />
      </Row>
      <Divider orientation="left">
        {formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.personal-information') })}
      </Divider>
      <PersonalInformation disabledField />
      <Divider orientation="left">
        {formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'steps-form.user-information') })}
      </Divider>
      <UserInformation showLabel={false} disabledField />
    </ProForm>
  )
}
export default BasicSetting