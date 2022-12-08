/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-08 15:44:00
 */
export default {
  path: '/system',
  name: 'system',
  access: 'adminRouteFilter',
  routes: [
    {
      path: '/system',
      redirect: '/system/user-management',
    },
    {
      path: '/system/user-management',
      name: 'user-management',
      component: './System/UserManagement',
      access: 'adminRouteFilter',
    },
    {
      path: '/system/menu-management',
      name: 'menu-management',
      component: './System/MenuManagement',
      access: 'adminRouteFilter',
    },
    {
      path: '/system/role-management',
      name: 'role-management',
      component: './System/RoleManagement',
      access: 'adminRouteFilter',
    },
    {
      path: '/system/internationalization',
      name: 'internationalization',
      component: './System/Internationalization',
      access: 'adminRouteFilter',
    },
    // {
    //   path: '/system/operation-log',
    //   name: 'operation-log',
    //   icon: 'icon-operation-log',
    //   component: './System/OperationLog',
    // },
  ],
};
