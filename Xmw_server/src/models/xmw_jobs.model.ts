/*
 * @Description: XmwJobs Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 10:57:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-24 16:31:06
 */
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { XmwOrganization } from '@/models/xmw_organization.model';
import { jobsAttributes } from '@/global/attributes';

@Table({ tableName: 'xmw_jobs' })
export class XmwJobs
  extends Model<jobsAttributes, jobsAttributes>
  implements jobsAttributes
{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '岗位id',
  })
  jobs_id: string;

  //岗位名称
  @Column({
    type: DataType.STRING(20),
    allowNull: false,
    comment: '岗位名称',
  })
  jobs_name: string;

  //所属组织id
  @ForeignKey(() => XmwOrganization)
  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '所属组织id',
  })
  org_id: string;

  //父级id
  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '父级id',
  })
  parent_id?: string;

  //岗位负责人
  @Column({ type: DataType.UUID, allowNull: true, comment: '岗位负责人' })
  leader?: string;

  //岗位描述
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '岗位描述' })
  describe: string;

  //创建人
  @Column({ type: DataType.UUID, allowNull: true, comment: '创建人' })
  founder?: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  @BelongsTo(() => XmwOrganization, { as: 'org' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  orgInfo: XmwOrganization;
}
