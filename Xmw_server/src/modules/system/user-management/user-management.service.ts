/*
 * @Description: UserManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-09 17:44:15
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 18:13:31
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { PageResModel } from '@/global/interface'; // interface
import { ListUserManagementDto } from './dto';

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
