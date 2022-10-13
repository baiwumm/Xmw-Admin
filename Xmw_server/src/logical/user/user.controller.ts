/*
 * @Description: User Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:40:52
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:42:32
 */
import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('find-one')
  findOne(@Body() body: any) {
    return this.usersService.findOne(body.username);
  }
}
