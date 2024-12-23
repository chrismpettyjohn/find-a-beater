import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class VehicleQueryDto {
  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNotEmpty()
  @IsNumber()
  year: number;

  @IsOptional()
  @IsString()
  zipCode?: string;

  @IsOptional()
  @IsNumber()
  mileage?: number;
}