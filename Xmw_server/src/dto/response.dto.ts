/*
 * @Description: 响应体 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-19 17:23:03
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-28 10:34:22
 */
import { ApiProperty } from '@nestjs/swagger';
import { ResData, PageResModel } from '@/global/interface';

/**
 * @description: 统一响应体 Dto
 * @return {*}
 * @author: Cyan
 */
export class ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: {},
  })
  data: ResData;

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
 * @return {*}
 * @author: Cyan
 */
export class UpdateResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: [1],
  })
  data: PageResModel<number[]>;
}

/**
 * @description: 删除数据 Dto
 * @return {*}
 * @author: Cyan
 */
export class DeleteResponseDto extends ResponseDto {
  @ApiProperty({
    type: Object,
    description: '响应体',
    default: 1,
  })
  data: PageResModel<number>;
}
