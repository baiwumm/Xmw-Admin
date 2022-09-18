/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-18 14:41:24
 */
import { useIntl, addLocale } from '@umijs/max'
import { message } from 'antd';
import { ANTD_LANGS } from '@/global/lang' // 多语言配置项
import { getAllLocalesLang } from '@/services/system/internationalization' //获取国际化多语言层级对象


/**
 * @description: 国际化公共方法
 * @params {*} id<string>:必传，stringTemplate<Object>:字符串模板，需要和 locales 相对应
 * @return {*}
 * @author: Cyan
 */
export const formatMessage = (ids: string | Array<string>, stringTemplate = {}) => {
    const intl = useIntl();
    // 定义一个结果
    let result = ''
    // 判断id是字符串还是数组
    if (Array.isArray(ids)) {
        // 如果是数组则拼接
        for (let i = 0; i < ids.length; i++) {
            // 合并配置项
            const intlConfig = { id: ids[i], ...stringTemplate }
            // 返回国际化结果
            result += intl.formatMessage(intlConfig)
        }
    } else {
        // 合并配置项
        const intlConfig = { id: ids, ...stringTemplate }
        // 返回国际化结果
        result = intl.formatMessage(intlConfig)
    }

    return result
}

/**
 * @description: 获取国际化多语言层级对象
 * @return {*}
 * @author: Cyan
 */
export const initLocalesLang = async () => {
    try {
        await getAllLocalesLang().then(res => {
            const { resData } = res
            // 拿到 lang 数组遍历
            resData && Object.keys(resData).forEach(lang => {
                // 初始化多语言配置
                addLocale(lang, resData[lang], ANTD_LANGS[lang])
            })
        }).catch(error => {
            message.error(error)
        })
    } catch (error: any) {
        message.error(error)
    }
}