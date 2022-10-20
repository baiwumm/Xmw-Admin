/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 18:23:11
 */

// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Button, Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { createOrganization, updateOrganization } from '@/services/administrative/organization' // 组织管理接口
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ treeData, reloadTable, formData, triggerDom, parent_id }) => {
    const { formatMessage } = useIntl();
    // 初始化表单
    const [form] = Form.useForm<API.ORGANIZATION>();
    // DrawerForm 不同状态下 标题显示
    const formTitle = formData?.org_id ? `${formatMessage({ id: 'menu.administrative.organization.edit' }) + formatMessage({ id: 'pages.administrative.organization.title' })}：${formData.org_name}` : (formatMessage({ id: 'menu.administrative.organization.add' }) + formatMessage({ id: 'pages.administrative.organization.title' }))
    // 提交表单
    const handlerSubmit = async (values: any) => {
        // 提交数据
        let result = false
        let params = { ...formData, ...values }
        if (parent_id) {
            params.parent_id = parent_id
        }
        // 删除 children 属性
        if (params.children) {
            params = omit(params, ['children'])
        }
        await (params.org_id ? updateOrganization : createOrganization)(params).then(res => {
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
        <DrawerForm<API.ORGANIZATION>
            title={formTitle}
            width={500}
            grid
            form={form}
            trigger={triggerDom ||
                <Button type="primary">
                    <PlusOutlined />
                    {formatMessage({ id: 'menu.administrative.organization.add' })}
                </Button>
            }
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: false,
                maskClosable: false,
                onClose: () => form.resetFields()
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
            <FormTemplateItem treeData={treeData} parent_id={parent_id} />
        </DrawerForm>
    );
};

export default FormTemplate