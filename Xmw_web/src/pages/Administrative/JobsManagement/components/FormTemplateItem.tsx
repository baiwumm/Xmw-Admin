/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-24 10:21:17
 */
// 引入第三方库
import { FC } from 'react';
import {
    ProFormText,
    ProFormTextArea,
    ProFormTreeSelect
} from '@ant-design/pro-components'; // antd 高级组件
import { TreeSelect } from 'antd' // antd 组件库
import { formatMessage } from '@/utils' // 引入工具类
import { FormTemplateItemProps } from '../utils/interface' // 公共 interface

const FormTemplateItem: FC<FormTemplateItemProps> = ({ treeData, parent_id,orgTree }) => {
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
                        label: 'jobs_name',
                        value: 'jobs_id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage(['global.form.placeholder.seleted', 'global.form.parent_id']),
                }}
            />
            {/* 岗位名称 */}
            <ProFormText
                name="jobs_name"
                colProps={{ span: 24 }}
                label={formatMessage('pages.administrative.jobs-management.jobs_name')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.administrative.jobs-management.jobs_name'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.administrative.jobs-management.jobs_name']) }]}
            />
            {/* 所属组织 */}
            <ProFormTreeSelect
                name="org_id"
                label={formatMessage('pages.administrative.jobs-management.org_name')}
                colProps={{ span: 24 }}
                request={async () => orgTree}
                fieldProps={{
                    fieldNames: {
                        label: 'org_name',
                        value: 'org_id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage(['global.form.placeholder.seleted', 'pages.administrative.jobs-management.org_name']),
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder.seleted', 'pages.administrative.jobs-management.org_name']) }]}
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
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'global.table.describe']) }]}
            />
        </>
    )
}
export default FormTemplateItem