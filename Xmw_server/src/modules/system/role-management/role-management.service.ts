/*
 * @Description: RoleManagement Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-28 17:39:28
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-21 15:26:22
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { Sequelize } from 'sequelize-typescript';

import { XmwMenu } from '@/models/xmw_menu.model';
import { XmwPermission } from '@/models/xmw_permission.model';
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体
import { responseMessage } from '@/utils'; // 全局工具函数
import type {
  PageResponse,
  Response,
  SessionTypes,
  Status,
} from '@/utils/types';

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

    @InjectModel(XmwPermission)
    private readonly permissionModel: typeof XmwPermission,

    private sequelize: Sequelize,
  ) { }

  /**
   * @description: 获取角色管理列表
   * @author: 白雾茫茫丶
   */
  async getRoleList(
    roleInfo: ListRoleManagementDto,
  ): Promise<Response<PageResponse<XmwRole>>> {
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
    const count = await this.roleModel.count();
    const list = await this.roleModel.findAll({
      // 联表查询
      include: [
        {
          model: XmwPermission,
          as: 'menu_permission',
          include: [
            {
              model: XmwRole,
              as: 'roleInfo',
            },
            {
              model: XmwMenu,
              as: 'menuInfo',
            },
          ],
        },
      ],
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
    });
    return responseMessage({ list, total: count });
  }

  /**
   * @description: 创建角色数据
   * @author: 白雾茫茫丶
   */
  async createRole(
    { menu_permission, ...roleInfo }: SaveRoleManagementDto,
    session: SessionTypes,
  ): Promise<Response<SaveRoleManagementDto>> {
    // 解构参数
    const { role_name, role_code } = roleInfo;
    // 角色名称和角色编码不能相同
    const exist = await this.roleModel.findOne({
      where: { [Op.or]: { role_name, role_code } },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return responseMessage({}, '角色名称或角色编码已存在!', -1);
    }

    // 开始一个事务并将其保存到变量中
    const t = await this.sequelize.transaction();
    try {
      // 执行 sql insert 语句,插入数据到 xmw_role 表中
      const result = await this.roleModel.create(
        { ...roleInfo, founder: session.currentUserInfo.user_id },
        { transaction: t },
      );
      // 再把角色对应的权限插入到 xmw_permission 中
      const permissionData: permissionModel[] = menu_permission.map(
        (menu_id: string) => {
          return { role_id: result.role_id, menu_id };
        },
      );
      await this.permissionModel.bulkCreate(permissionData, { transaction: t });
      // 如果执行到此行,且没有引发任何错误,提交事务
      await t.commit();
      return responseMessage(result);
    } catch (error) {
      // 如果执行到达此行,则抛出错误,回滚事务
      await t.rollback();
      return responseMessage({}, error, -1);
    }
  }

  /**
   * @description: 更新角色数据
   * @author: 白雾茫茫丶
   */
  async updateRole(
    role_id: string,
    { menu_permission, ...roleInfo }: SaveRoleManagementDto,
  ): Promise<Response<number[]>> {
    // 解构参数
    const { role_name, role_code } = roleInfo;
    // 角色名称和角色编码不能相同
    const exist = await this.roleModel.findOne({
      where: {
        [Op.or]: { role_name, role_code },
        role_id: { [Op.ne]: role_id },
      },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return responseMessage({}, '角色名称或角色编码已存在!', -1);
    }

    // 开始一个事务并将其保存到变量中
    const t = await this.sequelize.transaction();
    try {
      // 先删除权限表相关的数据
      await this.permissionModel.destroy({
        where: { role_id },
        transaction: t,
      });
      // 执行 sql update 语句,更新 xmw_role 表数据
      const result = await this.roleModel.update(roleInfo, {
        where: { role_id },
        transaction: t,
      });
      // 再把角色对应的权限插入到 xmw_permission 中
      const permissionData: permissionModel[] = menu_permission.map(
        (menu_id: string) => {
          return { role_id, menu_id };
        },
      );
      await this.permissionModel.bulkCreate(permissionData, { transaction: t });
      // 如果执行到此行,且没有引发任何错误,提交事务
      await t.commit();
      return responseMessage(result);
    } catch (error) {
      // 如果执行到达此行,则抛出错误,回滚事务
      await t.rollback();
      return responseMessage({}, error, -1);
    }
  }

  /**
   * @description: 删除角色数据
   * @author: 白雾茫茫丶
   */
  async deleteRole(role_id: string): Promise<Response<number>> {
    // 开始一个事务并将其保存到变量中
    const t = await this.sequelize.transaction();
    try {
      // 先删除 xmw_permission 表关联的数据
      await this.permissionModel.destroy({
        where: { role_id },
        transaction: t,
      });
      // 再删除 xmw_role 关联的数据
      const result = await this.roleModel.destroy({
        where: { role_id },
        transaction: t,
      });
      // 如果执行到此行,且没有引发任何错误,提交事务
      await t.commit();
      return responseMessage(result);
    } catch (error) {
      // 如果执行到达此行,则抛出错误,回滚事务
      await t.rollback();
      return responseMessage({}, error, -1);
    }
  }

  /**
   * @description: 更新角色状态
   * @author: 白雾茫茫丶
   */
  async updateRoleStatus(
    role_id: string,
    status: Status,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.roleModel.update(
      { status },
      { where: { role_id } },
    );
    return responseMessage(result);
  }
}
