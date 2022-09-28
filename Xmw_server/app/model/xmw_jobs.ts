/*
 * @Description: 智能行政-岗位管理-表设计
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 17:19:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-28 14:30:59
 */
'use strict';

module.exports = (app) => {
    const { STRING, DATE, UUID, UUIDV4,INTEGER } = app.Sequelize;

    const xmw_jobs = app.model.define('xmw_jobs', {
      jobs_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '岗位id' },
      jobs_name: { type: STRING(32), allowNull: false, comment: '岗位名称' },
      org_id: { type: UUID, allowNull: false, comment: '所属组织id' },
      parent_id: { type: UUID, allowNull: true, comment: '父级id' },
      describe: { type: STRING(200), allowNull: false, comment: '描述' },
      leader: { type: UUID, allowNull: true, comment: '负责人' },
      founder: { type: UUID, allowNull: true, comment: '创建人' },
      sort: { type: INTEGER, allowNull: false, comment: '排序' },
      created_time: { type: DATE, allowNull: false, comment: '创建日期' },
      update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
    });

    xmw_jobs.associate = function(){
      // 与 xmw_organization 存在一对一关系，所以是belongsTo()
      app.model.XmwJobs.belongsTo(app.model.XmwOrganization, {foreignKey: 'org_id',targetKey:'org_id',as:'u'});
  }

    return xmw_jobs;
};