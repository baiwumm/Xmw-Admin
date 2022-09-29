/*
 * @Description: 系统设置-菜单管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-26 17:30:27
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-29 16:10:14
 */

import BaseController from '../base'
// import {LOCALES_LANG} from '../../public/enum'
/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */

export default class MenuManagement extends BaseController {
    /**
     * @description: 获取菜单列表
     * @return {*}
     * @author: Cyan
     */
    public async getMenuList() {
        const { ctx, app } = this;
        try {
            const { Op, col } = app.Sequelize;
            // 获取数据参数
            let { menu_type, status, start_time, end_time } = ctx.params
            // 根据参数拼接查询条件
            let where: any = {}
            if (menu_type) where.menu_type = { [Op.eq]: menu_type }
            if (status) where.status = { [Op.eq]: status }
            if (start_time && end_time) where.created_time = { [Op.between]: [start_time, end_time] }
            // 查询规则
            const options = {
                attributes: { include: [col('u.zh-CN'), col('u.en-US'), col('u.ja-JP'), col('u.zh-TW')] },
                // 联表查询
                include: [
                    {
                        model: app.model.XmwInternationalization,
                        as: 'u',
                        attributes: []
                    }
                ],
                raw: true,
                order: [['sort', 'desc'], ['created_time', 'desc']], // 排序规则
                where
            }

            // 根据参数查询数据
            await this._findAll('XmwMenu', options).then(result => {
                // 判断是否有返回值
                if (result) {
                    this.resResult(1, ctx.helper.initializeTree(result, 'menu_id', 'parent_id', 'children'));
                }
            })
        } catch (error) {
            ctx.logger.info('getMenuList方法报错：' + error)
            this.resResult(2, error);
        }
    }

    /**
     * @description: 保存菜单数据
     * @return {*}
     * @author: Cyan
     */
    public async saveMenu() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { menu_id, ...params } = ctx.params
            // 按钮不能处于顶级
            if (params.menu_type === 'button' && !params.parent_id) {
                return this.resResult(-1, {}, '按钮不能处于顶级，只能是叶子结点！');
            }

            if (params.permission) {
                // 判断名称是否存在
                const options: any = { where: {} }
                options.where.permission = {
                    [Op.eq]: params.permission,
                    [Op.not]: null
                }
                // 如果是编辑，则要加上这个条件：menu_id != 自己
                if (menu_id) {
                    options.where.menu_id = {
                        [Op.ne]: menu_id
                    }
                }
                // 如果有结果，则证明已存在
                const exist = await this._findOne('XmwMenu', options)
                if (exist) {
                    return this.resResult(-1, {}, '权限标识已存在！');
                }
            }
            // 根据 menu_id 判断是新增还是更新操作
            if (menu_id) {
                console.log(11111)
                params.update_time = new Date()
                // 判断父级是否和自己相同
                if (params.parent_id && params.parent_id === menu_id) {
                    return this.resResult(-1, {}, '父级不能和自己相同！');
                }
                // 执行更新操作
                await this._update('XmwMenu', params, menu_id).then(result => {
                    // 更新成功
                    result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
                })
            } else {
                params.created_time = new Date()
                // 新增操作
                await this._add('XmwMenu', params).then(() => {
                    // 更新成功
                    this.resResult(1, {});
                })
            }
        } catch (error) {
            ctx.logger.info('saveMenu方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 删除菜单列表
     * @return {*}
     * @author: Cyan
     */
    public async delMenu() {
        const { ctx } = this;
        try {
            // 获取 menu_id
            let { menu_id } = ctx.params
            // 判断当前数据是否有子级，如果有数据的parent_id是menu_id，则存在子级
            const options = {
                where: {
                    parent_id: menu_id
                }
            }
            const exist = await this._findOne('XmwMenu', options)
            if (exist) {
                return this.resResult(-1, {}, '当前数据存在子级，不能删除！');
            }
            // 不存在子级则执行删除操作
            await this._delete('XmwMenu', menu_id).then(result => {
                // 判断是否删除成功
                result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
            })
        } catch (error) {
            ctx.logger.info('delMenu方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}