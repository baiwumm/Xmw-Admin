/*
 * @Description: 指示面板模块
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:12:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 15:19:26
 */
export default {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'crown',
    routes: [
        {
            path: '/dashboard',
            redirect: '/dashboard/work-bench',
        },
        {
            path: '/dashboard/work-bench',
            name: 'work-bench',
            icon: 'crown',
            component: './Dashboard/Workbench',
        },
    ],
}