import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import {
  VehicleIdentifier,
  VehicleSpecs,
  VehicleSafety,
  VehicleTestimony,
  VehicleAnalysis,
} from '@find-a-beater/client';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('images')
  getVehicleImages(@Query() params: VehicleIdentifier): Promise<string[]> {
    return this.vehiclesService.getVehicleImages(params);
  }

  @Get('value')
  getVehicleValue(
    @Query() params: VehicleIdentifier & { zipCode: string }
  ): Promise<{ value: number }> {
    return this.vehiclesService.getVehicleValue(params);
  }

  @Get('specs')
  getVehicleSpecs(@Query() params: VehicleIdentifier): Promise<VehicleSpecs> {
    return this.vehiclesService.getVehicleSpecs(params);
  }

  @Get('safety')
  getVehicleSafety(@Query() params: VehicleIdentifier): Promise<VehicleSafety> {
    return this.vehiclesService.getVehicleSafety(params);
  }

  @Get('testimonies')
  getVehicleTestimonies(@Query() params: VehicleIdentifier): Promise<VehicleTestimony[]> {
    return this.vehiclesService.getVehicleTestimonies(params);
  }

  @Post('analyze')
  analyzeVehicle(
    @Query() params: VehicleIdentifier,
    @Body() body: { prompt: string }
  ): Promise<VehicleAnalysis> {
    return this.vehiclesService.analyzeVehicle(params, body.prompt);
  }
}