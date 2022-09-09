/*
 * @Description: 类型枚举
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 15:19:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 15:41:14
 */

/**
 * @description: 请求状态
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS = {
    SUCCESS: 1,
    FAILURE: 2,
}

/**
 * @description: 请求状态提示语
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS_TEXT = {
    [RES_STATUS.SUCCESS]: '请求成功！',
    [RES_STATUS.FAILURE]: '请求失败！'
}

/**
 * @description: 请求状态码
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS_CODE = {
    [RES_STATUS.SUCCESS]: 200,
    [RES_STATUS.FAILURE]: 400
}