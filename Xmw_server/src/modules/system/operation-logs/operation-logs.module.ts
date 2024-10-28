import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { XmwLogs } from '@/models/xmw_logs.model'; // Xmw_logs 实体
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体

import { OperationLogsController } from './operation-logs.controller'; // OperationLogs Controller
import { OperationLogsService } from './operation-logs.service'; // OperationLogs Service

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    SequelizeModule.forFeature([XmwLogs, XmwUser]),
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [OperationLogsController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [OperationLogsService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [OperationLogsService],
})
export class OperationLogsModule { }
