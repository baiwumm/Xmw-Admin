/*
 * @Description: International Module
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-17 08:54:02
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 14:30:10
 */
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { XmwInternational } from '@/models/xmw_international.model'; // xmw_international 实体
import { OperationLogsModule } from '@/modules/system/operation-logs/operation-logs.module';
import { InternationalController } from './international.controller'; // International Controller
import { InternationalService } from './international.service'; // International Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [SequelizeModule.forFeature([XmwInternational]), OperationLogsModule],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [InternationalController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [InternationalService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [InternationalService],
})
export class InternationalModule { }
