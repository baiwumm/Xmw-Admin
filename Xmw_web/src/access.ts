/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

import { forEach } from 'lodash-es'

import type { InitialStateTypes } from '@/utils/types'

export default function access(initialState: InitialStateTypes | undefined) {
  // 获取按钮权限集合
  const { Permissions, RouteMenu } = initialState ?? {};
  /**
   * @description: 获取当前所有路由
   * @author: 白雾茫茫丶
   */
  const getRouteNames = (tree = RouteMenu): string[] => {
    // 收集当前层级的所有 name 属性 
    let result: string[] = []
    // 遍历收集
    forEach(tree, (node: API.MENUMANAGEMENT) => {
      result.push(node.name);
      if (node?.routes?.length) {
        result = result.concat(getRouteNames(node.routes));
      }
    });
    return result
  }
  return {
    // 判断是否有操作权限
    operationPermission: (data: string) => Permissions ? Permissions.includes(data) : false,
    // 判断是否有权限访问菜单
    adminRouteFilter: (route: any) => {
      const allRouteNames = getRouteNames()
      return allRouteNames.includes(route.name)
    },
  };
}
