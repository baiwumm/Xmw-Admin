/*
 * @Description: 指示面板模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 09:27:41
 */
export default {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'icon-dashboard',
    routes: [
        {
            path: '/dashboard',
            redirect: '/dashboard/work-bench',
        },
        {
            path: '/dashboard/work-bench',
            name: 'work-bench',
            icon: 'icon-workbench',
            component: './Dashboard/Workbench',
        },
    ],
}