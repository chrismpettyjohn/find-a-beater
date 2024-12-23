import { Injectable } from '@nestjs/common';
import {
  VehicleIdentifier,
  VehicleSpecs,
  VehicleSafety,
  VehicleTestimony,
  VehicleAnalysis,
  VehicleProblemReport,
} from '@find-a-beater/client';
import { OpenAIService } from '../shared/providers/openai/openai.service';

@Injectable()
export class VehiclesService {

  constructor(private readonly openAIService: OpenAIService) { }


  async getVehicleImages(params: VehicleIdentifier): Promise<string[]> {
    // Implementation
    return [
      'https://example.com/images/SL500-Mercedes-1995-1.jpg',
      'https://example.com/images/SL500-Mercedes-1995-2.jpg',
    ];
  }

  async getVehicleValue(
    params: VehicleIdentifier & { zipCode: string }
  ): Promise<{ value: number }> {
    return this.openAIService.generateCompletion(`
      Analyze the current market value and status for a ${params.year} ${params.make} ${params.model} in zip code ${params.zipCode}.
      Consider current market conditions, local market factors, and typical condition for this age.
      Provide an estimated value of vehicle's current market status.
      Format: JSON with 'value' (number)
    `);
  }

  async getVehicleSpecs(params: VehicleIdentifier): Promise<VehicleSpecs> {
    return this.openAIService.generateCompletion(`
      Return a JSON object with fields for the following: ${params.year} ${params.make} ${params.model}
      - weight (number)
      - horsepower (number)
      - torque (number)
    `);
  }

  async getVehicleSafety(params: VehicleIdentifier): Promise<VehicleSafety> {
    return this.openAIService.generateCompletion(`
      Return a JSON object with fields for the following: ${params.year} ${params.make} ${params.model}
      - safetyRating: A number from 0 to 5, rounded to the nearest whole number.
      - survivalRating: A number between 0 and 100 representing the survival percentile, considering the impact of a 2024 F150 T-boning the vehicle at 45 mph, calculated deterministically based on factors such as ${params.year}, ${params.make}, and ${params.model}.
      Ensure results are consistent for the same inputs.
    `);
  }

  async getVehicleTestimonies(params: VehicleIdentifier): Promise<VehicleTestimony[]> {
    return this.openAIService.generateCompletion(`
      Generate 3 realistic owner testimonies for a ${params.year} ${params.make} ${params.model}.
      Base these on common experiences, known issues, and typical ownership patterns, focusing on problems that a DIY enthusiast would need to know. Use forum posts and Reddit exclusively as inspiration.
      Include different owner types (commuter, enthusiast, family, etc.).
      Return as a JSON array with the following fields:
      - ownerType (string): The type of owner (e.g., commuter, enthusiast, family).
      - experience (string): A detailed testimony of the ownership experience.
      - rating (number 1-5): Overall satisfaction rating.
      - pros (array of strings): Positive aspects of ownership.
      - cons (array of strings): Negative aspects of ownership, especially DIY challenges.
      Ensure the response is formatted as a valid JSON array.
    `);
  }

  async getVehicleProblems(params: VehicleIdentifier, mileage: number, zipCode: number): Promise<VehicleProblemReport> {
    return this.openAIService.generateCompletion(`
    List common problems for a ${params.year} ${params.make} ${params.model} with ${mileage} miles in ${zipCode}.
    Consider climate factors, known issues, and maintenance history.
    Return a JSON object with:
    - issues: A JSON array of objects with fields:
      - issue (string): Description of the problem.
      - probability (number 0–1): Likelihood of occurrence.
      - cost (number in USD): Estimated repair cost.
      - type (enum: "aesthetic" or "mechanical"): The category of the issue.
      - howToIdentify (string): Steps or signs to identify the issue.
    - reliabilityScore (number 0–100): Overall vehicle reliability score.
    Ensure the response is a valid JSON object.
  `);
  }


  async analyzeVehicle(
    params: VehicleIdentifier,
    prompt: string
  ): Promise<VehicleAnalysis> {
    return this.openAIService.generateCompletion(`
      Analyze the ${params.year} ${params.make} ${params.model} with respect to the following prompt:
      ${prompt}
      Base your analysis on known vehicle characteristics, common issues, and market perception.
    `);
  }
}