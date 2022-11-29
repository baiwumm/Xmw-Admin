/*
 * @Description: 登录鉴权 Dto
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 10:34:23
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 10:20:53
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
    required: false,
  })
  user_name?: string;

  @ApiProperty({
    type: String,
    description: '密码',
    default: '+eUwGEfC9+bY+NgU22Ol4g==',
    required: false,
  })
  password?: string;

  @ApiProperty({
    type: String,
    description: '手机号码',
    default: '13800138000',
    required: false,
  })
  phone?: string;
}
