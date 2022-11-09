/*
 * @Description: xmw_organization Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 11:06:36
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-09 10:00:45
 */
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import type { OrgAttributes } from '@/attributes/administrative';
import { NotEmpty, Length } from 'sequelize-typescript';

@Table({ tableName: 'xmw_organization' })
export class XmwOrganization
  extends Model<OrgAttributes, OrgAttributes>
  implements OrgAttributes
{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
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
  @Column({
    type: DataType.ENUM,
    values: ['company', 'unit', 'department', 'team'],
    allowNull: false,
    comment: '组织类型（company:公司,unit:单位,department:部门,team:小组）',
  })
  org_type: string;

  //父级id
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //组织负责人
  @Column({ type: DataType.UUID, comment: '组织负责人' })
  leader?: string;

  //组织描述
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '组织描述' })
  describe: string;

  //创建人
  @Column({ type: DataType.UUID, comment: '创建人' })
  founder?: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //组织状态
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '组织状态（0:禁用，1：正常）',
  })
  status: number;
}
