/*
 * @Description: 技术文档模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2023-08-11 16:16:16
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-11 17:43:49
 */
export default {
  path: '/technical-document',
  name: 'technical-document',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/technical-document',
      redirect: '/technical-document/react',
      exact: true,
    },
    {
      path: '/technical-document/react',
      name: 'react',
      component: './TechnicalDocument/React',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/technical-document/nest',
      name: 'nest',
      component: './TechnicalDocument/Nest',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: 'https://ant.design/',
      name: 'ant-design',
      access: 'adminRouteFilter',
    },
    {
      path: 'https://v3.umijs.org/',
      name: 'umi',
      access: 'adminRouteFilter',
    },
  ],
}
