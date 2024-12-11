import { Module } from '@nestjs/common';
import { XplorerAuthService } from './xplorer-auth.service';
import { XplorerAuthController } from './xplorer-auth.controller';

Module({
  controllers: [XplorerAuthController],
  providers: [XplorerAuthService],
  exports: [XplorerAuthService],
});

export class XplorerAuthModule {}
