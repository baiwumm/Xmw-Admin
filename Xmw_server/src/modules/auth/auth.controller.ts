/*
 * @Description: Auth Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-11-25 14:30:19
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-10 11:32:28
 */
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Session,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档
import { Request } from 'express';
import * as svgCaptcha from 'svg-captcha';
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import { ResponseDto } from '@/dto/response.dto';
import { getRealIp, responseMessage } from '@/utils';
import type { SessionTypes } from '@/utils/types';

import { AuthService } from './auth.service'; // Auth Service
import {
  LoginParamsDto,
  LoginResponseDto,
  PermissionResponseDto,
  RoutesMenuResponseDto,
  UserInfoResponseDto,
  VerifyCodeResponseDto,
} from './dto';

@ApiTags('用户登录模块')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@UseInterceptors(LoggerInterceptor)
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * @description: 用户登录
   * @author: 白雾茫茫丶
   */
  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiOperation({ summary: '用户登录' })
  async login(
    @Body() loginParams: LoginParamsDto,
    @Session() session: SessionTypes,
    @Req() req: Request,
  ) {
    const response = await this.authService.loginSingToken(
      loginParams,
      getRealIp(req),
      session,
    );
    return response;
  }

  /**
   * @description: 用户退出登录
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Post('/logout')
  @ApiOkResponse({ type: ResponseDto })
  @ApiOperation({ summary: '退出登录' })
  async logout(@Session() session: SessionTypes) {
    const response = await this.authService.logout(session);
    return response;
  }

  /**
   * @description: 获取当前用户信息
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/user-info')
  @ApiOkResponse({ type: UserInfoResponseDto })
  @ApiOperation({ summary: '获取当前用户信息' })
  async getCurrentUserInfo(@Session() session: SessionTypes) {
    return responseMessage(session.currentUserInfo);
  }

  /**
   * @description: 获取用户按钮权限
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/permissions')
  @ApiOkResponse({ type: PermissionResponseDto })
  @ApiOperation({ summary: '获取用户按钮权限' })
  async getPermissions(@Session() session: SessionTypes) {
    const response = await this.authService.getPermissions(session);
    return response;
  }

  /**
   * @description: 获取用户权限菜单
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get('/routes-menu')
  @ApiOkResponse({ type: RoutesMenuResponseDto })
  @ApiOperation({ summary: '获取用户权限菜单' })
  async getRoutesMenus(@Session() session: SessionTypes) {
    const response = await this.authService.getRoutesMenus(session);
    return response;
  }

  /**
   * @description: 获取图形验证码
   * @author: 白雾茫茫丶
   */
  @Get('verify-code') //当请求该接口时，返回一张随机图片验证码
  @ApiOkResponse({ type: VerifyCodeResponseDto })
  @ApiOperation({ summary: '获取图形验证码' })
  async getCaptcha(@Session() session: SessionTypes, @Res() res) {
    const captcha = svgCaptcha.createMathExpr({
      //可配置返回的图片信息
      size: 4, // 验证码长度
      ignoreChars: '0oO1ilI', // 验证码字符中排除 0oO1ilI
      noise: 2, // 干扰线条的数量
      width: 132,
      height: 40,
      fontSize: 50,
      color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
      background: '#fff',
    });
    session.verifyCode = captcha.text; //使用session保存验证，用于登陆时验证
    res.type('image/svg+xml'); //指定返回的类型
    return res.send(responseMessage(captcha.data)); //给页面返回一张图片
  }
}
