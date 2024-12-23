import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { OpenAIModule } from '../shared/providers/openai/openai.module';
import { NHTSAModule } from '../shared/providers/nhtsa/nhtsa.module';
import { GoogleModule } from '../shared/providers/google/google.module';

@Module({
  imports: [GoogleModule, OpenAIModule, NHTSAModule],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule { }