/*
 * @Description: XmwInternational Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-15 22:35:00
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 09:58:54
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IsInt, Min, Max, IsUUID } from 'class-validator'; // entity validator

@Entity()
export class XmwInternational {
  @PrimaryGeneratedColumn('uuid', { comment: 'id' })
  id: string;

  //国际化字段
  @Column('varchar', {
    length: 32,
    comment: '国际化字段',
  })
  name: string;

  //中文
  @Column('varchar', {
    length: 200,
    nullable: true,
    comment: '中文',
  })
  'zh-CN': string;

  //英文
  @Column('varchar', {
    length: 500,
    nullable: true,
    comment: '英文',
  })
  'en-US': string;

  //日文
  @Column('varchar', {
    length: 200,
    nullable: true,
    comment: '日文',
  })
  'ja-JP': string;

  //繁体中文
  @Column('varchar', {
    length: 200,
    nullable: true,
    comment: '繁体中文',
  })
  'zh-TW': string;

  //父级id
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '父级id',
  })
  @IsUUID()
  parent_id: string;

  //创建人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '创建人',
  })
  @IsUUID()
  founder: string;

  //排序
  @Column('int', {
    comment: '排序',
  })
  @IsInt()
  @Min(1)
  @Max(999)
  sort: number;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  created_time: Date;

  // 最后一次更新时间
  @UpdateDateColumn({ nullable: true, comment: '最后一次更新时间' })
  updated_time: Date;
}
