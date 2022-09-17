/*
 * @Description: 系统设置-国际化-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-16 17:03:14
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-17 17:12:17
 */
import BaseController from '../base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */
export default class Internationalization extends BaseController {
    /**
     * @description: 获取国际化列表
     * @return {*}
     * @author: Cyan
     */
    public async getInternationalList() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { name, start_time, end_time } = ctx.params
            // 根据参数拼接查询条件
            let where: any = {}
            if (name) where.name = { [Op.substring]: name }
            if (start_time && end_time) where.created_time = { [Op.between]: [start_time, end_time] }
            // 查询规则
            const options = {
                order: [['created_time', 'desc']], // 排序规则
                where
            }

            // 根据参数查询数据
            await this._findAll('XmwInternationalization', options).then(result => {
                // 判断是否有返回值
                if (result) {
                    this.resResult(1, ctx.helper.initializeTree(result, 'id', 'parent_id', 'children'));
                }
            })
        } catch (error) {
            ctx.logger.info('getInternationalList方法报错：' + error)
            this.resResult(2, error);
        }
    }
    /**
     * @description: 保存国际化数据
     * @return {*}
     * @author: Cyan
     */
    public async saveInternational() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { id, ...params } = ctx.params
            // 判断名称是否存在
            const options: any = {
                where: {
                    // 相同层级名称不能相同
                    name: params.name,
                    parent_id: params.parent_id
                }
            }
            // 如果是编辑，则要加上这个条件：id != 自己
            if (id) {
                options.where.id = {
                    [Op.ne]: id
                }
            }
            // 如果有结果，则证明已存在
            const exist = await this._findOne('XmwInternationalization', options)
            if (exist) {
                return this.resResult(-1, {}, '同一层级名称不能相同！');
            }

            // 根据 id 判断是新增还是更新操作
            if (id) {
                params.update_time = new Date()
                // 判断父级是否和自己相同
                if (params.parent_id && params.parent_id === id) {
                    return this.resResult(-1, {}, '父级不能和自己相同！');
                }
                // 执行更新操作
                await this._update('XmwInternationalization', params, id).then(result => {
                    // 更新成功
                    result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
                })
            } else {
                params.created_time = new Date()
                // 新增操作
                await this._add('XmwInternationalization', params).then(() => {
                    // 更新成功
                    this.resResult(1, {});
                })
            }
        } catch (error) {
            ctx.logger.info('saveInternational方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 删除国际化列表
     * @return {*}
     * @author: Cyan
     */
    public async delInternational() {
        const { ctx } = this;
        try {
            // 获取 id
            let { id } = ctx.params
            // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
            const options = {
                where: {
                    parent_id: id
                }
            }
            const exist = await this._findOne('XmwInternationalization', options)
            if (exist) {
                return this.resResult(-1, {}, '当前数据存在子级，不能删除！');
            }
            // 不存在子级则执行删除操作
            await this._delete('XmwInternationalization', id).then(result => {
                // 判断是否删除成功
                result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
            })
        } catch (error) {
            ctx.logger.info('delInternational方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}