/*
 * @Description: 修改密码
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-12 16:10:13
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-08 09:11:47
 */
import { ProFormText } from '@ant-design/pro-components';
import { useIntl, useModel } from '@umijs/max'
import { useRequest } from 'ahooks'
import { App, Button, Form, Modal } from 'antd'
import type { FC } from 'react'

import StrengthMeter from '@/components/StrengthMeter' // 密码强度校验
import { Logout } from '@/services/logic/login' // 登录相关接口
import { updateUser } from '@/services/system/user-management'
import { encryptionAesPsd, formatPerfix, isSuccess, logoutToLogin, removeLocalStorageItem } from '@/utils'
import { INTERNATION, LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import type { InitialStateTypes } from '@/utils/types'

type PasswordParams = {
  originalPassword: string;
  password: string;
  confirmPassword: string;
}

const ChangePassword: FC = () => {
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  // 表单实例
  const [form] = Form.useForm()

  /**
 * @description: 退出登录，并且将当前的 url 保存
 * @author: 白雾茫茫丶
 */
  const { run: loginOut } = useRequest(Logout, {
    manual: true,
    onSuccess: async ({ code }) => {
      if (isSuccess(code)) {
        setInitialState((s: InitialStateTypes) => ({ ...s, CurrentUser: undefined, Access_token: undefined }));
        removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN);
        removeLocalStorageItem(LOCAL_STORAGE.USER_INFO);
        // 退出登录返回登录页
        logoutToLogin()
      }
    },
  },
  )

  /**
 * @description: 更新用户密码
 * @author: 白雾茫茫丶
 */
  const { run: runUpdateUser } = useRequest(updateUser, {
    manual: true,
    onSuccess: async ({ code }) => {
      if (isSuccess(code)) {
        // 更新密码成功后退出登录返回到登录页面
        loginOut()
        // 销毁对话框
        Modal.destroyAll();
      }
    },
  },
  )

  // 表单提交
  const handlerSubmit = (values: PasswordParams) => {
    // 判断原密码是否正确
    if (encryptionAesPsd(values.originalPassword) !== initialState?.CurrentUser?.password) {
      message.error(formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, 'change-password.error') }))
    } else {
      Modal.confirm({
        title: formatMessage({ id: INTERNATION.WARM_TIPS }),
        content: formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, 'change-password.tip') }),
        onOk: async () => {
          const user_id = initialState?.CurrentUser?.user_id
          if (user_id) {
            runUpdateUser({ password: encryptionAesPsd(values.password), user_id })
          }
        },
      })
    }
  }
  return (
    <Form form={form} style={{ width: 500 }} labelCol={{ span: 4 }} onFinish={handlerSubmit}>
      {/* 原密码 */}
      <ProFormText.Password
        label={formatMessage({ id: formatPerfix(ROUTES.PERSONALSETTING, 'change-password.original-password') })}
        name="originalPassword"
        rules={[
          {
            required: true, min: 6, max: 12,
            message: formatMessage({ id: INTERNATION.PLACEHOLDER }) +
              formatMessage({ id: formatPerfix(ROUTES.USERMANAGEMENT, 'password.rules') }),
          },
        ]}
      />
      {/* 密码强度 */}
      <StrengthMeter />
      <Form.Item style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" block>{formatMessage({ id: INTERNATION.BUTTON_SUBMIT })}</Button>
      </Form.Item>
    </Form>
  )
}
export default ChangePassword