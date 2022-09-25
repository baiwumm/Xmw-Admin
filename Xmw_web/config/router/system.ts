/*
 * @Description: 系统设置模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-25 14:29:20
 */
export default {
    path: '/system',
    name: 'system',
    icon: 'icon-system',
    routes: [
        {
            path: '/system',
            redirect: '/system/user-management',
        },
        {
            path: '/system/user-management',
            name: 'user-management',
            icon: 'icon-user-management',
            component: './System/UserManagement',
        },
        {
            path: '/system/internationalization',
            name: 'internationalization',
            icon: 'icon-internationalization',
            component: './System/Internationalization',
        },
        {
            path: '/system/operation-log',
            name: 'operation-log',
            icon: 'icon-operation-log',
            component: './System/OperationLog',
        },
    ],
}