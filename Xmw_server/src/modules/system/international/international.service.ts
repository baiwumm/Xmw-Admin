/*
 * @Description: International Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:06:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 17:04:55
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Between, Repository } from 'typeorm';
import { XmwInternational } from '@/entities/xmw_international.entity'; // 数据库实体
import { Data } from '@/common/interface'; // interface
import { LOCALES_LANG, initializeTree, initializeLang } from '@/utils'; // 全局工具函数
import {
  InternationalListEto,
  InternationalCreateEto,
} from '@/dto/international.dto';

@Injectable()
export class InternationalService {
  constructor(
    // 使用 InjectRepository 注入参数，注册数据库实体
    @InjectRepository(XmwInternational)
    private readonly internationaRepository: Repository<XmwInternational>,
  ) {}

  /**
   * @description: 获取当前语言的国际化数据
   * @return {*}
   * @author: Cyan
   */
  async getAllLocalesLang(): Promise<Data> {
    const result = {};
    // 查询数据
    const sqlData = await this.internationaRepository.find({
      select: ['id', 'name', 'zh-CN', 'en-US', 'ja-JP', 'zh-TW', 'parent_id'], // 指定返回的字段
      // 按时间倒序
      order: {
        created_time: 'DESC',
      },
    });
    // 先将数据转成树形结构
    const treeLang = initializeTree(sqlData, 'id', 'parent_id', 'children');
    // 转成层级对象
    for (let i = 0; i < LOCALES_LANG.length; i++) {
      const lang = LOCALES_LANG[i];
      result[lang] = initializeLang(treeLang, lang);
    }
    return result;
  }

  /**
   * @description: 获取国际化列表
   * @return {*}
   * @author: Cyan
   */
  async getInternationalList(
    params: InternationalListEto,
  ): Promise<XmwInternational[]> {
    // 解构参数
    const { name, start_time, end_time, isMenu } = params;
    // 查询参数
    const where: Data = {};
    if (name) where.name = Like(`%${name}%`);
    if (start_time && end_time)
      where.created_time = Between(start_time, end_time);
    // 查询数据
    const sqlData = await this.internationaRepository.find({
      where,
      // 按时间倒序
      order: {
        sort: 'DESC',
        created_time: 'DESC',
      },
    });
    // 将数据转成树形结构
    const result = initializeTree(sqlData, 'id', 'parent_id', 'children');
    return isMenu
      ? result.filter((element: XmwInternational) => element.name == 'menu')[0]
          .children
      : result;
  }

  /**
   * @description: 创建国际化数据
   * @return {*}
   * @author: Cyan
   */
  async createInternational(params: InternationalCreateEto): Promise<Data> {
    const result = this.internationaRepository.create(params);
    return result;
  }
}
