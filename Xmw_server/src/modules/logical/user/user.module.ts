/*
 * @Description: User Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:40:04
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 10:08:05
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service'; // User Service
import { UserController } from './user.controller'; // User Controller
import { XmwUsers } from '@/entities/xmw_users.entity'; // xmw_users 实体

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [TypeOrmModule.forFeature([XmwUsers])],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  providers: [UserService],
  // 通过 @Module 装饰器映射 Crotroller
  controllers: [UserController],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [UserService],
})
export class UserModule {}
