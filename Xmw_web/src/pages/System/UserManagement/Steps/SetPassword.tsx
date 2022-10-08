/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-08 18:32:26
 */
// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { ProFormText } from '@ant-design/pro-components'; // antd 高级组件


const SetPassword: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <>
            {/* 密码 */}
            <ProFormText.Password
                label={formatMessage({ id: 'pages.system.user-management.password' })}
                name="password"
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.password' })
                    },
                    {
                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[a-zA-Z0-9]{6,12}$/,
                        message: formatMessage({ id: 'pages.system.user-management.password.rules' }),
                    }
                ]}
            />
            {/* 确认密码 */}
            <ProFormText.Password
                label={formatMessage({ id: 'pages.system.user-management.confirm-password' })}
                name="confirmPassword"
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.confirm-password' })
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error(formatMessage({ id: 'pages.system.user-management.confirm-password.rules' })));
                        },
                    })
                ]}
            />
        </>
    )
}
export default SetPassword