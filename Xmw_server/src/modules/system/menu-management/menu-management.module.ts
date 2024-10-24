/*
 * @Description: MenuManagement Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-20 15:25:21
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { XmwInternational } from '@/models/xmw_international.model'; // xmw_international 实体
import { XmwMenu } from '@/models/xmw_menu.model'; // xmw_menu 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module'; // 系统设置-操作日志
import { MenuManagementController } from './menu-management.controller'; // MenuManagement Controller
import { MenuManagementService } from './menu-management.service'; // MenuManagement Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    SequelizeModule.forFeature([XmwMenu, XmwInternational]),
    OperationLogsModule,
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [MenuManagementController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [MenuManagementService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [MenuManagementService],
})
export class MenuManagementModule { }
