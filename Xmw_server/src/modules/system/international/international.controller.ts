/*
 * @Description: International Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 17:18:01
 */
import { Controller, Get, Post, Query, Body, UsePipes } from '@nestjs/common';
import { InternationalService } from './international.service'; // International Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
} from '@nestjs/swagger'; // swagger 接口文档
import { Data, ResponseModel } from '@/common/interface'; // TS类型注解
import { ValidationPipe } from '@/pipe/validation.pipe'; // 参数校验
import {
  InternationalListEto,
  InternationalResponseEto,
  InternationalCreateEto,
} from '@/dto/international.dto'; // Swagger Dto

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
  constructor(private readonly internationalService: InternationalService) {}
  /**
   * @description: 获取当前语言的国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Get('allLocales')
  async getAllLocalesLang(): Promise<ResponseModel<Data>> {
    const response = await this.internationalService.getAllLocalesLang();
    return { data: response };
  }

  /**
   * @description: 获取国际化列表
   * @return {*}
   * @author: Cyan
   */
  @Get()
  @ApiOkResponse({ type: InternationalResponseEto, isArray: true })
  async getInternationalList(
    @Query() params: InternationalListEto,
  ): Promise<ResponseModel> {
    const response = await this.internationalService.getInternationalList(
      params,
    );
    return { data: response };
  }

  /**
   * @description: 创建国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Post()
  @UsePipes(new ValidationPipe())
  async createInternational(
    @Body() params: InternationalCreateEto,
  ): Promise<ResponseModel<Data>> {
    const response = await this.internationalService.createInternational(
      params,
    );
    console.log('responseresponseresponse', response);
    return { data: response };
  }
}
