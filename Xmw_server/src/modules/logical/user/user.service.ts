/*
 * @Description: User Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:40:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-15 15:30:35
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XmwUsers } from '@/entities/xmw_users.entity';

@Injectable()
export class UserService {
  constructor(
    // 使用 InjectRepository 注入参数，注册数据库实体
    @InjectRepository(XmwUsers)
    private readonly userRepository: Repository<XmwUsers>,
  ) {}
  async findOne(username: string): Promise<any> {
    const pageSize = 5,
      current = 1;
    const [list, total] = await this.userRepository.findAndCount({
      skip: pageSize * (current - 1), // 当页条数
      take: pageSize, // 开始下标
    });
    if (username === 'Kid') {
      return { data: 'Kid is here', code: -1 };
    }
    return { data: { list, total } };
  }
}
