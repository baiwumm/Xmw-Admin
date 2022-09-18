/*
 * @Description: 全局公共方法
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 16:12:53
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-18 12:28:39
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
export const formatMessage = (id: string, stringTemplate = {}) => {
    const intl = useIntl();
    // 合并配置项
    const intlConfig = { id, ...stringTemplate }
    // 返回国际化结果
    return intl.formatMessage(intlConfig)
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