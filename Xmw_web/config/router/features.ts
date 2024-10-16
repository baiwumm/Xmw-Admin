/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-10 14:11:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-16 13:45:09
 * @Description: 功能页模块
 */
export default {
  path: '/features',
  name: 'features',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/features',
      redirect: '/features/captcha',
      exact: true,
    },
    {
      path: '/features/captcha',
      name: 'captcha',
      component: './Features/Captcha',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/gantt',
      name: 'gantt',
      component: './Features/Gantt',
      access: 'adminRouteFilter',
      exact: true,
    },
  ],
}