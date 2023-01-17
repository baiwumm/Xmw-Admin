/*
 * @Description: OperationLogs Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-12 10:11:05
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 15:51:23
 */
import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectModel } from '@nestjs/sequelize';
import { XmwLogs } from '@/models/xmw_logs.model'; // Xmw_logs 实体
import { Request } from 'express';
import { SessionModel } from '@/global/interface'; // interface

@Injectable({ scope: Scope.REQUEST })
export class OperationLogsService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request & { session: SessionModel },
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwLogs)
    private readonly logsModel: typeof XmwLogs,
  ) { }

  /**
   * @description: 保存操作日志
   * @return {*}
   * @author: Cyan
   */
  async saveLogs(content: string): Promise<void> {
    const { url, method, headers, ip, body } = this.request;
    const logData = {
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
}
