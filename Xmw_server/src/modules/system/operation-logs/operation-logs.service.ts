/*
 * @Description: OperationLogs Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-12-12 10:11:05
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-12 13:50:01
 */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { XmwLogs } from '@/models/xmw_logs.model'; // Xmw_logs 实体

@Injectable()
export class OperationLogsService {
  public context: ExecutionContext;
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwLogs)
    private readonly logsModel: typeof XmwLogs,
  ) {}

  /**
   * @description: 保存操作日志
   * @return {*}
   * @author: Cyan
   */
  async saveLogs(content: string): Promise<void> {
    console.log('content', content);
    console.log('this', this);
  }
}
