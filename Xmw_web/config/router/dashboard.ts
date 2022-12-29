/*
 * @Description: 指示面板模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-29 10:51:02
 */
export default {
    path: '/dashboard',
    name: 'dashboard',
    access: 'adminRouteFilter',
    exact: true,
    routes: [
        {
            path: '/dashboard',
            redirect: '/dashboard/work-bench',
            exact: true,
        },
        {
            path: '/dashboard/work-bench',
            name: 'work-bench',
            component: './Dashboard/Workbench',
            access: 'adminRouteFilter',
            exact: true,
        },
    ],
}