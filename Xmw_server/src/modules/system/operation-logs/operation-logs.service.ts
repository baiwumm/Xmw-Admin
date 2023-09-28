/*
 * @Description: OperationLogs Service
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-12-12 10:11:05
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:41:04
 */
import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { Request } from 'express';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';

import { XmwLogs } from '@/models/xmw_logs.model'; // Xmw_logs 实体
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import { responseMessage } from '@/utils'; // 全局工具函数
import type { PageResponse, Response, SessionTypes } from '@/utils/types';
import type { LogsAttributes } from '@/utils/types/system';

import { ListOperationLogsDto } from './dto';
@Injectable({ scope: Scope.REQUEST })
export class OperationLogsService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { session: SessionTypes },
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwLogs)
    private readonly logsModel: typeof XmwLogs,
  ) { }

  /**
   * @description: 保存操作日志
   * @author: 白雾茫茫丶
   */
  async saveLogs(content: string) {
    const { url, method, headers, ip, body } = this.request;
    const logData: LogsAttributes = {
      user_id: this.request.session.currentUserInfo.user_id,
      content,
      ip,
      path: headers.referer,
      user_agent: headers['user-agent'],
      method,
      api_url: url,
      params: body,
    };
    // 将数据插入到表中
    await this.logsModel.create(logData);
  }

  /**
   * @description: 获取操作日志列表
   * @author: 白雾茫茫丶
   */
  async getLogsList(
    logsInfo: ListOperationLogsDto,
  ): Promise<Response<PageResponse<XmwLogs>>> {
    // 解构参数
    const { start_time, end_time, pageSize, current } = logsInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 分页查询数据
    const { count, rows } = await this.logsModel.findAndCountAll({
      attributes: {
        include: ['u.cn_name', 'u.user_name'],
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
      order: [['created_time', 'desc']], // 排序规则,
    });
    return responseMessage({ list: rows, total: count });
  }
}
