/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-10 14:30:15
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 17:06:05
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import type { PageResponse } from '@/utils/types';

/**
 * @description: 用户管理列表响应体结构 Dto
 * @author: 白雾茫茫丶
 */
export class ResponseUserManagementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      list: [
        {
          tags: ['哈哈'],
          city: ['13', '1302', '130203'],
          user_id: '9447a972-974b-44a4-b070-2de69c9fd9ad',
          user_name: '1233',
          work_no: '123',
          password: 'v+M+IRi7oG0tn2sJGZUHRQ==',
          cn_name: '123',
          en_name: null,
          age: 18,
          email: null,
          phone: '13800138000',
          avatar_url:
            'https://react.baiwumm.com/static/image/2023-01-13/5d7453ad-477c-47b9-be6e-212227710033.gif',
          sex: '0',
          sort: 1,
          status: 1,
          token: null,
          motto: null,
          address: '123',
          jobs_id: '046aeaa4-f707-4981-8a30-6e4a8488eb52',
          org_id: '9e0d462d-5254-41ba-b8f3-982a7cf588f0',
          role_id: 'c49aeeca-bc95-444e-a437-a2d36e79def4',
          founder: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
          founder_name: '谢明伟',
          login_num: 0,
          login_last_ip: null,
          login_last_time: null,
          created_time: '2022-11-10 14:28:13',
          updated_time: '2022-11-10 14:28:13',
        },
      ],
      total: 1,
    },
  })
  data: PageResponse<XmwUser>;
}

/**
 * @description: 创建用户数据 Dto
 * @author: 白雾茫茫丶
 */
export class CreateUserManagementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      tags: ['哈哈'],
      city: ['13', '1302', '130203'],
      user_id: '9447a972-974b-44a4-b070-2de69c9fd9ad',
      login_num: 0,
      user_name: '1233',
      work_no: '123',
      cn_name: '123',
      age: 18,
      sex: 1,
      phone: '13800138000',
      sort: 1,
      status: '1',
      role_id: 'c49aeeca-bc95-444e-a437-a2d36e79def4',
      org_id: '9e0d462d-5254-41ba-b8f3-982a7cf588f0',
      jobs_id: '046aeaa4-f707-4981-8a30-6e4a8488eb52',
      address: '123',
      avatar_url:
        'https://react.baiwumm.com/static/image/2023-01-13/5d7453ad-477c-47b9-be6e-212227710033.gif',
      password: 'v+M+IRi7oG0tn2sJGZUHRQ==',
      updated_time: '2022-11-10T06:28:13.581Z',
      created_time: '2022-11-10T06:28:13.581Z',
    },
  })
  data: PageResponse<XmwUser>;
}
