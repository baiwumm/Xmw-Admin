/*
 * @Description: 手机号码登录
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 14:08:56
 */
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { Icon, useIntl } from '@umijs/max';
import { App } from 'antd';
import type { FC } from 'react';

import { formatPerfix } from '@/utils';
import { INTERNATION, ROUTES } from '@/utils/enums';

const Mobile: FC = () => {
  const { formatMessage } = useIntl();
  // hooks 调用
  const { message } = App.useApp();
  return (
    <>
      <ProFormText
        fieldProps={{
          size: 'large',
          prefix: <Icon icon="ri:smartphone-line" className={'prefixIcon'} />,
        }}
        name="phone"
        placeholder={formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.phone') })}
        rules={[
          {
            required: true,
            message:
              formatMessage({ id: INTERNATION.PLACEHOLDER }) +
              formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.phone') }),
          },
          {
            pattern: /^1\d{10}$/,
            message: formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.phone.rules') }),
          },
        ]}
      />
      <ProFormCaptcha
        fieldProps={{
          size: 'large',
        }}
        captchaProps={{
          size: 'large',
        }}
        placeholder={
          formatMessage({ id: INTERNATION.PLACEHOLDER }) +
          formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha') })
        }
        captchaTextRender={(timing, count) => {
          if (timing) {
            return `${count} ${
              formatMessage({
                id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha.obtain'),
              }) + formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha') })
            }`;
          }
          return (
            formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha.obtain') }) +
            formatMessage({ id: formatPerfix(ROUTES.LOGIN, 'type.mobile.captcha') })
          );
        }}
        name="captcha"
        rules={[{ required: true }]}
        onGetCaptcha={async () => {
          message.success('获取验证码成功！验证码为：1234');
        }}
      />
    </>
  );
};
export default Mobile;
