/*
 * @Description: Auth Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 14:30:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-25 17:25:35
 */
import { Controller, Post, Body } from '@nestjs/common';
import { ResData, ResponseModel } from '@/global/interface'; // TS类型注解
import { AuthService } from './auth.service' // Auth Service
import { IpAddress } from '@/utils/requestIp' // 获取客户端真实IP
import { LoginParamsDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }

  /**
   * @description: 用户登录
   * @return {*}
   * @author: Cyan
   */
  @Post('/login')
  async login(@Body() loginParams: LoginParamsDto, @IpAddress() clinetIp: string): Promise<ResponseModel<ResData>> {
    const response = await this.AuthService.loginSingToken(loginParams, clinetIp);
    return response;
  }
}
