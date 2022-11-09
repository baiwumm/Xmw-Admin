/*
 * @Description: 查询列表返回响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 17:19:57
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 14:57:29
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResponseDto } from '@/dto/response.dto';
import { ResData } from '@/global/interface';

/**
 * @description: 国际化列表响应体结构 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseInternationalDto extends ResponseDto {
  @ApiProperty({
    type: Array,
    description: '响应体',
    default: [
      {
        id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
        name: 'international',
        'zh-CN': '登录成功！',
        'en-US': 'Login successful!',
        'ja-JP': 'ログイン成功!',
        'zh-TW': '登錄成功！',
        parent_id: '0c01ef7d-2f6f-440a-b642-62564d41f473',
        founder: '0c01ef7d-2f6f-440a-b642-62564d41f473',
        sort: '1',
        created_time: '2022-10-01 00:00:00',
        updated_time: '2022-10-02 23:59:59',
        children: [],
      },
    ],
  })
  data: ResData[];
}

/**
 * @description: 多语言响应体结构 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseLangDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {
      'zh-CN': { 'pages.login.success': '登录成功！' },
      'en-US': { 'pages.login.success': 'Login successful!' },
      'ja-JP': { 'pages.login.success': 'ログイン成功!' },
      'zh-TW': { 'pages.login.success': '登錄成功！' },
    },
  })
  data: ResData;
}

/**
 * @description: 创建国际化数据 Dto
 * @return {*}
 * @author: Cyan
 */
export class CreateInternationalDto extends ResponseDto {
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
  data: ResData;
}
