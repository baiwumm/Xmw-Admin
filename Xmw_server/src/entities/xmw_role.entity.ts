/*
 * @Description: XmwRole Entity
 * @Version: 2.0
 * @Author: Cyan
 * @Date: 2022-10-16 11:14:32
 * @LastEditors: Cyan
 * @LastEditTime: 2022-10-17 18:16:44
 */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'xmw_role' })
export class XmwRole {
  @PrimaryGeneratedColumn('uuid', { comment: '角色id' })
  role_id: string;

  //角色名称
  @Column('varchar', {
    length: 20,
    comment: '角色名称',
  })
  role_name: string;

  //角色编码
  @Column('varchar', {
    length: 20,
    comment: '角色编码',
  })
  role_code: string;

  //角色描述
  @Column('varchar', {
    length: 200,
    comment: '角色描述',
  })
  describe: string;

  //创建人
  @Column('char', {
    length: 36,
    nullable: true,
    comment: '创建人',
  })
  founder: string;

  //角色状态
  @Column('tinyint', {
    comment: '角色状态（0:禁用，1:正常）',
  })
  status: number;

  //排序
  @Column('int', {
    comment: '排序',
  })
  sort: number;

  // 创建时间
  @CreateDateColumn({ comment: '创建时间' })
  created_time: Date;

  // 最后一次更新时间
  @UpdateDateColumn({ nullable: true, comment: '最后一次更新时间' })
  updated_time: Date;
}
