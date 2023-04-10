import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostModule } from './cost/cost.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CostModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/costs-app'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
