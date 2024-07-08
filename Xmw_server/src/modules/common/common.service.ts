/*
 * @Author: 白雾茫茫丶<baiwumm.com>
 * @Date: 2024-07-08 13:55:01
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-07-08 14:41:29
 * @Description: 请求第三方接口
 */
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom, map } from 'rxjs';

import { responseMessage } from '@/utils'; // 全局工具函数
import type { Response } from '@/utils/types';

@Injectable()
export class CommonService {
  constructor(private readonly httpService: HttpService) { }

  /**
   * @description: 掘金文章列表
   */
  async juejin(params): Promise<Response> {
    const url = 'https://api.juejin.cn/content_api/v1/article/query_list';
    const responseData = await lastValueFrom(
      this.httpService.post(url, params).pipe(map((res) => res.data)),
    );
    return responseMessage({
      list: responseData.data,
      total: responseData.count,
    });
  }
}
