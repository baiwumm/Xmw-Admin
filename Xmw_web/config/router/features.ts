/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-10-10 14:11:27
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-22 13:59:31
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
    {
      path: '/features/viewer',
      name: 'viewer',
      component: './Features/Viewer',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/lazyload',
      name: 'lazyload',
      component: './Features/Lazyload',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/colorthief',
      name: 'colorthief',
      component: './Features/Colorthief',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/eye-dropper',
      name: 'eye-dropper',
      component: './Features/EyeDropper',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/flow',
      name: 'flow',
      component: './Features/Flow',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/swiper',
      name: 'swiper',
      component: './Features/Swiper',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/file-preview',
      name: 'file-preview',
      component: './Features/FilePreview',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/features/charts',
      name: 'charts',
      component: './Features/Charts',
      access: 'adminRouteFilter',
      exact: true,
    },
  ],
}