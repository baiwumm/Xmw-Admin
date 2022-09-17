import Footer from '@/components/Footer';
import RightContent from '@/components/RightContent';
import { LinkOutlined } from '@ant-design/icons';
import type { Settings as LayoutSettings } from '@ant-design/pro-components';
import { SettingDrawer } from '@ant-design/pro-components';
import type { RunTimeLayoutConfig } from '@umijs/max';
import { history, Link } from '@umijs/max';
import defaultSettings from '../config/defaultSettings';
import { errorConfig } from '@/utils/umiRequest';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import { useLocalStorageState } from 'ahooks';
import { message, Tabs } from 'antd';
import { formatMessage } from '@/utils'
const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
}> {
  const umi_layout = window.localStorage.getItem('umi_layout')
  const fetchUserInfo = async () => {
    try {
      const msg = await queryCurrentUser({
        skipErrorHandler: true,
      });
      return msg.data;
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果不是登录页面，执行
  if (window.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: umi_layout && JSON.parse(umi_layout) || defaultSettings,
    };
  }
  return {
    fetchUserInfo,
    settings: defaultSettings,
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  // console.log(initialState?.settings);
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
    childrenRender: (children, props) => {
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
                setInitialState((preInitialState) => ({
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
};

export const getCustomTabs = () => {
  return ({
    isKeep,
    keepElements,
    navigate,
    dropByCacheKey,
    local,
    activeKey,
  }: any) => {
    return (
      <div className="rumtime-keep-alive-tabs-layout" hidden={!isKeep}>
        <Tabs
          hideAdd
          onChange={(key: string) => {
            navigate(key);
          }}
          activeKey={activeKey}
          type="editable-card"
          /* 删除路由标签页的回调 */
          onEdit={(targetKey: string) => {
            console.log(targetKey)
            let newActiveKey = activeKey;
            let lastIndex = -1;
            const newPanel = Object.keys(keepElements.current);
            for (let i = 0; i < newPanel.length; i++) {
              if (newPanel[i] === targetKey) {
                lastIndex = i - 1;
              }
            }
            const newPanes = newPanel.filter((pane) => pane !== targetKey);
            if (newPanes.length && newActiveKey === targetKey) {
              if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex];
              } else {
                newActiveKey = newPanes[0];
              }
            }
            if (lastIndex === -1 && targetKey === location.pathname) {
              message.info('至少要保留一个窗口');
            } else {
              dropByCacheKey(targetKey);
              if (newActiveKey !== location.pathname) {
                navigate(newActiveKey);
              }
            }
          }}
          /* 这里拿到的是路由名称，想要国际化，我们把pathname转化一下 */
          items={Object.entries(keepElements.current).map(
            ([pathname, element]: any) => (
              { label: formatMessage('menu' + pathname.replace(/\//g, '.')), key: pathname }
            ),
          )}
        >
        </Tabs>
      </div>
    );
  };
};
/**
 * @name request 配置，可以配置错误处理
 * 它基于 axios 和 ahooks 的 useRequest 提供了一套统一的网络请求和错误处理方案。
 * @doc https://umijs.org/docs/max/request#配置
 */
export const request = {
  ...errorConfig,
};
