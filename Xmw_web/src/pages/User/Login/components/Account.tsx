/*
 * @Description: 账户密码登录
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-11 14:52:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-11 17:44:11
 */
import type { FC } from 'react'
import { useIntl } from '@umijs/max'
import { ProFormText } from '@ant-design/pro-components'; // antd 高级组件
import { LockOutlined, UserOutlined } from '@ant-design/icons'; // antd 图标

const Account: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <>
            <ProFormText
                name="user_name"
                fieldProps={{
                    size: 'large',
                    prefix: <UserOutlined className={'prefixIcon'} />,
                }}
                placeholder={formatMessage({ id: 'pages.login.type.account.user_name.placeholder' })}
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'pages.login.type.account.user_name.required' }),
                    },
                ]}
            />
            <ProFormText.Password
                name="password"
                fieldProps={{
                    size: 'large',
                    prefix: <LockOutlined className={'prefixIcon'} />,
                }}
                placeholder={formatMessage({ id: 'pages.login.type.account.password.placeholder' })}
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'pages.login.type.account.password.required' }),
                    },
                ]}
            />
        </>
    )
}
export default Account