/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 15:32:14
 */
export default {
    path: '/system',
    name: 'system',
    icon: 'crown',
    routes: [
        {
            path: '/system',
            redirect: '/system/user-management',
        },
        {
            path: '/system/user-management',
            name: 'user-management',
            icon: 'crown',
            component: './System/UserManagement',
        },
        {
            path: '/system/operation-log',
            name: 'operation-log',
            icon: 'crown',
            component: './System/OperationLog',
        },
    ],
}