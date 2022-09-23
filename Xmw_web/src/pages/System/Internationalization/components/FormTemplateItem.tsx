/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-23 10:31:54
 */
// 引入第三方库
import { FC } from 'react';
import { ProFormText, ProFormTreeSelect } from '@ant-design/pro-components'; // antd 高级组件
import { TreeSelect } from 'antd' // antd 组件库
import { formatMessage } from '@/utils' // 引入工具类


const FormTemplateItem: FC<{ treeData: API.INTERNATIONALIZATION[], parent_id: string | undefined }> = ({ treeData, parent_id }) => {
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
                    defaultValue: parent_id || null,
                    fieldNames: {
                        label: 'name',
                        value: 'id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage(['global.form.placeholder.seleted', 'global.form.parent_id']),
                }}
            />
            {/* 国际化字段 */}
            <ProFormText
                name="name"
                colProps={{ span: 24 }}
                label={formatMessage('pages.setting.internationalization.name')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.setting.internationalization.name'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.setting.internationalization.name']) }]}
            />
            {/* 中文 */}
            <ProFormText
                name="zh-CN"
                colProps={{ span: 24 }}
                label={formatMessage('pages.setting.internationalization.zh-CN')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.setting.internationalization.zh-CN'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
            />
            {/* 英文 */}
            <ProFormText
                name="en-US"
                colProps={{ span: 24 }}
                label={formatMessage('pages.setting.internationalization.en-US')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.setting.internationalization.en-US'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
            />
            {/* 日文 */}
            <ProFormText
                name="ja-JP"
                colProps={{ span: 24 }}
                label={formatMessage('pages.setting.internationalization.ja-JP')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.setting.internationalization.ja-JP'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
            />
            {/* 繁体中文 */}
            <ProFormText
                name="zh-TW"
                colProps={{ span: 24 }}
                label={formatMessage('pages.setting.internationalization.zh-TW')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.setting.internationalization.zh-TW'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
            />
        </>
    )
}
export default FormTemplateItem