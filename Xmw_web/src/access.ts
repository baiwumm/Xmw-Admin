/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
 import type { InitialStateModel } from '@/global/interface'
export default function access(initialState: InitialStateModel | undefined) {
  // 获取按钮权限集合
  const { Permissions } = initialState ?? {};
  return {
    // 判断是否有操作权限
    operationPermission: (data: string) => Permissions?.includes(data),
  };
}
