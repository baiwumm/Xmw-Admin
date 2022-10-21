/*
 * @Description: JobsManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-21 16:37:11
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Between, Repository, Not } from 'typeorm';
import { ResData, ResponseModel } from '@/common/interface'; // interface
import { XmwJobs } from '@/entities/xmw_jobs.entity'; // xmw_jobs 实体
import { XmwOrganization } from '@/entities/xmw_organization.entity'; // xmw_organization 实体
import { initializeTree } from '@/utils'; // 全局工具函数
import { ListJobsManagementDto, SaveJobsManagementDto } from './dto';

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
  async getJobsList(jobsInfo: ListJobsManagementDto): Promise<XmwJobs[]> {
    // 解构参数
    const { jobs_name, org_id, start_time, end_time } = jobsInfo;
    // 拼接查询参数
    const where: ResData = {};
    if (jobs_name) where.jobs_name = Like(`%${jobs_name}%`);
    if (org_id) where.org_id = org_id;
    if (start_time && end_time)
      where.created_time = Between(start_time, end_time);
    // 查询数据
    const sqlData = await this.jobsRepository.find({
      where,
      // 按时间倒序
      order: {
        sort: 'DESC',
        created_time: 'DESC',
      },
    });
    // 将数据转成树形结构
    const result = initializeTree(sqlData, 'jobs_id', 'parent_id', 'children');
    return result;
  }

  /**
   * @description: 创建岗位数据
   * @return {*}
   * @author: Cyan
   */
  async createJobs(
    jobsInfo: SaveJobsManagementDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { jobs_name } = jobsInfo;
    // 组织名称不能相同
    const exist = await this.jobsRepository.findOne({
      where: { jobs_name },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return { data: {}, msg: '岗位名称已存在！', code: -1 };
    }
    // 如果通过则执行 sql insert 语句
    const result = await this.jobsRepository.insert(jobsInfo);
    return { data: result };
  }

  /**
   * @description: 更新岗位数据
   * @return {*}
   * @author: Cyan
   */
  async updateJobs(
    jobs_id: string,
    jobsInfo: SaveJobsManagementDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { jobs_name, parent_id } = jobsInfo;
    // 判断 parent_id 是否和 id相同
    if (parent_id && parent_id === jobs_id) {
      return { data: {}, msg: '父级不能和自己相同！', code: -1 };
    }
    // 岗位名称不能相同
    const exist = await this.jobsRepository.findOne({
      where: { jobs_name, jobs_id: Not(jobs_id) },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return { data: {}, msg: '岗位名称已存在！', code: -1 };
    }
    // 如果通过则执行 sql save 语句
    const result = await this.jobsRepository.save({
      jobs_id,
      ...jobsInfo,
    });
    return { data: result };
  }

  /**
   * @description: 删除岗位数据
   * @return {*}
   * @author: Cyan
   */
  async deleteJobs(jobs_id: string): Promise<ResponseModel<ResData>> {
    // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
    const exist = await this.jobsRepository.findOne({
      where: { parent_id: jobs_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return { data: {}, msg: '当前数据存在子级，不能删除！', code: -1 };
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.jobsRepository.delete(jobs_id);
    return { data: result };
  }
}
