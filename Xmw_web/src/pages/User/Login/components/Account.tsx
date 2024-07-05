/*
 * @Description: 账户密码登录
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 14:10:28
 */
import { ProFormText } from '@ant-design/pro-components';
import { Icon, useIntl } from '@umijs/max';
import { useRequest } from 'ahooks';
import { Col, Form, Input, Row, Spin } from 'antd';
import { get } from 'lodash-es';
import type { FC } from 'react';

import { getCaptcha } from '@/services/logic/login'; // 获取图形验证码
import { formatPerfix } from '@/utils';
import { INTERNATION, ROUTES } from '@/utils/enums';

const Account: FC = () => {
  const { formatMessage } = useIntl();
  // 获取图形验证码
  const {
    loading,
    run: getVerifyCode,
    data: verifyCode,
  } = useRequest(async () => get(await getCaptcha(), 'data'));
  return (
    <>
      <ProFormText
        name="user_name"
        fieldProps={{
          size: 'large',
          prefix: <Icon icon="ri:user-line" className={'prefixIcon'} />,
        }}
        placeholder={formatMessage({
          id: formatPerfix(ROUTES.LOGIN, 'type.account.user_name.placeholder'),
        })}
        rules={[
          {
            required: true,
            message: formatMessage({
              id: formatPerfix(ROUTES.LOGIN, 'type.account.user_name.required'),
            }),
          },
        ]}
        initialValue="admin"
      />
      <ProFormText.Password
        name="password"
        fieldProps={{
          size: 'large',
          prefix: <Icon icon="ri:lock-line" className={'prefixIcon'} />,
          visibilityToggle: false,
        }}
        placeholder={formatMessage({
          id: formatPerfix(ROUTES.LOGIN, 'type.account.password.placeholder'),
        })}
        rules={[
          {
            required: true,
            message: formatMessage({
              id: formatPerfix(ROUTES.LOGIN, 'type.account.password.required'),
            }),
          },
        ]}
        initialValue="abc123456"
      />
      <Form.Item>
        <Row gutter={8}>
          <Col span={14}>
            <Form.Item
              name="verifyCode"
              noStyle
              rules={[
                {
                  required: true,
                  message:
                    formatMessage({ id: INTERNATION.PLACEHOLDER }) +
                    formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha') }),
                },
              ]}
            >
              <Input
                size="large"
                placeholder={
                  formatMessage({ id: INTERNATION.PLACEHOLDER }) +
                  formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha') })
                }
              />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Spin spinning={loading}>
              <div
                dangerouslySetInnerHTML={{ __html: verifyCode || '' }}
                style={{ width: '100%', cursor: 'pointer' }}
                onClick={() => getVerifyCode()}
              />
            </Spin>
          </Col>
        </Row>
      </Form.Item>
    </>
  );
};
export default Account;
