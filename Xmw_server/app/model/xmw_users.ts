/*
 * @Description: 系统设置-用户管理模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 17:19:29
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 16:26:38
 */
'use strict';

module.exports = (app) => {
  const { STRING, INTEGER, DATE, NOW, UUID, UUIDV4 } = app.Sequelize;

  const xmw_users = app.model.define('xmw_users', {
    user_id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: '用户id' },
    user_name: { type: STRING(20), allowNull: false, comment: '用户名' },
    work_no: { type: STRING(20), allowNull: false, comment: '用户工号' },
    password: { type: STRING(200), allowNull: false, comment: '密码(加密)' },
    cn_name: { type: STRING(20), allowNull: false, comment: '中文名' },
    en_name: { type: STRING(20), allowNull: true, defaultValue: '', comment: '英文名' },
    age: { type: INTEGER, allowNull: false, comment: '年龄' },
    email: { type: STRING(50), allowNull: true, defaultValue: '', comment: '电子邮箱' },
    phone: { type: STRING(11), allowNull: false, comment: '电话号码' },
    avatar_url: { type: STRING(200), allowNull: true, defaultValue: '', comment: '头像地址' },
    sex: { type: STRING(10), allowNull: false, comment: '用户性别' },
    status: { type: STRING(10), allowNull: false, comment: '是否禁用' },
    token: { type: STRING(255), allowNull: false, comment: '登录token' },
    motto: { type: STRING(255), allowNull: true, defaultValue: '', comment: '座右铭' },
    tag: { type: STRING(200), allowNull: false, comment: '人物标签' },
    address: { type: STRING(200), allowNull: false, comment: '家庭地址' },
    jobs_id: { type: UUID, allowNull: false, comment: '岗位id' },
    org_id: { type: UUID, allowNull: false, comment: '组织id' },
    role_id: { type: UUID, allowNull: false, comment: '权限id' },
    login_num: { type: INTEGER, allowNull: false, defaultValue: 0, comment: '登录次数' },
    last_ip: { type: STRING(20), allowNull: false, comment: '最后一次登录id' },
    created_time: { type: DATE, allowNull: false, defaultValue: NOW, comment: '创建日期' },
    update_time: { type: DATE, allowNull: false, defaultValue: NOW, comment: '最后更新时间' },
    founder: { type: UUID, allowNull: false, comment: '创建人' },
  });

  return xmw_users;
};