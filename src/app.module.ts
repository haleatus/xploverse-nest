import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceModule } from './data-services/mgdb/mgdb-datasource.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AppDataSourceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
