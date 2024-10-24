/*
 * @Description: International Controller
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: 白雾茫茫丶<baiwumm.com>
 * @LastEditTime: 2024-10-24 14:29:02
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'; // swagger 接口文档

import { DeleteResponseDto, UpdateResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import { LoggerInterceptor } from '@/interceptor/logger.interceptor';
import type { SessionTypes } from '@/utils/types';

import {
  CreateInternationalDto,
  ListInternationalDto,
  ResponseInternationalDto,
  ResponseLangDto,
  SaveInternationalDto,
} from './dto';
import { InternationalService } from './international.service'; // International Service

/* swagger 文档 */
@ApiTags('系统设置-国际化')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@UseInterceptors(LoggerInterceptor)
@Controller('system/internationalization')
export class InternationalController {
  constructor(private readonly internationalService: InternationalService) { }
  /**
   * @description: 获取当前语言的国际化数据
   * @author: 白雾茫茫丶
   */
  @Get('allLocales')
  @ApiOkResponse({ type: ResponseLangDto })
  @ApiOperation({ summary: '获取多语言层级数据' })
  async getAllLocalesLang() {
    const response = await this.internationalService.getAllLocalesLang();
    return response;
  }

  /**
   * @description: 获取国际化列表
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseInternationalDto })
  @ApiOperation({ summary: '获取国际化列表' })
  async getInternationalList(@Query() internationalInfo: ListInternationalDto) {
    const response =
      await this.internationalService.getInternationalList(internationalInfo);
    return response;
  }

  /**
   * @description: 创建国际化数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateInternationalDto })
  @ApiOperation({ summary: '创建国际化数据' })
  async createInternational(
    @Body() internationalInfo: SaveInternationalDto,
    @Session() session: SessionTypes,
  ) {
    const response = await this.internationalService.createInternational(
      internationalInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新国际化数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新国际化数据' })
  async updateInternational(
    @Param('id') id: string,
    @Body() internationalInfo: SaveInternationalDto,
  ) {
    const response = await this.internationalService.updateInternational(
      id,
      internationalInfo,
    );
    return response;
  }

  /**
   * @description: 删除国际化数据
   * @author: 白雾茫茫丶
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除国际化数据' })
  async deleteInternational(@Param('id') id: string) {
    const response = await this.internationalService.deleteInternational(id);
    return response;
  }
}
