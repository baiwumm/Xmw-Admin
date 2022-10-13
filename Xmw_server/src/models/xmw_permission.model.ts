/*
 * @Description: xmw_permission Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:10:18
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:12:39
 */
import {
  Column,
  Model,
  Table,
  TableOptions,
  DataType,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'xmw_permission', // 表名
};

@Table(tableOptions)
export default class XmwPermission extends Model<XmwPermission> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '权限id',
  })
  permission_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '角色id',
  })
  role_id: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    comment: '菜单id',
  })
  menu_id: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: '创建日期',
  })
  created_time: string;
}
