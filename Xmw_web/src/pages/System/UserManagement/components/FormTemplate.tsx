/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-10 14:17:25
 */

// 引入第三方库
import type { FC } from 'react';
import { useRef, useEffect } from 'react';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useIntl } from '@umijs/max'
import { StepsForm } from '@ant-design/pro-components'; // 高级组件
import { message, Modal } from 'antd'; // antd 组件库
import { omit } from 'lodash'

// 引入业务组件
import { PersonalInformation, UserInformation, SetPassword, SetAvatar } from '../Steps'
import { saveUser } from '@/services/system/user-management' // 用户管理接口
import { encryptionAesPsd, decryptionAesPsd } from '@/utils'
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, formData, roleData, jobsData, organizationData, modalVisible, setModalVisibleFalse }) => {
    const { formatMessage } = useIntl();
    // 初始化表单
    const formMapRef = useRef<React.MutableRefObject<ProFormInstance<any> | undefined>[]>([]);
    const formTitle = formData?.user_id ? `${formatMessage({ id: 'menu.system.user-management.edit' }) + formatMessage({ id: 'pages.system.user-management.title' })}：${formData.user_name}` : (formatMessage({ id: 'menu.system.user-management.add' }) + formatMessage({ id: 'pages.system.user-management.title' }))
    // 提交表单
    const handlerSubmit = async (values: API.USERMANAGEMENT) => {
        // 提交数据
        let params = { ...formData, ...values }
        // 将 tags 和 city 转换成 字符串
        if (params.tags) {
            params.tags = JSON.stringify(params.tags)
        }
        params.city = JSON.stringify(params.city)
        // 将密码加密
        params.password = encryptionAesPsd(params.password)
        // 删除参数多余的属性
        params = omit(params, ['confirmPassword'])
        await saveUser(params).then(res => {
            if (res.resCode === 200) {
                message.success(res.resMsg);
                reloadTable()
                setModalVisibleFalse()
            }
        })
    }

    // 当 formData 有数据的时候  回显
    useEffect(() => {
        if (formData) {
            // 表单数据回显处理,密码解密
            formData.password = decryptionAesPsd(formData.password)
            formData.confirmPassword = formData.password
            // 编辑场景下需要使用formMapRef循环设置formData
            formMapRef?.current?.forEach((formInstanceRef) => {
                formInstanceRef?.current?.setFieldsValue(formData);
            });
        }
    }, [formData]);
    return (
        <StepsForm
            formMapRef={formMapRef}
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
                        maskClosable={false}
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