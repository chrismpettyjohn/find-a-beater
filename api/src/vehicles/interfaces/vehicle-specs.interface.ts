export interface VehicleSpecs {
  weight: number;
  horsepower: number;
  torque: number;
  hpWeightRatio: number;
}

export interface ExpectedProblem {
  issue: string;
  probability: number;
  cost: number;
}

export interface VehicleTestimony {
  ownerType: string;
  experience: string;
  rating: number;
  pros: string[];
  cons: string[];
}