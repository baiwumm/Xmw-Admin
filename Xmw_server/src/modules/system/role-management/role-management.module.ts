/*
 * @Description: RoleManagement Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-28 17:43:45
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleManagementService } from './role-management.service'; // RoleManagement Service
import { RoleManagementController } from './role-management.controller'; // RoleManagement Controller
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [SequelizeModule.forFeature([XmwRole])],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [RoleManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [RoleManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [RoleManagementService],
})
export class RoleManagementModule {}
