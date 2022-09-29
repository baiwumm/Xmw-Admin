import type { FC } from 'react'
import { Divider, Typography } from 'antd' // antd 组件库
import { ProFormRadio, ProFormSelect } from '@ant-design/pro-components'; // antd 高级组件
import { TARGET_OPTS, LAYOUT_OPTS, NAV_THEME_OPTS } from '../utils/enum'
import { APP_FLAG_OPTS } from '@/global/enum' // 状态枚举
import { formatMessage } from '@/utils' // 引入工具类

const { Title } = Typography;

const MenuFormRender: FC = () => {
    return (
        <>
            <Divider orientation="left"><Title level={3} style={{ marginBottom: 0 }}>路由配置</Title></Divider>
            {/* 显示layout布局 */}
            <ProFormSelect
                name="layout"
                colProps={{ span: 12 }}
                initialValue={'side'}
                label={formatMessage('pages.system.menu-management.layout')}
                tooltip={formatMessage('pages.system.menu-management.layout.tooltip')}
                options={LAYOUT_OPTS}
                fieldProps={{
                    allowClear: false
                }}
            />
            {/* 菜单主题 */}
            <ProFormSelect
                name="navTheme"
                colProps={{ span: 12 }}
                initialValue={'light'}
                label={formatMessage('pages.system.menu-management.navTheme')}
                options={NAV_THEME_OPTS}
                fieldProps={{
                    allowClear: false
                }}
            />
            {/* 顶部导航的主题，mix 模式生效 */}
            <ProFormSelect
                name="headerTheme"
                colProps={{ span: 12 }}
                initialValue={'light'}
                label={formatMessage('pages.system.menu-management.headerTheme')}
                options={NAV_THEME_OPTS}
                fieldProps={{
                    allowClear: false
                }}
            />
            {/* 窗口打开方式 */}
            <ProFormSelect
                name="target"
                colProps={{ span: 12 }}
                initialValue={'_blank'}
                label={formatMessage('pages.system.menu-management.target')}
                tooltip={formatMessage('pages.system.menu-management.target.tooltip')}
                options={TARGET_OPTS}
                fieldProps={{
                    allowClear: false
                }}
            />
            {/* 隐藏子路由 */}
            <ProFormRadio.Group
                name="hideChildrenInMenu"
                colProps={{ span: 8 }}
                label={formatMessage('pages.system.menu-management.hideChildrenInMenu')}
                radioType="button"
                initialValue={0}
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
                initialValue={0}
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
                initialValue={1}
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
                initialValue={1}
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
                initialValue={1}
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
                initialValue={1}
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
                initialValue={1}
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
                initialValue={0}
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
                initialValue={1}
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
                initialValue={1}
                fieldProps={{
                    buttonStyle: "solid"
                }}
                options={APP_FLAG_OPTS}
            />
        </>
    )
}

export default MenuFormRender