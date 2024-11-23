import { Module } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';
import { CustomHttpController } from './custom-http.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [CustomHttpController],
  providers: [CustomHttpService],
  exports: [CustomHttpService],
  imports: [CommonModule],
})
export class CustomHttpModule {}
