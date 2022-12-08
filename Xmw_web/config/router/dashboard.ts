/*
 * @Description: 指示面板模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-08 15:43:47
 */
export default {
    path: '/dashboard',
    name: 'dashboard',
    access: 'adminRouteFilter',
    routes: [
        {
            path: '/dashboard',
            redirect: '/dashboard/work-bench',
        },
        {
            path: '/dashboard/work-bench',
            name: 'work-bench',
            component: './Dashboard/Workbench',
            access: 'adminRouteFilter'
        },
    ],
}