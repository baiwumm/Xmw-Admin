/*
 * @Description: 指示面板模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2023-08-08 09:28:47
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
        {
            path: '/dashboard/environmental-dependence',
            name: 'environmental-dependence',
            component: './Dashboard/EnvironmentalDependence',
            access: 'adminRouteFilter',
            exact: true,
        },
    ],
}