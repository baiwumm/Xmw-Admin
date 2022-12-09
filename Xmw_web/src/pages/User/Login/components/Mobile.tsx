/*
 * @Description: 手机号码登录
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-08 17:58:06
 */
import type { FC } from 'react'
import { useIntl } from '@umijs/max'
import { ProFormText, ProFormCaptcha } from '@ant-design/pro-components'; // antd 高级组件
import { MobileOutlined } from '@ant-design/icons'; // antd 图标
import { message } from 'antd'  // antd 组件

const Account: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <>
            <ProFormText
                fieldProps={{
                    size: 'large',
                    prefix: <MobileOutlined className={'prefixIcon'} />,
                }}
                name="phone"
                placeholder={formatMessage({ id: 'pages.login.type.mobile.phone' })}
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.login.type.mobile.phone' }),
                    },
                    {
                        pattern: /^1\d{10}$/,
                        message: formatMessage({ id: 'pages.login.type.mobile.phone.rules' }),
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
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.login.type.mobile.captcha' })}
                captchaTextRender={(timing, count) => {
                    if (timing) {
                        return `${count} ${formatMessage({ id: 'pages.login.type.mobile.captcha.obtain' }) + formatMessage({ id: 'pages.login.type.mobile.captcha' })}`;
                    }
                    return formatMessage({ id: 'pages.login.type.mobile.captcha.obtain' }) + formatMessage({ id: 'pages.login.type.mobile.captcha' });
                }}
                name="captcha"
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.login.type.mobile.captcha' }),
                    },
                ]}
                onGetCaptcha={async () => {
                    message.success('获取验证码成功！验证码为：1234');
                }}
            />
        </>
    )
}
export default Account