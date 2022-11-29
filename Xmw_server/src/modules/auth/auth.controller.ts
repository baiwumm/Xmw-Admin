/*
 * @Description: Auth Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 14:30:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-29 16:38:50
 */
import { Controller, Post, Body, Session, Get } from '@nestjs/common';
import { ResData, ResponseModel } from '@/global/interface'; // TS类型注解
import { AuthService } from './auth.service'; // Auth Service
import { IpAddress } from '@/utils/requestIp'; // 获取客户端真实IP
import { LoginParamsDto } from './dto';
import { responseMessage } from '@/utils';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description: 用户登录
   * @return {*}
   * @author: Cyan
   */
  @Post('/login')
  async login(
    @Body() loginParams: LoginParamsDto,
    @IpAddress() clinetIp: string,
    @Session() session: Record<string, any>,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.authService.loginSingToken(
      loginParams,
      clinetIp,
      session,
    );
    return response;
  }

  /**
   * @description: 获取当前用户信息
   * @return {*}
   * @author: Cyan
   */
  @Get('/user-info')
  async getCurrentUserInfo(
    @Session() session: Record<string, any>,
  ): Promise<ResponseModel<ResData>> {
    return responseMessage(session.currentUserInfo);
  }
}
