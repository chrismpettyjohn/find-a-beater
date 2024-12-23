import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIModule } from './shared/providers/openai/openai.module';
import { NHTSAModule } from './shared/providers/nhtsa/nhtsa.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    OpenAIModule,
    NHTSAModule,
    VehiclesModule,
  ],
})
export class AppModule {}