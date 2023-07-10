/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
// @ts-ignore
import type { RouterTypes } from '@ant-design/pro-layout/lib/typings';

import type { InitialStateModel } from '@/global/interface'
import { collectionRouteName } from '@/utils'

export default function access(initialState: InitialStateModel | undefined) {
  // 获取按钮权限集合
  const { Permissions, RouteMenu } = initialState ?? {};
  const hasRoutes = collectionRouteName(RouteMenu)
  return {
    // 判断是否有操作权限
    operationPermission: (data: string) => Permissions ? Permissions.includes(data) : false,
    // 判断是否有权限访问菜单
    adminRouteFilter: (route: RouterTypes) => {
      return hasRoutes.includes(route.name)
    },
  };
}
