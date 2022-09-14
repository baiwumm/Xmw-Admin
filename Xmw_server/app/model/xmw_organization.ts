/*
 * @Description: 系统设置-用户管理模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 17:19:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 15:22:24
 */
'use strict';

module.exports = (app) => {
    const { STRING, DATE, ENUM, NOW, UUID, UUIDV4 } = app.Sequelize;

    const xmw_organization = app.model.define('xmw_organization', {
        org_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '组织id' },
        org_name: { type: STRING(32), allowNull: false, comment: '组织名称' },
        org_code: { type: STRING(32), allowNull: false, comment: '组织编码' },
        org_type: { type: STRING(10), allowNull: false, comment: '组织类型' },
        leader: { type: UUID, allowNull: true, comment: '组织负责人' },
        describe: { type: STRING(200), allowNull: true, comment: '描述' },
        created_time: { type: DATE, allowNull: false, defaultValue: NOW, comment: '创建日期' },
        update_time: { type: DATE, allowNull: false, defaultValue: NOW, comment: '最后更新时间' },
        founder: { type: UUID, allowNull: true, comment: '创建人' },
        parent_id: { type: UUID, allowNull: true, comment: '父级id' },
        status: { type: ENUM, values: ['0', '1'], allowNull: false, comment: '部门状态' },
    });

    return xmw_organization;
};