/*
 * @Description: MenuManagement Service
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-27 10:37:42
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 09:45:16
 */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import type { WhereOptions } from 'sequelize/types';
import { XmwMenu } from '@/models/xmw_menu.model'; // 数据库实体
import { XmwInternational } from '@/models/xmw_international.model'; // 数据库实体
import { ResData, ResponseModel } from '@/global/interface'; // interface
import { initializeTree } from '@/utils'; // 全局工具函数
import { ListMenuManagementDto, SaveMenuManagementDto } from './dto';

@Injectable()
export class MenuManagementService {
  constructor(
    // 使用 InjectModel 注入参数，注册数据库实体
    @InjectModel(XmwMenu)
    private readonly menuModel: typeof XmwMenu,
  ) {}

  /**
   * @description: 获取菜单列表
   * @return {*}
   * @author: Cyan
   */
  async getMenuList(menuInfo: ListMenuManagementDto): Promise<XmwMenu[]> {
    // 解构参数
    const { menu_type, status, isPremission, start_time, end_time } = menuInfo;
    // 拼接查询参数
    const where: WhereOptions = {};
    if (menu_type) where.menu_type = { [Op.eq]: menu_type };
    if (status) where.status = { [Op.eq]: status };
    if (start_time && end_time)
      where.created_time = { [Op.between]: [start_time, end_time] };
    // 如果是查询菜单权限的，过滤掉重定向有值的数据
    if (isPremission) where.redirect = { [Op.is]: null };
    // 查询数据
    const sqlData = await this.menuModel.findAll({
      attributes: { include: ['i.zh-CN', 'i.en-US', 'i.ja-JP', 'i.zh-TW'] },
      // 联表查询
      include: [
        {
          model: XmwInternational,
          as: 'i',
          attributes: [],
        },
      ],
      raw: true,
      where,
      order: [
        ['sort', 'desc'],
        ['created_time', 'desc'],
      ], // 排序规则,
    });
    // 将数据转成树形结构
    const result = initializeTree(sqlData, 'menu_id', 'parent_id', 'children');
    return result;
  }

  /**
   * @description: 创建菜单数据
   * @return {*}
   * @author: Cyan
   */
  async createMenu(
    menuInfo: SaveMenuManagementDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { menu_type, parent_id, permission } = menuInfo;

    // 按钮不能处于顶级
    if (menu_type === 'button' && !parent_id) {
      return { data: {}, msg: '按钮不能处于顶级，只能是叶子结点！', code: -1 };
    }
    // 权限标识是唯一的
    if (permission) {
      // 判断权限标识是否存在
      const where: WhereOptions = {};
      where.permission = {
        [Op.eq]: permission,
        [Op.not]: null,
      };
      // 如果有结果，则证明已存在
      const exist = await this.menuModel.findOne({ where });
      if (exist) {
        return { data: {}, msg: '权限标识已存在！', code: -1 };
      }
    }
    // 如果通过则执行 sql insert 语句
    const result = await this.menuModel.create(menuInfo);
    return { data: result };
  }

  /**
   * @description: 更新菜单数据
   * @return {*}
   * @author: Cyan
   */
  async updateMenu(
    menu_id: string,
    menuInfo: SaveMenuManagementDto,
  ): Promise<ResponseModel<ResData>> {
    // 解构参数
    const { menu_type, parent_id, permission } = menuInfo;
    // 判断 parent_id 是否和 id相同
    if (parent_id && parent_id === menu_id) {
      return { data: {}, msg: '父级不能和自己相同！', code: -1 };
    }

    // 按钮不能处于顶级
    if (menu_type === 'button' && !parent_id) {
      return { data: {}, msg: '按钮不能处于顶级，只能是叶子结点！', code: -1 };
    }
    // 权限标识是唯一的
    if (permission) {
      // 判断权限标识是否存在
      const where: WhereOptions = {
        permission: {
          [Op.eq]: permission,
          [Op.not]: null,
        },
        menu_id: {
          [Op.ne]: menu_id,
        },
      };
      // 如果有结果，则证明已存在
      const exist = await this.menuModel.findOne({ where });
      if (exist) {
        return { data: {}, msg: '权限标识已存在！', code: -1 };
      }
    }
    // 如果通过则执行 sql save 语句
    const result = await this.menuModel.update(menuInfo, {
      where: { menu_id },
    });
    return { data: result };
  }

  /**
   * @description: 删除岗位数据
   * @return {*}
   * @author: Cyan
   */
  async deleteMenu(menu_id: string): Promise<ResponseModel<ResData | number>> {
    // 判断当前数据是否有子级，如果有数据的parent_id是id，则存在子级
    const exist = await this.menuModel.findOne({
      where: { parent_id: menu_id },
    });
    // 如果有结果，则证明已存在
    if (exist) {
      return { data: {}, msg: '当前数据存在子级，不能删除！', code: -1 };
    }
    // 如果通过则执行 sql delete 语句
    const result = await this.menuModel.destroy({ where: { menu_id } });
    return { data: result };
  }
}
