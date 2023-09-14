/*
 * @Description: Announcement Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:18:06
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-12 15:59:06
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { XmwAnnouncement } from '@/models/xmw_announcement.model'; // xmw_announcement 实体
import { OperationLogsService } from '@/modules/system/operation-logs/operation-logs.service'; // OperationLogs Service
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import {
  ResData,
  ResponseModel,
  SessionModel,
  PageResModel,
} from '@/global/interface'; // interface
import { ListAnnouncementDto, SaveAnnouncementDto } from './dto';
import { responseMessage } from '@/utils'; // 全局工具函数

@Injectable()
export class AnnouncementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwAnnouncement)
    private readonly announcementModel: typeof XmwAnnouncement,
    private readonly operationLogsService: OperationLogsService,
  ) { }

  /**
   * @description: 获取活动公告列表
   * @return {*}
   * @author: 白雾茫茫丶
   */
  async getAnnouncementList(
    announcementInfo: ListAnnouncementDto,
  ): Promise<PageResModel<XmwAnnouncement[]>> {
    // 解构参数
    const { title, type, status, pinned, pageSize, current } = announcementInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (title) where.title = { [Op.substring]: title };
    if (type) where.type = { [Op.eq]: type };
    if (status) where.status = { [Op.eq]: status };
    if (pinned) where.pinned = { [Op.eq]: pinned };
    // 分页查询数据
    const { count, rows } = await this.announcementModel.findAndCountAll({
      attributes: {
        include: ['u.cn_name', 'u.avatar_url'],
      },
      // 联表查询
      include: [
        {
          model: XmwUser,
          as: 'u',
          attributes: [],
        },
      ],
      raw: true,
      offset: (Number(current) - 1) * pageSize,
      limit: Number(pageSize),
      where,
      order: [
        ['pinned', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
    });
    return { list: rows, total: count };
  }

  /**
   * @description: 创建活动公告
   * @return {*}
   * @author: 白雾茫茫丶
   */
  async createAnnouncement(
    announcementInfo: SaveAnnouncementDto,
    session: SessionModel,
  ): Promise<ResponseModel<ResData | SaveAnnouncementDto>> {
    // 如果通过则执行 sql insert 语句
    const result = await this.announcementModel.create({
      ...announcementInfo,
      user_id: session?.currentUserInfo?.user_id,
    });
    // 保存操作日志
    await this.operationLogsService.saveLogs(
      `创建活动公告：${announcementInfo.title}`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 编辑活动公告
   * @return {*}
   * @author: 白雾茫茫丶
   */
  async updateAnnouncement(
    announcement_id: string,
    announcementInfo: SaveAnnouncementDto,
  ): Promise<ResponseModel<ResData | SaveAnnouncementDto>> {
    // 如果通过则执行 sql update 语句
    const result = await this.announcementModel.update(announcementInfo, {
      where: { announcement_id },
    });
    // 保存操作日志
    await this.operationLogsService.saveLogs(
      `编辑活动公告：${announcementInfo.title}`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 删除活动公告
   * @return {*}
   * @author: 白雾茫茫丶
   */
  async deleteAnnouncement(
    announcement_id: string,
  ): Promise<ResponseModel<ResData | number>> {
    // 根据主键查找出当前数据
    const currentInfo = await this.announcementModel.findByPk(announcement_id);
    // 如果通过则执行 sql delete 语句
    const result = await this.announcementModel.destroy({
      where: { announcement_id },
    });
    // 保存操作日志
    await this.operationLogsService.saveLogs(
      `删除活动公告：${currentInfo.title}`,
    );
    return responseMessage(result);
  }

  /**
   * @description: 更新是否置顶
   * @author: 白雾茫茫丶
   */
  async updatePinned(
    announcement_id: string,
    pinned: number,
  ): Promise<ResponseModel<ResData | number[]>> {
    // 执行 update 更新 xmw_role 状态
    const result = await this.announcementModel.update(
      { pinned },
      { where: { announcement_id } },
    );
    // 保存操作日志
    // 根据主键查找出当前数据
    const currentInfo = await this.announcementModel.findByPk(announcement_id);
    await this.operationLogsService.saveLogs(
      `更新【${currentInfo.title}】是否置顶状态：${{ 0: '否', 1: '是' }[pinned]
      }`,
    );
    return responseMessage(result);
  }
}
