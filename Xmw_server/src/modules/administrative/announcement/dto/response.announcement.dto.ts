/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2023-08-25 16:41:00
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:56:52
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';
import { XmwAlready } from '@/models/xmw_already.model'; // xmw_already 实体
import { XmwAnnouncement } from '@/models/xmw_announcement.model'; // xmw_announcement 实体
import type { PageResponse } from '@/utils/types';

/**
 * @description: 活动公告列表响应体结构 Dto
 * @author: 白雾茫茫丶
 */
export class ResponseAnnouncementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      list: [
        {
          announcement_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
          user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
          title: '公司给每个人薪资翻倍拉！',
          content: '<p>哈哈哈、开心</p>',
          type: '1',
          status: 1,
          pinned: 1,
          created_time: '2023-08-25 09:07:08',
          updated_time: '2023-08-26 09:07:08',
        },
      ],
      total: 1,
    },
  })
  data: PageResponse<XmwAnnouncement>;
}

/**
 * @description: 创建活动公告 Dto
 * @author: 白雾茫茫丶
 */
export class CreateAnnouncementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      announcement_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
      user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
      title: '公司给每个人薪资翻倍拉！',
      content: '<p>哈哈哈、开心</p>',
      type: '1',
      status: 1,
      pinned: 1,
      created_time: '2022-11-09T06:45:01.108Z',
      updated_time: '2022-11-09T06:45:01.108Z',
    },
  })
  data: XmwAnnouncement;
}

/**
 * @description: 已读活动公告 Dto
 * @author: 白雾茫茫丶
 */
export class CreateAlreadyDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      announcement_id: 'c293df80-43e5-4a79-b642-42fb427fe8a9',
      user_id: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
    },
  })
  data: XmwAlready;
}
