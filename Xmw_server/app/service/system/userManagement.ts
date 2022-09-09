/*
 * @Description: 系统设置-用户管理-Service层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 09:55:06
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 16:13:11
 */
'use strict';
import BaseService from '../base'

export default class UserManagement extends BaseService {
    /**
     * @description: 获取用户列表
     * @return {*}
     * @author: Cyan
     */
    public async getUserList() {
        let { ctx } = this
        try {
            let data = await this._findAll('XmwUsers')
            let total = await this._count('XmwUsers')
            return { data, total }
        } catch (error) {
            ctx.logger.info('UserManagement-Service报错：' + error)
        }

    }
}
