/*
 * @Description: layouts 全局布局文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 15:59:25
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-05 16:00:44
 */
// 引入第三方组件
import { FC, useState } from 'react';
import type { ProSettings, MenuDataItem } from '@ant-design/pro-components';
import ProCard from '@ant-design/pro-card';
import { PageContainer, ProLayout, SettingDrawer } from '@ant-design/pro-components';
import { Link } from 'umi';

// 引入业务组件
import IconFont from './MenuIconRender' // 渲染菜单图标
import GlobalFooter from './GlobalFooter' // 公共页面版权

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
const BasicLayout: FC = ({ children, routes }) => {
    // 整体 layout 布局配置项工具
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
    });
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
                        return loopMenuItem(routes[0].routes)
                    }
                }}
                /* 自定义菜单项的 render 方法 */
                menuItemRender={(menuItem, dom) => (<Link to={menuItem.path ?? '/'}>{dom}</Link>)}
                /* 自定义菜单项的 render 方法 */
                footerRender={() => <GlobalFooter />}
                /* layout 的设置 */
                {...settings}
            >
                <PageContainer >
                    <ProCard style={{ height: '100vh', minHeight: 800 }}>
                        {children}
                    </ProCard>
                </PageContainer>
            </ProLayout>
            {/* 整体 layout 布局配置项工具 */}
            <SettingDrawer
                enableDarkTheme
                getContainer={() => document.getElementById('xmw-pro-layout')}
                settings={settings}
                onSettingChange={(changeSetting) => {
                    setSetting(changeSetting);
                }}
                disableUrlParams
            />
        </div>
    );
};

export default BasicLayout;
