/*
 * @Description: RoleManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:39:28
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-28 17:59:48
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize';
import { ResData, ResponseModel, PageResModel } from '@/global/interface'; // interface
import { XmwRole } from '@/models/xmw_role.model'; // 数据库实体
import { ListRoleManagementDto } from './dto';

@Injectable()
export class RoleManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwRole)
    private readonly roleModel: typeof XmwRole,
  ) {}

  /**
   * @description: 获取角色管理列表
   * @return {*}
   * @author: Cyan
   */
  async getRoleList(roleInfo: ListRoleManagementDto): Promise<PageResModel> {
    // 解构参数
    const {
      role_name,
      role_code,
      status,
      start_time,
      end_time,
      pageSize,
      current,
    } = roleInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (role_name) where.role_name = { [Op.substring]: role_name };
    if (role_code) where.role_code = { [Op.substring]: role_code };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 分页查询数据
    const { count, rows } = await this.roleModel.findAndCountAll({
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
    });
    return { list: rows, total: count };
  }
}
