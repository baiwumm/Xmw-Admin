/*
 * @Description: 睡眠弹窗
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-06 16:40:34
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-17 13:46:32
 */
import { useIntl, useModel } from '@umijs/max'
import { useBoolean, useEventListener, useInterval, useMount } from 'ahooks'
import { App, Avatar, Button, Col, Form, Input, Modal, Row, Typography } from 'antd'
import type { FC } from 'react'

import { encryptionAesPsd, getLocalStorageItem, setLocalStorageItem } from '@/utils'
import { INTERNATION, LOCAL_STORAGE } from '@/utils/enums'
import type { LockSleepTypes } from '@/utils/types'

const { Title } = Typography;

// 用户未操作超时时间: 60分钟
const timeOut = 60 * 60 * 1000

const LockSleep: FC = () => {
  const { formatMessage } = useIntl();
  const { initialState } = useModel('@@initialState');
  // hooks 调用
  const { message } = App.useApp();
  // 弹窗显示
  const [openModal, { setTrue, setFalse }] = useBoolean(false);
  // 表单实例
  const [form] = Form.useForm()
  // 获取 LOCK_SLEEP 信息
  const LOCK_SLEEP = getLocalStorageItem<LockSleepTypes>(LOCAL_STORAGE.LOCK_SLEEP)
  // 判断用户未操作时间是否拆过设定值
  const checkTimeout = () => {
    const currentTime = new Date().getTime()
    // 判断是否超时
    if (LOCK_SLEEP && (currentTime - LOCK_SLEEP.last_time > timeOut)) {
      setTrue()
      setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, isSleep: true })
    }
  }
  // 提交表单
  const hanlderSubmit = () => {
    // 触发表单校验
    form.validateFields().then((values: { password: string }) => {
      if (LOCK_SLEEP && initialState?.CurrentUser?.password === encryptionAesPsd(values.password)) {
        setFalse()
        setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, isSleep: false })
      } else {
        message.error(formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockSleep.password.error` }))
      }
    })
  };

  useInterval(() => {
    checkTimeout()
  }, timeOut);

  // 监听用户是否有操作行为
  useEventListener('mousemove', () => {
    if (LOCK_SLEEP) {
      setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, { ...LOCK_SLEEP, last_time: new Date().getTime() })
    }
  })

  // 一开始就检测
  useMount(() => {
    if (LOCK_SLEEP?.isSleep) {
      setTrue()
    }
    setLocalStorageItem(LOCAL_STORAGE.LOCK_SLEEP, {
      last_time: new Date().getTime(),
      isSleep: false,
    })
  })
  return (
    <Modal
      title={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockSleep.title` })}
      open={openModal}
      maskClosable={false}
      closable={false}
      footer={
        <Button type="primary" onClick={hanlderSubmit}>
          {formatMessage({ id: INTERNATION.BUTTON_CONFIRM })}
        </Button>
      }
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
              label={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockSleep.password` })}
              rules={[{ required: true }]}
            >
              <Input.Password
                placeholder={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockSleep.password.placeholder` })} />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Modal>
  )
}
export default LockSleep