/*
 * @Description: RedisCache Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-28 14:15:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-02 15:27:44
 */
import { Injectable } from '@nestjs/common';
import RedisC, { Redis } from 'ioredis';

import RedisConfig from '@/config/redis'; // redis配置

@Injectable()
export class RedisCacheService {
  redisClient: Redis;

  // 初始化 redis 实例
  constructor() {
    this.redisClient = new RedisC(RedisConfig());
  }

  /**
   * @description: 设置 redis 缓存
   * @param {string} key
   * @param {string} value
   * @param {number} seconds: 过期时间
   * @author: 白雾茫茫丶
   */
  async cacheSet(key: string, value: string, seconds?: number): Promise<void> {
    value = JSON.stringify(value);
    if (!seconds) {
      await this.redisClient.set(key, value);
    } else {
      await this.redisClient.set(key, value, 'EX', seconds);
    }
  }

  /**
   * @description: 获取 redis 缓存
   * @param {string} key
   * @author: 白雾茫茫丶
   */
  async cacheGet(key: string): Promise<any> {
    return this.redisClient.get(key);
  }

  /**
   * @description: 删除 redis 缓存
   * @param {string} key
   * @author: 白雾茫茫丶
   */
  async cacheDel(key: string): Promise<void> {
    await this.redisClient.del(key);
  }

  /**
   * @description: 清空 redis 缓存
   * @author: 白雾茫茫丶
   */
  async cacheFlushall(): Promise<void> {
    await this.redisClient.flushall();
  }
}
