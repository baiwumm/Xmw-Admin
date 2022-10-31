/*
 * @Description: XmwRole Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 16:33:09
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 16:54:17
 */
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import type { RoleAttributes } from '@/attributes/system';
import { XmwPermission } from '@/models/xmw_permission.model';
import { NotEmpty, Length } from 'sequelize-typescript';

type PermissionModel = {
  menu_id: string;
};

@Table({ tableName: 'xmw_role' })
export class XmwRole
  extends Model<RoleAttributes, RoleAttributes>
  implements RoleAttributes
{
  @ForeignKey(() => XmwPermission)
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '角色id',
  })
  role_id: string;

  //角色名称
  @NotEmpty({ msg: '角色名称不能为空' })
  @Length({ min: 2, max: 32, msg: '角色名称的长度在2-36个字符' })
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '角色名称' })
  role_name: string;

  //角色编码
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '角色编码' })
  role_code: string;

  //角色描述
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '角色描述' })
  describe: string;

  //创建人
  @Column({ type: DataType.UUID, comment: '创建人' })
  founder?: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //角色状态
  @Column({
    type: DataType.ENUM,
    values: ['0', '1'],
    allowNull: false,
    comment: '角色状态（0:禁用，1：正常）',
  })
  status: string;

  @Column({
    type: DataType.VIRTUAL,
    get() {
      // 处理权限id，返回一个字符串数组
      const permission = this.getDataValue('permission') || [];
      const menu_permission: string[] = permission.map(
        (per: PermissionModel) => per.menu_id,
      );
      return menu_permission;
    },
  })
  menu_permission: string[];

  @HasMany(() => XmwPermission, { as: 'permission' })
  permission: XmwPermission[];
}
