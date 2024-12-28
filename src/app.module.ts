import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceModule } from './data-services/mgdb/mgdb-datasource.module';
import { CryptoModule } from './libs/crypto/crypto.module';
import { TokenModule } from './libs/token/token.module';
import { ControllerModule } from './application/controllers/controller.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSourceModule,
    CryptoModule,
    TokenModule,
    ControllerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
