/*
 * @Description: redux状态管理 - localesModel - 多语言数据
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-10 17:27:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-06 15:40:14
 */
import type { Reducer, Effect, Subscription } from '@umijs/max'
import { addLocale, history } from '@umijs/max';
import { ANTD_LANGS } from '@/global/lang'; // 多语言配置项
import { getUserInfo, getPermissionMenu } from '@/services/logic/login' // 登录相关接口
import { getAllLocalesLang } from '@/services/system/internationalization'; //获取国际化多语言层级对象
import routerConfig from '@/utils/routerConfig' // 路由配置

/**
 * @description: State
 * @return {*}
 * @author: Cyan
 */
export interface GlobalModelState {
  Locales?: Record<string, any>;
  UserInfo?: API.USERMANAGEMENT;
  Routes?: API.MENUMANAGEMENT[]
}

/**
 * @description: Model
 * @return {*}
 * @author: Cyan
 */
export interface GlobalModelType {
  state: GlobalModelState;
  effects: {
    initLocales: Effect,
    fetchUserInfo: Effect,
    fetchRoutes: Effect
  },
  reducers: {
    changeLocales: Reducer<GlobalModelState>;
    saveUserInfo: Reducer<GlobalModelState>;
    saveRoutes: Reducer<GlobalModelState>;
  };
  subscriptions: { setup: Subscription }
}

const GlobalModel: GlobalModelType = {
  // model 中的数据
  state: {
    Locales: {},
  },
  // 异步 action，用来发送异步请求
  effects: {
    /**
     * @description: 获取多语言数据
     * @return {*}
     * @author: Cyan
     */
    *initLocales({ }, { call, put }): Record<string, any> {
      const { data } = yield call(getAllLocalesLang);
      Object.keys(data).forEach((lang) => {
        // 初始化多语言配置
        addLocale(lang, data[lang], ANTD_LANGS[lang]);
      });
      yield put({
        type: 'changeLocales',
        payload: data,
      });
      return data;
    },

    /**
     * @description: 获取用户信息
     * @return {*}
     * @author: Cyan
     */
    *fetchUserInfo({ }, { call, put }) {
      const { data, code } = yield call(getUserInfo);
      if (code === 200) {
        yield put({
          type: 'saveUserInfo',
          payload: data,
        });
        return data;
      }
      history.push(routerConfig.LOGIN);
      return undefined;
    }

    /**
     * @description: 获取动态路由
     * @return {*}
     * @author: Cyan
     */    
    *fetchRoutes({ }, { call, put }) {
      const { data, code } = yield call(getPermissionMenu);
      if (code === 200) {
        yield put({
          type: 'saveRoutes',
          payload: data,
        });
        return data;
      }
      history.push(routerConfig.LOGIN);
      return undefined;
    }
  },
  // 同步 action，用来修改 state
  reducers: {
    /**
     * @description: 多语言层级数据
     * @author: Cyan
     */
    changeLocales(state: Pick<GlobalModelState, 'Locales'>, { payload }) {
      return {
        ...state,
        Locales: payload,
      };
    },

    /**
     * @description: 保存用户信息
     * @author: Cyan
     */
    saveUserInfo(state: Pick<GlobalModelState, 'UserInfo'>, { payload }) {
      return {
        ...state,
        UserInfo: payload,
      };
    },

    /**
     * @description: 保存动态路由
     * @author: Cyan
     */
    saveRoutes(state: Pick<GlobalModelState, 'Routes'>, { payload }) {
      return {
        ...state,
        Routes: payload,
      };
    }
  },

  subscriptions: {    // 该选项中的函数自定义命名?函数的触发时机是初始时，主要用来初始化模块状态或者做一些准备性工作
    // 注意：subscription 需要返回 unlisten 方法，用于取消数据订阅。
    setup({ dispatch }) {
      dispatch({ type: 'initLocales' });
    },
  },
};

export default GlobalModel;
