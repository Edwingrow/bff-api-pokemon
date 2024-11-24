import { Module } from '@nestjs/common';
import { CacheConfigService } from './cache-config.service';

@Module({
  controllers: [],
  providers: [CacheConfigService],
  exports: [CacheConfigService],
})
export class CacheConfigModule {}
