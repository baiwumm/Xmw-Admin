/*
 * @Description: redux状态管理 - localesModel - 多语言数据
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-10 17:27:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:35:39
 */
import { getAllLocalesLang } from '@/services/system/internationalization'; //获取国际化多语言层级对象

export default {
  // model 中的数据
  state: {
    locales: {},
  },
  // 异步 action，用来发送异步请求
  effects: {
    /**
     * @description: 获取多语言数据
     * @return {*}
     * @author: Cyan
     */
    *initLocales({ payload }: any, { call, put }: any): any {
      const response = yield call(getAllLocalesLang, payload);
      yield put({
        type: 'changeLocales',
        payload: response.data,
      });
      return response;
    },
  },
  // 同步 action，用来修改 state
  reducers: {
    changeLocales(state: any, { payload }: any) {
      return {
        ...state,
        locales: payload,
      };
    },
  },
  // 该选项中的函数自定义命名?函数的触发时机是初始时，主要用来初始化模块状态或者做一些准备性工作
  subscriptions: {
    loadData({ dispatch }: any) {
      dispatch({ type: 'initLocales', payload: {} });
    },
  },
};
