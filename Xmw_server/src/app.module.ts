/*
 * @Description: 应用程序的根模块(Module)
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-12 17:06:37
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 17:06:51
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import App_globalConfig from './config/configuration'; // 全局配置
import DatabaseConfig from './config/database'; // 数据库配置
import { UserModule } from './modules/logical/user/user.module'; // 用户管理模块
import { InternationalModule } from './modules/system/international/international.module'; // 系统设置-国际化
import { JobsManagementModule } from './modules/administrative/jobs-management/jobs-management.module'; // 智能行政-岗位管理
import { OrganizationModule } from './modules/administrative/organization/organization.module'; // 智能行政-组织管理

@Module({
  imports: [
    // 全局配置 Module
    ConfigModule.forRoot({
      envFilePath: '.development.env', // 设置 .env 文件路径
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
    JobsManagementModule,
    OrganizationModule,
  ],
})
export class AppModule {}
