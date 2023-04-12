import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CostModule } from './cost/cost.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CostModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/costs-app'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
