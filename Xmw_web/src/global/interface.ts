/*
 * @Description: 全局 interface 配置项
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 10:52:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-07 10:55:37
 */
import type { ProSettings } from '@ant-design/pro-layout';
// dva 状态 state 接口
export interface globalModel {
    umi_locale: 'string', // 国际化语言
    umi_layout: ProSettings //  layout配置
}