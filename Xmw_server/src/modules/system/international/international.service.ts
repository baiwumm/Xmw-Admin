/*
 * @Description: International Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 09:31:51
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XmwInternational } from '@/entities/xmw_international.entity';

@Injectable()
export class InternationalService {
  constructor(
    // 使用 InjectRepository 注入参数，注册数据库实体
    @InjectRepository(XmwInternational)
    private readonly internationaRepository: Repository<XmwInternational>,
  ) {}
  async findOne(): Promise<any> {
    const data = await this.internationaRepository.find({});
    return { data };
  }
}
