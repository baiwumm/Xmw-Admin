/*
 * @Description: 系统设置-用户模块-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-13 11:14:28
 */

import BaseController from '../base'

export default class UserManagement extends BaseController {
    /**
     * @description: 获取用户列表
     * @return {*}
     * @author: Cyan
     */
    public async getUserList() {
        const { ctx } = this;
        try {
            let result = await ctx.service.system.userManagement.getUserList()
            this.resResult(1, result);
        } catch (error) {
            ctx.logger.info('getUserList方法报错：' + error)
            this.resResult(2, error);
        }
    }
}
