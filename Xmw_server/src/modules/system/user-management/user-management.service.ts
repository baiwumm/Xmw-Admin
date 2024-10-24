/*
 * @Description: UserManagement Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-09 17:44:15
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-10-12 09:21:47
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';

import { XmwJobs } from '@/models/xmw_jobs.model';
import { XmwOrganization } from '@/models/xmw_organization.model';
import { XmwRole } from '@/models/xmw_role.model';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { responseMessage } from '@/utils'; // 全局工具函数
import type {
  PageResponse,
  Response,
  SessionTypes,
  Status,
} from '@/utils/types';

import { ListUserManagementDto, SaveUserManagementDto } from './dto';

@Injectable()
export class UserManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwUser)
    private readonly userModel: typeof XmwUser,
  ) { }

  /**
   * @description: 获取用户管理列表
   * @author: 白雾茫茫丶
   */
  async getUserList(
    userInfo: ListUserManagementDto,
  ): Promise<Response<PageResponse<XmwUser>>> {
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
        include: ['j.jobs_name', 'o.org_name', 'r.role_name'],
      },
      // 联表查询
      include: [
        {
          model: XmwJobs,
          as: 'j',
          attributes: [],
        },
        {
          model: XmwOrganization,
          as: 'o',
          attributes: [],
        },
        {
          model: XmwRole,
          as: 'r',
          attributes: [],
        },
      ],
      raw: true,
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [['sort', 'desc']], // 排序规则,
      distinct: true,
    });
    return responseMessage({ list: rows, total: count });
  }

  /**
   * @description: 创建用户数据
   * @author: 白雾茫茫丶
   */
  async createUser(
    userInfo: SaveUserManagementDto,
    session: SessionTypes,
  ): Promise<Response<SaveUserManagementDto>> {
    // 解构参数
    const { user_name, work_no, phone } = userInfo;
    const [result, created] = await this.userModel.findOrCreate({
      // 用户名称和用户工号、手机号码不能相同
      where: { [Op.or]: { user_name, work_no, phone } },
      // 如果不存在则插入数据
      defaults: {
        ...userInfo,
        founder: session?.currentUserInfo?.user_id,
      },
    });
    // 判断是否创建
    if (created) {
      return responseMessage(result);
    } else {
      return responseMessage({}, '用户名称和用户工号、手机号码已存在!', -1);
    }
  }

  /**
   * @description: 更新用户数据
   * @author: 白雾茫茫丶
   */
  async updateUser(
    user_id: string,
    userInfo: SaveUserManagementDto,
    session: SessionTypes,
  ): Promise<Response<number[]>> {
    // 解构参数
    const { user_name, work_no, phone } = userInfo;
    if (user_name && work_no && phone) {
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
        return responseMessage({}, '用户名称和用户工号、手机号码已存在!', -1);
      }
    }
    // 如果通过则执行 sql save 语句
    const result = await this.userModel.update(userInfo, {
      where: { user_id },
    });
    // 更新 session 用户信息
    session.currentUserInfo = { ...session.currentUserInfo, ...userInfo };
    return responseMessage(result);
  }

  /**
   * @description: 删除角色数据
   * @author: 白雾茫茫丶
   */
  async deleteUser(user_id: string): Promise<Response<number>> {
    // 超级管理员不能删除，即 admin 用户
    const exist = await this.userModel.findOne({
      where: { user_name: 'admin', user_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return responseMessage({}, 'admin 用户为超级管理员，不能删除!', -1);
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.userModel.destroy({ where: { user_id } });
    return responseMessage(result);
  }

  /**
   * @description: 更新用户状态
   * @author: 白雾茫茫丶
   */
  async updateUserStatus(
    user_id: string,
    status: Status,
  ): Promise<Response<number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.userModel.update(
      { status },
      { where: { user_id } },
    );
    return responseMessage(result);
  }
}
