/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 16:18:58
 */

// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { ModalForm } from '@ant-design/pro-components'; // 高级组件
import { Button, Form, message } from 'antd'; // antd 组件库
import {omit} from 'lodash'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { createRole,updateRole } from '@/services/system/role-management' // 角色管理接口
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ reloadTable, formData, triggerDom, menuData }) => {
    const { formatMessage } = useIntl();
    // 初始化表单
    const [form] = Form.useForm<API.ROLEMANAGEMENT>();
    // ModalForm 不同状态下 标题显示
    const formTitle = formData?.role_id ? `${formatMessage({ id: 'menu.system.role-management.edit' }) + formatMessage({ id: 'pages.system.role-management.title' })}：${formData.role_name}` : (formatMessage({ id: 'menu.system.role-management.add' }) + formatMessage({ id: 'pages.system.role-management.title' }))
    // 提交表单
    const handlerSubmit = async (values: API.ROLEMANAGEMENT) => {
        // 提交数据
        let result = false
        let params = { ...formData, ...values }
        params = omit(params, ['permission'])
        await (params.role_id ? updateRole : createRole)(params).then(res => {
            if (res.code === 200) {
                message.success(res.msg);
                reloadTable()
                // 重置表单
                form.resetFields()
                result = true
            }
        })
        return result
    }
    return (
        <ModalForm<API.ROLEMANAGEMENT>
            title={formTitle}
            width={500}
            grid
            form={form}
            trigger={triggerDom ||
                <Button type="primary">
                    <PlusOutlined />
                    {formatMessage({ id: 'menu.system.role-management.add' })}
                </Button>
            }
            autoFocusFirstInput
            modalProps={{
                destroyOnClose: false,
                maskClosable: false,
                onCancel: () => form.resetFields()
            }}
            // 提交数据时，禁用取消按钮的超时时间（毫秒）。
            submitTimeout={2000}
            onFinish={async (values) => {
                // 提交数据
                const isSuccess = await handlerSubmit(values)
                // 返回true关闭弹框，否则不关闭
                return isSuccess
            }}
            onVisibleChange={visiable => {
                if (visiable) {
                    form.setFieldsValue(formData);
                }
            }}
        >
            <FormTemplateItem menuData={menuData} />
        </ModalForm>
    );
};

export default FormTemplate