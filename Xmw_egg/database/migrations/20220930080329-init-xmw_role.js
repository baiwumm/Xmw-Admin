/*
 * @Description: xmw_role 表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-30 16:03:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 18:04:10
 */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { STRING, DATE, UUID, UUIDV4,INTEGER } = Sequelize;
    await queryInterface.createTable('xmw_role', {
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
  },

  async down (queryInterface) {
    // 在执行数据库降级时调用的函数，删除 xmw_role 表
    await queryInterface.dropTable('xmw_role');
  }
};
