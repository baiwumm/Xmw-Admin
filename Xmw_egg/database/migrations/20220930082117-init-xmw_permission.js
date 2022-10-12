/*
 * @Description: xmw_permission 表
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-30 16:21:17
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-30 16:24:58
 */
'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const { DATE, UUID, UUIDV4} = Sequelize;
    await queryInterface.createTable('xmw_permission', {
      permission_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '权限id' },
      role_id: { type: UUID, allowNull: false, comment: '角色id' },
      menu_id: { type: UUID, allowNull: false, comment: '菜单id' },
      created_time: { type: DATE, allowNull: false, comment: '创建日期' },
    });
  },

  async down (queryInterface) {
    // 在执行数据库降级时调用的函数，删除 xmw_permission 表
    await queryInterface.dropTable('xmw_permission');
  }
};
