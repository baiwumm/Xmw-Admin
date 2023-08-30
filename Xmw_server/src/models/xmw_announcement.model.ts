import {
  PrimaryKey,
  Column,
  Model,
  Table,
  DataType,
  IsUUID,
  ForeignKey,
  IsIn,
  BelongsTo,
} from 'sequelize-typescript';
import { AnnouncementAttributes } from '@/attributes/administrative';
import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体

@Table({ tableName: 'xmw_announcement' })
export class XmwAnnouncement
  extends Model<AnnouncementAttributes, AnnouncementAttributes>
  implements AnnouncementAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: '活动公告id',
  })
  announcement_id: string;

  // 作者id
  @IsUUID(4)
  @ForeignKey(() => XmwUser)
  @Column({ type: DataType.UUID, allowNull: false, comment: '作者id' })
  user_id: string;

  // 标题
  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    comment: '标题',
  })
  title: string;

  // 内容
  @Column({ type: DataType.TEXT, allowNull: false, comment: '内容' })
  content: string;

  // 类型
  @IsIn({
    args: [['1', '2', '3', '4']],
    msg: '活动公告类型: type 字段值错误',
  })
  @Column({
    type: DataType.ENUM,
    values: ['1', '2', '3', '4'],
    allowNull: false,
    comment: '类型(1:公告,2:活动,3:消息,4:通知)',
  })
  type: string;

  // 状态
  @IsIn({
    args: [[0, 1]],
    msg: 'status 字段值错误',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '状态（0:禁用，1：开启）',
  })
  status: number;

  // 是否置顶
  @IsIn({
    args: [[0, 1]],
    msg: 'pinned 字段值错误',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '是否置顶（0:否，1：是）',
  })
  pinned: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '阅读次数',
  })
  readCounts: number;

  @BelongsTo(() => XmwUser, { as: 'u' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: XmwUser;
}
