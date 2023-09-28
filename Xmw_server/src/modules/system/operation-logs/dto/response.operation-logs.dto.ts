/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-03-17 16:09:30
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 16:49:32
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';
import { XmwLogs } from '@/models/xmw_logs.model'; // Xmw_logs 实体
import type { PageResponse } from '@/utils/types';

export class ResponseOperationLogsDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      list: [
        {
          log_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
          user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
          user_name: 'admin',
          content: '账户登录',
          ip: '::ffff:127.0.0.1',
          path: 'http://localhost:8002/user/login',
          user_agent:
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36',
          params: {
            type: 'account',
            password: 'IqDDrMKzGqHgIOW7ya8cMQ==',
            user_name: 'admin',
            verifyCode: '12',
          },
          method: 'POST',
          api_url: '/v1/auth/login',
          created_time: '2023-03-17 09:07:08',
          updated_time: '2023-03-17 09:07:08',
        },
      ],
      total: 1,
    },
  })
  data: PageResponse<XmwLogs>;
}
