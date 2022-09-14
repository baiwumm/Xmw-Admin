/*
 * @Description: 智能行政-组织管理-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 18:31:02
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
                    this.resResult(1, result);
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
        const { ctx } = this;
        try {
            // 获取数据参数
            let { org_id, ...params } = ctx.params
            console.log(params)
            // 根据 org_id 判断是新增还是更新操作
            if (org_id) {

            } else {
                // 新增操作
                this._add('XmwOrganization', params)
                this.resResult(1, {});
            }
        } catch (error) {
            ctx.logger.info('saveOrganization方法报错：' + error)
            // 返回状态,此处不能用结构，原因暂不明
            this.resResult(2, error);
        }
    }
}
