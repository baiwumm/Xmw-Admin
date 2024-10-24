/*
 * @Description: JobsManagement Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 14:05:39
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { XmwJobs } from '@/models/xmw_jobs.model'; // xmw_jobs 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module';

import { JobsManagementController } from './jobs-management.controller'; // JobsManagement Controller
import { JobsManagementService } from './jobs-management.service'; // JobsManagement Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [SequelizeModule.forFeature([XmwJobs]), OperationLogsModule],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [JobsManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [JobsManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [JobsManagementService],
})
export class JobsManagementModule { }
