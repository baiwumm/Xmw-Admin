/*
 * @Description: 入口文件-全局 layout 配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-19 20:39:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-19 21:12:23
 */
import Footer from '@/components/Footer'; // 全局底部版权组件
import RightContent from '@/components/RightContent'; // 顶部菜单栏工具
import { SettingDrawer } from '@ant-design/pro-components'; // 高级组件
import { history, Link } from '@umijs/max';
import { useLocalStorageState } from 'ahooks'; // ahook 函数
import { LinkOutlined } from '@ant-design/icons'; // antd 图标
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';
export const BasiLayout = ({ initialState, setInitialState }: any) => {
    const [umiLayout, setUmiLayout] = useLocalStorageState<Partial<LayoutSettings> | undefined>(
        'umi_layout',
        {
            defaultValue: initialState?.settings,
        },
    );
    return {
        /* 菜单图标使用iconfont */
        iconfontUrl: process.env.ICONFONT_URL,
        /* 右侧工具栏 */
        rightContentRender: () => <RightContent />,
        /* 水印 */
        waterMarkProps: {
            content: initialState?.currentUser?.name,
        },
        /* 底部版权 */
        footerRender: () => <Footer />,
        /* 页面切换时触发 */
        onPageChange: () => {
            const { location } = history;
            // 如果没有登录，重定向到 login
            if (!initialState?.currentUser && location.pathname !== loginPath) {
                history.push(loginPath);
            }
        },
        layoutBgImgList: [
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/D2LWSqNny4sAAAAAAAAAAAAAFl94AQBr',
                left: 85,
                bottom: 100,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/C2TWRpJpiC0AAAAAAAAAAAAAFl94AQBr',
                bottom: -68,
                right: -45,
                height: '303px',
            },
            {
                src: 'https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/F6vSTbj8KpYAAAAAAAAAAAAAFl94AQBr',
                bottom: 0,
                left: 0,
                width: '331px',
            },
        ],
        links: isDev
            ? [
                <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
                    <LinkOutlined />
                    <span>OpenAPI 文档</span>
                </Link>,
            ]
            : [],
        menuHeaderRender: undefined,
        // 自定义 403 页面
        // unAccessible: <div>unAccessible</div>,
        // 增加一个 loading 的状态
        childrenRender: (children: any, props: any) => {
            // if (initialState?.loading) return <PageLoading />;
            return (
                <>
                    {children}
                    {!props.location?.pathname?.includes('/login') && (
                        <SettingDrawer
                            disableUrlParams
                            enableDarkTheme
                            settings={initialState?.settings}
                            onSettingChange={(settings) => {
                                setUmiLayout(settings)
                                setInitialState((preInitialState: any) => ({
                                    ...preInitialState,
                                    settings,
                                }));
                            }}
                        />
                    )}
                </>
            );
        },
        ...initialState?.settings,
    };
}