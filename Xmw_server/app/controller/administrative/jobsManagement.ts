/*
 * @Description: 智能行政-岗位管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 18:26:14
 */

import BaseController from '../base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */
export default class JobsManagement extends BaseController {
    /**
     * @description: 获取岗位列表
     * @return {*}
     * @author: Cyan
     */
    public async getJobsList() {
        const { ctx, app } = this;
        try {
            const { Op, col } = app.Sequelize;
            // 获取数据参数
            let { jobs_name, org_id, start_time, end_time } = ctx.params
            // 根据参数拼接查询条件
            let where: any = {}
            if (jobs_name) where.jobs_name = { [Op.substring]: jobs_name }
            if (org_id) where.org_id = { [Op.eq]: org_id }
            if (start_time && end_time) where.created_time = { [Op.between]: [start_time, end_time] }
            // 查询规则
            const options = {
                attributes: { include: [col('u.org_name')] },
                // 联表查询
                include: [
                    {
                        model: app.model.XmwOrganization,
                        as: 'u',
                        attributes: []
                    }
                ],
                raw: true,
                order: [['sort', 'desc'], ['created_time', 'desc']], // 排序规则
                where
            }

            // 根据参数查询数据
            await this._findAll('XmwJobs', options).then(result => {
                // 判断是否报错，否则返回执行结果
                result.error ? this.resResult(-10, {}) : this.resResult(1, ctx.helper.initializeTree(result, 'jobs_id', 'parent_id', 'children'));
            })
        } catch (error) {
            ctx.logger.info('getJobsList方法报错：' + error)
            this.resResult(2, error);
        }
    }

    /**
     * @description: 新增和更新岗位数据
     * @return {*}
     * @author: Cyan
     */
    public async saveJobs() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { jobs_id, ...params } = ctx.params
            // 判断名称是否存在
            const options: any = {
                where: {
                    jobs_name: params.jobs_name
                }
            }
            // 如果是编辑，则要加上这个条件：jobs_id != 自己
            if (jobs_id) {
                options.where.jobs_id = {
                    [Op.ne]: jobs_id
                }
            }
            // 如果有结果，则证明已存在
            const exist = await this._findOne('XmwJobs', options)
            if (exist) {
                return this.resResult(-1, {}, '名称已存在！');
            }
            // 根据 jobs_id 判断是新增还是更新操作
            if (jobs_id) {
                params.update_time = new Date()
                // 判断父级是否和自己相同
                if (params.parent_id === jobs_id) {
                    return this.resResult(-1, {}, '父级不能和自己相同！');
                }
                // 执行更新操作
                await this._update('XmwJobs', params, jobs_id).then(result => {
                    // 更新成功
                    result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
                })
            } else {
                params.created_time = new Date()
                // 新增操作
                await this._add('XmwJobs', params).then(({ error }) => {
                    // 判断是否报错
                    error ? this.resResult(-10, {}) : this.resResult(1, {});
                })
            }
        } catch (error) {
            ctx.logger.info('saveJobs方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 删除岗位列表
     * @return {*}
     * @author: Cyan
     */
    public async delJobs() {
        const { ctx } = this;
        try {
            // 获取岗位 jobs_id
            let { jobs_id } = ctx.params
            // 判断当前数据是否有子级，如果有数据的parent_id是jobs_id，则存在子级
            const options = {
                where: {
                    parent_id: jobs_id
                }
            }
            const exist = await this._findOne('XmwJobs', options)
            if (exist) {
                return this.resResult(-1, {}, '当前数据存在子级，不能删除！');
            }
            // 不存在子级则执行删除操作
            await this._delete('XmwJobs', jobs_id).then(result => {
                // 判断是否删除成功
                result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
            })
        } catch (error) {
            ctx.logger.info('delJobs方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}
