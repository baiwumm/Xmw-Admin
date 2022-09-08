/*
 * @Description: 公共 interface 接口定义
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 18:14:06
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 18:17:09
 */

// 数据接收格式
export type Data<S = any> = {
    [T in keyof S]: S[T]
}

export type Methods = "post" | "get"

export type RequestInfo<S = any> = {
    methods: Methods,
    params: Data<S>
}

// 请求结果
export type Result<S = any> = {
    resCode: number,
    resData?: Data<S>,
    resMsg?: string
}

export type Api = (params: Data) => Promise<Result>
