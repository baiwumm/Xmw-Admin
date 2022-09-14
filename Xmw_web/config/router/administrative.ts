/*
 * @Description: 智能行政模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 10:19:18
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
    ],
}