/*
 * @Description: 多语言配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-18 12:07:47
 * @LastEditors: Cyan
 * @LastEditTime: 2023-07-10 15:14:27
 */

// 引入antd多语言配置
import type { Locale } from 'antd/es/locale'
import enus from 'antd/es/locale/en_US';
import jajp from 'antd/es/locale/ja_JP';
import zhcn from 'antd/es/locale/zh_CN';
import zhtw from 'antd/es/locale/zh_TW';

/**
 * @description: 多语言配置项
 * @return {*}
 * @author: Cyan
 */
export const LOCALES_LANG = ['zh-CN', 'en-US', 'ja-JP', 'zh-TW']

/**
 * @description: antd 多语言配置项
 * @return {*}
 * @author: Cyan
 */
export const ANTD_LANGS: Record<string, { momentLocale: string, antd: Locale }> = {
	'zh-CN': {
		momentLocale: 'zh-cn',
		antd: zhcn,
	},
	'ja-JP': {
		momentLocale: 'ja-jp',
		antd: jajp,
	},
	'en-US': {
		momentLocale: 'en-us',
		antd: enus,
	},
	'zh-TW': {
		momentLocale: 'zh-tw',
		antd: zhtw,
	},
}