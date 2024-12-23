import { VehicleAnalysis, VehicleIdentifier, VehicleProblemReport, VehicleSafety, VehicleSpecs, VehicleTestimony } from "../types/vehicle";

export class VehicleService {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:8080') {
    this.baseUrl = baseUrl;
  }

  private async fetchWithError(url: string, options?: RequestInit): Promise<any> {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  async searchMakes(query: string): Promise<string[]> {
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/makes?query=${query}`
    );
  }

  async searchModels(make: string): Promise<string[]> {
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/models?make=${make}`
    );
  }

  async searchYears(make: string, model: string): Promise<number[]> {
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/years?make=${make}&model=${model}`
    );
  }

  async getVehicleImages(params: VehicleIdentifier): Promise<string[]> {
    const { make, model, year } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/images?make=${make}&model=${model}&year=${year}`
    );
  }

  async getVehicleValue(params: VehicleIdentifier & { zipCode: string }): Promise<{ value: number }> {
    const { make, model, year, zipCode } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/value?make=${make}&model=${model}&year=${year}&zipCode=${zipCode}`
    );
  }

  async getVehicleSpecs(params: VehicleIdentifier): Promise<VehicleSpecs> {
    const { make, model, year } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/specs?make=${make}&model=${model}&year=${year}`
    );
  }

  async getVehicleSafety(params: VehicleIdentifier): Promise<VehicleSafety> {
    const { make, model, year } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/safety?make=${make}&model=${model}&year=${year}`
    );
  }

  async getVehicleProblems(params: VehicleIdentifier): Promise<VehicleProblemReport> {
    const { make, model, year } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/problems?make=${make}&model=${model}&year=${year}`
    );
  }

  async getVehicleTestimonies(params: VehicleIdentifier): Promise<VehicleTestimony[]> {
    const { make, model, year } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/testimonies?make=${make}&model=${model}&year=${year}`
    );
  }

  async analyzeVehicle(params: VehicleIdentifier, prompt: string): Promise<VehicleAnalysis> {
    const { make, model, year } = params;
    return this.fetchWithError(
      `${this.baseUrl}/vehicles/analyze?make=${make}&model=${model}&year=${year}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      }
    );
  }
}