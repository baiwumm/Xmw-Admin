/*
 * @Description: RoleManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:39:28
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-29 23:25:18
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, Sequelize, Transaction } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { ResData, ResponseModel, PageResModel } from '@/global/interface'; // interface
import { XmwRole } from '@/models/xmw_role.model'; // 数据库实体
import { ListRoleManagementDto, SaveRoleManagementDto } from './dto';

type permissionModel = {
  role_id: string;
  menu_id: string;
};

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

  async createRole({
    menu_permission,
    ...roleInfo
  }: SaveRoleManagementDto): Promise<ResponseModel<ResData> | void> {
    // 解构参数
    const { role_name, role_code } = roleInfo;
    // 角色名称和角色编码不能相同
    const exist = await this.roleModel.findOne({
      where: { [Op.or]: { role_name, role_code } },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return { data: {}, msg: '角色名称或角色编码已存在！', code: -1 };
    }
    // 执行事务
    // const t = await this.sequelize.transaction();
    // 执行 sql insert 语句,插入数据到 xmw_role 表中
    const result = await this.roleModel.create(roleInfo);
    // 再把角色对应的权限插入到 xmw_permission 中
    const permissionData: permissionModel[] = menu_permission.map(
      (menu_id: string) => {
        return { role_id: result.role_id, menu_id };
      },
    );
    await this.roleModel.bulkCreate(permissionData);

    return { data: result };
  }
}
