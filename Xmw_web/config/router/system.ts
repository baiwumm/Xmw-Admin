/*
 * @Description: 系统设置模块路由配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-02 13:54:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-07 13:45:23
 */
export default {
    path: '/system',
    name: '系统设置',
    title: 'system.title',
    icon: 'cyan-setting',
    routes: [
        {
            path: '/system',
            redirect: '/system/user-management',
        },
        {
            exact: true,
            path: '/system/user-management',
            name: '用户管理',
            title: 'system.userManagement.title',
            icon: 'cyan-user',
            component: '@/pages/System/UserManagement',
        },
        {
            exact: true,
            path: '/system/operation-log',
            name: '操作日志',
            title: 'system.operationLog.title',
            icon: 'cyan-log',
            component: '@/pages/System/OperationLog',
        }
    ]
}