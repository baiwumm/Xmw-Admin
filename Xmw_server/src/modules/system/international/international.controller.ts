/*
 * @Description: International Controller
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 10:28:45
 */
import { Controller, Get } from '@nestjs/common';
import { InternationalService } from './international.service'; // International Service
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // swagger 接口文档
import { Data, ResponseModel } from '@/common/interface';

@ApiTags('系统设置-国际化')
@ApiBearerAuth()
@Controller('system')
export class InternationalController {
  constructor(private readonly internationalService: InternationalService) {}
  /**
   * @description: 获取当前语言的国际化数据
   * @return {*}
   * @author: Cyan
   */
  @Get('getAllLocalesLang')
  async getAllLocalesLang(): Promise<ResponseModel<Data>> {
    const response = await this.internationalService.findAllLocalesLang();
    return { data: response };
  }
}
