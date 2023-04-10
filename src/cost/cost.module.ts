import { Module } from '@nestjs/common';
import { CostController } from './cost.controller';
import { CostService } from './cost.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CostSchema } from './schemas/cost.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cost', schema: CostSchema }])],
  controllers: [CostController],
  providers: [CostService],
})
export class CostModule {}
