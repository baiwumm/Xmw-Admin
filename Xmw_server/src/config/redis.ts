/*
 * @Description: redis 配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-29 18:23:05
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-02 10:26:59
 */
import { registerAs } from '@nestjs/config';
import { toNumber } from 'lodash';

export default registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: toNumber(process.env.REDIS_PORT),
  db: toNumber(process.env.REDIS_DB), //目标库,
  auth_pass: process.env.REDIS_PASSWORD,
}));
