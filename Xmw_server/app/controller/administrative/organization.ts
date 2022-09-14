/*
 * @Description: 智能行政-组织管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-14 18:09:16
 */

import BaseController from '../base'

/**
 * @description: BaseController 里面的方法不能结构执行，目前原因暂不明￣□￣｜｜
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
        const { ctx } = this;
        // 获取数据参数
        let { current, pageSize, ...params } = ctx.params
        try {
            // 根据参数查询数据
            await this._findAll('XmwOrganization', current, pageSize, params).then(result => {
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
            // 根据 org_id 判断是新增还是更新操作
            if (org_id) {
                console.log(params)
            } else {
                // 判断名称和编码是否存在
                const options = {
                    where: {
                        [Op.or]: {
                            org_name: params.org_name,
                            org_code: params.org_code
                        }
                    }
                }
                const exist = await this._findOne('XmwOrganization', options)
                if (exist) {
                    return this.resResult(-1, {}, '名称或者编码已存在！');
                }
                // 新增操作
                await this._add('XmwOrganization', params)
                this.resResult(1, {});
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
            await this._delete('XmwOrganization', org_id)
            this.resResult(1, {});
        } catch (error) {
            ctx.logger.info('delOrganization方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}
