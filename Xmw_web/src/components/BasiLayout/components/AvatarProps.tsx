/*
 * @Description: 用户头像
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-09-14 14:51:38
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-05 10:55:34
 */
import { HeaderProps } from '@ant-design/pro-components';
import { history, Icon, useIntl, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { App, Dropdown, MenuProps } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { Logout } from '@/services/logic/login';
import { isSuccess, logoutToLogin, removeLocalStorageItem } from '@/utils';
import { INTERNATION, LOCAL_STORAGE, ROUTES } from '@/utils/enums';
import type { InitialStateTypes } from '@/utils/types';

export default function AvatarProps(openLockScreen: () => void): HeaderProps['avatarProps'] {
  // 国际化方法
  const { formatMessage } = useIntl();
  // hooks 调用
  const { modal } = App.useApp();
  // 获取全局状态
  const { initialState, setInitialState } = useModel('@@initialState');
  /**
   * @description: 退出登录，并且将当前的 url 保存
   * @author: 白雾茫茫丶
   */
  const { run: loginOut } = useRequest(Logout, {
    manual: true,
    onSuccess: async ({ code }) => {
      if (isSuccess(code)) {
        setInitialState((s: InitialStateTypes) => ({
          ...s,
          CurrentUser: undefined,
          Access_token: undefined,
        }));
        removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN);
        // 退出登录返回登录页
        logoutToLogin();
      }
    },
  });
  /**
   * @description: 退出登录
   * @author: 白雾茫茫丶
   */
  const logOutClick = () => {
    modal.confirm({
      title: formatMessage({ id: INTERNATION.WARM_TIPS }),
      content: formatMessage({ id: 'pages.logout.tip' }),
      onOk: async () => {
        loginOut();
      },
    });
  };
  // 点击下拉菜单回调
  const onMenuClick = (event: MenuInfo) => {
    switch (event.key) {
      // 跳转至个人中心
      case 'personalCenter':
        history.push(ROUTES.PERSONALINFOMATION);
        break;
      // 锁定屏幕
      case 'lockScreen':
        openLockScreen();
        break;
      // 退出登录
      case 'logout':
        logOutClick();
        break;
    }
  };
  /**
   * @description: 用户下拉菜单
   * @author: 白雾茫茫丶
   */
  const menuItems: MenuProps['items'] = [
    {
      key: 'personalCenter',
      icon: <Icon style={{ fontSize: 16 }} icon="ri:shield-user-line" />,
      label: formatMessage({ id: 'pages.personal-center' }),
    },
    {
      key: 'lockScreen',
      icon: <Icon icon="ri:lock-line" style={{ fontSize: 16 }} />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.LockScreen` }),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <Icon icon="ri:logout-box-r-line" style={{ fontSize: 14 }} />,
      label: formatMessage({ id: `${INTERNATION.BASICLAYOUT}.Logout` }),
    },
  ];
  return {
    src: initialState?.CurrentUser?.avatar_url,
    size: 'small',
    title: initialState?.CurrentUser?.cn_name,
    render: (_, dom) => {
      return <Dropdown menu={{ onClick: onMenuClick, items: menuItems }}>{dom}</Dropdown>;
    },
  };
}
