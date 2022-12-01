/*
 * @Description: xmw_organization Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 11:06:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-12-01 18:19:47
 */
import {
  PrimaryKey,
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  Length,
  IsUUID,
  IsIn,
} from 'sequelize-typescript';
import type { OrgAttributes } from '@/attributes/administrative';

@Table({ tableName: 'xmw_organization' })
export class XmwOrganization
  extends Model<OrgAttributes, OrgAttributes>
  implements OrgAttributes
{
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    comment: '组织id',
  })
  org_id: string;

  //组织名称
  @NotEmpty({ msg: '组织名称不能为空' })
  @Length({ min: 2, max: 32, msg: '组织名称的长度在2-36个字符' })
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '组织名称' })
  org_name: string;

  //组织编码
  @Column({ type: DataType.STRING(32), allowNull: false, comment: '组织编码' })
  org_code: string;

  //组织类型
  @IsIn({
    args: [['company', 'unit', 'department']],
    msg: '组织类型：org_type 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['company', 'unit', 'department', 'team'],
    allowNull: false,
    comment: '组织类型（company:公司,unit:单位,department:部门,team:小组）',
  })
  org_type: string;

  //父级id
  @IsUUID(4)
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //组织负责人
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '组织负责人' })
  leader: string;

  //组织描述
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '组织描述' })
  describe: string;

  //创建人
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //组织状态
  @IsIn({
    args: [[0, 1]],
    msg: 'status 字段值错误',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '组织状态（0:禁用，1：正常）',
  })
  status: number;
}
