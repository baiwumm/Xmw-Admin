/*
 * @Description: 系统设置-用户管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-11 13:47:55
 */

import BaseController from '../base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */

export default class UserManagement extends BaseController {
    /**
    * @description: 获取用户列表
    * @return {*}
    * @author: Cyan
    */
    public async getUserList() {
        const { ctx, app } = this;
        try {
            const { Op, col } = app.Sequelize;
            // 获取数据参数
            let { user_name, work_no, sex, status, start_time, end_time, pageSize, current } = ctx.params
            // 根据参数拼接查询条件
            let where: any = {}
            if (user_name) where.user_name = { [Op.substring]: user_name }
            if (work_no) where.work_no = { [Op.substring]: work_no }
            if (sex) where.sex = { [Op.eq]: sex }
            if (status) where.status = { [Op.eq]: status }
            if (start_time && end_time) where.created_time = { [Op.between]: [start_time, end_time] }
            // 查询规则
            const options = {
                attributes: { include: [col('o.org_name'), col('j.jobs_name'), col('r.role_name')] },
                // 联表查询
                include: [
                    {
                        model: app.model.XmwJobs,
                        as: 'j',
                        attributes: []
                    },
                    {
                        model: app.model.XmwOrganization,
                        as: 'o',
                        attributes: []
                    },
                    {
                        model: app.model.XmwRole,
                        as: 'r',
                        attributes: []
                    }
                ],
                raw: true,
                order: [['sort', 'desc'], ['created_time', 'desc']], // 排序规则
                where,
                distinct: true
            }
            // 根据参数查询数据
            await this._findAll('XmwUsers', options, current, pageSize).then(result => {
                // 判断是否报错，否则返回执行结果
                if (result.error) {
                    return this.resResult(-10, {})
                } else {
                    result.data.forEach(element => {
                        // 数据回显处理
                        if (element.tags) {
                            element.tags = JSON.parse(element.tags)
                        }
                        element.city = JSON.parse(element.city)
                    })
                    return this.resResult(1, result)
                }
            })
        } catch (error) {
            ctx.logger.info('getUserList方法报错：' + error)
            this.resResult(2, error);
        }
    }

    /**
     * @description: 保存用户数据
     * @return {*}
     * @author: Cyan
     */
    public async saveUser() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { user_id, ...params } = ctx.params
            // 判断名称是否存在
            const options: any = {
                where: {
                    [Op.or]: {
                        // 用户名和工号、手机号码不能相同
                        user_name: params.user_name,
                        work_no: params.work_no,
                        phone: params.phone,
                    }
                }
            }
            // 如果是编辑，则要加上这个条件：user_id != 自己
            if (user_id) {
                options.where.user_id = {
                    [Op.ne]: user_id
                }
            }
            // 如果有结果，则证明已存在
            const exist = await this._findOne('XmwUsers', options)
            if (exist) {
                return this.resResult(-1, {}, '用户名或工号或手机号码已存在！');
            }

            // 根据 user_id 判断是新增还是更新操作
            if (user_id) {
                params.update_time = new Date()
                // 执行更新操作
                await this._update('XmwUsers', params, user_id).then(({ error }) => {
                    // 判断是否更新成功
                    error ? this.resResult(-10, {}) : this.resResult(1, {});
                })
            } else {
                params.created_time = new Date()
                // 新增操作
                await this._add('XmwUsers', params).then(({ error }) => {
                    // 判断是否报错
                    error ? this.resResult(-10, {}) : this.resResult(1, {});
                })
            }
        } catch (error) {
            ctx.logger.info('saveUser方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 删除用户列表
     * @return {*}
     * @author: Cyan
     */
    public async delUser() {
        const { ctx } = this;
        try {
            // 获取 user_id
            let { user_id } = ctx.params
            // 不存在子级则执行删除操作
            await this._delete('XmwUsers', user_id).then(({ error }) => {
                // 判断是否删除成功
                error ? this.resResult(-10, {}) : this.resResult(1, {});
            })
        } catch (error) {
            ctx.logger.info('delUser方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 设置用户状态
     * @return {*}
     * @author: Cyan
     */
    public async setUserStatus() {
        const { ctx } = this;
        try {
            // 获取角色 user_id 和 参数
            let { user_id, status } = ctx.params
            await this._update('XmwUsers', { status }, user_id).then(({ error }) => {
                // 判断是否更新成功
                error ? this.resResult(-10, {}) : this.resResult(1, {});
            })
        } catch (error) {
            ctx.logger.info('setUserStatus方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}
