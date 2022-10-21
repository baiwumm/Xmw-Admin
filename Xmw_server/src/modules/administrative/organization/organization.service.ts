/*
 * @Description:
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-20 16:42:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-21 11:12:41
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Between, Repository } from 'typeorm';
import { ResData, ResponseModel } from '@/common/interface'; // interface
import { XmwOrganization } from '@/entities/xmw_organization.entity'; // xmw_jobs 实体
import { initializeTree } from '@/utils'; // 全局工具函数
import { ListOrganizationDto, SaveOrganizationDto } from './dto';

@Injectable()
export class OrganizationService {
  constructor(
    // 使用 InjectRepository 注入参数，注册数据库实体
    @InjectRepository(XmwOrganization)
    private readonly organizationRepository: Repository<XmwOrganization>,
  ) {}

  /**
   * @description: 获取组织管理列表
   * @return {*}
   * @author: Cyan
   */
  async getOrganizationList(
    organizationInfo: ListOrganizationDto,
  ): Promise<XmwOrganization[]> {
    // 解构参数
    const { org_name, org_code, org_type, status, start_time, end_time } =
      organizationInfo;
    // 拼接查询参数
    const where: ResData = {};
    if (org_name) where.org_name = Like(`%${org_name}%`);
    if (org_code) where.org_code = Like(`%${org_code}%`);
    if (org_type) where.org_type = org_type;
    if (status) where.status = status;
    if (start_time && end_time)
      where.created_time = Between(start_time, end_time);
    // 查询数据
    const sqlData = await this.organizationRepository.find({
      where,
      // 按时间倒序
      order: {
        sort: 'DESC',
        created_time: 'DESC',
      },
    });
    // 将数据转成树形结构
    const result = initializeTree(sqlData, 'org_id', 'parent_id', 'children');
    return result;
  }

  /**
   * @description: 创建组织数据
   * @return {*}
   * @author: Cyan
   */
  async createOrganization(
    organizationInfo: SaveOrganizationDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { org_name, org_code } = organizationInfo;
    // 组织名称不能相同
    const exist = await this.organizationRepository.findOne({
      where: [{ org_name }, { org_code }],
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return { data: {}, msg: '组织名称或组织编码已存在！', code: -1 };
    }
    // 如果通过则执行 sql insert 语句
    const result = await this.organizationRepository.insert(organizationInfo);
    return { data: result };
  }

  /**
   * @description: 更新组织数据
   * @return {*}
   * @author: Cyan
   */
  async updateOrganization(
    org_id: string,
    organizationInfo: SaveOrganizationDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { org_name, org_code, parent_id } = organizationInfo;
    // 判断 parent_id 是否和 id相同
    if (parent_id && parent_id === org_id) {
      return { data: {}, msg: '父级不能和自己相同！', code: -1 };
    }
    // 组织名称不能相同
    const exist = await this.organizationRepository
      .createQueryBuilder('o')
      .where(
        '(o.org_name = :org_name OR o.org_code = :org_code)  AND org_id != :org_id',
        { org_name, org_code, org_id },
      )
      .getOne();
    // 如果有结果，则证明已存在
    if (exist) {
      return { data: {}, msg: '组织名称或组织编码已存在！', code: -1 };
    }
    // 如果通过则执行 sql save 语句
    const result = await this.organizationRepository.save({
      org_id,
      ...organizationInfo,
    });
    return { data: result };
  }

  /**
   * @description: 删除组织数据
   * @return {*}
   * @author: Cyan
   */
  async deleteOrganization(org_id: string): Promise<ResponseModel<ResData>> {
    // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
    const exist = await this.organizationRepository.findOne({
      where: { parent_id: org_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return { data: {}, msg: '当前数据存在子级，不能删除！', code: -1 };
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.organizationRepository.delete(org_id);
    return { data: result };
  }
}
