/*
 * @Description: dva 全局状态管理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-07 10:17:42
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-07 15:50:57
 */
import { globalModel } from '@/global/interface'
export default {
    name: 'Global',   // 命名空间
    // state状态
    state: {
        umi_locale: window.localStorage.getItem('umi_locale'), // 国际化语言配置
        umi_layout: window.localStorage.getItem('umi_layout'), // layout布局
    },

    // Reducer 同步 action，用来修改 state
    reducers: {
        // 切换 layout 布局
        changeUmiLayout(state: globalModel, { payload }: any) {
            return {
                ...state,
                umi_layout: payload
            }
        }
    }
}