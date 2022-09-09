/*
 * @Description: Base Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 11:17:05
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 15:45:21
 */

import { Controller } from 'egg';
import { RES_STATUS_TEXT, RES_STATUS_CODE } from '../public/enum' // 请求状态

export default class BaseController extends Controller {
    /**
     * @description: 
     * @param {*} resStatus<请求状态>：1.成功，2.失败
     * @param {any} resData<请求数据>
     * @return {*}
     * @author: Cyan
     */
    public async resResult(resStatus, resData: any) {
        const { ctx } = this
        try {
            // 根据参数返回不同的状态
            return ctx.body = { resCode: RES_STATUS_CODE[resStatus], resMsg: RES_STATUS_TEXT[resStatus], resData }
        } catch (error) {
            // 打印错误日志
            ctx.logger.info('BaseController报错：' + error)
        }

    }
}
