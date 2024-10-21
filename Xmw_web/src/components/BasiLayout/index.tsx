/*
 * @Description: 入口文件-全局 layout 配置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-19 20:39:53
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 17:45:47
 */
import {
  ProConfigProvider,
  SettingDrawer,
  Settings as LayoutSettings,
} from '@ant-design/pro-components';
import {
  getLocale,
  history,
  Icon,
  InitDataType,
  Link,
  RunTimeLayoutConfig,
  useIntl,
} from '@umijs/max';
import { useBoolean } from 'ahooks';
import { Space, Typography } from 'antd';
import { eq, toString } from 'lodash-es';

import Footer from '@/components/Footer'; // 全局底部版权组件
import { formatPerfix, getLocalStorageItem, setLocalStorageItem } from '@/utils';
import { MenuRemixIconMap } from '@/utils/const';
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums';
import type { InitialStateTypes } from '@/utils/types';

import {
  ActionButtons,
  actionsRender,
  AnnouncementDetail,
  appList,
  avatarProps,
  EventSourceNotice,
  LockScreenModal,
  LockSleep,
} from './components';

const { Paragraph } = Typography;

export const BasiLayout: RunTimeLayoutConfig = ({
  initialState,
  setInitialState,
}: InitDataType) => {
  const { formatMessage } = useIntl();
  /* 获取 LAYOUT 的值 */
  const LAYOUT = getLocalStorageItem<LayoutSettings>(LOCAL_STORAGE.LAYOUT);
  // 获取 ACCESS_TOKEN
  const ACCESS_TOKEN = getLocalStorageItem<string>(LOCAL_STORAGE.ACCESS_TOKEN);
  /* 是否显示锁屏弹窗 */
  const [openLockModal, { setTrue: setLockModalTrue, setFalse: setLockModalFalse }] =
    useBoolean(false);

  // 渲染菜单图标
  const renderMenuicon = (icon) => <Icon icon={toString(icon)} style={{ fontSize: 16, display: 'flex' }} />;
  return {
    /* 水印 */
    waterMarkProps: {
      content: initialState?.CurrentUser?.cn_name,
    },
    /* 用户头像 */
    avatarProps: avatarProps(setLockModalTrue),
    /* 自定义操作列表 */
    actionsRender,
    /* 底部版权 */
    footerRender: () => <Footer />,
    /* 页面切换时触发 */
    onPageChange: ({ pathname = '' }) => {
      // 如果没有登录，重定向到 login
      if (!ACCESS_TOKEN && !eq(pathname, ROUTES.LOGIN)) {
        history.push(ROUTES.LOGIN);
      }
      // 中文状态下，绑定 umami 事件
      if (eq(getLocale(), 'zh-CN') && !eq(pathname, '/')) {
        umami.track(formatMessage({ id: formatPerfix(pathname, '', true) }));
      }
    },
    menu: {
      request: async () => initialState?.RouteMenu,
    },
    /* 自定义面包屑 */
    breadcrumbProps: {
      itemRender: (route) => {
        return (
          <Space align='center'>
            <Icon icon={MenuRemixIconMap[route.linkPath as ROUTES]} style={{ display: 'flex' }} />
            <span>{route.breadcrumbName}</span>
          </Space>
        );
      },
    },
    /* 自定义菜单项的 render 方法 */
    menuItemRender: ({ icon, pro_layout_parentKeys, isUrl, path = '', locale }, defaultDom) => {
      const renderMenuDom = () => {
        const isGroup = LAYOUT?.siderMenuType === 'group';
        const isCollapsed = initialState?.Collapsed;
        return (
          <Space size={4}>
            {/* 分组布局不用渲染图标，避免重复 */}
            {pro_layout_parentKeys?.length &&
              renderMenuicon(icon)}
            {!isGroup || (isGroup && !isCollapsed) ? (
              <Paragraph ellipsis={{ rows: 1, tooltip: defaultDom }} style={{ marginBottom: 0 }}>
                {isGroup ? formatMessage({ id: locale as string }) : defaultDom}
              </Paragraph>
            ) : null}
          </Space>
        );
      };
      return (
        /* 渲染二级菜单图标 */
        isUrl ? (
          <a href={path} target="_blank">
            {renderMenuDom()}
          </a>
        ) : (
          <Link to={path || '/'}>{renderMenuDom()}</Link>
        )
      );
    },
    // 自定义拥有子菜单菜单项的 render 方法
    subMenuItemRender: ({ icon, path = '' }) => {
      return !initialState?.Collapsed ? (
        <Space size={4}>
          {renderMenuicon(icon)}
          <span>{formatMessage({ id: formatPerfix(path, '', true) })}</span>
        </Space>
      ) : (
        <div
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40 }}
        >
          {renderMenuicon(icon)}
        </div>
      );
    },
    // 菜单的折叠收起事件
    onCollapse: (collapsed) => {
      setInitialState((s: InitialStateTypes) => ({ ...s, Collapsed: collapsed }));
    },
    // 跨站点导航列表
    appList,
    // 增加一个 loading 的状态
    childrenRender: (children) => {
      return (
        <>
          <ProConfigProvider>
            {children}
            {/* 锁屏弹窗 */}
            <LockScreenModal open={openLockModal} setOpenFalse={setLockModalFalse} />
            {/* 睡眠弹窗 */}
            <LockSleep />
            {/* 公告详情 */}
            <AnnouncementDetail />
            {/* 消息通知 */}
            <EventSourceNotice />
            {/* 全局通用按钮 */}
            <ActionButtons />
            {/* 工具栏 */}
            <SettingDrawer
              disableUrlParams
              enableDarkTheme
              settings={LAYOUT || {}}
              onSettingChange={(Settings: LayoutSettings) => {
                setLocalStorageItem(LOCAL_STORAGE.LAYOUT, {
                  ...initialState?.Settings,
                  ...Settings,
                });
                setInitialState((s: InitialStateTypes) => ({ ...s, Settings }));
              }}
            />
          </ProConfigProvider>
        </>
      );
    },
    ...LAYOUT,
  };
};
