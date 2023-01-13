/*
 * @Description: 安全设置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-13 17:33:55
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-13 18:26:39
 */
import type { FC } from 'react'
import { useIntl, useModel } from '@umijs/max'
import { Row, Col, Typography, Divider, Button } from 'antd'
import zxcvbn from 'zxcvbn'; // 密码强度校验
import { decryptionAesPsd } from '@/utils'

const { Text } = Typography;

const SecuritySetting: FC = () => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 校验密码强度
  const passwordStrength = () => {
    const analysisValue: { score: number } = zxcvbn(decryptionAesPsd(initialState?.CurrentUser?.password || ''))
    // score得分只有0~4，且只有整数范围并没有小数
    return {
      0: formatMessage({ id: 'components.StrengthMeter.very-weak' }),
      1: formatMessage({ id: 'components.StrengthMeter.weak' }),
      2: formatMessage({ id: 'components.StrengthMeter.general' }),
      3: formatMessage({ id: 'components.StrengthMeter.strong' }),
      4: formatMessage({ id: 'components.StrengthMeter.very-strong' })
    }[analysisValue.score]
  }
  // 邮箱中间三位星号表示
  const regEmail = () => {
    const email = initialState?.CurrentUser?.email || ''
    const emailSplit = email.split('@')
    return `${emailSplit[0].replace(/^(\d{3}).*(\d{4})$/, "$1***$2")}@${emailSplit[1]}`
  }
  return (
    <>
      {/* 账户密码 */}
      <Row justify="space-between" align='middle'>
        <Col>
          <Text strong>{formatMessage({ id: 'pages.personal-center.personal-setting.security-setting.account-password' })}</Text>
          <Col>
            <Text type="secondary">{formatMessage({ id: 'pages.personal-center.personal-setting.security-setting.account-password.tip' })}: {passwordStrength()}</Text>
          </Col>
        </Col>
        <Button type="link">{formatMessage({ id: 'global.button.modify' })}</Button>
      </Row>
      <Divider style={{ margin: '16px 0' }} />
      {/* 密保手机 */}
      <Row justify="space-between" align='middle'>
        <Col>
          <Text strong>{formatMessage({ id: 'pages.personal-center.personal-setting.security-setting.security-phone' })}</Text>
          <Col>
            <Text type="secondary">{formatMessage({ id: 'pages.personal-center.personal-setting.security-setting.security-phone.tip' })}：{initialState?.CurrentUser?.phone.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")}</Text>
          </Col>
        </Col>
        <Button type="link">{formatMessage({ id: 'global.button.modify' })}</Button>
      </Row>
      <Divider style={{ margin: '16px 0' }} />
      {/* 安全邮箱 */}
      <Row justify="space-between" align='middle'>
        <Col>
          <Text strong>{formatMessage({ id: 'pages.personal-center.personal-setting.security-setting.secure-mailbox' })}</Text>
          <Col>
            <Text type="secondary">{formatMessage({ id: 'pages.personal-center.personal-setting.security-setting.secure-mailbox.tip' })}：{regEmail()}</Text>
          </Col>
        </Col>
        <Button type="link">{formatMessage({ id: 'global.button.modify' })}</Button>
      </Row>
      <Divider style={{ margin: '16px 0' }} />
    </>
  )
}
export default SecuritySetting
