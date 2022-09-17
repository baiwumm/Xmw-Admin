/*
 * @Description: 系统设置-国际化-表设计
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-16 17:32:56
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-17 16:35:57
 */
module.exports = (app) => {
    const { STRING, DATE, UUID, UUIDV4 } = app.Sequelize;

    const xmw_internationalization = app.model.define('xmw_internationalization', {
        id: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4, comment: 'id' },
        name: { type: STRING(32), allowNull: false, comment: '国际化字段' },
        'zh-CN': { type: STRING(200), allowNull: true, comment: '中文' },
        'en-US': { type: STRING(500), allowNull: true, comment: '英文' },
        'ja-JP': { type: STRING(200), allowNull: true, comment: '日文' },
        'zh-HK': { type: STRING(200), allowNull: true, comment: '繁体中文' },
        parent_id: { type: UUID, allowNull: true, comment: '父级id' },
        founder: { type: UUID, allowNull: true, comment: '创建人' },
        created_time: { type: DATE, allowNull: false, comment: '创建日期' },
        update_time: { type: DATE, allowNull: true, comment: '最后更新时间' },
    });

    return xmw_internationalization;
};