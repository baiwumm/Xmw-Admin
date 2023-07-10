/*
 * @Description: 修改密码
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-12 16:10:13
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-21 10:19:28
 */
import { ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl, useModel } from '@umijs/max'
import { useLocalStorageState, useRequest } from 'ahooks'
import { Button, Form, message, Modal } from 'antd'
import type { FC } from 'react'

import StrengthMeter from '@/components/StrengthMeter' // 密码强度校验
import type { AppLocalCacheModel, ResponseModel } from '@/global/interface'
import { Logout } from '@/services/logic/login' // 登录相关接口
import { updateUser } from '@/services/system/user-management'
import { CACHE_KEY, encryptionAesPsd, logoutToLogin, waitTime } from '@/utils'

import { formatPerfix } from '../utils'


type passwordProps = {
  originalPassword: string;
  password: string;
  confirmPassword: string;
}

type LogoutProps = ResponseModel<Record<string, any>>

const ChangePassword: FC = () => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  // 获取 localstorage key
  const [appCache, setappCache] = useLocalStorageState<AppLocalCacheModel | undefined>(CACHE_KEY);
  // 表单实例
  const [form] = Form.useForm()

  /**
 * @description: 退出登录，并且将当前的 url 保存
 * @return {*}
 * @author: Cyan
 */
  const { run: loginOut } = useRequest<LogoutProps, unknown[]>(Logout, {
    manual: true,
    onSuccess: async (res: LogoutProps) => {
      if (res.code === 200) {
        setInitialState((s) => ({ ...s, CurrentUser: undefined, Access_token: undefined }));
        setappCache({ ...appCache, ACCESS_TOKEN: undefined })
        // 退出登录返回登录页
        logoutToLogin()
      }
    },
  },
  )

  /**
 * @description: 更新用户密码
 * @return {*}
 * @author: Cyan
 */
  const { run: runUpdateUser } = useRequest<LogoutProps, { password: string; user_id: string }[]>(updateUser, {
    manual: true,
    onSuccess: async (res: LogoutProps) => {
      if (res.code === 200) {
        // 更新密码成功后退出登录返回到登录页面
        loginOut()
        // 销毁对话框
        Modal.destroyAll();
      }
    },
  },
  )

  // 表单提交
  const handlerSubmit = (values: passwordProps) => {
    // 判断原密码是否正确
    if (encryptionAesPsd(values.originalPassword) !== initialState?.CurrentUser?.password) {
      message.error(formatMessage({ id: `${formatPerfix}.change-password.error` }))
    } else {
      Modal.confirm({
        title: formatMessage({ id: 'global.warm-tips' }),
        content: formatMessage({ id: `${formatPerfix}.change-password.tip` }),
        onOk: async () => {
          const user_id = initialState?.CurrentUser?.user_id
          await waitTime(500)
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
        label={formatMessage({ id: `${formatPerfix}.change-password.original-password` })}
        name="originalPassword"
        rules={[
          {
            required: true, min: 6, max: 12,
            message: formatMessage({ id: 'global.form.placeholder' }) +
              formatMessage({ id: 'pages.system.user-management.password.rules' }),
          },
        ]}
      />
      {/* 密码强度 */}
      <StrengthMeter />
      <Form.Item style={{ marginTop: 10 }}>
        <Button type="primary" htmlType="submit" block>{formatMessage({ id: 'global.button.submit' })}</Button>
      </Form.Item>
    </Form>
  )
}
export default ChangePassword