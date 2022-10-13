/*
 * @Description: xmw_role Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:04:35
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:11:25
 */
import {
  Column,
  Model,
  Table,
  TableOptions,
  DataType,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'xmw_role', // 表名
};

@Table(tableOptions)
export default class XmwRole extends Model<XmwRole> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '角色id',
  })
  role_id: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '角色名称',
  })
  role_name: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '角色编码',
  })
  role_code: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: false,
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

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: '排序',
  })
  sort: number;

  @Column({
    type: DataType.STRING(10),
    allowNull: false,
    comment: '角色状态',
  })
  status: number;
}
