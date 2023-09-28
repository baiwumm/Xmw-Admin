/*
 * @Description: redis 配置
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-29 18:23:05
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-02 16:20:21
 */
import { registerAs } from '@nestjs/config';
import { toNumber } from 'lodash';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST, // 主机名
  port: toNumber(process.env.REDIS_PORT), // 端口号
  db: toNumber(process.env.REDIS_DB), //目标库,
  password: process.env.REDIS_PASSWORD,
  family: 4, // 4 (IPv4) or 6 (IPv6)
  expiresin: 60 * 60 * 24 * 7, // redis 过期时长,默认7天
}));
