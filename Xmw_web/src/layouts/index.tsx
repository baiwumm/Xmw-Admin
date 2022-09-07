/*
 * @Description: layouts 全局布局文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 15:59:25
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-07 15:22:49
 */
// 引入第三方组件
import { FC, useState } from 'react';
import type { ProSettings, MenuDataItem } from '@ant-design/pro-components';
import ProCard from '@ant-design/pro-card';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Link, Outlet, useLocation, useDispatch, SelectLang } from '@umijs/max';
import { useLocalStorageState } from 'ahooks'; // 将 state 存储在 localStorage 中
import { BellOutlined } from '@ant-design/icons'

// 引入业务组件
import IconFont from './MenuIconRender' // 渲染菜单图标
import GlobalFooter from './GlobalFooter' // 公共页面版权
import { ScreenFull, AvatarActions } from './RightContent' // 顶部右侧工具栏
import routes from '../../config/routes'

// 模拟从后端请求菜单
const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time);
    });
};

// 递归渲染菜单图标
const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
    menus.map(({ icon, routes, ...item }) => ({
        ...item,
        icon: icon && <IconFont iconName={icon} />,
        routes: routes && loopMenuItem(routes),
    }));

// 侧边栏的默认关闭需要设置 breakpoint={false} ，如果只设置 defaultCollapsed 会无效
const BasicLayout: FC = () => {
    const dispatch = useDispatch()       // 获取dispatch
    // 获取location信息
    const location = useLocation();
    // 整体 layout 布局配置项工具
    const [settings, setSetting] = useLocalStorageState<ProSettings | undefined>(
        'umi_layout',
        {
            defaultValue: { fixSiderbar: true, layout: 'side' }
        },
    );
    // 当前应用会话的位置信息
    const [pathname, setPathname] = useState(location.pathname);
    return (
        <div
            id="xmw-pro-layout"
            style={{ height: '100vh' }}
        >
            <ProLayout
                /* 设置网站 logo 标题 */
                title={process.env.TITLE}
                logo={process.env.LOGO}
                /*引入菜单树形数据 */
                menu={{
                    request: async () => {
                        await waitTime(1000);
                        return loopMenuItem(routes)
                    }
                }}
                fixSiderbar
                fixedHeader
                location={{
                    pathname,
                }}
                /* 自定义菜单项的 render 方法 */
                menuItemRender={(menuItem, dom) => (
                    <div onClick={() => { setPathname(menuItem.path || '/') }}>
                        <Link to={menuItem.path ?? '/'}>{dom}</Link>
                    </div>
                )}
                /* 自定义菜单项的 render 方法 */
                footerRender={() => <GlobalFooter />}
                /* 渲染用户头像 */
                avatarProps={{
                    src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                    size: 'small',
                    title: <AvatarActions />,
                }}
                /* 渲染菜单顶部右侧 */
                actionsRender={(props) => {
                    if (props.isMobile) return [];
                    return [
                        <ScreenFull key="ScreenFull" />,
                        <BellOutlined key="BellOutlined" />,
                        <SelectLang key="SelectLang" />
                    ]
                }}
                /* layout 的设置 */
                {...settings}

            >
                <PageContainer >
                    <ProCard style={{ height: '100vh', minHeight: 800 }}>
                        <Outlet />
                    </ProCard>
                </PageContainer>
            </ProLayout>
            {/* 整体 layout 布局配置项工具 */}
            <SettingDrawer
                pathname={pathname}
                enableDarkTheme
                getContainer={() => document.getElementById('xmw-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting)
                    dispatch({ type: 'global/changeUmiLayout', payload: changeSetting })
                }}
                disableUrlParams
            />
        </div>
    );
};

export default BasicLayout;