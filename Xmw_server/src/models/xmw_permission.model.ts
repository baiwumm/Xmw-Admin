/*
 * @Description: XmwPermission Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-28 17:23:20
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-28 17:30:08
 */
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import type { PermissionAttributes } from '@/attributes/system';

@Table({ tableName: 'xmw_permission' })
export class XmwPermission
  extends Model<PermissionAttributes, PermissionAttributes>
  implements PermissionAttributes
{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '权限id',
  })
  permission_id: string;

  //角色id
  @Column({ type: DataType.UUID, comment: '角色id' })
  role_id: string;

  //菜单id
  @Column({ type: DataType.UUID, comment: '菜单id' })
  menu_id: string;
}
