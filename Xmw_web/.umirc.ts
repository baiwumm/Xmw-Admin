/*
 * @Description: umi 配置文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-06 15:22:43
 */
import { defineConfig } from 'umi';
import routes from './config/routes'

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  mfsu: {}, //MFSU 热更新
  // 配置路由菜单
  routes: routes,
  // 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈
  fastRefresh: true,
  layout: false,
  // 配置路劲别名
  alias: {
    '@': '/src',
  },
  // 设置好全局环境变量
  define: { // 重点就是这个属性了，设置全局变量
    'process.env': {
      TITLE: 'React Umi Xmw',// 网站 logo 标题
      LOGO: '/logo.svg',// 网站 logo
      ICONFONT_URL: '//at.alicdn.com/t/c/font_3629707_m6r215oif4m.js', // 阿里 iconfont 图标地址
      FOOTER_COPYRIGHT: 'Copyright 2022 by Cyan', // 底部版权
    },
  },
  // 配置额外的 meta 标签
  metas: [
    { name: 'keywords', content: 'umi, umijs' },
    { name: 'description', content: 'React framework.' },
  ],
});
