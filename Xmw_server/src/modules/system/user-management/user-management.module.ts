/*
 * @Description: UserManagement Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-09 17:44:10
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 16:32:46
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserManagementService } from './user-management.service'; // UserManagement Service
import { UserManagementController } from './user-management.controller'; // UserManagement Controller
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [SequelizeModule.forFeature([XmwUser]), OperationLogsModule],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [UserManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [UserManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [UserManagementService],
})
export class UserManagementModule { }
