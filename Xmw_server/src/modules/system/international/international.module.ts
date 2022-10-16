import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternationalService } from './international.service'; // International Service
import { InternationalController } from './international.controller'; // International Controller
import { XmwInternational } from '@/entities/xmw_international.entity'; // xmw_users 实体

@Module({
  // 将实体 导入到这个module中，以便你这个module中的其它provider使用
  imports: [TypeOrmModule.forFeature([XmwInternational])],
  // 由 Nest 注入器实例化的提供者，并且可以至少在整个模块中共享
  controllers: [InternationalController],
  // 通过 @Module 装饰器映射 Crotroller
  providers: [InternationalService],
  // 如果你这个模块中的provider 要在别的模块中使用 你必须要在这里声明 导出这些provider
  exports: [InternationalService],
})
export class InternationalModule {}
