/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-16 18:03:23
 */
// 引入第三方库
import { FC } from 'react';
import { ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'; // antd 高级组件
import { TreeSelect } from 'antd' // antd 组件库
import { TableItem } from '../utils/interface' // 公共 interface


const FormTemplateItem: FC<{ treeData: TableItem[], parent_id: string | undefined }> = ({ treeData, parent_id }) => {
    return (
        <>
            {/* 父级 */}
            <ProFormTreeSelect
                name="parent_id"
                label="父级"
                colProps={{ span: 24 }}
                tooltip="不选默认为顶级组织"
                fieldProps={{
                    treeData,
                    disabled: !!parent_id,
                    defaultValue: parent_id || undefined,
                    fieldNames: {
                        label: 'name',
                        value: 'id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: '请选择父级',
                }}
            />
            {/* 国际化字段 */}
            <ProFormText
                name="name"
                colProps={{ span: 24 }}
                label="国际化字段"
                placeholder="请输入国际化字段"
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: '请输入国际化字段' }]}
            />
            {/* 中文 */}
            <ProFormText
                name="zh-CN"
                colProps={{ span: 24 }}
                label="中文"
                placeholder="请输入中文"
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
                rules={[{ required: true, message: '请输入中文' }]}
            />
            {/* 英文 */}
            <ProFormText
                name="en-US"
                colProps={{ span: 24 }}
                label="英文"
                placeholder="请输入英文"
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
                rules={[{ required: true, message: '请输入英文' }]}
            />
            {/* 日文 */}
            <ProFormText
                name="ja-JP"
                colProps={{ span: 24 }}
                label="日文"
                placeholder="请输入日文"
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
                rules={[{ required: true, message: '请输入日文' }]}
            />
        </>
    )
}
export default FormTemplateItem