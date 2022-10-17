/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-10 15:31:29
 */

// 引入第三方库
import type { FC } from 'react';
import { getLocale, useIntl } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import { Button, Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { saveMenu } from '@/services/system/menu-management' // 菜单管理接口
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ treeData, reloadTable, formData, triggerDom, parent_id, menuData }) => {
    const { formatMessage } = useIntl();
    // 初始化表单
    const [form] = Form.useForm<API.MENUMANAGEMENT>();
    // DrawerForm 不同状态下 标题显示
    const formTitle = formData?.menu_id ? `${formatMessage({ id: 'menu.system.menu-management.edit' }) + formatMessage({ id: 'pages.system.menu-management.title' })}：${formData[getLocale()]}` : (formatMessage({ id: 'menu.system.menu-management.add' }) + formatMessage({ id: 'pages.system.menu-management.title' }))
    // 提交表单
    const handlerSubmit = async (values: API.MENUMANAGEMENT) => {
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
        await saveMenu(params).then(res => {
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
        <DrawerForm<API.MENUMANAGEMENT>
            title={formTitle}
            width={550}
            grid
            form={form}
            trigger={triggerDom ||
                <Button type="primary">
                    <PlusOutlined />
                    {formatMessage({ id: 'menu.system.menu-management.add' })}
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
            <FormTemplateItem treeData={treeData} parent_id={parent_id} menuData={menuData} />
        </DrawerForm>
    );
};

export default FormTemplate