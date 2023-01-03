import { useLocalStorageState, useRequest } from 'ahooks';
import { PoweroffOutlined } from '@ant-design/icons';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { useModel, useIntl } from '@umijs/max';
import { Avatar, Modal } from 'antd';
import { setAlpha } from '@ant-design/pro-components';
import type { MenuInfo } from 'rc-menu/lib/interface';
import React, { useCallback } from 'react';
import HeaderDropdown from '../../HeaderDropdown';
import { Logout } from '@/services/logic/login' // 登录相关接口
import { CACHE_KEY, logoutToLogin, waitTime } from '@/utils'
import type { AppLocalCacheModel, ResponseModel } from '@/global/interface'

type LogoutProps = ResponseModel<Record<string, any>>

const AvatarDropdown: React.FC = () => {
  const { formatMessage } = useIntl();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { CurrentUser } = initialState || {};
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

  const Name = () => {
    const nameClassName = useEmotionCss(({ token }) => {
      return {
        height: '48px',
        overflow: 'hidden',
        lineHeight: '48px',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        [`@media only screen and (max-width: ${token.screenMD}px)`]: {
          display: 'none',
        },
      };
    });
    return <span className={`${nameClassName} anticon`}>{CurrentUser?.cn_name}</span>;
  };

  const AvatarLogo = () => {
    const avatarClassName = useEmotionCss(({ token }) => {
      return {
        marginRight: '8px',
        color: token.colorPrimary,
        verticalAlign: 'top',
        background: setAlpha(token.colorBgContainer, 0.85),
        [`@media only screen and (max-width: ${token.screenMD}px)`]: {
          margin: 0,
        },
      };
    });
    return <Avatar size="small" className={avatarClassName} src={CurrentUser?.avatar_url} alt="avatar" />;
  };

  const actionClassName = useEmotionCss(({ token }) => {
    return {
      display: 'flex',
      height: '48px',
      marginLeft: 'auto',
      overflow: 'hidden',
      alignItems: 'center',
      padding: '0 8px',
      cursor: 'pointer',
      borderRadius: token.borderRadius,
      '&:hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

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

  const menuItems = [
    {
      key: 'logout',
      icon: <PoweroffOutlined />,
      label: '退出登录',
    }
  ];

  return (
    <HeaderDropdown menu={{ onClick: onMenuClick, items: menuItems }}>
      <span className={actionClassName}>
        <AvatarLogo />
        <Name />
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
