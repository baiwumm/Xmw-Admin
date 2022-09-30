/*
 * @Description: 系统管理-关联权限-表设计
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 17:19:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 16:24:50
 */
'use strict';

module.exports = (app) => {
    const { DATE, UUID, UUIDV4 } = app.Sequelize;

    const xmw_permission = app.model.define('xmw_permission', {
        permission_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '权限id' },
        role_id: { type: UUID, allowNull: false, comment: '角色id' },
        menu_id: { type: UUID, allowNull: false, comment: '菜单id' },
        created_time: { type: DATE, allowNull: false, comment: '创建日期' },
    });

    return xmw_permission;
};