/*
 * @Description: RedisCache Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-28 14:15:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-28 14:31:52
 */
import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisCacheService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) {}

  /**
   * @description: 设置 redis 缓存
   * @param {string} key
   * @param {string} value
   * @param {number} ttl: 过期时间
   * @return {*}
   * @author: Cyan
   */
  async cacheSet(key: string, value: string, ttl?: number): Promise<void> {
    await this.cacheManager.set(key, value, ttl);
  }

  /**
   * @description: 获取 redis 缓存
   * @param {string} key
   * @return {*}
   * @author: Cyan
   */
  async cacheGet(key: string): Promise<any> {
    return this.cacheManager.get(key);
  }

  /**
   * @description: 删除 redis 缓存
   * @param {string} key
   * @return {*}
   * @author: Cyan
   */
  async cacheDel(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  /**
   * @description: 清空 redis 缓存
   * @return {*}
   * @author: Cyan
   */
  async cacheReset(): Promise<void> {
    await this.cacheManager.reset();
  }
}
