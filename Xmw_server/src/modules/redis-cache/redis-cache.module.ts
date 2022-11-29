/*
 * @Description: RedisCache Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-28 14:16:33
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 18:26:00
 */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CacheModule, Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-redis-store';
import { RedisCacheService } from './redis-cache.service'; // RedisCache Service
import { RedisCacheController } from './redis-cache.controller'; // RedisCache Controller

@Module({
  imports: [
    CacheModule.registerAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          store: redisStore,
          ...configService.get('redis'),
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
