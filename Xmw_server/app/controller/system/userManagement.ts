/*
 * @Description: 系统设置-用户模块接口
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 16:07:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 18:30:31
 */
import { Controller } from 'egg';

export default class UserManagement extends Controller {
    /**
     * @description: 获取用户列表
     * @return {*}
     * @author: Cyan
     */
    public async getUserList() {
        const { ctx } = this;
        try {
            let { } = ctx.params;
            const results = await ctx.mysql.select('posts');
            console.log(6666)
            ctx.body = { resCode: 200, resMsg: '操作成功!', resData: results }
        } catch (error) {
            ctx.logger.info('getUserList方法报错：' + error)
            ctx.body = { resCode: 400, resMsg: '操作失败!', resData: error }
        }
    }
}
