/*
 * @Description: RedisCache Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-28 14:16:33
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-02 15:17:41
 */
import { Module } from '@nestjs/common';

import { RedisCacheController } from './redis-cache.controller'; // RedisCache Controller
import { RedisCacheService } from './redis-cache.service'; // RedisCache Service

@Module({
  imports: [],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule { }
