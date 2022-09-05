export default {
    path: '/system',
    name: '系统设置',
    icon: 'cyan-setting',
    routes: [
        {
            exact: true,
            path: '/system/user-management',
            name: '用户管理',
            icon: 'cyan-user',
            component: '@/pages/System/UserManagement',
        },
        {
            exact: true,
            path: '/system/operation-log',
            name: '操作日志',
            icon: 'cyan-log',
            component: '@/pages/System/OperationLog',
        }
    ]
}