/*
 * @Description: 用户模块-Controller层
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-09 15:27:18
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 17:20:36
 */
import BaseController from './base'

/**
 * @description: BaseController 里面的方法不解构执行，目前原因暂不明￣□￣｜｜
 * @return {*}
 * @author: Cyan
 */

export default class User extends BaseController{
    /**
     * @description: 上传用户头像
     * @return {*}
     * @author: Cyan
     */    
    public async uploadUserAvatar(){
        const { ctx } = this;
        try {
            this.resResult(1, {});
        } catch (error) {
            ctx.logger.info('uploadUserAvatar方法报错：' + error)
            this.resResult(2, error);
        }
    }
}