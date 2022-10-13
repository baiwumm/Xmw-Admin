/*
 * @Description: User Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:40:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 17:04:07
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): string {
    if (username === 'Kid') {
      return 'Kid is here';
    }
    return 'No one here';
  }
}
