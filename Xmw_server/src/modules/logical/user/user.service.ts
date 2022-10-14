/*
 * @Description: User Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:40:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-14 10:07:16
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  findOne(username: string): any {
    if (username === 'Kid') {
      return { data: 'Kid is here', code: -1 };
    }
    return { data: 'No one here', code: 100 };
  }
}
