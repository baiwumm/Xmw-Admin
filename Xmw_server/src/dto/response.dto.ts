/*
 * @Description: 响应体 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-19 17:23:03
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:20:12
 */
import { ApiProperty } from '@nestjs/swagger';

import type { PageResponse } from '@/utils/types';

/**
 * @description: 统一响应体 Dto
 * @author: 白雾茫茫丶
 */
export class ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {},
  })
  data: any;

  @ApiProperty({
    type: String,
    description: '响应信息',
    default: '操作成功！',
  })
  msg: string;

  @ApiProperty({
    type: Number,
    description: '状态码',
    default: 200,
  })
  code: number;
}

/**
 * @description: 更新数据 Dto
 * @author: 白雾茫茫丶
 */
export class UpdateResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: [1],
  })
  data: PageResponse<number[]>;
}

/**
 * @description: 删除数据 Dto
 * @author: 白雾茫茫丶
 */
export class DeleteResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: 1,
  })
  data: PageResponse<number>;
}
