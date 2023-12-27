/*
 * @Description: 公共页脚版权
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-11 16:48:23
 */
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

import styles from './index.module.less'

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{ background: 'none' }}
      copyright={`${currentYear} 白雾茫茫丶 by baiwumm@foxmail.com`}
      className={styles['global-footer']}
      links={[
        {
          key: '白雾茫茫丶',
          title: '白雾茫茫丶',
          href: 'https://baiwumm.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/baiwumm/Xmw-Admin/',
          blankTarget: true,
        },
        {
          key: 'Vue3 Admin',
          title: 'Vue3 Admin',
          href: 'https://github.com/baiwumm/Vue3-Admin/',
          blankTarget: true,
        },
        {
          key: 'Vue2 Admin',
          title: 'Vue2 Admin',
          href: 'https://github.com/baiwumm/Vue2-Admin/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
