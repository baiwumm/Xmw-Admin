/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 17:19:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 17:58:11
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { PageResModel } from '@/global/interface';
import { XmwRole } from '@/models/xmw_role.model'; // xmw_role 实体

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
          menu_permission: {
            role_id: 'c49aeeca-bc95-444e-a437-a2d36e79def4',
            role_name: '超级管理员',
            role_code: 'Super Admin',
            describe: '拥有系统全部权限。',
            founder: null,
            sort: 99,
            status: 1,
            created_time: '2022-11-08 10:54:45',
            updated_time: '2022-11-08 10:54:45',
            menu_permission: [
              {
                role_id: 'c49aeeca-bc95-444e-a437-a2d36e79def4',
                menu_id: '1360556e-3106-48aa-a030-90edfd7073ea',
              },
              {
                role_id: 'c49aeeca-bc95-444e-a437-a2d36e79def4',
                menu_id: '00d37222-d6b6-43ab-a459-b15610fdcbf3',
              },
            ],
          },
          describe: '拥有系统全部权限',
          founder: null,
          status: 1,
          sort: 1,
          created_time: '2022-09-15 07:35:08',
          updated_time: '2022-09-15 07:35:08',
        },
      ],
      total: 1,
    },
  })
  data: PageResModel<XmwRole[]>;
}

/**
 * @description: 创建角色数据 Dto
 * @return {*}
 * @author: Cyan
 */
export class CreateRoleManagementDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      role_name: '超级管理员',
      role_code: 'Super Admin',
      menu_permission: ['79581210-60b7-4c66-b6ae-14b013c3661e'],
      sort: 1,
      status: 1,
      describe: '拥有系统全部权限',
      created_time: '2022-11-09T06:45:01.108Z',
      updated_time: '2022-11-09T06:45:01.108Z',
    },
  })
  data: PageResModel<XmwRole>;
}
