/*
 * @Description: xmw_internationalization Model
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-13 16:35:46
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-13 16:39:07
 */
import {
  Column,
  Model,
  Table,
  TableOptions,
  DataType,
} from 'sequelize-typescript';

const tableOptions: TableOptions = {
  tableName: 'xmw_internationalization', // 表名
};

@Table(tableOptions)
export default class XmwInternationalization extends Model<XmwInternationalization> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    comment: 'id',
  })
  id: string;

  @Column({
    type: DataType.STRING(32),
    allowNull: false,
    comment: '国际化字段',
  })
  name: string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '中文',
  })
  'zh-CN': string;

  @Column({
    type: DataType.STRING(500),
    allowNull: true,
    comment: '英文',
  })
  'en-US': string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '日文',
  })
  'ja-JP': string;

  @Column({
    type: DataType.STRING(200),
    allowNull: true,
    comment: '繁体中文',
  })
  'zh-TW': string;

  @Column({
    type: DataType.UUID,
    allowNull: true,
    comment: '父级id',
  })
  parent_id: string;

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
}
