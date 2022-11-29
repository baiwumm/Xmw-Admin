/*
 * @Description: redis 配置
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-29 18:23:05
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 18:29:25
 */
import { registerAs } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';
import { toNumber } from 'lodash';

export default registerAs('database', () => ({
  store: redisStore,
  host: process.env.REDIS_HOST,
  port: toNumber(process.env.REDIS_PORT),
  db: toNumber(process.env.REDIS_DB), //目标库,
}));
