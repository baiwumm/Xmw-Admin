/*
 * @Description: Base Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 11:17:05
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 18:23:49
 */

import { Controller } from 'egg';
import { RES_STATUS_TEXT, RES_STATUS_CODE } from '../public/enum' // 请求状态

export default class BaseController extends Controller {
    /**
     * @description: 
     * @param {*} resStatus<请求状态>：1.成功，2.失败
     * @param {any} resData<请求数据>
     * @return {*}
     * @author: Cyan
     */
    public async resResult(resStatus: number, resData: any, resMsg?: string) {
        const { ctx } = this
        try {
            // 根据参数返回不同的状态
            return ctx.body = { resCode: RES_STATUS_CODE[resStatus], resMsg: resStatus === -1 ? resMsg : RES_STATUS_TEXT[resStatus], resData }
        } catch (error) {
            // 打印错误日志
            ctx.logger.info('resResult方法报错：' + error)
        }

    }

    /**
     * @description: 
     * @param {string} modelName
     * @param {any} options:查询配置项
     * @param {number} current:当前页
     * @param {number} pageSize:每页条数
     * @return {*}
     * @author: Cyan
     */
    public async _findAll(modelName: string, options = {}, current?: number, pageSize?: number) {
        const { app, ctx } = this
        try {
            // 判断是否是分页查询还是全部查询
            if (current && pageSize) {
                const { count, rows } = await ctx.model[modelName].findAndCountAll({
                    offset: (Number(current) - 1) * pageSize,
                    limit: Number(pageSize),
                    ...options
                });
                return { data: rows, total: count }
            }
            // 查询全部数据
            let result = await app.model[modelName].findAll(options)
            return result
        } catch (error) {
            ctx.logger.info('_findAll方法报错：' + error)
            return {error}
        }
    }

    /**
     * @description: 查询数据总数
     * @param {*} modelName
     * @return {*}
     * @author: Cyan
     */
    async _count(modelName: string, options = {}) {
        const { ctx } = this
        try {
            let result = await ctx.model[modelName].count(options)
            return result;
        } catch (error) {
            ctx.logger.info('_count方法报错：' + error)
        }
    }

    /**
     * @description: 根据ID查询数据
     * @param {*} modelName
     * @param {*} id
     * @return {*}
     * @author: Cyan
     */
    async _findById(modelName: string, id: string) {
        const { ctx } = this
        try {
            const result = await ctx.model[modelName].findByPk(id);
            return result
        } catch (error) {
            ctx.logger.info('_findById方法报错：' + error)
        }
    }

    /**
     * @description: 创建数据
     * @param {string} modelName
     * @param {any} source:如果传递的是数组，则是批量新增，对象则是单个新增
     * @return {*}
     * @author: Cyan
     */
    async _add(modelName: string, source: object | object[]) {
        const { ctx } = this
        try {
            let result: any = {}
            // 判断是单个新增还是批量新增
            if (Array.isArray(source)) {
                // 批量新增
                result = await ctx.model[modelName].bulkCreate(source)
            } else {
                // 单个新增
                result = await ctx.model[modelName].create(source)
            }
            return result
        } catch (error) {
            ctx.logger.info('_add方法报错：' + error)
            return { error }
        }
    }

    /**
     * @description: 编辑数据
     * @param {string} modelName
     * @param {object} source
     * @param {string} id
     * @return {*}
     * @author: Cyan
     */
    async _update(modelName: string, source: object, id: string) {
        const { ctx } = this
        try {
            // 判断这条数据是否存在，不存在则直接返回
            const result = await ctx.model[modelName].findByPk(id);
            if (!result) return false;
            // 如果存在则执行更新操作
            await result.update(source);
            return true
        } catch (error) {
            ctx.logger.info('_update方法报错：' + error)
        }
    }

    /**
     * @description:单条删除
     * @param {string} modelName
     * @param {string} id
     * @return {*}
     * @author: Cyan
     */
    async _delete(modelName: string, id: string) {
        const { ctx } = this;
        try {
            // 判断数据是否存在，不存在则直接返回
            const result = await ctx.model[modelName].findByPk(id);
            if (!result) return false;
            // 存在则执行删除操作
            await result.destroy();
            return true;
        } catch (error) {
            ctx.logger.info('_delete方法报错：' + error)
        }
    }

    /**
     * @description: 批量删除
     * @param {string} modelName
     * @param {string} idName
     * @param {string} id
     * @return {*}
     * @author: Cyan
     */
    async _batchDelete(modelName: string, idName: string, id: string) {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 批量删除
            let result = await ctx.model[modelName].destroy({
                where: {
                    [idName]: {
                        [Op.eq]: id
                    }
                }
            })
            return result;
        } catch (error) {
            ctx.logger.info('_batchDelete方法报错：' + error)
        }
    }

    /**
     * @description: findOne 方法获得它找到的第一个条目
     * @param {string} modelName
     * @param {*} options
     * @return {*}
     * @author: Cyan
     */
    async _findOne(modelName: string, options = {}) {
        const { ctx } = this;
        try {
            let result = await ctx.model[modelName].findOne(options);
            return result;
        } catch (error) {
            ctx.logger.info('_findOne方法报错：' + error)
        }
    }
}
