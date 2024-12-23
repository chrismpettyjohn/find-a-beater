import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NHTSAService {
  private readonly baseUrl = 'https://vpic.nhtsa.dot.gov/api/vehicles';

  async searchMakes(query: string): Promise<string[]> {
    const url = `${this.baseUrl}/GetAllMakes?format=json`;
    const response = await axios.get(url);
    console.log(response.data)
    const makes = response.data.Results.map((make: any) => make.Make_Name);
    return makes.filter((make: string) =>
      make.toLowerCase().includes(query.toLowerCase())
    );
  }

  async searchModels(make: string): Promise<string[]> {
    const url = `${this.baseUrl}/GetModelsForMake/${make}?format=json`;
    const response = await axios.get(url);
    console.log(response.data)
    return response.data.Results.map((model: any) => model.Model_Name);
  }

  async searchYears(make: string, model: string): Promise<number[]> {
    const url = `${this.baseUrl}/GetVehicleVariableValuesList/${make}?format=json`;
    const response = await axios.get(url);
    console.log(response.data)
    // The NHTSA API does not provide a direct endpoint for years; you might need to adjust this.
    const years = response.data.Results.filter(
      (item: any) =>
        item.Make_Name.toLowerCase() === make.toLowerCase() &&
        item.Model_Name.toLowerCase() === model.toLowerCase()
    ).map((item: any) => parseInt(item.ModelYear, 10));

    return years;
  }
}
