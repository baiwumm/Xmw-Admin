/*
 * @Description: 智能行政模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-24 12:08:18
 */
export default {
    path: '/administrative',
    name: 'administrative',
    icon: 'icon-administrative',
    routes: [
        {
            path: '/administrative',
            redirect: '/administrative/organization',
        },
        {
            path: '/administrative/organization',
            name: 'organization',
            icon: 'icon-organization',
            component: './Administrative/Organization',
        },
        {
            path: '/administrative/jobs-management',
            name: 'jobs-management',
            icon: 'icon-jobs',
            component: './Administrative/JobsManagement',
        },
        {
            path: '/administrative/structure',
            name: 'structure',
            icon: 'icon-structure',
            component: './Administrative/Structure',
        }
    ],
}