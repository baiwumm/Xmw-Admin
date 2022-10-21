/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-21 10:59:21
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-21 11:00:02
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { ResData } from '@/common/interface';

/**
 * @description: 岗位管理列表响应体结构 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseJobsDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
      {
        jobs_id: '046aeaa4-f707-4981-8a30-6e4a8488eb52',
        jobs_name: '研发工程师',
        org_id: '79581210-60b7-4c66-b6ae-14b013c3661e',
        parent_id: null,
        leader: null,
        describe: '研发工程师',
        founder: null,
        sort: 1,
        created_time: '2022-09-23T15:43:47.000Z',
        updated_time: null,
        children: [],
      },
    ],
  })
  data: ResData[];
}
