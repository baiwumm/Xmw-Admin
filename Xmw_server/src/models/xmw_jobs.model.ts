/*
 * @Description: XmwJobs Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 10:57:24
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 14:47:18
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
import type { JobsAttributes } from '@/attributes/administrative';
import { NotEmpty, Length } from 'sequelize-typescript';

@Table({ tableName: 'xmw_jobs' })
export class XmwJobs
  extends Model<JobsAttributes, JobsAttributes>
  implements JobsAttributes
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
  @NotEmpty({ msg: '岗位名称不能为空' })
  @Length({ min: 2, max: 32, msg: '岗位名称的长度在2-36个字符' })
  @Column({ type: DataType.STRING(20), allowNull: false, comment: '岗位名称' })
  jobs_name: string;

  //所属组织id
  @ForeignKey(() => XmwOrganization)
  @Column({ type: DataType.UUID, allowNull: false, comment: '所属组织id' })
  org_id: string;

  //父级id
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //岗位负责人
  @Column({ type: DataType.UUID, comment: '岗位负责人' })
  leader?: string;

  //岗位描述
  @Column({ type: DataType.STRING(200), allowNull: false, comment: '岗位描述' })
  describe: string;

  //创建人
  @Column({ type: DataType.UUID, comment: '创建人' })
  founder?: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  @BelongsTo(() => XmwOrganization, { as: 'org' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  orgInfo: XmwOrganization;
}
