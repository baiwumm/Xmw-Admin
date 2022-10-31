/*
 * @Description: XmwInternational Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:35:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-31 14:46:26
 */
import { Column, Model, Table, DataType } from 'sequelize-typescript';
import type { InternationalAttributes } from '@/attributes/system';
import { NotEmpty } from 'sequelize-typescript';

@Table({ tableName: 'xmw_international', underscored: false })
export class XmwInternational
  extends Model<InternationalAttributes, InternationalAttributes>
  implements InternationalAttributes
{
  @Column({
    type: DataType.UUID,
    primaryKey: true,
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
  @Column({ type: DataType.UUID, comment: '父级id' })
  parent_id?: string;

  //创建人
  @Column({ type: DataType.UUID, comment: '创建人' })
  founder?: string;

  //排序
  @Column({ type: DataType.INTEGER, allowNull: false, comment: '排序' })
  sort: number;

  //子级
  children?: XmwInternational[];
}
