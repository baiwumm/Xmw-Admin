/*
 * @Description:
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 22:57:50
 */
import { Controller, Get } from '@nestjs/common';
import { InternationalService } from './international.service'; // International Service
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'; // swagger 接口文档

@ApiTags('系统设置-国际化')
@ApiBearerAuth()
@Controller('system')
export class InternationalController {
  constructor(private readonly internationalService: InternationalService) {}
  @Get('getAllLocalesLang')
  getAllLocalesLang() {
    return this.internationalService.findOne();
  }
}
