import { Module } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';
import { CommonModule } from '../common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [CustomHttpService],
  exports: [CustomHttpService],
  imports: [CommonModule, ConfigModule],
})
export class CustomHttpModule {}
