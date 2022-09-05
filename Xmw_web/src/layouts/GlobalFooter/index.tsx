/*
 * @Description: 全局 footer 页脚版权文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-05 14:28:49
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-05 15:01:53
 */
import { FC } from 'react';
import { DefaultFooter } from '@ant-design/pro-components';
import { GithubOutlined } from '@ant-design/icons';

const GlobalFooter: FC = () => {
    return (
        <DefaultFooter
            links={[
                { key: 'Cyanyan', title: '白雾茫茫丶', href: 'https://blog.xmwpro.com/', blankTarget: true },
                {
                    key: 'github',
                    title: <GithubOutlined />,
                    href: 'https://github.com/Cyan-Xmw',
                    blankTarget: true,
                },
                { key: 'vue3-admin-xmw-pro', title: 'vue3-admin-xmw-pro', href: 'http://vue3.xmwpro.com/', blankTarget: true },
            ]}
            copyright={process.env.FOOTER_COPYRIGHT}
        />
    )
}
export default GlobalFooter