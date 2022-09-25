/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-25 18:18:33
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
import { formatMessage } from '@/utils' // 引入工具类

// 引入配置项
import { ORG_TYPE_OPTS } from '../utils/enum' // 组织类型配置项
import { APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

const FormTemplateItem: FC<{ treeData: API.ORGANIZATION[], parent_id: string | undefined }> = ({ treeData, parent_id }) => {
    return (
        <>
            {/* 父级 */}
            <ProFormTreeSelect
                name="parent_id"
                label={formatMessage('global.form.parent_id')}
                colProps={{ span: 24 }}
                tooltip={formatMessage('global.form.parent_id.tooltip')}
                fieldProps={{
                    treeData,
                    disabled: !!parent_id,
                    defaultValue: parent_id || undefined,
                    fieldNames: {
                        label: 'org_name',
                        value: 'org_id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage(['global.form.placeholder.seleted', 'global.form.parent_id']),
                }}
            />
            {/* 组织名称 */}
            <ProFormText
                name="org_name"
                colProps={{ span: 24 }}
                label={formatMessage('pages.administrative.organization.org_name')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.administrative.organization.org_name'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.administrative.organization.org_name']) }]}
            />
            {/* 组织编码 */}
            <ProFormText
                name="org_code"
                colProps={{ span: 24 }}
                label={formatMessage('pages.administrative.organization.org_code')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.administrative.organization.org_code'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.administrative.organization.org_code']) }]}
            />
            {/* 组织类型 */}
            <ProFormRadio.Group
                name="org_type"
                colProps={{ span: 14 }}
                label={formatMessage('pages.administrative.organization.org_type')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={ORG_TYPE_OPTS}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder.seleted', 'pages.administrative.organization.org_type']) }]}
            />
            {/* 状态 */}
            <ProFormRadio.Group
                name="status"
                colProps={{ span: 8 }}
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                label={formatMessage('global.status')}
                options={APP_STATUS_OPTS}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder.seleted', 'global.status']) }]}
            />
            {/* 描述 */}
            <ProFormTextArea
                name="describe"
                label={formatMessage('global.table.describe')}
                placeholder={formatMessage(['global.form.placeholder', 'global.table.describe'])}
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