/*
 * @Description: 
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-16 16:55:32
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-27 16:43:33
 */
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const { STRING, DATE, UUID, UUIDV4,INTEGER } = Sequelize;
    await queryInterface.createTable('xmw_internationalization', {
      id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: 'id' },
      name: { type: STRING(32), allowNull: false, comment: '国际化字段' },
      'zh-CN': { type: STRING(200), allowNull: true, comment: '中文' },
      'en-US': { type: STRING(500), allowNull: true, comment: '英文' },
      'ja-JP': { type: STRING(200), allowNull: true, comment: '日文' },
      'zh-TW': { type: STRING(200), allowNull: true, comment: '繁体中文' },
      parent_id: { type: UUID, allowNull: true, comment: '父级id' },
      founder: { type: UUID, allowNull: true, comment: '创建人' },
      sort: { type: INTEGER, allowNull: false, comment: '排序' },
      created_time: { type: DATE, allowNull: false, comment: '创建日期' },
      update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
    });
  },

  async down(queryInterface) {
    // 在执行数据库降级时调用的函数，删除 xmw_internationalization 表
    await queryInterface.dropTable('xmw_internationalization');
  }
};
