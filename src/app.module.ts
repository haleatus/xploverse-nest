import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceModule } from './data-services/mgdb/mgdb-datasource.module';
import { CryptoModule } from './libs/crypto/crypto.module';
import { TokenModule } from './libs/token/token.module';
import { FeatureModule } from './application/features/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSourceModule,
    CryptoModule,
    TokenModule,
    FeatureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
