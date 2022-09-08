/*
 * @Description: 公共页脚版权
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 11:09:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 15:37:44
 */
import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} Cyan by 843348394@qq.com`}
      links={[
        {
          key: '白雾茫茫丶',
          title: '白雾茫茫丶',
          href: 'https://www.xmwpro.com/',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/Cyan-Xmw/',
          blankTarget: true,
        },
        {
          key: 'vue3-xmw-admin',
          title: 'vue3-xmw-admin',
          href: 'http://vue3.xmwpro.com/',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
