/*
 * @Description: 睡眠弹窗
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-06 16:40:34
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-11 13:40:35
 */
import { useIntl, useModel } from '@umijs/max'
import { useBoolean, useEventListener, useInterval, useLocalStorageState, useMount } from 'ahooks'
import { Avatar, Button, Col, Form, Input, message, Modal, Row, Typography } from 'antd'
import type { FC } from 'react'

import { encryptionAesPsd } from '@/utils'

import { LockSleepProps } from '../type'

const { Title } = Typography;

// 用户未操作超时时间: 60分钟
const timeOut = 60 * 60 * 1000

const LockSleep: FC = () => {
  const { formatMessage } = useIntl();
  const { initialState } = useModel('@@initialState');
  // 统一国际化前缀
  const formatPerfix: string = 'components.RightContent.LockSleep'
  // 弹窗显示
  const [openModal, { setTrue, setFalse }] = useBoolean(false);
  // 表单实例
  const [form] = Form.useForm()
  // 记录用户最后一次移动鼠标的时间
  const [sleepInfo, setSleepInfo] = useLocalStorageState<LockSleepProps>(
    'lock_sleep',
    {
      defaultValue: {
        last_time: new Date().getTime(),
        isSleep: false,
      },
    },
  );
  // 判断用户未操作时间是否拆过设定值
  const checkTimeout = () => {
    const currentTime = new Date().getTime()
    // 判断是否超时
    if (sleepInfo && currentTime - sleepInfo.last_time > timeOut) {
      setTrue()
      setSleepInfo({ ...sleepInfo, isSleep: true })
    }
  }
  // 提交表单
  const hanlderSubmit = () => {
    // 触发表单校验
    form.validateFields().then((values: { password: string }) => {
      if (sleepInfo && initialState?.CurrentUser?.password === encryptionAesPsd(values.password)) {
        setFalse()
        setSleepInfo({ ...sleepInfo, isSleep: false })
      } else {
        message.error(formatMessage({ id: `${formatPerfix}.password.error` }))
      }
    })
  };

  // 每隔10分钟执行一次
  useInterval(() => {
    checkTimeout()
  }, 10 * 60 * 1000);

  // 监听用户是否有操作行为
  useEventListener('mousemove', () => {
    if (sleepInfo) {
      setSleepInfo({ ...sleepInfo, last_time: new Date().getTime() })
    }
  })

  // 一开始就检测
  useMount(() => {
    if (sleepInfo?.isSleep) {
      setTrue()
    }
  })
  return (
    <Modal
      title={formatMessage({ id: `${formatPerfix}.title` })}
      open={openModal}
      maskClosable={false}
      closable={false}
      footer={<Button type="primary" onClick={hanlderSubmit}>{formatMessage({ id: 'global.button.confirm' })}</Button>}
    >
      <Row justify="center" style={{ flexDirection: 'column', textAlign: 'center' }}>
        <Col>
          <Avatar
            size={120}
            src={initialState?.CurrentUser?.avatar_url}
          />
        </Col>
        <Col>
          <Title level={2}>{initialState?.CurrentUser?.cn_name}</Title>
        </Col>
        <Col>
          <Form form={form} style={{ textAlign: 'left' }}>
            <Form.Item
              name="password"
              label={formatMessage({ id: `${formatPerfix}.password` })}
              rules={[{ required: true }]}
            >
              <Input.Password placeholder={formatMessage({ id: `${formatPerfix}.password.placeholder` })} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
export default LockSleep