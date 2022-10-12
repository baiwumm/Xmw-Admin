/*
 * @Description: 类型枚举
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 15:19:38
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-09 16:56:18
 */

/**
 * @description: 请求状态
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS = {
    CUSTOM: -1,  // 自定义状态，用于处理一些特殊的结果
    ERROR:-10, // 一般用于数据库执行出错
    SUCCESS: 1, // 操作成功
    FAILURE: 2, // 操作失败
}

/**
 * @description: 请求状态提示语
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS_TEXT = {
    [RES_STATUS.ERROR]: '数据库执行出错，请联系后端处理！',
    [RES_STATUS.SUCCESS]: '操作成功！',
    [RES_STATUS.FAILURE]: '操作失败！'
}

/**
 * @description: 请求状态码
 * @return {*}
 * @author: Cyan
 */
export const RES_STATUS_CODE = {
    [RES_STATUS.CUSTOM]: -1,
    [RES_STATUS.ERROR]: -10,
    [RES_STATUS.SUCCESS]: 200,
    [RES_STATUS.FAILURE]: 400
}

/**
 * @description: 多语言配置项
 * @return {*}
 * @author: Cyan
 */
export const LOCALES_LANG = ['zh-CN', 'en-US', 'ja-JP', 'zh-TW']