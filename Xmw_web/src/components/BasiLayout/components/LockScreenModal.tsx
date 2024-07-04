/*
 * @Description: 锁定屏幕弹窗
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-01-11 11:18:51
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-04 11:11:07
 */
import { useIntl, useModel } from '@umijs/max';
import { useBoolean, useLocalStorageState, useMount } from 'ahooks';
import { Avatar, Col, Form, Input, Modal, Row, Typography } from 'antd';
import { FC } from 'react';

import { encryptionAesPsd } from '@/utils';
import { INTERNATION } from '@/utils/enums';

import LockScreen from './LockScreen'; // 锁屏弹窗

const { Title } = Typography;

type LockScreenModalProps = {
  open: boolean;
  setOpenFalse: () => void;
};

const LockScreenModal: FC<LockScreenModalProps> = ({ open = false, setOpenFalse }) => {
  const { formatMessage } = useIntl();
  // 获取全局状态
  const { initialState } = useModel('@@initialState');
  // 是否显示锁屏页面
  const [openLockPage, { setTrue: setLockPageTrue, setFalse: setLockPageFalse }] =
    useBoolean(false);
  // 表单实例
  const [form] = Form.useForm();
  // 记录锁屏密码
  const [lockPassword, setLockPassword] = useLocalStorageState<string>('lock_password');

  // 提交表单
  const hanlderSubmit = () => {
    // 触发表单校验
    form.validateFields().then((values: { password: string }) => {
      // 将锁屏密码保存到 localstorage
      setLockPassword(encryptionAesPsd(values.password));
      setOpenFalse();
      // 弹窗锁屏页面
      setLockPageTrue();
    });
  };

  // 如果有锁屏密码，则表示已锁屏
  useMount(() => {
    if (lockPassword) {
      setLockPageTrue();
    }
  });

  return (
    <>
      <Modal
        title={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockScreen` })}
        open={open}
        onCancel={setOpenFalse}
        onOk={hanlderSubmit}
      >
        <Row justify="center" style={{ flexDirection: 'column', textAlign: 'center' }}>
          <Col>
            <Avatar size={120} src={initialState?.CurrentUser?.avatar_url} />
          </Col>
          <Col>
            <Title level={2}>{initialState?.CurrentUser?.cn_name}</Title>
          </Col>
          <Col>
            <Form form={form} style={{ textAlign: 'left' }}>
              <Form.Item
                name="password"
                label={formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockScreen.password` })}
                rules={[{ required: true, min: 6, max: 12 }]}
              >
                <Input.Password
                  placeholder={`${formatMessage({ id: INTERNATION.PLACEHOLDER })}
                  ${formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockScreen.password` })}`}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
      {/* 锁屏弹窗 */}
      {openLockPage ? <LockScreen setLockPageFalse={setLockPageFalse} /> : null}
    </>
  );
};
export default LockScreenModal;
