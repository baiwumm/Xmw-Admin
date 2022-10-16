/*
 * @Description: 应用程序的根模块(Module)
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-15 22:08:40
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import App_globalConfig from './config/configuration'; // 全局配置
import DatabaseConfig from './config/database'; // 数据库配置
import { UserModule } from './modules/logical/user/user.module'; // 用户管理模块
import { InternationalModule } from './modules/system/international/international.module'; // 系统设置-国际化

@Module({
  imports: [
    ConfigModule.forRoot({
      // 这个注意哈，我们之前说动态modudle的时候说过这个内容forRoot
      isGlobal: true,
      load: [App_globalConfig, DatabaseConfig],
    }),
    // typeOrm 连接 mysql
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      // 注入 database 配置
      useFactory: async (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    UserModule,
    InternationalModule,
  ],
})
export class AppModule {}
