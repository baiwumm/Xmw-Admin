/*
 * @Description: Auth Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-11-25 14:30:19
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-05 10:27:43
 */
import {
  Controller,
  Post,
  Body,
  Session,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { omit } from 'lodash';
import { ResData, ResponseModel } from '@/global/interface'; // TS类型注解
import { AuthService } from './auth.service'; // Auth Service
import { IpAddress } from '@/utils/requestIp'; // 获取客户端真实IP
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { ResponseDto } from '@/dto/response.dto';
import { LoginParamsDto, LoginResponseDto, UserInfoResponseDto } from './dto';
import { responseMessage } from '@/utils';

@ApiTags('用户登录模块')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @description: 用户登录
   * @return {*}
   * @author: Cyan
   */
  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiOperation({ summary: '用户登录' })
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
   * @description: 用户退出登录
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @ApiOkResponse({ type: ResponseDto })
  @ApiOperation({ summary: '退出登录' })
  async logout(
    @Session() session: Record<string, any>,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.authService.logout(session);
    return response;
  }

  /**
   * @description: 获取当前用户信息
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/user-info')
  @ApiOkResponse({ type: UserInfoResponseDto })
  @ApiOperation({ summary: '获取当前用户信息' })
  async getCurrentUserInfo(
    @Session() session: Record<string, any>,
  ): Promise<ResponseModel<ResData>> {
    return responseMessage(omit(session.currentUserInfo, 'password'));
  }

  /**
   * @description: 获取用户权限菜单
   * @return {*}
   * @author: Cyan
   */
  @Get('/permission-menu')
  @ApiOperation({ summary: '获取用户权限菜单' })
  async getPermissionMenu(
    @Session() session: Record<string, any>,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.authService.getPermissionMenu(session);
    return response;
  }
}
