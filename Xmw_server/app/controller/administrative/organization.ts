/*
 * @Description: 智能行政-组织管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-17 11:04:01
 */

import BaseController from '../base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */
export default class Organization extends BaseController {
    /**
     * @description: 获取用户列表
     * @return {*}
     * @author: Cyan
     */
    public async getOrganizationList() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { org_name, org_code, org_type, status, start_time, end_time } = ctx.params
            // 根据参数拼接查询条件
            let where: any = {}
            if (org_name) where.org_name = { [Op.substring]: org_name }
            if (org_code) where.org_code = { [Op.substring]: org_code }
            if (org_type) where.org_type = { [Op.eq]: org_type }
            if (status) where.status = { [Op.eq]: status }
            if (start_time && end_time) where.created_time = { [Op.between]: [start_time, end_time] }
            // 查询规则
            const options = {
                order: [['created_time', 'desc']], // 排序规则
                where
            }

            // 根据参数查询数据
            await this._findAll('XmwOrganization', options).then(result => {
                // 判断是否有返回值
                if (result) {
                    this.resResult(1, ctx.helper.initializeTree(result, 'org_id', 'parent_id', 'children'));
                }
            })
        } catch (error) {
            ctx.logger.info('getOrganizationList方法报错：' + error)
            this.resResult(2, error);
        }
    }

    /**
     * @description: 新增和更新组织数据
     * @return {*}
     * @author: Cyan
     */
    public async saveOrganization() {
        const { ctx, app } = this;
        try {
            const { Op } = app.Sequelize;
            // 获取数据参数
            let { org_id, ...params } = ctx.params
            // 判断名称和编码是否存在
            const options: any = {
                where: {
                    [Op.or]: {
                        org_name: params.org_name,
                        org_code: params.org_code
                    }
                }
            }
            // 如果是编辑，则要加上这个条件：org_id != 自己
            if (org_id) {
                options.where.org_id = {
                    [Op.ne]: org_id
                }
            }
            // 如果有结果，则证明已存在
            const exist = await this._findOne('XmwOrganization', options)
            if (exist) {
                return this.resResult(-1, {}, '名称或者编码已存在！');
            }
            // 根据 org_id 判断是新增还是更新操作
            if (org_id) {
                params.update_time = new Date()
                // 判断父级是否和自己相同
                if (params.parent_id === org_id) {
                    return this.resResult(-1, {}, '父级不能和自己相同！');
                }
                // 执行更新操作
                await this._update('XmwOrganization', params, org_id).then(() => {
                    // 更新成功
                    this.resResult(1, {});
                })
            } else {
                params.created_time = new Date()
                // 新增操作
                await this._add('XmwOrganization', params).then(() => {
                    // 更新成功
                    this.resResult(1, {});
                })
            }
        } catch (error) {
            ctx.logger.info('saveOrganization方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }

    /**
     * @description: 删除组织列表
     * @return {*}
     * @author: Cyan
     */
    public async delOrganization() {
        const { ctx } = this;
        try {
            // 获取组织 org_id
            let { org_id } = ctx.params
            // 判断当前数据是否有子级，如果有数据的parent_id是org_id，则存在子级
            const options = {
                where: {
                    parent_id: org_id
                }
            }
            const exist = await this._findOne('XmwOrganization', options)
            if (exist) {
                return this.resResult(-1, {}, '当前数据存在子级，不能删除！');
            }
            // 不存在子级则执行删除操作
            await this._delete('XmwOrganization', org_id).then(result => {
                // 判断是否删除成功
                result ? this.resResult(1, {}) : this.resResult(-1, {}, '数据主键不存在！');
            })
        } catch (error) {
            ctx.logger.info('delOrganization方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}
