/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 15:54:36
 */

// 引入第三方库
import type { FC } from 'react';
import { useIntl } from '@umijs/max'
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { ModalForm } from '@ant-design/pro-components'; // 高级组件
import { Button, Form, message } from 'antd'; // antd 组件库
import { omit } from 'lodash'

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { createInternational, updateInternational } from '@/services/system/internationalization' // 国际化接口
import type { FormTemplateProps } from '../utils/interface' // 公共 interface

const FormTemplate: FC<FormTemplateProps> = ({ treeData, reloadTable, formData, triggerDom, parent_id }) => {
    const { formatMessage } = useIntl();
    // 初始化表单
    const [form] = Form.useForm<API.INTERNATIONALIZATION>();
    // ModalForm 不同状态下 标题显示
    const formTitle = formData?.id ? `${formatMessage({ id: 'menu.system.internationalization.edit' }) + formatMessage({ id: 'pages.system.internationalization.title' })}：${formData.name}` : (formatMessage({ id: 'menu.system.internationalization.add' }) + formatMessage({ id: 'pages.system.internationalization.title' }))
    // 提交表单
    const handlerSubmit = async (values: API.INTERNATIONALIZATION) => {
        // 提交数据
        let result = false
        let params = { ...formData, ...values }
        if (parent_id) {
            params.parent_id = parent_id
        }
        // 删除 多余的 属性
        // 这里不清楚编辑最顶级数据时，formData会自动加上label和value两个属性，原因未知
        if (params.children) {
            params = omit(params, ['children', 'value', 'label'])
        }
        // 执行数据库操作
        await (params.id ? updateInternational : createInternational)(params).then(res => {
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
        <ModalForm<API.INTERNATIONALIZATION>
            title={formTitle}
            width={500}
            grid
            form={form}
            trigger={triggerDom ||
                <Button type="primary">
                    <PlusOutlined />
                    {formatMessage({ id: 'menu.system.internationalization.add' })}
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
                if (visiable && formData) {
                    form.setFieldsValue(formData);
                }
            }}
        >
            <FormTemplateItem treeData={treeData} parent_id={parent_id} />
        </ModalForm>
    );
};

export default FormTemplate