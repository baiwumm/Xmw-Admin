/*
 * @Description: 锁定屏幕弹窗
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-01-11 11:18:51
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-11 18:04:10
 */
import { useIntl, useModel } from '@umijs/max'
import { useBoolean, useLocalStorageState, useMount } from 'ahooks'
import { Avatar, Col, Form, Input, Modal, Row, Typography } from 'antd'
import React, { FC, useImperativeHandle } from 'react'

import { encryptionAesPsd } from '@/utils'

import LockScreen from './LockScreen' // 锁屏弹窗

const { Title } = Typography;

const LockScreenModal: FC<{ cRef: React.MutableRefObject<any> }> = ({ cRef }) => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 弹窗显示
  const [openModal, { setTrue, setFalse }] = useBoolean(false);
  // 是否显示锁屏页面
  const [openLockPage, { setTrue: setLockPageTrue, setFalse: setLockPageFalse }] = useBoolean(false);
  // 表单实例
  const [form] = Form.useForm()
  // 记录锁屏密码
  const [lockPassword, setLockPassword] = useLocalStorageState<string>('lock_password');

  // 提交表单
  const hanlderSubmit = () => {
    // 触发表单校验
    form.validateFields().then((values: { password: string }) => {
      // 将锁屏密码保存到 localstorage
      setLockPassword(encryptionAesPsd(values.password))
      setFalse()
      // 弹窗锁屏页面
      setLockPageTrue()
    })
  }

  // 将方法暴露给父组件使用
  useImperativeHandle(cRef, () => ({
    setTrue,
  }));

  // 如果有锁屏密码，则表示已锁屏
  useMount(() => {
    if (lockPassword) {
      setLockPageTrue()
    }
  })

  return (
    <>
      <Modal
        title={formatMessage({ id: 'components.RightContent.LockScreen' })}
        open={openModal}
        onCancel={setFalse}
        onOk={hanlderSubmit}
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
                label={formatMessage({ id: 'components.RightContent.LockScreen.password' })}
                rules={[{ required: true, min: 6, max: 12 }]}
              >
                <Input.Password
                  placeholder={`
                  ${formatMessage({ id: 'global.form.placeholder' })}
                  ${formatMessage({ id: 'components.RightContent.LockScreen.password' })}`
                  }
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      {/* 锁屏弹窗 */}
      {openLockPage ? <LockScreen setLockPageFalse={setLockPageFalse} /> : null}
    </>
  )
}
export default LockScreenModal