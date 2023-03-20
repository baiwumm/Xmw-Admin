/*
 * @Description:
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-20 16:42:35
 * @LastEditors: Cyan
 * @LastEditTime: 2023-03-20 15:36:08
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { ResData, ResponseModel, SessionModel } from '@/global/interface'; // interface
import { XmwOrganization } from '@/models/xmw_organization.model'; // xmw_organization 实体
import { initializeTree, responseMessage } from '@/utils'; // 全局工具函数
import { ListOrganizationDto, SaveOrganizationDto } from './dto';

@Injectable()
export class OrganizationService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwOrganization)
    private readonly organizationModel: typeof XmwOrganization,
    private readonly operationLogsService: OperationLogsService,
  ) { }

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
    const where: WhereOptions = {};
    if (org_name) where.org_name = { [Op.substring]: org_name };
    if (org_code) where.org_code = { [Op.substring]: org_code };
    if (org_type) where.org_type = { [Op.eq]: org_type };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 查询数据
    const sqlData = await this.organizationModel.findAll({
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
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
    session: SessionModel,
  ): Promise<ResponseModel<ResData | SaveOrganizationDto>> {
    // 解构参数
    const { org_name, org_code } = organizationInfo;
    // 组织名称不能相同
    const exist = await this.organizationModel.findOne({
      where: { [Op.or]: { org_name, org_code } },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return responseMessage({}, '组织名称或组织编码已存在!', -1);
    }
    // 如果通过则执行 sql insert 语句
    const result = await this.organizationModel.create({
      ...organizationInfo,
      founder: session?.currentUserInfo?.user_id,
    });
    // 保存操作日志
    await this.operationLogsService.saveLogs(`创建组织：${org_name}`);
    return responseMessage(result);
  }

  /**
   * @description: 更新组织数据
   * @return {*}
   * @author: Cyan
   */
  async updateOrganization(
    org_id: string,
    organizationInfo: SaveOrganizationDto,
  ): Promise<ResponseModel<ResData | number[]>> {
    // 解构参数
    const { org_name, org_code, parent_id } = organizationInfo;
    // 判断 parent_id 是否和 id相同
    if (parent_id && parent_id === org_id) {
      return responseMessage({}, '父级不能和自己相同!', -1);
    }
    // 组织名称不能相同
    const exist = await this.organizationModel.findOne({
      where: {
        [Op.or]: {
          org_name,
          org_code,
        },
        org_id: {
          [Op.ne]: org_id,
        },
      },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, '组织名称或组织编码已存在!', -1);
    }
    // 如果通过则执行 sql save 语句
    const result = await this.organizationModel.update(organizationInfo, {
      where: { org_id },
    });
    // 保存操作日志
    // 根据主键查找出当前数据
    const currentInfo = await this.organizationModel.findByPk(org_id);
    await this.operationLogsService.saveLogs(
      `编辑组织：${currentInfo.org_name}`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 删除组织数据
   * @return {*}
   * @author: Cyan
   */
  async deleteOrganization(
    org_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
    const exist = await this.organizationModel.findOne({
      where: { parent_id: org_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, '当前数据存在子级，不能删除!', -1);
    }
    // 根据主键查找出当前数据
    const currentInfo = await this.organizationModel.findByPk(org_id);
    // 如果通过则执行 sql delete 语句
    const result = await this.organizationModel.destroy({ where: { org_id } });
    // 保存操作日志
    await this.operationLogsService.saveLogs(
      `删除组织：${currentInfo.org_name}`,
    );
    return responseMessage(result);
  }
}
