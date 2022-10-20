/*
 * @Description: JobsManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-20 15:34:44
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Between, Repository } from 'typeorm';
import { ResData } from '@/common/interface'; // interface
import { XmwJobs } from '@/entities/xmw_jobs.entity'; // xmw_jobs 实体
import { ListJobsManagementDto } from './dto';

@Injectable()
export class JobsManagementService {
  constructor(
    // 使用 InjectRepository 注入参数，注册数据库实体
    @InjectRepository(XmwJobs)
    private readonly jobsRepository: Repository<XmwJobs>,
  ) {}

  /**
   * @description: 获取国际化列表
   * @return {*}
   * @author: Cyan
   */
  async getJobsList(
    internationalInfo: ListJobsManagementDto,
  ): Promise<XmwJobs[]> {
    // 解构参数
    const { jobs_name, org_id, start_time, end_time } = internationalInfo;
    // 拼接查询参数
    const where: ResData = {};
    if (jobs_name) where.jobs_name = Like(`%${jobs_name}%`);
    if (org_id) where.org_id = org_id;
    if (start_time && end_time)
      where.created_time = Between(start_time, end_time);
    // 查询数据
    const result = await this.jobsRepository.find({
      where,
      // 按时间倒序
      order: {
        sort: 'DESC',
        created_time: 'DESC',
      },
    });
    return result;
  }
}
