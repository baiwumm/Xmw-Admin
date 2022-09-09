/*
 * @Description: Base Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 11:11:27
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 16:02:59
 */
import { Service } from 'egg';

export default class BaseService extends Service {
    //查询数据
    public async _findAll(modelName: string) {
        const { app, ctx } = this
        try {
            let result = await app.model[modelName].findAll()
            return result
        } catch (error) {
            ctx.logger.info('BaseService报错：' + error)
        }
    }

    //查询数据总数
    async _count(modelName) {
        const { ctx } = this
        try {
            let result = await ctx.model[modelName].count()
            return result;
        } catch (error) {
            ctx.logger.info('BaseService报错：' + error)
        }
    }

    //根据ID查询数据
    async _findById(modelName, id) {
        const { ctx } = this
        try {
            const result = await ctx.model[modelName].findByPk(id);
            return result
        } catch (error) {
            ctx.logger.info('BaseService报错：' + error)
        }
    }

    //新增数据
    async _add(modelName, json) {
        const { ctx } = this
        try {
            await ctx.model[modelName].create(json)
            return "新增成功"
        } catch (error) {
            ctx.logger.info('BaseService报错：' + error)
        }
    }

    //编辑数据
    async _edit(modelName, json) {
        const { ctx } = this
        try {
            const result = await ctx.model[modelName].findByPk(json.id);
            if (!result) return false;
            await result.update({ ...json });
            return true
        } catch (error) {
            ctx.logger.info('BaseService报错：' + error)
        }
    }

    //删除数据
    async _delete(modelName, key) {
        const { ctx } = this;
        try {
            const result = await ctx.model[modelName].findByPk(key);
            if (!result) return false;
            await result.destroy();
            return true;
        } catch (error) {
            ctx.logger.info('BaseService报错：' + error)
        }
    }
}