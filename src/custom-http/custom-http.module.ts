import { Module } from '@nestjs/common';
import { CustomHttpService } from './custom-http.service';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [],
  providers: [CustomHttpService],
  exports: [CustomHttpService],
  imports: [CommonModule],
})
export class CustomHttpModule {}
