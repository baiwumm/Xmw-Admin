/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-08 18:02:36
 */
// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { ProFormText, ProFormDigit, ProFormRadio } from '@ant-design/pro-components'; // antd 高级组件
import { APP_STATUS_OPTS, APP_SEX_OPTS } from '@/global/enum' // 状态枚举

const PersonalInformation: FC = () => {
    const { formatMessage } = useIntl();
    return (
        <>
            {/* 用户名称 */}
            <ProFormText
                name="user_name"
                colProps={{ span: 12 }}
                label={formatMessage({ id: 'pages.system.user-management.user_name' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.user_name' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 20
                }}
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.user_name' }),
                        whitespace: true
                    }
                ]}
            />
            {/* 用户工号 */}
            <ProFormText
                name="work_no"
                colProps={{ span: 12 }}
                label={formatMessage({ id: 'pages.system.user-management.work_no' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.work_no' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 20
                }}
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.work_no' }),
                        whitespace: true
                    }
                ]}
            />
            {/* 中文名 */}
            <ProFormText
                name="cn_name"
                colProps={{ span: 12 }}
                label={formatMessage({ id: 'pages.system.user-management.cn_name' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.cn_name' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 20
                }}
                rules={[{ required: true, message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.cn_name' }), whitespace: true }]}
            />
            {/* 英文 */}
            <ProFormText
                name="en_name"
                colProps={{ span: 12 }}
                label={formatMessage({ id: 'pages.system.user-management.en_name' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.en_name' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 20
                }}
            />
            {/* 年龄 */}
            <ProFormDigit
                label={formatMessage({ id: 'pages.system.user-management.age' })}
                name="age"
                colProps={{ span: 12 }}
                min={1}
                max={120}
                initialValue={18}
                fieldProps={{ precision: 0 }}
            />
            {/* 性别 */}
            <ProFormRadio.Group
                name="sex"
                colProps={{ span: 12 }}
                initialValue={1}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                label={formatMessage({ id: 'pages.system.user-management.sex' })}
                options={APP_SEX_OPTS}
            />
            {/* 手机号码 */}
            <ProFormText
                name="phone"
                colProps={{ span: 12 }}
                label={formatMessage({ id: 'pages.system.user-management.phone' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.phone' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 11
                }}
                rules={[
                    {
                        required: true,
                        message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.phone' }),
                        whitespace: true
                    },
                    {
                        pattern: /^1\d{10}$/,
                        message: formatMessage({ id: 'pages.system.user-management.phone.rules' }),
                    }
                ]}
            />
            {/* 电子邮箱 */}
            <ProFormText
                name="email"
                colProps={{ span: 12 }}
                label={formatMessage({ id: 'pages.system.user-management.email' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.email' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 50
                }}
                rules={[{ type: 'email', message: formatMessage({ id: 'pages.system.user-management.email.rules' }), whitespace: true }]}
            />
            {/* 排序 */}
            <ProFormDigit
                label={formatMessage({ id: 'global.table.sort' })}
                name="sort"
                colProps={{ span: 12 }}
                min={1}
                max={99}
                initialValue={1}
                tooltip={formatMessage({ id: 'global.table.sort.tooltip' })}
                fieldProps={{ precision: 0 }}
            />
            {/* 状态 */}
            <ProFormRadio.Group
                name="status"
                colProps={{ span: 12 }}
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                label={formatMessage({ id: 'global.status' })}
                options={APP_STATUS_OPTS}
            />
            {/* 用户名称 */}
            <ProFormText
                name="motto"
                colProps={{ span: 24 }}
                label={formatMessage({ id: 'pages.system.user-management.motto' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.system.user-management.motto' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
            />
        </>
    )
}
export default PersonalInformation