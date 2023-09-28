import {
  Column,
  DataType,
  IsUUID,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import type { AlreadyAttributes } from '@/utils/types/administrative';

@Table({ tableName: 'xmw_already' })
export class XmwAlready
  extends Model<AlreadyAttributes, AlreadyAttributes>
  implements AlreadyAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '主键id',
  })
  id: string;

  // 活动公告 id
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '活动公告 id' })
  announcement_id: string;

  // 用户 id
  @IsUUID(4)
  @Column({ type: DataType.UUID, allowNull: false, comment: '用户 id' })
  user_id: string;
}
