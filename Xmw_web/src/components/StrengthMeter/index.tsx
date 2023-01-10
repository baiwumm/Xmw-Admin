/*
 * @Description: 
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-09 17:15:19
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-10 09:51:39
 */
import type { FC } from 'react'
import { useIntl } from '@umijs/max'
import { Progress, Form } from 'antd';
import { ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import zxcvbn from 'zxcvbn'; // 密码强度校验
import { isUndefined } from 'lodash'
import styles from './index.module.less'

const StrengthMeter: FC = () => {
  const { formatMessage } = useIntl();
  // 获取上下文 form 实例
  const form = Form.useFormInstance();
  // 监听密码的改变
  const password = Form.useWatch('password', form);

  /**
   * @description: 监听密码强度相应变化
   * @param {string} password
   * @return {*}
   * @author: Cyan
   */
  const watchStrength = (password: string) => {
    const analysisValue = zxcvbn(password)
    // score得分只有0~4，且只有整数范围并没有小数
    return (analysisValue.score + 1) * 20
  }
  return (
    <>
      {/* 密码 */}
      <ProFormText.Password
        label={formatMessage({ id: 'pages.system.user-management.password' })}
        name="password"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.password' })
          }
        ]}
      />
      {/* 确认密码 */}
      <ProFormText.Password
        label={formatMessage({ id: 'pages.system.user-management.confirm-password' })}
        name="confirmPassword"
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.confirm-password' })
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage({ id: 'pages.system.user-management.confirm-password.rules' })));
            },
          })
        ]}
      />
      {/* 显示密码强度 */}
      <div className={styles['process-steps']}>
        <Progress
          percent={password ? watchStrength(password) : 0}
          steps={5}
          strokeColor={['#e74242', '#EFBD47', '#ffa500', '#1bbf1b', '#008000']}
          format={(percent) => {
            return isUndefined(percent) ? null : {
              20: '非常弱',
              40: '弱',
              60: '一般',
              80: '强',
              100: '非常强'
            }[percent]
          }}
        />
      </div>
    </>
  )
}

export default StrengthMeter