/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-28 17:28:57
 */
// 引入第三方库
import { FC } from 'react';
import { ProFormDependency, ProFormTreeSelect, ProFormRadio, ProFormText, ProFormDigit } from '@ant-design/pro-components'; // antd 高级组件
import { TreeSelect, Divider, Typography } from 'antd' // antd 组件库
import { formatMessage } from '@/utils' // 引入工具类
import { MENU_TYPE_OPTS } from '../utils/enum'
import { FormItemProps } from '../utils/interface'
import { APP_STATUS_OPTS } from '@/global/enum' // 状态枚举
import MenuFormRender from './MenuFormRender'

const { Title } = Typography;

const FormTemplateItem: FC<FormItemProps> = ({ treeData, parent_id, menuData }) => {
    // 是按钮就显示
    const isMenuRender = (
        <>
            {/* 组件路径 */}
            <ProFormText
                name="component"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.component')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.component'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
            />
            {/* 重定向 */}
            <ProFormText
                name="redirect"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.redirect')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.redirect'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 100
                }}
            />
        </>
    )
    // 不是按钮就隐藏这些选项
    const unButtonRender = (
        <>
            {/* 路由地址 */}
            <ProFormText
                name="path"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.path')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.path'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 100
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.system.menu-management.path']) }]}
            />
            {/* 图标 */}
            <ProFormText
                name="icon"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.icon')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.icon'])}
                tooltip={formatMessage('pages.system.menu-management.icon.tooltip')}
                fieldProps={{
                    showCount: true,
                    maxLength: 50
                }}
            />
            <ProFormText
                name="access"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.access')}
                initialValue={'normalRouteFilter'}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.access'])}
                tooltip={formatMessage('pages.system.menu-management.access.tooltip')}
                fieldProps={{
                    showCount: true,
                    maxLength: 50
                }}
            />
        </>
    )
    return (
        <>
            {/* 组织类型 */}
            <ProFormRadio.Group
                name="menu_type"
                colProps={{ span: 10 }}
                label={formatMessage('pages.system.menu-management.menu_type')}
                radioType="button"
                initialValue={'dir'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={MENU_TYPE_OPTS}
            />
            {/* 父级 */}
            <ProFormTreeSelect
                name="parent_id"
                label={formatMessage('global.form.parent_id')}
                colProps={{ span: 14 }}
                tooltip={formatMessage('global.form.parent_id.tooltip')}
                fieldProps={{
                    treeData,
                    allowClear:true,
                    disabled: !!parent_id,
                    defaultValue: parent_id || null,
                    fieldNames: {
                        label: 'zh-CN',
                        value: 'menu_id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage(['global.form.placeholder.seleted', 'global.form.parent_id']),
                }}
            />
            <Divider orientation="left"><Title level={3} style={{ marginBottom: 0 }}>基本信息</Title></Divider>
            {/* 路由名称 */}
            <ProFormTreeSelect
                name="name"
                label={formatMessage('pages.system.menu-management.name')}
                colProps={{ span: 12 }}
                tooltip={formatMessage('pages.system.menu-management.name.tooltip')}
                fieldProps={{
                    treeData: menuData,
                    fieldNames: {
                        label: 'zh-CN',
                        value: 'id'
                    },
                    treeDefaultExpandAll: true,
                    showCheckedStrategy: TreeSelect.SHOW_PARENT,
                    placeholder: formatMessage(['global.form.placeholder.seleted', 'pages.system.menu-management.name']),
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder.seleted', 'pages.system.menu-management.name']) }]}
            />
            <ProFormDependency name={['menu_type']}>
                {
                    ({ menu_type }) => {
                        return (
                            menu_type === 'menu' ? isMenuRender : null
                        )
                    }
                }
            </ProFormDependency>
            <ProFormDependency name={['menu_type']}>
                {
                    ({ menu_type }) => {
                        return (
                            menu_type !== 'button' ? unButtonRender : null
                        )
                    }
                }
            </ProFormDependency>

            {/* 权限标识 */}
            <ProFormText
                name="permission"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.permission')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.permission'])}
                tooltip={formatMessage('pages.system.menu-management.permission.tooltip')}
                fieldProps={{
                    showCount: true,
                    maxLength: 100
                }}
            />
            {/* 排序 */}
            <ProFormDigit
                label={formatMessage('global.table.sort')}
                name="sort"
                colProps={{ span: 8 }}
                min={1}
                max={99}
                initialValue={1}
                tooltip={formatMessage('global.table.sort.tooltip')}
                fieldProps={{ precision: 0 }}
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
            />
            <ProFormDependency name={['menu_type']}>
                {
                    ({ menu_type }) => {
                        return (
                            menu_type === 'menu' ? <MenuFormRender /> : null
                        )
                    }
                }
            </ProFormDependency>

        </>
    )
}
export default FormTemplateItem