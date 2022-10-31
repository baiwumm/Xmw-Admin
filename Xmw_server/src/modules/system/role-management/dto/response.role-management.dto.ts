/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 17:19:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 09:59:00
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { PageResModel } from '@/global/interface';

/**
 * @description: 角色管理列表响应体结构 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseRoleManagementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      list: [
        {
          role_id: '79581210-60b7-4c66-b6ae-14b013c3661e',
          role_name: '超级管理员',
          role_code: 'Super Admin',
          menu_permission: ['79581210-60b7-4c66-b6ae-14b013c3661e'],
          describe: '拥有系统全部权限',
          founder: null,
          status: '1',
          sort: 1,
          created_time: '2022-09-15 07:35:08',
          updated_time: '2022-09-15 07:35:08',
        },
      ],
      total: 1,
    },
  })
  data: PageResModel;
}
