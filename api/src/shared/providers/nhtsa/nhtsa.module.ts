import { Module } from '@nestjs/common';
import { NHTSAService } from './nhtsa.service';

@Module({
  providers: [NHTSAService],
  exports: [NHTSAService],
})
export class NHTSAModule {}