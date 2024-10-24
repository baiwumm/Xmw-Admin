/*
 * @Description: 接口代理
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-08 15:54:03
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 14:24:05
 */
/**
 * @name 代理的配置
 * @see 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 *
 * @doc https://umijs.org/docs/guides/proxy
 */
export default {
  /**
   * @description: 后端代理配置
   * @name 详细的代理配置
   * @doc https://github.com/chimurai/http-proxy-middleware
   * @author: Cyan
   */
  dev: {
    '/api/': {
      target: ' http://127.0.0.1:6688', // 代理地址
      // 配置了这个可以从 http 代理到 https
      // 依赖 origin 的功能可能需要这个，比如 cookie
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
};
