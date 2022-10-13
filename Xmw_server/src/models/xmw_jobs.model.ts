/*
 * @Description: xmw_jobs Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:32:16
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:34:49
 */
import {
  Column,
  Model,
  Table,
  TableOptions,
  DataType,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'xmw_jobs', // 表名
};

@Table(tableOptions)
export default class XmwJobs extends Model<XmwJobs> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '岗位id',
  })
  jobs_id: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '岗位名称',
  })
  jobs_name: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '所属组织id',
  })
  org_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '父级id',
  })
  parent_id: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '部门状态',
  })
  status: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '描述',
  })
  describe: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: '创建日期',
  })
  created_time: string;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: '最后更新时间',
  })
  update_time: string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '创建人',
  })
  founder: string;
}
