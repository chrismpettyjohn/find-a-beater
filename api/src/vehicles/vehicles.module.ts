import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { OpenAIModule } from '../shared/providers/openai/openai.module';
import { NHTSAModule } from '../shared/providers/nhtsa/nhtsa.module';

@Module({
  imports: [OpenAIModule, NHTSAModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}