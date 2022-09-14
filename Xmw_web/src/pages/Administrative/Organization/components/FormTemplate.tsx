/*
 * @Description: 新建表单
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 11:33:11
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 18:26:41
 */

// 引入第三方库
import { FC } from 'react';
import { PlusOutlined } from '@ant-design/icons';// antd 图标
import { DrawerForm } from '@ant-design/pro-components'; // 高级组件
import type { ActionType } from '@ant-design/pro-components'
import { Button, Form, message } from 'antd'; // antd 组件库

// 引入业务组件
import FormTemplateItem from '../components/FormTemplateItem' // 表单组件 
import { saveOrganization } from '@/services/administrative/organization' // 组织管理接口
import { TableItem } from '../utils/interface'

const FormTemplate: FC<{ treeData: object[], tableRef: ActionType }> = ({ treeData, tableRef }) => {
    // 初始化表单
    const [form] = Form.useForm<TableItem>();
    const handlerSubmit = async (values: any) => {
        try {
            // 提交数据
            await saveOrganization(values).then(() => {
                message.success('提交成功');
                tableRef.current.reload()
                // 不返回不会关闭弹框
                return true;
            })
        } catch (error) {
            // 抛出异常
            throw (error);
        }

    }
    return (
        <DrawerForm<TableItem>
            title="新建"
            width={500}
            grid
            form={form}
            trigger={
                <Button type="primary">
                    <PlusOutlined />
                    新建
                </Button>
            }
            autoFocusFirstInput
            drawerProps={{
                destroyOnClose: true,
                maskClosable: false
            }}
            submitTimeout={2000}
            onFinish={async (values) => {
                handlerSubmit(values)
            }}
            submitter={{
                // 配置按钮文本
                searchConfig: {
                    resetText: '取消',
                    submitText: '提交',
                }
            }}
        >
            <FormTemplateItem treeData={treeData} />
        </DrawerForm>
    );
};

export default FormTemplate