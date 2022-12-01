import { useLocalStorageState, useRequest } from 'ahooks';
import { LogoutOutlined } from '@ant-design/icons';
import { history, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import { stringify } from 'querystring';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { FC } from 'react';
import { Logout } from '@/services/logic/login' // 登录相关接口
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import type { ResponseModel, AppLocalCacheModel } from '@/global/interface'
import { CACHE_KEY } from '@/utils'

type LogoutProps = ResponseModel<Record<string, any>>

const AvatarDropdown: FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
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
        const { search, pathname } = window.location;
        const urlParams = new URL(window.location.href).searchParams;
        /** 此方法会跳转到 redirect 参数所在的位置 */
        const redirect = urlParams.get('redirect');
        // 清空用户信息和token
        setInitialState((s) => ({ ...s, currentUser: undefined, access_token: undefined }));
        setappCache({ ...appCache, ACCESS_TOKEN: undefined })
        // 重定向地址
        if (window.location.pathname !== '/user/login' && !redirect) {
          history.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: pathname + search,
            }),
          });
        }
      }
    }
  }
  )

  /**
   * @description: 点击下拉菜单回调
   * @param {MenuInfo} event
   * @return {*}
   * @author: Cyan
   */
  const onMenuClick = (event: MenuInfo): void => {
    const { key } = event;
    switch (key) {
      case 'logout':
        loginOut();
        break;
      default:
        history.push(`/account/${key}`);
    }
  }

  /**
   * @description: 判断是否有用户数据
   * @param {*} initialState
   * @return {*}
   * @author: Cyan
   */
  if (!initialState?.currentUser?.user_name) {
    return (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    );
  }

  // 下拉菜单配置
  const menuItems: ItemType[] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    }
  ];

  // 下拉菜单
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={initialState?.currentUser?.avatar_url} alt="avatar" />
        <span className={`${styles.name} anticon`}>{initialState?.currentUser?.cn_name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
