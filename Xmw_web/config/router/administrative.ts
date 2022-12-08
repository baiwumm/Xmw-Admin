/*
 * @Description: 智能行政模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-08 15:43:40
 */
export default {
    path: '/administrative',
    name: 'administrative',
    access: 'adminRouteFilter',
    routes: [
        {
            path: '/administrative',
            redirect: '/administrative/organization',
        },
        {
            path: '/administrative/organization',
            name: 'organization',
            component: './Administrative/Organization',
            access: 'adminRouteFilter'
        },
        {
            path: '/administrative/jobs-management',
            name: 'jobs-management',
            icon: 'icon-jobs-management',
            component: './Administrative/JobsManagement',
            access: 'adminRouteFilter'
        },
    ],
}