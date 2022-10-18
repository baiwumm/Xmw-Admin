/*
 * @Description: International Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-18 18:09:38
 */
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
} from '@nestjs/common';
import { InternationalService } from './international.service'; // International Service
import {
  ApiBearerAuth,
  ApiTags,
  ApiHeader,
  ApiOkResponse,
} from '@nestjs/swagger'; // swagger 接口文档
import { ResData, ResponseModel } from '@/common/interface'; // TS类型注解
import {
  InternationalListEto,
  InternationalResponseEto,
  InternationalSaveEto,
  InternationalDeleteEto,
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
  async getAllLocalesLang(): Promise<ResponseModel<ResData>> {
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
    @Query() internationalInfo: InternationalListEto,
  ): Promise<ResponseModel> {
    const response = await this.internationalService.getInternationalList(
      internationalInfo,
    );
    return { data: response };
  }

  /**
   * @description: 创建国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Post()
  async createInternational(
    @Body() internationalInfo: InternationalSaveEto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.internationalService.createInternational(
      internationalInfo,
    );
    return response;
  }

  /**
   * @description: 更新国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Put()
  async updateInternational(
    @Body() internationalInfo: InternationalSaveEto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.internationalService.updateInternational(
      internationalInfo,
    );
    return response;
  }

  /**
   * @description: 删除国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Delete()
  async deleteInternational(
    @Body() { international_id }: InternationalDeleteEto,
  ): Promise<ResponseModel<ResData>> {
    const response = await this.internationalService.deleteInternational(
      international_id,
    );
    return response;
  }
}
