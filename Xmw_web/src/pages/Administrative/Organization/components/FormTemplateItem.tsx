/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 18:28:59
 */
// 引入第三方库
import { FC } from 'react';
import {
    ProFormRadio,
    ProFormText,
    ProFormTextArea,
    ProFormTreeSelect
} from '@ant-design/pro-components'; // antd 高级组件
import { TreeSelect } from 'antd' // antd 组件库

// 引入配置项
import { ORG_TYPE_OPTS } from '../utils/enum' // 组织类型配置项
import { APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

const FormTemplateItem: FC<{ treeData: object[] }> = ({ treeData }) => {
    return (
        <>
            {/* 父级 */}
            <ProFormTreeSelect
                name="parent_id"
                label="父级"
                colProps={{ span: 24 }}
                request={async () => treeData}
                tooltip="不选默认为顶级组织"
                fieldProps={{
                    fieldNames: {
                        label: 'org_name',
                        value: 'org_id'
                    },
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: '请选择父级',
                }}
            />
            {/* 组织名称 */}
            <ProFormText
                name="org_name"
                colProps={{ span: 24 }}
                label="组织名称"
                placeholder="请输入组织名称"
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: '请输入组织名称' }]}
            />
            {/* 组织编码 */}
            <ProFormText
                name="org_code"
                colProps={{ span: 24 }}
                label="组织编码"
                placeholder="请输入组织编码"
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: '请输入组织编码' }]}
            />
            {/* 组织类型 */}
            <ProFormRadio.Group
                name="org_type"
                colProps={{ span: 14 }}
                label="组织类型"
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={ORG_TYPE_OPTS}
                rules={[{ required: true, message: '请选择组织类型' }]}
            />
            {/* 状态 */}
            <ProFormRadio.Group
                name="status"
                colProps={{ span: 10 }}
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                label="状态"
                options={APP_STATUS_OPTS}
                rules={[{ required: true, message: '请选择组织状态' }]}
            />
            {/* 描述 */}
            <ProFormTextArea
                name="describe"
                label="描述"
                placeholder="请输入描述"
                colProps={{ span: 24 }}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
            />
        </>
    )
}
export default FormTemplateItem