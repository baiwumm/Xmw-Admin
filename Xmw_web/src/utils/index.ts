/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-08 15:01:42
 */
import { useIntl } from '@umijs/max'

/**
 * @description: 国际化公共方法
 * @params {*} id<string>:必传，stringTemplate<Object>:字符串模板，需要和 locales 相对应
 * @return {*}
 * @author: Cyan
 */
export const formatMessage = (id: string, stringTemplate = {}) => {
    const intl = useIntl();
    // 合并配置项
    const intlConfig = { id, ...stringTemplate }
    // 返回国际化结果
    return intl.formatMessage(intlConfig)
}