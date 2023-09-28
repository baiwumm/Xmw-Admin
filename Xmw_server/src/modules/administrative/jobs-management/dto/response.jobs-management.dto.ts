/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-21 10:59:21
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:37:34
 */
import { ApiProperty } from '@nestjs/swagger';

import { ResponseDto } from '@/dto/response.dto';
import { XmwJobs } from '@/models/xmw_jobs.model'; // xmw_jobs 实体

/**
 * @description: 岗位管理列表响应体结构 Dto
 * @author: 白雾茫茫丶
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
        leader: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
        describe: '研发工程师',
        founder: 'bf75a509-f90e-4a29-8bf7-470b581550f6',
        founder_name: '谢明伟',
        sort: 1,
        created_time: '2022-09-23 15:43:47',
        updated_time: null,
        children: [],
      },
    ],
  })
  data: XmwJobs[];
}

/**
 * @description: 创建岗位数据 Dto
 * @author: 白雾茫茫丶
 */
export class CreateJobsDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      parent_id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
      jobs_name: 'UI 设计师',
      org_id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
      sort: 1,
      describe:
        '“UI”的本义是用户界面，是英文User和interface的缩写。UI设计师简称UID（User Interface Designer），指从事对软件的人机交互、操作逻辑、界面美观的整体设计工作的人。',
      created_time: '2022-11-09T06:45:01.108Z',
      updated_time: '2022-11-09T06:45:01.108Z',
    },
  })
  data: XmwJobs;
}
