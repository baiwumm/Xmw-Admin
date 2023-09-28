/*
 * @Description: XmwInternational Entity
 * @Version: 2.0
 * @Author: 白雾茫茫丶
 * @Date: 2022-10-15 22:35:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-11-30 10:51:14
 */
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUUID,
  Model,
  NotEmpty,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

import { XmwUser } from '@/models/xmw_user.model'; // xmw_user 实体
import type { InternationalAttributes } from '@/utils/types/system';

@Table({ tableName: 'xmw_international', underscored: false })
export class XmwInternational
  extends Model<InternationalAttributes, InternationalAttributes>
  implements InternationalAttributes {
  @IsUUID(4)
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: 'id',
  })
  id: string;

  //国际化字段
  @NotEmpty({ msg: '国际化字段不能为空' })
  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '国际化字段',
  })
  name: string;

  //中文
  @Column({ type: DataType.STRING(200), comment: '中文' })
  'zh-CN'?: string;

  //英文
  @Column({ type: DataType.STRING(500), comment: '英文' })
  'en-US'?: string;

  //日文
  @Column({ type: DataType.STRING(200), comment: '日文' })
  'ja-JP'?: string;

  //繁体中文
  @Column({ type: DataType.STRING(200), comment: '繁体中文' })
  'zh-TW'?: string;

  //父级id
  @IsUUID(4)
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //创建人
  @IsUUID(4)
  @ForeignKey(() => XmwUser)
  @Column({ type: DataType.UUID, allowNull: false, comment: '创建人' })
  founder: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //子级
  children?: XmwInternational[];

  @BelongsTo(() => XmwUser, { as: 'u' }) // 定义多对一关系。注意使用BelongsTo是多对一关系的【多】表
  userInfo: XmwUser;
}
