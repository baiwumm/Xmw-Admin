/*
 * @Description: 智能行政模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-29 10:50:52
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
    ],
}