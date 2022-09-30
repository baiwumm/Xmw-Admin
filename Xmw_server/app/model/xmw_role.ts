/*
 * @Description: 系统管理-角色管理-表设计
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 17:19:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 18:04:17
 */
'use strict';

module.exports = (app) => {
    const { STRING, DATE, UUID, UUIDV4,INTEGER } = app.Sequelize;

    const xmw_role = app.model.define('xmw_role', {
        role_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '角色id' },
        role_name: { type: STRING(32), allowNull: false, comment: '角色名称' },
        role_code: { type: STRING(32), allowNull: false, comment: '角色编码' },
        describe: { type: STRING(200), allowNull: false, comment: '描述' },
        created_time: { type: DATE, allowNull: false, comment: '创建日期' },
        update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
        founder: { type: UUID, allowNull: true, comment: '创建人' },
        sort: { type: INTEGER, allowNull: false, comment: '排序' },
        status: { type: STRING(10), allowNull: false, comment: '角色状态' },
    });

    return xmw_role;
};