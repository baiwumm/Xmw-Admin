/*
 * @Description: RedisCache Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-28 14:16:33
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-28 16:19:53
 */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service'; // RedisCache Service
import { RedisCacheController } from './redis-cache.controller'; // RedisCache Controller

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => {
        return {
          store: redisStore,
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          db: process.env.REDIS_DB, //目标库,
          auth_pass: process.env.REDIS_PASSWORD, // 密码,没有可以不写
        };
      },
    }),
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [RedisCacheController],
  providers: [RedisCacheService],
  exports: [RedisCacheService],
})
export class RedisCacheModule {}
