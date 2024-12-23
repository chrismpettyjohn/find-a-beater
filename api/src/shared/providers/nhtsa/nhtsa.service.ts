import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NHTSAService {
  private readonly baseUrl = 'https://api.nhtsa.gov/apis';

  async getVehicleInfo(make: string, model: string, year: number) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/vehicles/GetModelsForMakeYear/make/${make}/modelyear/${year}?format=json`
      );
      return response.data.Results;
    } catch (error) {
      console.log(error);
      throw new Error(`NHTSA API error: ${error.message}`);
    }
  }
}
