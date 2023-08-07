/*
 * @Description: 密码强度校验组件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-09 17:15:19
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-02 08:58:55
 */
import { ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { Col, Form, Progress, Row } from 'antd';
import { keys, values } from 'lodash-es'
import type { FC } from 'react'
import zxcvbn from 'zxcvbn'; // 密码强度校验

import { formatPerfix, strengthMeterOptions } from './config'
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
  const watchStrength = (password: string): number => {
    const analysisValue = zxcvbn(password)
    // score得分只有0~4，且只有整数范围并没有小数
    return (analysisValue.score + 1) * 20
  }
  return (
    <>
      {/* 密码 */}
      <ProFormText.Password
        label={formatMessage({ id: `${formatPerfix}.password` })}
        name="password"
        rules={[
          {
            required: true, min: 6, max: 12,
            message: formatMessage({ id: 'global.form.placeholder' }) +
              formatMessage({ id: `${formatPerfix}.password.rules` }),
          },
        ]}
      />
      {/* 确认密码 */}
      <ProFormText.Password
        label={formatMessage({ id: `${formatPerfix}.confirm-password` })}
        name="confirmPassword"
        fieldProps={{ visibilityToggle: false }}
        rules={[
          {
            required: true,
            message: formatMessage({ id: 'global.form.placeholder' }) +
              formatMessage({ id: `${formatPerfix}.confirm-password` }),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(formatMessage({ id: `${formatPerfix}.confirm-password.rules` })));
            },
          }),
        ]}
      />
      {/* 显示密码强度 */}
      <div className={styles['process-steps']}>
        <Progress
          percent={password ? watchStrength(password) : 0}
          steps={5}
          strokeColor={values(strengthMeterOptions)}
          showInfo={false}
        />
      </div>
      <Row justify="space-around" className={styles['process-steps']}>
        {
          keys(strengthMeterOptions).map((value: string) =>
            <Col span={4} key={value}>{formatMessage({ id: `components.StrengthMeter.${value}` })}</Col>)
        }
      </Row>
    </>
  )
}

export default StrengthMeter