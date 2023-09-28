/*
 * @Description: 请求参数校验
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-16 22:07:40
 * @LastEditors: 白雾茫茫丶
 * @LastEditTime: 2023-09-28 15:21:58
 */
import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

import { Logger } from '@/utils/log4js';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }
    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      const msg = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      Logger.error(`参数校验失败: ${msg}`);
      // 自定义校验返回格式
      throw new BadRequestException(`参数校验失败: ${msg}`);
    }
    return value;
  }
  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
