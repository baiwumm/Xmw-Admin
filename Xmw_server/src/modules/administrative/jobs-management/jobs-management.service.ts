/*
 * @Description: JobsManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 11:19:47
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:13:05
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { ResData, ResponseModel, SessionModel } from '@/global/interface'; // interface
import { XmwJobs } from '@/models/xmw_jobs.model'; // xmw_jobs 实体
import { XmwOrganization } from '@/models/xmw_organization.model';
import { initializeTree, responseMessage } from '@/utils'; // 全局工具函数
import { ListJobsManagementDto, SaveJobsManagementDto } from './dto';

@Injectable()
export class JobsManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwJobs)
    private readonly jobsModel: typeof XmwJobs,
  ) { }

  /**
   * @description: 获取国际化列表
   * @return {*}
   * @author: Cyan
   */
  async getJobsList(jobsInfo: ListJobsManagementDto): Promise<XmwJobs[]> {
    // 解构参数
    const { jobs_name, org_id, start_time, end_time } = jobsInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (jobs_name) where.jobs_name = { [Op.substring]: jobs_name };
    if (org_id) where.org_id = org_id;
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 查询数据
    const sqlData = await this.jobsModel.findAll({
      attributes: {
        include: ['o.org_name'],
      },
      // 联表查询
      include: [
        {
          model: XmwOrganization,
          as: 'o',
          attributes: [],
        },
      ],
      raw: true,
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
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
    session: SessionModel,
  ): Promise<ResponseModel<ResData | SaveJobsManagementDto>> {
    // 解构参数
    const { jobs_name } = jobsInfo;
    // 组织名称不能相同
    const exist = await this.jobsModel.findOne({
      where: { jobs_name },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return responseMessage({}, '岗位名称已存在!', -1);
    }
    // 如果通过则执行 sql insert 语句
    const result = await this.jobsModel.create({
      ...jobsInfo,
      founder: session.currentUserInfo.user_id,
    });
    return responseMessage(result);
  }

  /**
   * @description: 更新岗位数据
   * @return {*}
   * @author: Cyan
   */
  async updateJobs(
    jobs_id: string,
    jobsInfo: SaveJobsManagementDto,
  ): Promise<ResponseModel<ResData | number[]>> {
    // 解构参数
    const { jobs_name, parent_id } = jobsInfo;
    // 判断 parent_id 是否和 id相同
    if (parent_id && parent_id === jobs_id) {
      return responseMessage({}, '父级不能和自己相同!', -1);
    }
    // 岗位名称不能相同
    const exist = await this.jobsModel.findOne({
      where: {
        jobs_name,
        jobs_id: {
          [Op.ne]: jobs_id,
        },
      },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, '岗位名称已存在!', -1);
    }
    // 如果通过则执行 sql save 语句
    const result = await this.jobsModel.update(jobsInfo, {
      where: { jobs_id },
    });
    return responseMessage(result);
  }

  /**
   * @description: 删除岗位数据
   * @return {*}
   * @author: Cyan
   */
  async deleteJobs(jobs_id: string): Promise<ResponseModel<ResData | number>> {
    // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
    const exist = await this.jobsModel.findOne({
      where: { parent_id: jobs_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, '当前数据存在子级，不能删除!', -1);
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.jobsModel.destroy({ where: { jobs_id } });
    return responseMessage(result);
  }
}
