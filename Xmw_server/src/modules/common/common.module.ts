/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-08 14:04:40
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-08 14:06:36
 * @Description: Common Module
 */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

import { CommonController } from './/common.controller';
import { CommonService } from './common.service';

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
  ],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [CommonController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [CommonService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [CommonService],
})
export class CommonModule { }
