/*
 * @Description:
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 15:15:22
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsManagementService } from './jobs-management.service'; // JobsManagement Service
import { JobsManagementController } from './jobs-management.controller'; // JobsManagement Controller
import { XmwJobs } from '@/entities/xmw_jobs.entity'; // xmw_jobs 实体

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [TypeOrmModule.forFeature([XmwJobs])],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [JobsManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [JobsManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [JobsManagementService],
})
export class JobsManagementModule {}
