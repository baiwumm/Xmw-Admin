/*
 * @Description: International Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2023-01-17 14:15:49
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  Session,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InternationalService } from './international.service'; // International Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'; // swagger 接口文档
import { ResData, ResponseModel, SessionModel } from '@/global/interface'; // TS类型注解
import { UpdateResponseDto, DeleteResponseDto } from '@/dto/response.dto'; // 响应体 Dto
import {
  ListInternationalDto,
  SaveInternationalDto,
  ResponseInternationalDto,
  ResponseLangDto,
  CreateInternationalDto,
} from './dto';
import { responseMessage } from '@/utils'; // 全局工具函数

/* swagger 文档 */
@ApiTags('系统设置-国际化')
@ApiHeader({
  name: 'Authorization',
  required: true,
  description: 'token令牌',
})
@ApiBearerAuth()
@Controller('system/international')
export class InternationalController {
  constructor(private readonly internationalService: InternationalService) { }
  /**
   * @description: 获取当前语言的国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Get('allLocales')
  @ApiOkResponse({ type: ResponseLangDto })
  @ApiOperation({ summary: '获取多语言层级数据' })
  async getAllLocalesLang(): Promise<ResponseModel<ResData>> {
    const response = await this.internationalService.getAllLocalesLang();
    return responseMessage(response);
  }

  /**
   * @description: 获取国际化列表
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Get()
  @ApiOkResponse({ type: ResponseInternationalDto })
  @ApiOperation({ summary: '获取国际化列表' })
  async getInternationalList(
    @Query() internationalInfo: ListInternationalDto,
  ): Promise<ResponseModel> {
    const response = await this.internationalService.getInternationalList(
      internationalInfo,
    );
    return responseMessage(response);
  }

  /**
   * @description: 创建国际化数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: CreateInternationalDto })
  @ApiOperation({ summary: '创建国际化数据' })
  async createInternational(
    @Body() internationalInfo: SaveInternationalDto,
    @Session() session: SessionModel,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.internationalService.createInternational(
      internationalInfo,
      session,
    );
    return response;
  }

  /**
   * @description: 更新国际化数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Put('/:id')
  @ApiOkResponse({ type: UpdateResponseDto })
  @ApiOperation({ summary: '更新国际化数据' })
  async updateInternational(
    @Param('id') id: string,
    @Body() internationalInfo: SaveInternationalDto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.internationalService.updateInternational(
      id,
      internationalInfo,
    );
    return response;
  }

  /**
   * @description: 删除国际化数据
   * @return {*}
   * @author: Cyan
   */
  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @ApiOkResponse({ type: DeleteResponseDto })
  @ApiOperation({ summary: '删除国际化数据' })
  async deleteInternational(
    @Param('id') id: string,
  ): Promise<ResponseModel<ResData | number>> {
    const response = await this.internationalService.deleteInternational(id);
    return response;
  }
}
