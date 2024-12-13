import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AppDataSourceModule } from './data-services/mgdb/mgdb-datasource.module';
import { XplorerModule } from './application/features/users/xplorer/xplorer.module';
import { CryptoModule } from './libs/crypto/crypto.module';
import { TokenModule } from './libs/token/token.module';
import { XplorerAuthModule } from './application/features/auth/xplorer/xplorer-auth.module';
import { AuthGuardModule } from './application/guards/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AppDataSourceModule,
    XplorerModule,
    CryptoModule,
    TokenModule,
    XplorerAuthModule,
    AuthGuardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
