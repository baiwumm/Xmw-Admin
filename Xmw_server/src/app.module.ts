/*
 * @Description: 应用程序的根模块(Module)
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-24 13:12:14
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-16 11:07:46
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { AnnouncementModule } from '@/modules/administrative/announcement/announcement.module'; // 智能行政-活动公告
import { JobsManagementModule } from '@/modules/administrative/jobs-management/jobs-management.module'; // 智能行政-岗位管理
import { OrganizationModule } from '@/modules/administrative/organization/organization.module'; // 智能行政-组织管理
import { AuthModule } from '@/modules/auth/auth.module'; // 用户鉴权
import { FilesModule } from '@/modules/files/files.module'; // 文件上传
import { RedisCacheModule } from '@/modules/redis-cache/redis-cache.module'; // redis 缓存
import { InternationalModule } from '@/modules/system/international/international.module'; // 系统设置-国际化
import { MenuManagementModule } from '@/modules/system/menu-management/menu-management.module'; // 系统设置-菜单管理
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志
import { RoleManagementModule } from '@/modules/system/role-management/role-management.module'; // 系统设置-角色管理
import { UserManagementModule } from '@/modules/system/user-management/user-management.module'; // 系统设置-用户管理

import App_globalConfig from './config/configuration'; // 全局配置
import DatabaseConfig from './config/database'; // 数据库配置
import RedisConfig from './config/redis'; // redis配置

@Module({
  imports: [
    // 全局配置 Module
    ConfigModule.forRoot({
      envFilePath: '.development.env', // 设置 .env 文件路径
      isGlobal: true,
      load: [App_globalConfig, DatabaseConfig, RedisConfig],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      // 注入 database 配置
      useFactory: async (configService: ConfigService) => {
        return configService.get('database');
      },
      inject: [ConfigService],
    }),
    InternationalModule,
    JobsManagementModule,
    OrganizationModule,
    MenuManagementModule,
    RoleManagementModule,
    UserManagementModule,
    OperationLogsModule,
    FilesModule,
    AuthModule,
    RedisCacheModule,
    AnnouncementModule,
  ],
})
export class AppModule { }
