/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-29 10:51:20
 */
export default {
  path: '/system',
  name: 'system',
  access: 'adminRouteFilter',
  exact: true,
  routes: [
    {
      path: '/system',
      redirect: '/system/user-management',
      exact: true,
    },
    {
      path: '/system/user-management',
      name: 'user-management',
      component: './System/UserManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/menu-management',
      name: 'menu-management',
      component: './System/MenuManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/role-management',
      name: 'role-management',
      component: './System/RoleManagement',
      access: 'adminRouteFilter',
      exact: true,
    },
    {
      path: '/system/internationalization',
      name: 'internationalization',
      component: './System/Internationalization',
      access: 'adminRouteFilter',
      exact: true,
    },
    // {
    //   path: '/system/operation-log',
    //   name: 'operation-log',
    //   icon: 'icon-operation-log',
    //   component: './System/OperationLog',
    // },
  ],
};
