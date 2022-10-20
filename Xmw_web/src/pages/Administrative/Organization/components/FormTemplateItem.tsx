/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 18:26:40
 */
// 引入第三方库
import type { FC } from 'react';
import {
    ProFormRadio,
    ProFormText,
    ProFormTextArea,
    ProFormDigit
} from '@ant-design/pro-components'; // antd 高级组件
import { useIntl } from '@umijs/max'
import { TreeSelect, Col, Form } from 'antd' // antd 组件库

// 引入配置项
import { ORG_TYPE_OPTS } from '../utils/enum' // 组织类型配置项
import { APP_STATUS_OPTS } from '@/global/enum' // 状态枚举

const FormTemplateItem: FC<{ treeData: API.ORGANIZATION[], parent_id: string | undefined }> = ({ treeData, parent_id }) => {
    const { formatMessage } = useIntl();
    return (
        <>
            {/* 父级 */}
            {/* <ProFormTreeSelect
                name="parent_id"
                label={formatMessage({ id: 'global.form.parent_id' })}
                colProps={{ span: 24 }}
                tooltip={formatMessage({ id: 'global.form.parent_id.tooltip' })}
                fieldProps={{
                    treeData,
                    allowClear: true,
                    disabled: !!parent_id,
                    defaultValue: parent_id || undefined,
                    fieldNames: {
                        label: 'org_name',
                        value: 'org_id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage({ id: 'global.form.placeholder.seleted' }) + formatMessage({ id: 'global.form.parent_id' }),
                }}
            /> */}
            <Col span={24}>
                <Form.Item name="parent_id" label={formatMessage({ id: 'global.form.parent_id' })} initialValue={parent_id || null}>
                    <TreeSelect
                        style={{ width: '100%' }}
                        allowClear
                        treeData={treeData}
                        disabled={!!parent_id}
                        placeholder={formatMessage({ id: 'global.form.placeholder.seleted' }) + formatMessage({ id: 'global.form.parent_id' })}
                        treeDefaultExpandAll
                        fieldNames={
                            {
                                label: 'org_name',
                                value: 'org_id'
                            }
                        }
                        showCheckedStrategy={TreeSelect.SHOW_PARENT}
                    />
                </Form.Item>
            </Col>
            {/* 组织名称 */}
            <ProFormText
                name="org_name"
                colProps={{ span: 24 }}
                label={formatMessage({ id: 'pages.administrative.organization.org_name' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.administrative.organization.org_name' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.administrative.organization.org_name' }) }]}
            />
            {/* 组织编码 */}
            <ProFormText
                name="org_code"
                colProps={{ span: 24 }}
                label={formatMessage({ id: 'pages.administrative.organization.org_code' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.administrative.organization.org_code' })}
                fieldProps={{
                    showCount: true,
                    maxLength: 32
                }}
                rules={[{ required: true, message: formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'pages.administrative.organization.org_code' }) }]}
            />
            {/* 组织类型 */}
            <ProFormRadio.Group
                name="org_type"
                colProps={{ span: 14 }}
                label={formatMessage({ id: 'pages.administrative.organization.org_type' })}
                radioType="button"
                initialValue={'company'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={ORG_TYPE_OPTS}
            />
            {/* 状态 */}
            <ProFormRadio.Group
                name="status"
                colProps={{ span: 8 }}
                initialValue={1}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                label={formatMessage({ id: 'global.status' })}
                options={APP_STATUS_OPTS}
            />
            {/* 排序 */}
            <ProFormDigit
                label={formatMessage({ id: 'global.table.sort' })}
                name="sort"
                colProps={{ span: 24 }}
                min={1}
                max={99}
                initialValue={1}
                tooltip={formatMessage({ id: 'global.table.sort.tooltip' })}
                fieldProps={{ precision: 0 }}
            />
            {/* 描述 */}
            <ProFormTextArea
                name="describe"
                label={formatMessage({ id: 'global.table.describe' })}
                placeholder={formatMessage({ id: 'global.form.placeholder' }) + formatMessage({ id: 'global.table.describe' })}
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