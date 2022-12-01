/*
 * @Description: XmwRole Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 16:33:09
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-01 15:10:45
 */
import {
  PrimaryKey,
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasMany,
  NotEmpty,
  Length,
  IsUUID,
  IsIn,
} from 'sequelize-typescript';
import type { RoleAttributes } from '@/attributes/system';
import { XmwPermission } from '@/models/xmw_permission.model';

@Table({ tableName: 'xmw_role' })
export class XmwRole
  extends Model<RoleAttributes, RoleAttributes>
  implements RoleAttributes
{
  @IsUUID(4)
  @PrimaryKey
  @ForeignKey(() => XmwPermission)
  @Column({
    type: DataType.UUID,
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
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //角色状态
  @IsIn({
    args: [[0, 1]],
    msg: 'status 字段值错误',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '角色状态（0:禁用，1：正常）',
  })
  status: number;

  @HasMany(() => XmwPermission, { as: 'menu_permission' })
  menu_permission: XmwPermission[];
}
