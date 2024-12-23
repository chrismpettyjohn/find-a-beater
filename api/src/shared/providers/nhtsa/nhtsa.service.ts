import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NHTSAService {
  private readonly baseUrl = 'https://api.nhtsa.gov/apis';

  async getVehicleInfo(vin: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/vehicles/DecodeVin/${vin}?format=json`);
      return response.data.Results;
    } catch (error) {
      throw new Error(`NHTSA API error: ${error.message}`);
    }
  }

  async getRecalls(vin: string) {
    try {
      const response = await axios.get(`${this.baseUrl}/recalls/recallsByVehicle/${vin}?format=json`);
      return response.data.Results;
    } catch (error) {
      throw new Error(`NHTSA API error: ${error.message}`);
    }
  }

  async getComplaints(make: string, model: string, year: number) {
    try {
      const response = await axios.get(
        `${this.baseUrl}/complaints/ComplaintsByVehicle?make=${make}&model=${model}&modelYear=${year}&format=json`
      );
      return response.data.Results;
    } catch (error) {
      throw new Error(`NHTSA API error: ${error.message}`);
    }
  }
}