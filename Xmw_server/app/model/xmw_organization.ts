/*
 * @Description: 智能行政-组织管理-表设计
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 17:19:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-27 17:00:20
 */
'use strict';

module.exports = (app) => {
    const { STRING, DATE, UUID, UUIDV4,INTEGER } = app.Sequelize;

    const xmw_organization = app.model.define('xmw_organization', {
        org_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '组织id' },
        org_name: { type: STRING(32), allowNull: false, comment: '组织名称' },
        org_code: { type: STRING(32), allowNull: false, comment: '组织编码' },
        org_type: { type: STRING(10), allowNull: false, comment: '组织类型' },
        leader: { type: UUID, allowNull: true, comment: '组织负责人' },
        describe: { type: STRING(200), allowNull: true, comment: '描述' },
        created_time: { type: DATE, allowNull: false, comment: '创建日期' },
        update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
        founder: { type: UUID, allowNull: true, comment: '创建人' },
        parent_id: { type: UUID, allowNull: true, comment: '父级id' },
        sort: { type: INTEGER, allowNull: false, comment: '排序' },
        status: { type: STRING(10), allowNull: false, comment: '部门状态' },
    });

    return xmw_organization;
};