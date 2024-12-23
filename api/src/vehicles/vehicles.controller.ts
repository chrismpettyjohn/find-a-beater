import { Controller, Get, Query, Param, Post, Body } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehicleQueryDto } from './dto/vehicle-query.dto';

@Controller('vehicles')
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) { }

  @Get('images')
  async getVehicleImages(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.getVehicleImages(query.make, query.model, query.year);
  }

  @Get('value')
  async getEstimatedValue(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.getEstimatedValue(
      query.make,
      query.model,
      query.year,
      query.zipCode,
    );
  }

  @Get('specs')
  async getVehicleSpecs(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.getVehicleSpecs(query.make, query.model, query.year);
  }

  @Get('safety')
  async getSafetyRating(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.getSafetyRating(query.make, query.model, query.year);
  }

  @Post('analyze')
  async getCustomAnalysis(
    @Query() query: VehicleQueryDto,
    @Body() body: { prompt: string },
  ) {
    return this.vehiclesService.getCustomAnalysis(
      query.make,
      query.model,
      query.year,
      body.prompt,
    );
  }

  @Get('problems')
  async getExpectedProblems(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.getExpectedProblems(
      query.make,
      query.model,
      query.year,
      query.mileage,
      query.zipCode,
    );
  }

  @Get('testimonies')
  async getOwnerTestimonies(@Query() query: VehicleQueryDto) {
    return this.vehiclesService.getOwnerTestimonies(query.make, query.model, query.year);
  }
}