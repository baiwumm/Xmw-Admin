/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 09:27:30
 */
export default {
    path: '/system',
    name: 'system',
    icon: 'icon-setting',
    routes: [
        {
            path: '/system',
            redirect: '/system/user-management',
        },
        {
            path: '/system/user-management',
            name: 'user-management',
            icon: 'icon-user',
            component: './System/UserManagement',
        },
        {
            path: '/system/operation-log',
            name: 'operation-log',
            icon: 'icon-log',
            component: './System/OperationLog',
        },
    ],
}