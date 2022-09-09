/*
 * @Description: 全局配置文件
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-09-09 13:49:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-09-09 16:09:25
 */
import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1662702532562_9450';

  // add your egg config in here
  config.middleware = [];

  /* 取消安全证书验证 */
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ["*"], // 白名单
  };
  /* 连接mysql配置 */
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'react_umi_xmw',
    username: "root",
    password: "123456",
    // 配置数据库时间为东八区北京时间
    timezone: '+08:00',
    define: {
      timestamps: false, // 不需要sequelize自动添加时间戳
      freezeTableName: true, // 使用原始的表名称，不需要sequelize对表名称做额外处理
    },
    // 打印日志
    logging: true,
    // 时间格式化
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  };
  /* 配置允许跨域 */
  config.cors = {
    credentials: true,
    origin: "*", //允许任何跨域，若只允许个别IP跨域，则：origin:['http://localhost:8080']
    allowMethods: 'GET,PUT,POST,DELETE', // 被允许的请求方式
  };
  const userConfig = {};

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...userConfig,
  };
};
