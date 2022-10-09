/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 17:03:12
 */

// 引入第三方库
import type { FC } from 'react';
import { useState } from 'react';
import { useIntl } from '@umijs/max'
import { StepsForm } from '@ant-design/pro-components'; // 高级组件
import { Form, message, Modal } from 'antd'; // antd 组件库

// 引入业务组件
import { PersonalInformation, UserInformation, SetPassword, SetAvatar } from '../Steps'
import { saveUser } from '@/services/system/user-management' // 用户管理接口
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, formData, roleData, jobsData, organizationData, modalVisible, setModalVisibleFalse }) => {
    const { formatMessage } = useIntl();
    // 初始化表单
    // const [form] = Form.useForm<API.USERMANAGEMENT>();
    // 深克隆一份表单数据
    const [cloneFormData, setCloneFormData] = useState<API.USERMANAGEMENT | undefined>(formData)
    const formTitle = cloneFormData?.user_id ? `${formatMessage({ id: 'menu.system.user-management.edit' }) + formatMessage({ id: 'pages.system.user-management.title' })}：${cloneFormData.user_name}` : (formatMessage({ id: 'menu.system.user-management.add' }) + formatMessage({ id: 'pages.system.user-management.title' }))
    // 提交表单
    const handlerSubmit = async (values: API.USERMANAGEMENT) => {
        // 提交数据
        const params = { ...cloneFormData, ...values }
        // 将 tags 和 city 转换成 字符串
        if (params.tags) {
            params.tags = JSON.stringify(params.tags)
        }
        params.city = JSON.stringify(params.city)
        await saveUser(params).then(res => {
            if (res.resCode === 200) {
                message.success(res.resMsg);
                reloadTable()
                setModalVisibleFalse()
            }
        })
    }
    return (
        <StepsForm
            onFinish={async (values: API.USERMANAGEMENT) => {
                console.log(values)
                handlerSubmit(values)
            }}
            stepsFormRender={(dom, submitter) => {
                return (
                    <Modal
                        title={formTitle}
                        width={800}
                        onCancel={() => setModalVisibleFalse()}
                        open={modalVisible}
                        footer={submitter}
                        destroyOnClose
                    >
                        {dom}
                    </Modal>
                );
            }}
        >
            {/* 个人信息 */}
            <StepsForm.StepForm
                title={formatMessage({ id: 'pages.system.user-management.steps-form.personal-information' })}
                grid
            >
                <PersonalInformation />
            </StepsForm.StepForm>
            {/* 用户信息 */}
            <StepsForm.StepForm
                title={formatMessage({ id: 'pages.system.user-management.steps-form.user-information' })}
                grid
            >
                <UserInformation roleData={roleData} jobsData={jobsData} organizationData={organizationData} />
            </StepsForm.StepForm>
            {/* 设置头像 */}
            <StepsForm.StepForm
                title={formatMessage({ id: 'pages.system.user-management.steps-form.set-avatar' })}
                grid
            >
                <SetAvatar />
            </StepsForm.StepForm>
            {/* 设置密码 */}
            <StepsForm.StepForm
                title={formatMessage({ id: 'pages.system.user-management.steps-form.set-password' })}
                grid
            >
                <SetPassword />
            </StepsForm.StepForm>
        </StepsForm>
    );
};

export default FormTemplate