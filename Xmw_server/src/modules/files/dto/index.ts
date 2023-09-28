/*
 * @Description: 上传文件 Dto
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-25 10:34:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 10:43:55
 */
import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: String,
    description: '文件流',
    format: 'binary',
  })
  file: BinaryData;
}
