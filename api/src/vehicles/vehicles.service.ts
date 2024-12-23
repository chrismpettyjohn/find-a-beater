import { Injectable } from '@nestjs/common';
import { OpenAIService } from '../shared/providers/openai/openai.service';
import { NHTSAService } from '../shared/providers/nhtsa/nhtsa.service';
import { VehicleSpecs, ExpectedProblem, VehicleTestimony } from './interfaces/vehicle-specs.interface';

@Injectable()
export class VehiclesService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly nhtsaService: NHTSAService,
  ) {}

  async getVehicleImages(make: string, model: string, year: number): Promise<string[]> {
    // Note: NHTSA doesn't actually provide images, this would need to be integrated with
    // a different service like Google Custom Search API
    return [
      `https://example.com/images/${make}-${model}-${year}-1.jpg`,
      `https://example.com/images/${make}-${model}-${year}-2.jpg`,
    ];
  }

  async getEstimatedValue(make: string, model: string, year: number, zipCode: string): Promise<{ value: number; analysis: string }> {
    const prompt = `
      Analyze the current market value and status for a ${year} ${make} ${model} in zip code ${zipCode}.
      Consider current market conditions, local market factors, and typical condition for this age.
      Provide an estimated value and a brief analysis of the vehicle's current market status.
      Format: JSON with 'value' (number) and 'analysis' (string) fields.
    `;

    const response = await this.openAIService.generateCompletion(prompt);
    return JSON.parse(response);
  }

  async getVehicleSpecs(make: string, model: string, year: number): Promise<VehicleSpecs> {
    const vehicleInfo = await this.nhtsaService.getVehicleInfo(\`${make}|${model}|${year}\`);
    
    // Parse NHTSA data to extract specs
    const weight = parseFloat(vehicleInfo.find(item => item.Variable === 'Curb Weight')?.Value || '0');
    const horsepower = parseFloat(vehicleInfo.find(item => item.Variable === 'Engine Horse Power')?.Value || '0');
    const torque = parseFloat(vehicleInfo.find(item => item.Variable === 'Engine Torque')?.Value || '0');
    
    return {
      weight,
      horsepower,
      torque,
      hpWeightRatio: horsepower / weight,
    };
  }

  async getSafetyRating(make: string, model: string, year: number): Promise<number> {
    // Implementation would parse NHTSA safety ratings
    const safetyData = await this.nhtsaService.getVehicleInfo(\`${make}|${model}|${year}\`);
    // Convert NHTSA data to 0-5 scale including half stars
    return 4.5; // Example return
  }

  async getCrashSurvivalRating(make: string, model: string, year: number): Promise<number> {
    const prompt = \`
      Based on vehicle specifications and crash test data, estimate the survival percentile
      for a ${year} ${make} ${model} if hit by a Ford F150 at 45mph in a T-bone collision.
      Consider vehicle safety features, structural integrity, and side impact protection systems.
      Return only a number representing the percentile (0-100).
    \`;

    const response = await this.openAIService.generateCompletion(prompt);
    return parseFloat(response);
  }

  async getReliabilityScore(make: string, model: string, year: number): Promise<number> {
    // Would typically combine NHTSA complaint data with other reliability data sources
    const complaints = await this.nhtsaService.getComplaints(make, model, year);
    // Convert complaint data to 0-5 scale including half stars
    return 3.5; // Example return
  }

  async getCustomAnalysis(make: string, model: string, year: number, prompt: string): Promise<string> {
    const fullPrompt = \`
      Analyze the ${year} ${make} ${model} with respect to the following prompt:
      ${prompt}
      
      Base your analysis on known vehicle characteristics, common issues, and market perception.
    \`;

    return this.openAIService.generateCompletion(fullPrompt);
  }

  async getExpectedProblems(
    make: string,
    model: string,
    year: number,
    mileage: number,
    zipCode: string,
  ): Promise<ExpectedProblem[]> {
    const prompt = \`
      List common problems for a ${year} ${make} ${model} with ${mileage} miles in ${zipCode}.
      Consider climate factors, known issues, and maintenance history.
      Return a JSON array of objects with fields:
      - issue (string)
      - probability (number 0-1)
      - cost (number in USD)
      Format as valid JSON array.
    \`;

    const response = await this.openAIService.generateCompletion(prompt);
    return JSON.parse(response);
  }

  async getOwnerTestimonies(make: string, model: string, year: number): Promise<VehicleTestimony[]> {
    const prompt = \`
      Generate 3 realistic owner testimonies for a ${year} ${make} ${model}.
      Base these on common experiences, known issues, and typical ownership patterns.
      Include different owner types (commuter, enthusiast, family, etc.).
      Return as JSON array with fields:
      - ownerType
      - experience (detailed testimony)
      - rating (1-5)
      - pros (array of strings)
      - cons (array of strings)
      Format as valid JSON array.
    \`;

    const response = await this.openAIService.generateCompletion(prompt);
    return JSON.parse(response);
  }
}