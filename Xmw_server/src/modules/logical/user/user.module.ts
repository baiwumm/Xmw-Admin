/*
 * @Description: User Module
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:40:04
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:45:53
 */
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
