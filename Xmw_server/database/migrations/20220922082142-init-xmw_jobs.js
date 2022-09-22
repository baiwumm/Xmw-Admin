/*
 * @Description: xmw_jobs 表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-22 16:21:42
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-22 16:33:49
 */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { STRING, DATE, UUID, UUIDV4 } = Sequelize;
    await queryInterface.createTable('xmw_jobs', {
      jobs_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '岗位id' },
      jobs_name: { type: STRING(32), allowNull: false, comment: '岗位名称' },
      org_id: { type: UUID, allowNull: false, comment: '所属组织id' },
      parent_id: { type: UUID, allowNull: true, comment: '父级id' },
      describe: { type: STRING(200), allowNull: true, comment: '描述' },
      leader: { type: UUID, allowNull: true, comment: '负责人' },
      founder: { type: UUID, allowNull: true, comment: '创建人' },
      created_time: { type: DATE, allowNull: false, comment: '创建日期' },
      update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
    });
  },

  async down (queryInterface) {
    // 在执行数据库降级时调用的函数，删除 xmw_jobs 表
    await queryInterface.dropTable('xmw_jobs');
  }
};
