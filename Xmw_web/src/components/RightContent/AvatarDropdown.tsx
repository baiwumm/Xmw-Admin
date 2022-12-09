import { history, useModel } from '@umijs/max';
import { Avatar, Menu, Spin } from 'antd';
import type { ItemType } from 'antd/lib/menu/hooks/useItems';
import type { MenuInfo } from 'rc-menu/lib/interface';
import type { FC } from 'react';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';


const AvatarDropdown: FC = () => {
  const { initialState } = useModel('@@initialState');

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
  if (!initialState?.CurrentUser?.user_name) {
    return (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
      </span>
    );
  }

  // 下拉菜单配置
  const menuItems: ItemType[] = [
    // {
    //   key: 'logout',
    //   icon: <LogoutOutlined />,
    //   label: '退出登录',
    // }
  ];

  // 下拉菜单
  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick} items={menuItems} />
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar size="small" className={styles.avatar} src={initialState?.CurrentUser?.avatar_url} alt="avatar" />
        <span className={`${styles.name} anticon`}>{initialState?.CurrentUser?.cn_name}</span>
      </span>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
