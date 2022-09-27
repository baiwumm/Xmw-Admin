/*
 * @Description: 系统设置-菜单管理-表设计
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-26 17:17:39
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-27 10:06:51
 */
module.exports = (app) => {
    const { STRING, INTEGER, DATE, UUID, UUIDV4 } = app.Sequelize;

    const xmw_menu = app.model.define('xmw_menu', {
        menu_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '菜单id' },
        name: { type: UUID, allowNull: true, comment: '国际化对应的name' },
        path: { type: STRING(100), allowNull: true, comment: '路由url' },
        icon: { type: STRING(50), allowNull: true, comment: '菜单图标' },
        component: { type: STRING(200), allowNull: true, comment: '菜单对应的文件路径' },
        redirect: { type: STRING(100), allowNull: true, comment: '路由重定向地址' },
        parent_id: { type: UUID, allowNull: true, comment: '父级id' },
        sort: { type: INTEGER, allowNull: false, comment: '排序' },
        founder: { type: UUID, allowNull: true, comment: '创建人' },
        status: { type: STRING(10), allowNull: false, comment: '菜单状态' },
        target: { type: STRING(10), allowNull: true, comment: '当path是一个url，点击新窗口打开' },
        permission: { type: STRING(100), allowNull: false, comment: '菜单标识(页面按钮权限控制)' },
        access: { type: STRING(50), allowNull: false, comment: '路由和菜单的权限控制' },
        menu_type: { type: STRING(10), allowNull: false, comment: '菜单类型,{dir:目录,menu:菜单,button:按钮}' },
        layout: { type: STRING(10), allowNull: true, comment: '是否显示layout布局' },
        hideChildrenInMenu: { type: STRING(10), allowNull: true, comment: '是否隐藏子路由' },
        hideInMenu: { type: STRING(10), allowNull: true, comment: '是否隐藏菜单，包括子路由' },
        hideInBreadcrumb: { type: STRING(10), allowNull: true, comment: '是否在面包屑中显示' },
        headerRender: { type: STRING(10), allowNull: true, comment: '是否显示顶栏' },
        footerRender: { type: STRING(10), allowNull: true, comment: '是否显示页脚' },
        menuRender: { type: STRING(10), allowNull: true, comment: '当前路由是否展示菜单' },
        menuHeaderRender: { type: STRING(10), allowNull: true, comment: '当前路由是否展示菜单顶栏' },
        flatMenu: { type: STRING(10), allowNull: true, comment: '子项往上提，只是不展示父菜单' },
        fixedHeader: { type: STRING(10), allowNull: true, comment: '固定顶栏' },
        fixSiderbar: { type: STRING(10), allowNull: true, comment: '固定菜单' },
        navTheme: { type: STRING(10), allowNull: true, comment: '导航菜单的主题' },
        headerTheme: { type: STRING(10), allowNull: true, comment: '顶部导航的主题，mix 模式生效' },
        created_time: { type: DATE, allowNull: false, comment: '创建日期' },
        update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
    });

    return xmw_menu;
};