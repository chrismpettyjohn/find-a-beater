import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import {
  VehicleIdentifier,
  VehicleSpecs,
  VehicleSafety,
  VehicleTestimony,
  VehicleAnalysis,
  VehicleProblemReport,
} from '@find-a-beater/client';
import { NHTSAService } from '../shared/providers/nhtsa/nhtsa.service';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService, private readonly nhtsaService: NHTSAService) { }

  @Get('makes')
  async searchMakes(@Query('query') query: string): Promise<string[]> {
    return this.nhtsaService.searchMakes(query);
  }

  @Get('models')
  async searchModels(@Query('make') make: string): Promise<string[]> {
    return this.nhtsaService.searchModels(make);
  }

  @Get('years')
  async searchYears(@Query('make') make: string, @Query('model') model: string): Promise<number[]> {
    return this.nhtsaService.searchYears(make, model);
  }

  @Get('images')
  async getVehicleImages(@Query() params: VehicleIdentifier): Promise<string[]> {
    const body = await this.vehiclesService.getVehicleImages(params);
    console.log(body)
    return body;
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

  @Get('problems')
  getVehicleProblems(@Query() params: VehicleIdentifier, @Query('zipCode') zipCode: number, @Query('mileage') mileage: number): Promise<VehicleProblemReport> {
    return this.vehiclesService.getVehicleProblems(params, mileage, zipCode);
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