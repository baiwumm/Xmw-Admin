/*
 * @Description: UserManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-09 17:44:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-17 15:30:41
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { XmwRole } from '@/models/xmw_role.model';
import { XmwOrganization } from '@/models/xmw_organization.model';
import { XmwJobs } from '@/models/xmw_jobs.model';
import { ResData, PageResModel, ResponseModel } from '@/global/interface'; // interface
import { ListUserManagementDto, SaveUserManagementDto } from './dto';

@Injectable()
export class UserManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwUser)
    private readonly userModel: typeof XmwUser,
  ) {}

  /**
   * @description: 获取用户管理列表
   * @return {*}
   * @author: Cyan
   */
  async getUserList(
    userInfo: ListUserManagementDto,
  ): Promise<PageResModel<XmwUser[]>> {
    // 解构参数
    const { user_name, sex, status, start_time, end_time, pageSize, current } =
      userInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (user_name) where.user_name = { [Op.substring]: user_name };
    if (sex) where.sex = { [Op.eq]: sex };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 分页查询数据
    const { count, rows } = await this.userModel.findAndCountAll({
      attributes: {
        include: ['jobs.jobs_name', 'org.org_name', 'role.role_name'],
      },
      // 联表查询
      include: [
        {
          model: XmwJobs,
          as: 'jobs',
          attributes: [],
        },
        {
          model: XmwOrganization,
          as: 'org',
          attributes: [],
        },
        {
          model: XmwRole,
          as: 'role',
          attributes: [],
        },
      ],
      raw: true,
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

  /**
   * @description: 创建用户数据
   * @return {*}
   * @author: Cyan
   */
  async createUser(
    userInfo: SaveUserManagementDto,
  ): Promise<ResponseModel<ResData | SaveUserManagementDto>> {
    // 解构参数
    const { user_name, work_no, phone } = userInfo;
    // 用户名称和用户工号、手机号码不能相同
    const exist = await this.userModel.findOne({
      where: { [Op.or]: { user_name, work_no, phone } },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return {
        data: {},
        msg: '用户名称和用户工号、手机号码已存在！',
        code: -1,
      };
    }

    // 如果通过则执行 sql insert 语句
    const result = await this.userModel.create(userInfo);
    return { data: result };
  }

  /**
   * @description: 更新用户数据
   * @return {*}
   * @author: Cyan
   */
  async updateUser(
    user_id: string,
    userInfo: SaveUserManagementDto,
  ): Promise<ResponseModel<ResData | number[]>> {
    // 解构参数
    const { user_name, work_no, phone } = userInfo;
    // 用户名称和用户工号、手机号码不能相同
    const exist = await this.userModel.findOne({
      where: {
        [Op.or]: { user_name, work_no, phone },
        user_id: {
          [Op.ne]: user_id,
        },
      },
    });
    // 如果有结果，则证明已存在，这里存在两种情况，
    if (exist) {
      return {
        data: {},
        msg: '用户名称和用户工号、手机号码已存在！',
        code: -1,
      };
    }
    // 如果通过则执行 sql save 语句
    const result = await this.userModel.update(userInfo, {
      where: { user_id },
    });
    return { data: result };
  }

  /**
   * @description: 删除角色数据
   * @return {*}
   * @author: Cyan
   */
  async deleteUser(user_id: string): Promise<ResponseModel<ResData | number>> {
    // 超级管理员不能删除，即 admin 用户
    const exist = await this.userModel.findOne({
      where: { user_name: 'admin' },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return { data: {}, msg: '不能删除 admin 用户！', code: -1 };
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.userModel.destroy({ where: { user_id } });
    return { data: result };
  }

  /**
   * @description: 更新用户状态
   * @return {*}
   * @author: Cyan
   */
  async updateUserStatus(
    user_id: string,
    status: number,
  ): Promise<ResponseModel<ResData | number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.userModel.update(
      { status },
      { where: { user_id } },
    );
    return { data: result };
  }
}
