/*
 * @Description: 智能行政模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-08-28 09:34:25
 */
export default {
    path: '/administrative',
    name: 'administrative',
    access: 'adminRouteFilter',
    exact: true,
    routes: [
        {
            path: '/administrative',
            redirect: '/administrative/organization',
            exact: true,
        },
        {
            path: '/administrative/announcement',
            name: 'announcement',
            component: './Administrative/Announcement',
            access: 'adminRouteFilter',
            exact: true,
        },
        {
            path: '/administrative/organization',
            name: 'organization',
            component: './Administrative/Organization',
            access: 'adminRouteFilter',
            exact: true,
        },
        {
            path: '/administrative/jobs-management',
            name: 'jobs-management',
            icon: 'icon-jobs-management',
            component: './Administrative/JobsManagement',
            access: 'adminRouteFilter',
            exact: true,
        },
        {
            path: '/administrative/structure',
            name: 'structure',
            icon: 'icon-structure',
            component: './Administrative/Structure',
            access: 'adminRouteFilter',
            exact: true,
        },
    ],
}