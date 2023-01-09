import { useLocalStorageState, useRequest } from 'ahooks';
import { PoweroffOutlined, LockOutlined } from '@ant-design/icons';
import { useModel, useIntl } from '@umijs/max';
import { Modal } from 'antd';
import type { MenuProps } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../../HeaderDropdown';
import { Logout } from '@/services/logic/login' // 登录相关接口
import { CACHE_KEY, logoutToLogin, waitTime } from '@/utils'
import type { AppLocalCacheModel, ResponseModel } from '@/global/interface'

import UserAvatar from './UserAvatar'

type LogoutProps = ResponseModel<Record<string, any>>

const AvatarDropdown: React.FC = () => {
  const { formatMessage } = useIntl();
  const { setInitialState } = useModel('@@initialState');
  // 获取 localstorage key
  const [appCache, setappCache] = useLocalStorageState<AppLocalCacheModel | undefined>(CACHE_KEY);
  /**
 * @description: 退出登录，并且将当前的 url 保存
 * @return {*}
 * @author: Cyan
 */
  const { run: loginOut } = useRequest<LogoutProps, unknown[]>(Logout, {
    manual: true,
    onSuccess: async (res: LogoutProps) => {
      if (res.code === 200) {
        setInitialState((s) => ({ ...s, CurrentUser: undefined, Access_token: undefined }));
        setappCache({ ...appCache, ACCESS_TOKEN: undefined })
        // 退出登录返回登录页
        logoutToLogin()
      }
    }
  }
  )

  /**
   * @description: 退出登录
   * @return {*}
   * @author: Cyan
   */
  const logOutClick = (): void => {
    Modal.confirm({
      title: formatMessage({ id: 'global.warm-tips' }),
      content: formatMessage({ id: 'pages.logout.tip' }),
      onOk: async () => {
        await waitTime(500)
        loginOut()
      }
    })
  }

  // 点击下拉菜单回调
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      switch (event.key) {
        // 退出登录
        case 'logout':
          logOutClick()
      }
    },
    [setInitialState],
  );

  const menuItems: MenuProps['items'] = [
    {
      key: 'lockScreen',
      icon: <LockOutlined style={{ fontSize: 16 }} />,
      label: formatMessage({ id: 'components.RightContent.LockScreen' }),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <PoweroffOutlined style={{ fontSize: 14 }} />,
      label: formatMessage({ id: 'components.RightContent.Logout' }),
    }
  ];

  return (
    <HeaderDropdown menu={{ onClick: onMenuClick, items: menuItems }}>
      <span>
        <UserAvatar />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
