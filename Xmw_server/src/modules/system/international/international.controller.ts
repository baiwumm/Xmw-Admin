/*
 * @Description:
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-16 00:03:16
 */
import { Controller, Get } from '@nestjs/common';
import { InternationalService } from './international.service';

@Controller('system')
export class InternationalController {
  constructor(private readonly internationalService: InternationalService) {}
  @Get('getAllLocalesLang')
  getAllLocalesLang() {
    return this.internationalService.findOne();
  }
}
