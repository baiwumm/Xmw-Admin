/*
 * @Description: 登录鉴权 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 10:34:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 15:15:44
 */
import { ApiProperty } from '@nestjs/swagger';

/**
 * @description: 登录参数
 * @return {*}
 * @author: Cyan
 */
export class LoginParamsDto {
  @ApiProperty({
    type: String,
    description: '登录类型',
    default: 'account',
  })
  type: string;

  @ApiProperty({
    type: String,
    description: '用户名',
    default: 'admin',
  })
  user_name: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: '+eUwGEfC9+bY+NgU22Ol4g==',
  })
  password: string;
}
