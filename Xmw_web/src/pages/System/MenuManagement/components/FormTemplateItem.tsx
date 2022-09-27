/*
 * @Description: 表单配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-13 14:05:54
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-27 18:32:56
 */
// 引入第三方库
import { FC } from 'react';
import { ProFormTreeSelect, ProFormRadio, ProFormText, ProFormDigit, ProFormSelect } from '@ant-design/pro-components'; // antd 高级组件
import { TreeSelect, Divider, Typography } from 'antd' // antd 组件库
import { formatMessage } from '@/utils' // 引入工具类
import { MENU_TYPE_OPTS, TARGET_OPTS,LAYOUT_OPTS,NAV_THEME_OPTS,HEADER_THEME_OPTS } from '../utils/enum'
import { FormItemProps } from '../utils/interface'
import { APP_STATUS_OPTS, APP_FLAG_OPTS } from '@/global/enum' // 状态枚举

const { Title } = Typography;

const FormTemplateItem: FC<FormItemProps> = ({ treeData, parent_id, menuData }) => {
    return (
        <>
            {/* 组织类型 */}
            <ProFormRadio.Group
                name="menu_type"
                colProps={{ span: 12 }}
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
                colProps={{ span: 12 }}
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
            {/* 组件路劲 */}
            <ProFormText
                name="component"
                colProps={{ span: 12 }}
                label={formatMessage('pages.system.menu-management.component')}
                placeholder={formatMessage(['global.form.placeholder', 'pages.system.menu-management.component'])}
                fieldProps={{
                    showCount: true,
                    maxLength: 200
                }}
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.system.menu-management.component']) }]}
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
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.system.menu-management.redirect']) }]}
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
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.system.menu-management.icon']) }]}
            />
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
                rules={[{ required: true, message: formatMessage(['global.form.placeholder', 'pages.system.menu-management.permission']) }]}
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
            {/* 新窗口打开 */}
            <ProFormSelect
                name="target"
                colProps={{ span: 8 }}
                initialValue={'_blank'}
                label={formatMessage('pages.system.menu-management.target')}
                tooltip={formatMessage('pages.system.menu-management.target.tooltip')}
                options={TARGET_OPTS}
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
            <Divider orientation="left"><Title level={3} style={{ marginBottom: 0 }}>路由状态</Title></Divider>
             {/* 显示layout布局 */}
             <ProFormSelect
                name="layout"
                colProps={{ span: 8 }}
                initialValue={'side'}
                label={formatMessage('pages.system.menu-management.layout')}
                tooltip={formatMessage('pages.system.menu-management.layout.tooltip')}
                options={LAYOUT_OPTS}
            />
            {/* 菜单主题 */}
            <ProFormSelect
                name="navTheme"
                colProps={{ span: 8 }}
                initialValue={'light'}
                label={formatMessage('pages.system.menu-management.navTheme')}
                options={NAV_THEME_OPTS}
            />
            {/* 顶部导航的主题，mix 模式生效 */}
            <ProFormSelect
                name="headerTheme"
                colProps={{ span: 8 }}
                initialValue={'light'}
                label={formatMessage('pages.system.menu-management.headerTheme')}
                options={HEADER_THEME_OPTS}
            />
            {/* 隐藏子路由 */}
            <ProFormRadio.Group
                name="hideChildrenInMenu"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.hideChildrenInMenu')}
                radioType="button"
                initialValue={'0'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 隐藏菜单 */}
            <ProFormRadio.Group
                name="hideInMenu"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.hideInMenu')}
                radioType="button"
                initialValue={'0'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 显示在面包屑中 */}
            <ProFormRadio.Group
                name="hideInBreadcrumb"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.hideInBreadcrumb')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 显示顶栏 */}
            <ProFormRadio.Group
                name="headerRender"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.headerRender')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 显示页脚 */}
            <ProFormRadio.Group
                name="footerRender"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.footerRender')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 显示菜单 */}
            <ProFormRadio.Group
                name="menuRender"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.menuRender')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 显示菜单顶栏 */}
            <ProFormRadio.Group
                name="menuHeaderRender"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.menuHeaderRender')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 子项往上提 */}
            <ProFormRadio.Group
                name="flatMenu"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.flatMenu')}
                radioType="button"
                initialValue={'0'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 固定顶栏 */}
            <ProFormRadio.Group
                name="fixedHeader"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.fixedHeader')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
            {/* 固定菜单 */}
            <ProFormRadio.Group
                name="fixSiderbar"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.fixSiderbar')}
                radioType="button"
                initialValue={'1'}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
        </>
    )
}
export default FormTemplateItem