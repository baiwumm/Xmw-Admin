/*
 * @Description: 用户下拉菜单
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-12-28 09:38:28
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-07 17:31:03
 */
import { createFromIconfontCN, LockOutlined, PoweroffOutlined } from '@ant-design/icons';
import { history, useIntl, useModel } from '@umijs/max';
import { useRequest } from 'ahooks';
import { MenuProps, Modal } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback, useRef } from 'react';

import { Logout } from '@/services/logic/login' // 登录相关接口
import { logoutToLogin, removeLocalStorageItem, waitTime } from '@/utils'
import { LOCAL_STORAGE, ROUTES } from '@/utils/enums'
import type { Response } from '@/utils/types'

import HeaderDropdown from '../../HeaderDropdown';
import LockScreenModal from './LockScreenModal' // 锁定屏幕弹窗
import UserAvatar from './UserAvatar' // 用户头像

type LogoutProps = Response<Record<string, any>>

const AvatarDropdown: React.FC = () => {
  const { formatMessage } = useIntl();
  const { setInitialState } = useModel('@@initialState');
  // 绑定元素
  const cRef = useRef() as React.MutableRefObject<any>;
  // 使用 iconfont.cn 资源
  const IconFont = createFromIconfontCN({
    scriptUrl: process.env.ICONFONT_URL,
  });

  /**
 * @description: 退出登录，并且将当前的 url 保存
 * @return {*}
 * @author: 白雾茫茫丶丶
 */
  const { run: loginOut } = useRequest<LogoutProps, unknown[]>(Logout, {
    manual: true,
    onSuccess: async (res: LogoutProps) => {
      if (res.code === 200) {
        setInitialState((s) => ({ ...s, CurrentUser: undefined, Access_token: undefined }));
        removeLocalStorageItem(LOCAL_STORAGE.ACCESS_TOKEN)
        // 退出登录返回登录页
        logoutToLogin()
      }
    },
  },
  )

  /**
   * @description: 退出登录
   * @return {*}
   * @author: 白雾茫茫丶丶
   */
  const logOutClick = () => {
    Modal.confirm({
      title: formatMessage({ id: 'global.warm-tips' }),
      content: formatMessage({ id: 'pages.logout.tip' }),
      onOk: async () => {
        await waitTime(500)
        loginOut()
      },
    })
  }

  // 点击下拉菜单回调
  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      switch (event.key) {
        // 跳转至个人中心
        case 'personalCenter':
          history.push(ROUTES.PERSONALINFOMATION)
          break
        // 锁定屏幕
        case 'lockScreen':
          cRef.current.setTrue()
          break;
        // 退出登录
        case 'logout':
          logOutClick()
          break;
      }
    },
    [setInitialState],
  );

  const menuItems: MenuProps['items'] = [
    {
      key: 'personalCenter',
      icon: <IconFont style={{ fontSize: 16 }} type="icon-personal-center" />,
      label: formatMessage({ id: 'pages.personal-center' }),
    },
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
    },
  ];

  return (
    <>
      <HeaderDropdown menu={{ onClick: onMenuClick, items: menuItems }}>
        <span>
          <UserAvatar />
        </span>
      </HeaderDropdown>
      {/* 锁定屏幕弹窗 */}
      <LockScreenModal cRef={cRef} />
    </>
  );
};

export default AvatarDropdown;
